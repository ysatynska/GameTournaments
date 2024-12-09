import { Accordion, AccordionItem } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { SportDropdown } from "@/app/lib/definitions";

interface NavbarAccordionProps {
  links: SportDropdown[];
  onLinkClick: () => void;
}

export const NavbarAccordion = ({
  links,
  onLinkClick,
}: NavbarAccordionProps) => {
  const pathname = usePathname();

  return (
    <Accordion variant="light" selectionMode="single">
      {links.map((sport) => (
        <AccordionItem
          key={sport.slug}
          title={
            <span
              className={clsx(
                "text-foreground text-2xl",
                pathname.startsWith(`/${sport.slug}`)
                  ? "text-red-900 font-medium"
                  : ""
              )}
            >
              {sport.name}
            </span>
          }
          className={clsx("text-foreground")}
        >
          <ul>
            {sport.dropdownItems.map((dropdownItem) => (
              <li key={dropdownItem.label}>
                <Link
                  href={dropdownItem.href}
                  className={clsx(
                    "text-foreground text-lg py-0.5 pl-2",
                    dropdownItem.label === "Submit Game" && "text-rose-700"
                  )}
                  onClick={onLinkClick} // Close menu on link click
                >
                  {dropdownItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
