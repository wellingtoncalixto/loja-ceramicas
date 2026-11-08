"use client";

import { Suspense, useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/types/navigation";
import { CloseIcon, MenuIcon, PinIcon } from "@/components/icons/icons";
import { NavLinks } from "@/components/layout/NavLinks/NavLinks";
import { NavList } from "@/components/layout/NavList/NavList";
import styles from "./MobileMenu.module.scss";

type MobileMenuProps = {
  items: NavItem[];
  location: string;
};

/** Botão + painel de navegação do celular (some a partir de md). */
export function MobileMenu({ items, location }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className={styles.menu}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((value) => !value)}
        className={styles.botao}
      >
        {open ? (
          <CloseIcon className={styles.icone} />
        ) : (
          <MenuIcon className={styles.icone} />
        )}
      </button>

      <nav
        id={panelId}
        aria-label="Menu principal"
        hidden={!open}
        className={styles.painel}
      >
        <Suspense
          fallback={<NavList items={items} variant="mobile" onNavigate={close} />}
        >
          <NavLinks items={items} variant="mobile" onNavigate={close} />
        </Suspense>
        <p className={styles.localizacao}>
          <PinIcon className={styles.iconeLocalizacao} />
          {location}
        </p>
      </nav>
    </div>
  );
}
