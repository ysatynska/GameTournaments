import { it } from "node:test";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Tournament Builder",
  description: "Make beautiful websites regardless of your design experience.",
  sportLinks: [
    { label: "My Games", href: "/", key: "my_games" },
    { label: "Submit Game", href: "/", key: "submit_game" },
  ],
  navItems: [
    {
      label: "Home",
      href: "/",
      key: "home"
    },
    {
      label: "Ping Pong",
      href: "/pingpong",
      dropdownItems: [
        { label: "Ping Pong Home", href: "/pingpong", key: "pp_home"}
      ],
    },
    {
      label: "Pool",
      href: "/pool",
      dropdownItems: [
        { label: "Pool Home", href: "/pool", key: "pool"}
      ],
    },
    {
      label: "Air Hockey",
      href: "/airhockey",
      dropdownItems: [
        { label: "Air Hockey Home", href: "/airhockey", key: "air_hockey"},
      ],
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

siteConfig.navItems = siteConfig.navItems.map((navItem) => {
  if (navItem.dropdownItems) {
    return {
      ...navItem,
      dropdownItems: [...navItem.dropdownItems, ...siteConfig.sportLinks],
    };
  }
  return navItem;
});