import type { Inspiracao } from "@/types/inspiration";
import type { TipoPeca } from "@/types/product";
import { rotas } from "@/data/navigation";

const rotaTipo = (tipo: TipoPeca) => `${rotas.catalogo}?tipo=${tipo}`;

const pastaFotos = "/images/demonstracao/01-pagina-inicial";

// Cards da seção "Inspire a sua composição" (home). Fotos ilustrativas;
// cada card abre o catálogo já filtrado.
export const inspiracoes: Inspiracao[] = [
  {
    nome: "Potes decorados",
    href: rotaTipo("potes"),
    imagem: `${pastaFotos}/06-inspiracao-kit-azul-ursinhos.png`,
    alt: "Kit azul com ursinhos",
  },
  {
    nome: "Conjuntos para lavabo",
    href: rotas.lavabo,
    imagem: `${pastaFotos}/07-inspiracao-kit-classico-dourado.png`,
    alt: "Conjunto branco com detalhes dourados",
  },
  {
    nome: "Bandejas",
    href: rotaTipo("bandejas"),
    imagem: `${pastaFotos}/08-bandeja-branca-perolada.png`,
    alt: "Bandeja branca perolada",
  },
];
