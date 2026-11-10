"use client";

import type { FocusEvent, ReactNode } from "react";

type InspiracaoListaProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Lista do carrossel de Inspiração. No celular, o Chrome não rola o carrossel
 * quando o card focado pelo Tab já aparece em parte; aqui ele é trazido
 * inteiro para a vista. Sem carrossel (tablet e desktop), não faz nada.
 */
export function InspiracaoLista({ className, children }: InspiracaoListaProps) {
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
