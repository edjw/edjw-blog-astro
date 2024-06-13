type NavigationItem = {
  text: string;
  url: string;
  attribute?: string;
};

export const navigationItems: NavigationItem[] = [
  {
    text: "Blog",
    url: "/blog",
  },
  {
    text: "Stuff",
    url: "/stuff",
  },
  {
    text: "Microblog",
    url: "https://microblog.edjohnsonwilliams.co.uk",
  },
  {
    text: "About",
    url: "/about",
  },
  // {
  //   text: "Twitter",
  //   url: "https://twitter.com/_edjw",
  //   attribute: "me",
  // },
  // {
  //   text: "Github",
  //   url: "https://github.com/edjw",
  //   attribute: "me",
  // },
];
