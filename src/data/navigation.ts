import type { CategoriaSlug } from "@/types/product";
import type { NavItem } from "@/types/navigation";

/** Catálogo já filtrado por uma categoria (ex.: /catalogo?categoria=lavabo). */
export function rotaCategoria(categoria: CategoriaSlug): string {
  return `/catalogo?categoria=${categoria}`;
}

/** Página de uma peça (ex.: /produto/pote-ovelhinhas). */
export function rotaProduto(slug: string): string {
  return `/produto/${encodeURIComponent(slug)}`;
}

// Fonte única dos caminhos, usada pela navegação, rodapé e seções da home.
// As categorias abrem o catálogo com o filtro marcado.
export const rotas = {
  inicio: "/",
  catalogo: "/catalogo",
  kitsParaBebe: rotaCategoria("kits-para-bebe"),
  lavabo: rotaCategoria("lavabo"),
  mesaPosta: rotaCategoria("mesa-posta"),
  cozinha: rotaCategoria("cozinha"),
  orcamento: "/orcamento",
  sobre: "/sobre",
} as const;

export const mainNavigation: NavItem[] = [
  { label: "Início", href: rotas.inicio },
  { label: "Kits para bebê", href: rotas.kitsParaBebe },
  { label: "Lavabo", href: rotas.lavabo },
  { label: "Mesa posta", href: rotas.mesaPosta },
  { label: "Cozinha", href: rotas.cozinha },
  { label: "Sobre a loja", href: rotas.sobre },
];
