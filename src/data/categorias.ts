import type { Categoria } from "@/types/categoria";
import { rotas } from "@/data/navigation";

const pastaFotos = "/images/demonstracao/01-pagina-inicial";

// Categorias da home ("Encontre peças para cada espaço"). Fotos ilustrativas.
export const categorias: Categoria[] = [
  {
    nome: "Kits para bebê",
    href: rotas.kitsParaBebe,
    imagem: `${pastaFotos}/01-banner-kit-ovelhinhas.png`,
    alt: "Kit de potes com ovelhinhas",
  },
  {
    nome: "Lavabo",
    href: rotas.lavabo,
    imagem: `${pastaFotos}/02-categoria-lavabo-floral.png`,
    alt: "Conjunto floral para lavabo",
  },
  {
    nome: "Mesa posta",
    href: rotas.mesaPosta,
    imagem: `${pastaFotos}/03-categoria-mesa-posta.png`,
    alt: "Pratos e xícara com bolinhas",
  },
  {
    nome: "Cozinha",
    href: rotas.cozinha,
    imagem: `${pastaFotos}/04-categoria-cozinha.png`,
    alt: "Potes de porcelana com friso dourado",
  },
];
