import type { NavItem } from "@/types/navigation";

// Rotas placeholder: as páginas serão criadas em etapas futuras.
// Fonte única dos caminhos, usada pela navegação e pelas categorias da home.
export const rotas = {
  inicio: "/",
  kitsParaBebe: "/kits-para-bebe",
  lavabo: "/lavabo",
  mesaPosta: "/mesa-posta",
  cozinha: "/cozinha",
  sobre: "/sobre",
  catalogo: "/catalogo",
} as const;

export const mainNavigation: NavItem[] = [
  { label: "Início", href: rotas.inicio },
  { label: "Kits para bebê", href: rotas.kitsParaBebe },
  { label: "Lavabo", href: rotas.lavabo },
  { label: "Mesa posta", href: rotas.mesaPosta },
  { label: "Cozinha", href: rotas.cozinha },
  { label: "Sobre a loja", href: rotas.sobre },
];

export const storeLocation = "Pedreira, SP";
