"use client";

import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";

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
      <DropdownTrigger>
        <Button
          variant="light"
          className={clsx(
            "text-foreground text-xl",
            isOnPage ? "text-red-900 font-medium" : ""
          )}
        >
          {item.label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Link Actions">
        {item.dropdownItems.map((dropdownItem) => (
          <DropdownItem
            key={dropdownItem.label}
            href={dropdownItem.href}
            variant="light"
          >
            {dropdownItem.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
