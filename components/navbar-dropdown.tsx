"use client";

import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
  NavbarItem,
} from "@nextui-org/react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ChevronDownIcon } from "./icons";

// Accept label as a prop to dynamically update the dropdown menu
interface NavbarDropdownProps {
  label: string;
}

export default function NavbarDropdown({ label }: NavbarDropdownProps) {
  const pathname = usePathname();
  const item = siteConfig.navItems.find((item) => item.label === label);

  // A fallback UI in case the item does not exist or doesn't contain a dropdown menu
  function FallbackComponent() {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Menu is temporarily unavailable</p>
      </div>
    );
  }

  if (!item || !item.dropdownItems) {
    return <FallbackComponent />;
  }

  // Check if user is on one of a sport's pages
  const isOnPage = pathname.startsWith(`${item.href}`);

  return (
    <Dropdown backdrop="blur">
      <NavbarItem>
        <DropdownTrigger>
          <Button
            variant="light"
            disableRipple
            className={clsx(
              "text-foreground text-xl",
              isOnPage ? "text-red-900 font-medium" : ""
            )}
            endContent={<ChevronDownIcon />}
          >
            {item.label}
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu aria-label="Link Actions">
        {item.dropdownItems.map((dropdownItem) => (
          <DropdownItem
            className={clsx(
              "text-foreground",
              dropdownItem.label === "Submit Game" ? "text-rose-700" : ""
            )}
            key={dropdownItem.key}
            href={dropdownItem.href}
            variant="light"
            color={dropdownItem.label === "Submit Game" ? "danger" : "default"}
          >
            {dropdownItem.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
