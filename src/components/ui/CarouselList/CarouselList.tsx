"use client";

import type { FocusEvent, ReactNode } from "react";

type ListaCarrosselProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Lista (ul) para carrosséis com rolagem horizontal em CSS.
 * O Chrome não rola o carrossel quando o item focado pelo Tab já aparece
 * em parte; aqui ele é trazido inteiro para a vista. Quando a lista não
 * transborda (ex.: grade no tablet/desktop), não faz nada.
 * Os filhos devem ser <li>.
 */
export function CarouselList({ className, children }: ListaCarrosselProps) {
  function aoFocar(evento: FocusEvent<HTMLUListElement>) {
    const lista = evento.currentTarget;
    if (lista.scrollWidth <= lista.clientWidth) return;

    const item = (evento.target as HTMLElement).closest("li");
    if (!item || !lista.contains(item)) return;

    const semMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    item.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: semMovimento ? "auto" : "smooth",
    });
  }

  return (
    <ul className={className} onFocus={aoFocar}>
      {children}
    </ul>
  );
}
