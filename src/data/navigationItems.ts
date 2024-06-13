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
    text: "Microblog",
    url: "https://microblog.edjohnsonwilliams.co.uk",
  },
  {
    text: "Now",
    url: "/now",
  },
  {
    text: "About",
    url: "/about",
  },
];
