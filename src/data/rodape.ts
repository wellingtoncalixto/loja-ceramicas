import type { NavItem } from "@/types/navigation";
import { mainNavigation, rotas } from "@/data/navigation";

// Coluna "Navegue": a navegação principal sem "Início" (como na referência).
export const rodapeNavegue: NavItem[] = mainNavigation.filter(
  (item) => item.href !== rotas.inicio,
);

// Coluna "Atendimento". Rotas placeholder: as páginas serão criadas em etapas
// futuras (por enquanto caem na página "em construção").
export const rodapeAtendimento: NavItem[] = [
  { label: "Fale com a loja", href: "/contato" },
  { label: "Meu orçamento", href: rotas.orcamento },
  { label: "Contato", href: `${rotas.sobre}#contato` },
];

export const rodapeAviso = ["Proposta visual revisada", "ambientações ilustrativas"];
