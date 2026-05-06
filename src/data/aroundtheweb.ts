interface SocialLink {
  link: string;
  label: string;
  icon: string;
}

interface ContactData {
  professional: SocialLink[];
  personal: SocialLink[];
}

const data: ContactData = {
  professional: [
    {
      link: "https://stackoverflow.com/users/590487/matt",
      label: "Stack Overflow",
      icon: "fa6-brands:stack-overflow",
    },
    {
      link: "https://github.com/matthewmincher",
      label: "Github",
      icon: "fa6-brands:github",
    },
  ],
  personal: [
    {
      link: "https://twitter.com/matthewmincher",
      label: "Twitter",
      icon: "fa6-brands:twitter",
    },
    {
      link: "https://instagram.com/matthewmincher",
      label: "Instagram",
      icon: "fa6-brands:instagram",
    },
    {
      link: "https://www.last.fm/user/matthewmincher",
      label: "Last.fm",
      icon: "fa6-brands:lastfm",
    },
    {
      link: "https://www.goodreads.com/user/show/22574656-matthew",
      label: "Goodreads",
      icon: "fa6-brands:goodreads-g",
    },
    {
      link: "https://steamcommunity.com/id/hartshill/",
      label: "Steam",
      icon: "fa6-brands:steam",
    },
  ],
};

export default data;
