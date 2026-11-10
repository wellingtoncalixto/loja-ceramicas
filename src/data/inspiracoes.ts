import type { Inspiracao } from "@/types/inspiracao";
import { rotas } from "@/data/navigation";

const pastaFotos = "/images/demonstracao/01-pagina-inicial";

// Cards da seção "Inspire a sua composição" (home). Fotos ilustrativas;
// por enquanto todos levam ao catálogo (página ainda em construção).
export const inspiracoes: Inspiracao[] = [
  {
    nome: "Potes decorados",
    href: rotas.catalogo,
    imagem: `${pastaFotos}/06-inspiracao-kit-azul-ursinhos.png`,
    alt: "Kit azul com ursinhos",
  },
  {
    nome: "Conjuntos para lavabo",
    href: rotas.catalogo,
    imagem: `${pastaFotos}/07-inspiracao-kit-classico-dourado.png`,
    alt: "Conjunto branco com detalhes dourados",
  },
  {
    nome: "Bandejas",
    href: rotas.catalogo,
    imagem: `${pastaFotos}/08-bandeja-branca-perolada.png`,
    alt: "Bandeja branca perolada",
  },
];
