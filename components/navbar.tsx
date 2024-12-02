"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { Kbd } from "@nextui-org/kbd";
import { useState, useEffect } from "react";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import NavbarDropdown from "./navbar-dropdown";
import { Button } from "@nextui-org/button";
import path from "path";
// import { link as linkStyles } from "@nextui-org/theme";

export const Navbar = ({ session }: { session: any }) => {
  const pathname = usePathname();

  // State for controlling the NavbarMenu
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Determine the screen's size
  const handleResize = () => {
    // Tailwind's default 'lg' size is a width of 1024 pixels
    if (window.innerWidth < 1024) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // Close NavbarMenu on a link click
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for the screen size
    handleResize();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setMenuOpen(false);
    }
  }, [isMobile]);

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
      >
        <img
          alt="Roanoke College logo"
          src="https://www.roanoke.edu/images/Marcomm/logos/2024/5Shield.png"
          style={{ height: "100%", objectFit: "contain" }}
        />
        <NavbarMenuToggle
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul className="lg:hidden flex justify-start">
          {siteConfig.navItems.map((item) =>
            // If a dropdown menu exists, render the item as a dropdown component
            item.dropdownItems ? (
              <></>
            ) : (
              // Otherwise, render the item as just a Button component
              <NavbarItem key={item.key} className="flex items-center">
                <NextLink
                  href={item.href}
                  className={clsx(
                    "text-foreground text-2xl ml-6",
                    item.href === pathname ? "text-red-900 font-medium" : ""
                  )}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            )
          )}
        </ul>
        <ul className="hidden lg:flex flex-shrink gap-0.5 justify-start ml-2">
          {siteConfig.navItems.map((item) =>
            // If a dropdown menu exists, render the item as a dropdown component
            item.dropdownItems ? (
              <NavbarDropdown
                key={item.label}
                label={item.label}
              ></NavbarDropdown>
            ) : (
              // Otherwise, render the item as just a Button component
              <NavbarItem key={item.href} className="flex items-center">
                <Button
                  className={clsx(
                    "text-foreground text-xl",
                    item.href === pathname ? "text-red-900 font-medium" : ""
                  )}
                  variant="light"
                  as={NextLink}
                  href={item.href}
                  disableRipple
                >
                  {item.label}
                </Button>
              </NavbarItem>
            )
          )}
        </ul>
      </NavbarContent>

      <NavbarContent className="flex" justify="end">
        {session ? (
          <NavbarItem>Welcome, {session.user.name}!</NavbarItem>
        ) : (
          <NavbarItem>
            <Link href="/login">Login</Link>
          </NavbarItem>
        )}
        <ThemeSwitch />
      </NavbarContent>

      <NavbarMenu className="flex flex-col lg:hidden">
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
