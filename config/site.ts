import { it } from "node:test";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Tournament Builder",
  description: "Make beautiful websites regardless of your design experience.",
  sportLinks: [
    { label: "All Games", href: "/all_games", key: "all_games" },
    { label: "Ranks", href: "/ranks", key: "ranks"},
    { label: "My Games", href: "/my_games", key: "my_games" },
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
      key: "pingpong",
      dropdownItems: [
        { label: "Ping Pong Home", href: "/pingpong", key: "pool"},
      ],
    },
    {
      label: "Pool",
      href: "/pool",
      key: "pool",
      dropdownItems: [
        { label: "Pool Home", href: "/pool", key: "pool"}
      ],
    },
    {
      label: "Air Hockey",
      href: "/airhockey",
      key: "air",
      dropdownItems: [
        { label: "Air Hockey Home", href: "/airhockey", key: "air"},
      ],
    },
    {
      label: "Submit Game",
      href: "/submit_game",
      key: "submit_game"
    }
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