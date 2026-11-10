"use client";

import { usePathname, useSearchParams } from "next/navigation";
import type { NavItem } from "@/types/navigation";
import { NavList, type NavVariant } from "@/components/layout/NavList/NavList";

type NavLinksProps = {
  items: NavItem[];
  variant: NavVariant;
  onNavigate?: () => void;
};

type LeituraParametros = Pick<URLSearchParams, "getAll">;

/**
 * Aba ativa:
 * - link sem "?" (ex.: "/", "/sobre"): o caminho é igual ou está dentro dele;
 * - link com "?" (ex.: "/catalogo?categoria=lavabo"): mesmo caminho e cada
 *   parâmetro do link com exatamente os mesmos valores na URL. Outros filtros
 *   (tipo, cor...) não tiram o destaque; duas categorias marcadas, sim.
 */
function estaAtivo(href: string, pathname: string, atuais: LeituraParametros): boolean {
  const [caminho, query] = href.split("?");
  if (!query) {
    return pathname === caminho || (caminho !== "/" && pathname.startsWith(`${caminho}/`));
  }
  if (pathname !== caminho) return false;

  const doLink = new URLSearchParams(query);
  return [...new Set(doLink.keys())].every((chave) => {
    const esperados = doLink.getAll(chave);
    const recebidos = atuais.getAll(chave);
    return (
      esperados.length === recebidos.length &&
      esperados.every((valor) => recebidos.includes(valor))
    );
  });
}

const semParametros = new URLSearchParams();

/**
 * Versão só com o caminho (não suspende): fallback do Suspense, para o HTML
 * estático já marcar "Início" e "Sobre". As abas com filtro aparecem com NavLinks.
 */
export function NavLinksPorCaminho({ items, variant, onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const activeHref =
    items.find((item) => estaAtivo(item.href, pathname, semParametros))?.href ?? null;

  return (
    <NavList
      items={items}
      variant={variant}
      activeHref={activeHref}
      onNavigate={onNavigate}
    />
  );
}

/** Só esta parte lê a URL, para destacar a aba ativa (fica dentro de um Suspense). */
export function NavLinks({ items, variant, onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeHref =
    items.find((item) => estaAtivo(item.href, pathname, searchParams))?.href ?? null;

  return (
    <NavList
      items={items}
      variant={variant}
      activeHref={activeHref}
      onNavigate={onNavigate}
    />
  );
}
