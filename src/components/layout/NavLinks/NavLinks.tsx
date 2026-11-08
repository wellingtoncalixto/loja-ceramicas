"use client";

import { usePathname } from "next/navigation";
import type { NavItem } from "@/types/navigation";
import { NavList, type NavVariant } from "@/components/layout/NavList/NavList";

type NavLinksProps = {
  items: NavItem[];
  variant: NavVariant;
  onNavigate?: () => void;
};

/** Só esta parte lê a URL, para destacar a aba ativa. */
export function NavLinks({ items, variant, onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const activeHref =
    items.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    )?.href ?? null;

  return (
    <NavList
      items={items}
      variant={variant}
      activeHref={activeHref}
      onNavigate={onNavigate}
    />
  );
}
