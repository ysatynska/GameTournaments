export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Ping Pong",
      href: "/pingpong",
      dropdownItems: [
        { label: "Ping Pong Home", href: "/pingpong"},
        { label: "Tournament 1", href: "/pingpong/" },
        { label: "Tournament 2", href: "/pingpong/" },
        { label: "Tournament 3", href: "/pingpong/" },
      ],
    },
    {
      label: "Pool",
      href: "/pool",
      dropdownItems: [
        { label: "Pool Home", href: "/pool"},
        { label: "Tournament 1", href: "/pool/" },
        { label: "Tournament 2", href: "/pool/" },
        { label: "Tournament 3", href: "/pool/" },
      ],
    },
    {
      label: "Air Hockey",
      href: "/airhockey",
      dropdownItems: [
        { label: "Air Hockey Home", href: "/airhockey"},
        { label: "Tournament 1", href: "/airhockey/" },
        { label: "Tournament 2", href: "/airhockey/" },
        { label: "Tournament 3", href: "/airhockey/" },
      ],
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
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
