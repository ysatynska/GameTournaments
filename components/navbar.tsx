"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  Accordion,
  Image,
  NavbarBrand,
  AccordionItem,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
} from "@nextui-org/react";
import { Kbd } from "@nextui-org/kbd";
import { useState, useEffect } from "react";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ThemeSwitch } from "@/components/theme-switch";
import NavbarDropdown from "./navbar-dropdown";
import { Button } from "@nextui-org/button";
import { SportDropdown } from "@/app/lib/definitions";
import { ChevronDownIcon } from "./icons";

export const Navbar = ({
  session,
  primaryLinks,
  secondaryLinks,
}: {
  session: any;
  primaryLinks: SportDropdown[];
  secondaryLinks: SportDropdown[];
}) => {
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
      className="border-b-2 border-b-red-900 flex"
      maxWidth="xl"
      position="sticky"
      isMenuOpen={menuOpen}
    >
      <NavbarBrand className="!basis-10 !flex-shrink-0">
        <NextLink className="flex justify-start items-center" href="https://www.roanoke.edu/student_life/sports_and_recreation" target="_blank">
          <Image src="/RCLogo.svg" alt="RC" height="40px" radius="none"/>
        </NextLink>
      </NavbarBrand>

      <NavbarContent
        className="!basis-full flex items-center md:overflow-x-scroll"
        justify="start"
      >
        
        <NavbarMenuToggle
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {/* <ul> FOR SMALL SCREENS */}

        {/* <ul> FOR LARGE SCREENS */}
        <ul className="hidden md:flex flex-shrink gap-0.5 justify-start">
          <NavbarItem key={`home`}>
            <Button
              variant="light"
              disableRipple
              className={clsx(
                "text-foreground text-xl",
                pathname === `/` ? "text-red-900 font-medium" : ""
              )}
              as={NextLink}
              href={`/`}
            >
              Home
            </Button>
          </NavbarItem>
          {primaryLinks.map((sport: SportDropdown) => (
            // Render the primary sports as unique dropdown menus
            <NavbarItem key={`${sport.slug}`}>
              <NavbarDropdown sport={sport}></NavbarDropdown>
            </NavbarItem>
          ))}

          {/* Catch-all Dropdown for other sports */}
          <NavbarItem key={`othersports`}>
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button
                  variant="light"
                  disableRipple
                  className={clsx(
                    "text-foreground text-xl",
                    secondaryLinks.some((sport) =>
                      pathname.startsWith(`/${sport.slug}`)
                    )
                      ? "text-red-900 font-medium"
                      : ""
                  )}
                  endContent={<ChevronDownIcon />}
                >
                  Other Sports
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Link Actions"
                className="max-h-64 overflow-y-auto"
              >
                {secondaryLinks.map((sport: SportDropdown) => (
                  // Render each secondary sport as a unique section in the DropdownMenu
                  <DropdownSection
                    title={`${sport.name}`}
                    showDivider
                    key={`${sport.slug}`}
                  >
                    {sport.dropdownItems.map((dropdownItem) => (
                      <DropdownItem
                        key={`${dropdownItem.key}`}
                        className={clsx(
                          "text-foreground",
                          dropdownItem.label === "Submit Game"
                            ? "text-rose-700"
                            : ""
                        )}
                        href={`${dropdownItem.href}`}
                        variant="light"
                        color={
                          dropdownItem.label === "Submit Game"
                            ? "danger"
                            : "default"
                        }
                      >
                        {dropdownItem.label}
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          <NavbarItem key={`create_sport`}>
            <Button
              variant="light"
              disableRipple
              className={clsx(
                "text-foreground text-xl",
                pathname === `/create_sport` ? "text-red-900 font-medium" : ""
              )}
              as={NextLink}
              href={`/create_sport`}
            >
              Create New Sport
            </Button>
          </NavbarItem>
        </ul>
      </NavbarContent>

      {/* End Content to display on the navbar */}
      <NavbarContent className="flex" justify="end">
        {session ? (
          <NavbarItem>
            Welcome, {session.user.name}!
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Link href="/login" size="lg">
              Login
            </Link>
          </NavbarItem>
        )}
        <ThemeSwitch />
      </NavbarContent>

      {/* UI for the NavbarMenu to display when Menu is expanded on small screens */}
      <NavbarMenu className="flex flex-col md:hidden">
        {/* <Accordion variant="light" selectionMode="single">
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
        </Accordion> */}
      </NavbarMenu>
    </NextUINavbar>
  );
};
