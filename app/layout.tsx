import "@/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { auth } from "@/app/auth";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { fetchPrimarySports, fetchSecondarySports } from "@/app/lib/queries";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "black" },
    { media: "(prefers-color-scheme: light)", color: "white" },
  ],
};

function appendDropdownItems(sport: any) {
  return [
    {
      label: `${sport.name} Home`,
      href: `/${sport.slug}`,
      key: `${sport.slug}`,
    },
    {
      label: `All Games`,
      href: `/${sport.slug}/all_games`,
      key: `${sport.slug}/all_games`,
    },
    {
      label: `Ranks`,
      href: `/${sport.slug}/ranks`,
      key: `${sport.slug}/ranks`,
    },
    {
      label: `My Games`,
      href: `/${sport.slug}/my_games`,
      key: `${sport.slug}/my_games`,
    },
    {
      label: `Submit Game`,
      href: `/${sport.slug}/submit_game`,
      key: `${sport.slug}/submit_game`,
    },
  ];
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Fetch first 3 sports to display as separate navbar dropdowns
  const primarySports = (await fetchPrimarySports()).map((sport: any) => ({
    id: sport.id,
    name: sport.name,
    slug: sport.slug,
    dropdownItems: appendDropdownItems(sport),
  }));

  // Fetch remaining sports to be displayed in a "catch all" dropdown at the end of the navbar
  const secondarySports = (await fetchSecondarySports()).map((sport: any) => ({
    id: sport.id,
    name: sport.name,
    slug: sport.slug,
    dropdownItems: appendDropdownItems(sport),
  }));

  // Fetch all sports (to be used for rendering the NavbarMenu component on small screens)

  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Roanoke College" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar
              session={session}
              primaryLinks={primarySports}
              secondaryLinks={secondarySports}
            />
            <main className="container mx-auto max-w-7xl px-3 py-10 md:py-10 md:px-10 flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
