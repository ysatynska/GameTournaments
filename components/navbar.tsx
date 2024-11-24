"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
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
import { signOut } from '@/app/auth';
import { PowerIcon } from '@heroicons/react/24/outline';
// import { link as linkStyles } from "@nextui-org/theme";

export const Navbar = () => {
  const pathname = usePathname();

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar
      className="border-b-4 border-b-red-900"
      maxWidth="xl"
      position="sticky"
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
        <NavbarMenuToggle className="md:hidden" />
        <ul className="hidden md:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) =>
            // If a dropdown menu exists, render the item as a dropdown component
            item.dropdownItems ? (
              <NavbarDropdown
                key={item.label}
                label={item.label}
              ></NavbarDropdown>
            ) : (
              // Otherwise, render the item as just a NextLink component
              <NavbarItem
                key={item.href}
                className="flex items-center mr-4 relative"
              >
                <NextLink
                  className={clsx(
                    "text-foreground text-xl",
                    item.href === pathname ? "text-red-900 font-medium" : ""
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            )
          )}
        </ul>
      </NavbarContent>

      <NavbarContent className="flex" justify="end">
      <Link href="/login">Login</Link>
        <ThemeSwitch />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="foreground" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
