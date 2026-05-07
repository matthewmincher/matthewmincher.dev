import { XMLParser } from "fast-xml-parser";

interface PixelfedPost {
  title: string;
  date: Date;
  link: string;
  images: string[];
}

export async function getRecentPosts(count = 3): Promise<PixelfedPost[]> {
  const response = await fetch(
    "https://pixelfed.social/users/matthewmincher.atom",
  );
  const xml = await response.text();

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });
  const feed = parser.parse(xml);

  const entries = feed.feed.entry.slice(0, count);

  return entries.map((entry: any) => {
    const mediaContent = entry["media:content"];
    const images = Array.isArray(mediaContent)
      ? mediaContent.map((m: any) => m["@_url"])
      : [mediaContent["@_url"]];

    const link = Array.isArray(entry.link)
      ? entry.link.find((l: any) => l["@_rel"] === "alternate")["@_href"]
      : entry.link["@_href"];

    const title =
      entry.title === "No caption" ? "" : (entry.title?.toString() ?? "");

    return {
      title,
      date: new Date(entry.updated),
      link,
      images,
    };
  });
}
