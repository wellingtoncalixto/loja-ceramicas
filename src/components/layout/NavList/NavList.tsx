import Link from "next/link";
import type { NavItem } from "@/types/navigation";
import styles from "./NavList.module.scss";

export type NavVariant = "desktop" | "mobile";

type NavListProps = {
  items: NavItem[];
  variant: NavVariant;
  activeHref?: string | null;
  onNavigate?: () => void;
};

const listClass: Record<NavVariant, string> = {
  desktop: styles.listaDesktop,
  mobile: styles.listaMobile,
};

const linkClass: Record<NavVariant, string> = {
  desktop: styles.linkDesktop,
  mobile: styles.linkMobile,
};

/** Lista de navegação sem hooks: usada pela versão ativa e pelo fallback. */
export function NavList({ items, variant, activeHref, onNavigate }: NavListProps) {
  return (
    <ul className={listClass[variant]}>
      {items.map((item) => (
        <li key={item.href}>
          {/* A aba ativa recebe aria-current; o estilo vem desse atributo. */}
          <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={item.href === activeHref ? "page" : undefined}
            className={linkClass[variant]}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
