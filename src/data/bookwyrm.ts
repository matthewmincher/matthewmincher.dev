interface BookwyrmBook {
  title: string;
  author: string;
  coverUrl: string;
  bookUrl: string;
  status: "reading" | "finished";
  rating?: number;
}

const BOOKWYRM_USER = "https://bookwyrm.social/user/matthewmincher";
const ACCEPT_HEADER = { Accept: "application/activity+json" };

async function fetchJson(url: string) {
  const response = await fetch(url, { headers: ACCEPT_HEADER });
  return response.json();
}

async function resolveAuthor(authorUrl: string): Promise<string> {
  const data = await fetchJson(authorUrl);
  return data.name ?? "Unknown";
}

async function fetchRatings(): Promise<Map<string, number>> {
  const outbox = await fetchJson(`${BOOKWYRM_USER}/outbox?page=true`);
  const ratings = new Map<string, number>();
  for (const item of outbox.orderedItems ?? []) {
    if (item.type === "Article" && item.rating && item.inReplyToBook) {
      ratings.set(item.inReplyToBook, item.rating);
    }
  }
  return ratings;
}

function mapBook(
  item: any,
  authorName: string,
  status: "reading" | "finished",
  rating?: number,
): BookwyrmBook {
  return {
    title: item.title,
    author: authorName,
    coverUrl: item.cover?.url ?? "",
    bookUrl: item.id,
    status,
    rating,
  };
}

export async function getCurrentlyReading(
  total = 4,
): Promise<BookwyrmBook[]> {
  const readingShelf = await fetchJson(
    `${BOOKWYRM_USER}/books/reading?page=1`,
  );
  const readingItems = readingShelf.orderedItems ?? [];

  const needed = Math.max(0, total - readingItems.length);
  let finishedItems: any[] = [];
  const [ratings] = await Promise.all([
    needed > 0 ? fetchRatings() : Promise.resolve(new Map<string, number>()),
    ...(needed > 0
      ? [
          fetchJson(`${BOOKWYRM_USER}/books/read?page=1`).then((shelf) => {
            finishedItems = (shelf.orderedItems ?? []).slice(0, needed);
          }),
        ]
      : []),
  ]);

  const allItems = [
    ...readingItems.map((item: any) => ({ item, status: "reading" as const })),
    ...finishedItems.map((item: any) => ({
      item,
      status: "finished" as const,
    })),
  ];

  const books = await Promise.all(
    allItems.map(async ({ item, status }) => {
      const authorUrl = item.authors?.[0];
      const authorName = authorUrl
        ? await resolveAuthor(authorUrl)
        : "Unknown";
      const rating =
        status === "finished" ? ratings.get(item.id) : undefined;
      return mapBook(item, authorName, status, rating);
    }),
  );

  return books;
}
