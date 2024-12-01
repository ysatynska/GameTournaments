"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  Accordion,
  AccordionItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Divider,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Kbd } from "@nextui-org/kbd";
import { useState } from "react";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import NavbarDropdown from "./navbar-dropdown";
import { useSession } from 'next-auth/react';
import { getAuthPlayer, signOut } from '@/app/auth';
import { PowerIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';

export const Navbar = ({session} : {session: any}) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <NextUINavbar
      className="border-b-2 border-b-red-900"
      maxWidth="xl"
      position="sticky"
      isMenuOpen={menuOpen}
    >
      <NavbarContent
        className="basis-1/5 sm:basis-full flex items-center"
        justify="start"
        key="links"
      >
        <img
          alt="Roanoke College logo"
          src="https://www.roanoke.edu/images/Marcomm/logos/2024/5Shield.png"
          style={{ height: "100%", objectFit: "contain" }}
        />
        <NavbarMenuToggle
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul className="hidden md:flex gap-8 justify-start ml-2">
          {siteConfig.navItems.map((item) =>
              <NavbarItem className="flex items-center" key={item.key}>
                <Link
                  className={clsx(
                    "text-foreground text-xl",
                    item.href === pathname ? "text-red-900 font-medium" : ""
                  )}
                  as={NextLink}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
          )}
        </ul>
      </NavbarContent>

      <NavbarContent className="flex" justify="end" key="login">
        <NavbarItem key="login">
          {session ? (
            <Link href="/logout">Logout</Link>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </NavbarItem>
        <NavbarItem key="theme">
          <ThemeSwitch/>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="flex flex-col">
        {/* <Button
          className={clsx(
            "text-foreground text-3xl h-16 mx-2 bg-foreground-300/25",
            home.href === pathname ? "text-red-900 font-medium" : ""
          )}
          variant="light"
          as={NextLink}
          href={home.href}
          disableRipple
          onClick={handleLinkClick} // Close menu on link click
        >
          {home.label}
        </Button> */}
        <Accordion variant="light" selectionMode="single">
          {siteConfig.navItems.slice(1).map((item) =>
            item.dropdownItems ? (
              <AccordionItem
                key={item.label}
                title={
                  <span
                    className={clsx(
                      "text-foreground text-2xl",
                      pathname.startsWith(`${item.href}`)
                        ? "text-red-900 font-medium"
                        : ""
                    )}
                  >
                    {item.label}
                  </span>
                }
                className={clsx("text-foreground")}
              >
                <ul>
                  {item.dropdownItems.map((dropdownItem) => (
                    <li key={dropdownItem.label}>
                      <Link
                        href={dropdownItem.href}
                        className={clsx(
                          "text-foreground text-lg py-0.5 pl-2",
                          dropdownItem.label === "Submit Game" &&
                            "text-rose-700"
                        )}
                        onClick={handleLinkClick} // Close menu on link click
                      >
                        {dropdownItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            ) : (
              <></>
            )
          )}
        </Accordion>
      </NavbarMenu>
    </NextUINavbar>
  );
};
