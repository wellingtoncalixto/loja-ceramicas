import type { FiltrosCatalogo, OrdemCatalogo } from "@/lib/catalogFilters";
import type { ImagemProduto, Produto } from "@/types/product";
import { rotuloCategoria, rotuloEstampa, rotuloTipo } from "@/data/catalog";

// Peças mockadas da proposta (fotos ilustrativas geradas para a demonstração).
// Sem preço: a referência mostra "Valor e disponibilidade sob consulta".

const fotosProdutos = "/images/demonstracao/02-produtos";
const fotosGaleria = "/images/demonstracao/03-galeria";
const fotosHome = "/images/demonstracao/01-pagina-inicial";

const detalhesPadrao = [
  { rotulo: "Material", valor: "confirmar com a loja" },
  { rotulo: "Medidas e capacidade", valor: "sob consulta" },
  { rotulo: "Venda", valor: "peça avulsa" },
];

const cuidadosPadrao = [
  "Medidas e capacidade confirmadas pela loja no atendimento.",
  "Lavar à mão com esponja macia e detergente neutro.",
  "Evitar produtos abrasivos sobre a pintura.",
];

const descricaoPadrao = {
  titulo: "Uma peça, muitas possibilidades.",
  texto:
    "Escolha as peças de que precisa e consulte as combinações de cores e estampas com a loja.",
  detalhes: detalhesPadrao,
};

/** Foto principal como 1º item da galeria. */
function fotoPrincipal(src: string, alt: string): ImagemProduto {
  return { src, alt, rotulo: "Peça" };
}

export const produtos: Produto[] = [
  {
    slug: "pote-ovelhinhas",
    nome: "Pote ovelhinhas",
    categoria: "kits-para-bebe",
    ambientes: ["kits-para-bebe"],
    tipo: "potes",
    estampa: "infantis",
    opcoesEstampa: ["Ovelhinhas", "Poás", "Lisa"],
    cores: ["branco", "bege", "azul", "lavanda"],
    corPadrao: "bege",
    descricaoCurta: "Uma peça para compor o conjunto do seu jeito.",
    descricaoLonga: descricaoPadrao,
    medidasECuidados: cuidadosPadrao,
    comoCombinar:
      "Combine com o copo ovelhinhas e o pote com poás para montar um kit de higiene, e apoie tudo na bandeja oval.",
    imagem: `${fotosProdutos}/10-produto-pote-ovelhinhas.png`,
    alt: "Pote branco com ovelhinhas e tampa de madeira",
    galeria: [
      fotoPrincipal(
        `${fotosProdutos}/10-produto-pote-ovelhinhas.png`,
        "Pote branco com ovelhinhas e tampa de madeira",
      ),
      {
        src: `${fotosGaleria}/18-galeria-detalhe-estampa-ovelhinhas.png`,
        alt: "Detalhe da estampa de ovelhinhas",
        rotulo: "Estampa",
      },
      {
        src: `${fotosGaleria}/19-galeria-detalhe-tampa-madeira.png`,
        alt: "Detalhe da tampa de madeira",
        rotulo: "Tampa",
      },
      {
        src: `${fotosHome}/01-banner-kit-ovelhinhas.png`,
        alt: "Kit de potes com ovelhinhas sobre bandeja",
        rotulo: "Composição",
      },
    ],
    relacionados: ["pote-com-poas", "copo-ovelhinhas", "bandeja-oval"],
  },
  {
    slug: "bandeja-oval",
    nome: "Bandeja oval",
    categoria: "mesa-posta",
    ambientes: ["mesa-posta", "kits-para-bebe", "lavabo"],
    tipo: "bandejas",
    estampa: "lisas",
    opcoesEstampa: ["Lisa"],
    cores: ["branco", "bege"],
    corPadrao: "branco",
    descricaoCurta: "Base lisa para apoiar e organizar o conjunto.",
    descricaoLonga: descricaoPadrao,
    medidasECuidados: cuidadosPadrao,
    comoCombinar:
      "Serve de base para kits de bebê, conjuntos de lavabo ou para servir à mesa.",
    imagem: `${fotosProdutos}/17-produto-bandeja-oval-lisa.png`,
    alt: "Bandeja oval branca lisa",
    galeria: [
      fotoPrincipal(`${fotosProdutos}/17-produto-bandeja-oval-lisa.png`, "Bandeja oval branca lisa"),
      {
        src: `${fotosHome}/01-banner-kit-ovelhinhas.png`,
        alt: "Kit de potes sobre bandeja",
        rotulo: "Composição",
      },
    ],
    relacionados: ["pote-ovelhinhas", "copo-ovelhinhas", "bandeja-decorada"],
  },
  {
    slug: "saboneteira-floral",
    nome: "Saboneteira floral",
    categoria: "lavabo",
    ambientes: ["lavabo"],
    tipo: "saboneteiras",
    estampa: "florais",
    opcoesEstampa: ["Rosas"],
    cores: ["branco", "rosa"],
    corPadrao: "branco",
    descricaoCurta: "Pintura de rosas para um lavabo delicado.",
    descricaoLonga: descricaoPadrao,
    medidasECuidados: cuidadosPadrao,
    comoCombinar: "Forme o conjunto de lavabo com o porta-escovas floral e uma bandeja.",
    imagem: `${fotosProdutos}/11-produto-saboneteira-floral.png`,
    alt: "Saboneteira branca com rosas",
    galeria: [
      fotoPrincipal(`${fotosProdutos}/11-produto-saboneteira-floral.png`, "Saboneteira branca com rosas"),
      {
        src: `${fotosHome}/02-categoria-lavabo-floral.png`,
        alt: "Conjunto floral para lavabo",
        rotulo: "Composição",
      },
    ],
    relacionados: ["porta-escovas-floral", "bandeja-decorada", "bandeja-oval"],
  },
  {
    slug: "xicara-branca",
    nome: "Xícara branca",
    categoria: "mesa-posta",
    ambientes: ["mesa-posta", "cozinha"],
    tipo: "xicaras",
    estampa: "lisas",
    opcoesEstampa: ["Lisa com borda perolada"],
    cores: ["branco", "bege"],
    corPadrao: "branco",
    descricaoCurta: "Xícara com pires e borda perolada.",
    descricaoLonga: descricaoPadrao,
    medidasECuidados: cuidadosPadrao,
    comoCombinar: "Combine com a bandeja decorada para servir café ou chá.",
    imagem: `${fotosProdutos}/12-produto-xicara-branca.png`,
    alt: "Xícara branca com pires",
    galeria: [
      fotoPrincipal(`${fotosProdutos}/12-produto-xicara-branca.png`, "Xícara branca com pires"),
      {
        src: `${fotosHome}/03-categoria-mesa-posta.png`,
        alt: "Mesa posta com pratos e xícara",
        rotulo: "Composição",
      },
    ],
    relacionados: ["bandeja-decorada", "bandeja-oval", "pote-de-cozinha"],
  },
  {
    slug: "pote-com-poas",
    nome: "Pote com poás",
    categoria: "kits-para-bebe",
    ambientes: ["kits-para-bebe", "cozinha"],
    tipo: "potes",
    estampa: "poas",
    opcoesEstampa: ["Poás"],
    cores: ["branco", "bege", "rosa", "azul"],
    corPadrao: "bege",
    descricaoCurta: "Pote com bolinhas e tampa de madeira.",
    descricaoLonga: descricaoPadrao,
    medidasECuidados: cuidadosPadrao,
    comoCombinar: "Complementa o pote e o copo ovelhinhas no kit do bebê.",
    imagem: `${fotosProdutos}/13-produto-pote-poas.png`,
    alt: "Pote branco com poás e tampa de madeira",
    galeria: [
      fotoPrincipal(`${fotosProdutos}/13-produto-pote-poas.png`, "Pote branco com poás e tampa de madeira"),
      {
        src: `${fotosGaleria}/19-galeria-detalhe-tampa-madeira.png`,
        alt: "Detalhe da tampa de madeira",
        rotulo: "Tampa",
      },
    ],
    relacionados: ["pote-ovelhinhas", "copo-ovelhinhas", "bandeja-oval"],
  },
  {
    slug: "porta-escovas-floral",
    nome: "Porta-escovas floral",
    categoria: "lavabo",
    ambientes: ["lavabo"],
    tipo: "porta-escovas",
    estampa: "florais",
    opcoesEstampa: ["Rosas"],
    cores: ["branco", "rosa"],
    corPadrao: "branco",
    descricaoCurta: "Porta-escovas com pintura de rosas.",
    descricaoLonga: descricaoPadrao,
    medidasECuidados: cuidadosPadrao,
    comoCombinar: "Combine com a saboneteira floral para o conjunto de lavabo.",
    imagem: `${fotosProdutos}/14-produto-porta-escovas-floral.png`,
    alt: "Porta-escovas branco com rosas",
    galeria: [
      fotoPrincipal(`${fotosProdutos}/14-produto-porta-escovas-floral.png`, "Porta-escovas branco com rosas"),
      {
        src: `${fotosHome}/02-categoria-lavabo-floral.png`,
        alt: "Conjunto floral para lavabo",
        rotulo: "Composição",
      },
    ],
    relacionados: ["saboneteira-floral", "bandeja-decorada", "bandeja-oval"],
  },
  {
    slug: "pote-de-cozinha",
    nome: "Pote de cozinha",
    categoria: "cozinha",
    ambientes: ["cozinha"],
    tipo: "potes",
    estampa: "lisas",
    opcoesEstampa: ["Lisa com friso dourado"],
    cores: ["branco"],
    corPadrao: "branco",
    descricaoCurta: "Pote com tampa e friso dourado.",
    descricaoLonga: descricaoPadrao,
    medidasECuidados: cuidadosPadrao,
    comoCombinar: "Monte um conjunto de mantimentos com potes de tamanhos diferentes.",
    imagem: `${fotosProdutos}/15-produto-pote-cozinha.png`,
    alt: "Pote branco com tampa e friso dourado",
    galeria: [
      fotoPrincipal(`${fotosProdutos}/15-produto-pote-cozinha.png`, "Pote branco com tampa e friso dourado"),
      {
        src: `${fotosHome}/04-categoria-cozinha.png`,
        alt: "Potes de porcelana com friso dourado",
        rotulo: "Composição",
      },
    ],
    relacionados: ["pote-com-poas", "xicara-branca", "bandeja-decorada"],
  },
  {
    slug: "bandeja-decorada",
    nome: "Bandeja decorada",
    categoria: "mesa-posta",
    ambientes: ["mesa-posta", "lavabo"],
    tipo: "bandejas",
    estampa: "lisas",
    opcoesEstampa: ["Borda perolada"],
    cores: ["branco"],
    corPadrao: "branco",
    descricaoCurta: "Bandeja retangular com borda perolada.",
    descricaoLonga: descricaoPadrao,
    medidasECuidados: cuidadosPadrao,
    comoCombinar: "Use para servir à mesa ou como base do conjunto de lavabo.",
    imagem: `${fotosHome}/08-bandeja-branca-perolada.png`,
    alt: "Bandeja branca perolada",
    galeria: [
      fotoPrincipal(`${fotosHome}/08-bandeja-branca-perolada.png`, "Bandeja branca perolada"),
    ],
    relacionados: ["xicara-branca", "saboneteira-floral", "bandeja-oval"],
  },
  {
    slug: "copo-ovelhinhas",
    nome: "Copo ovelhinhas",
    categoria: "kits-para-bebe",
    ambientes: ["kits-para-bebe"],
    tipo: "copos",
    estampa: "infantis",
    opcoesEstampa: ["Ovelhinhas", "Poás"],
    cores: ["branco", "bege", "azul", "lavanda"],
    corPadrao: "bege",
    descricaoCurta: "Copo decorado para completar o kit do bebê.",
    descricaoLonga: descricaoPadrao,
    medidasECuidados: cuidadosPadrao,
    comoCombinar: "Combine com o pote ovelhinhas e a bandeja oval.",
    imagem: `${fotosProdutos}/16-produto-copo-ovelhinhas.png`,
    alt: "Copo branco com ovelhinhas",
    galeria: [
      fotoPrincipal(`${fotosProdutos}/16-produto-copo-ovelhinhas.png`, "Copo branco com ovelhinhas"),
      {
        src: `${fotosGaleria}/18-galeria-detalhe-estampa-ovelhinhas.png`,
        alt: "Detalhe da estampa de ovelhinhas",
        rotulo: "Estampa",
      },
    ],
    relacionados: ["pote-ovelhinhas", "pote-com-poas", "bandeja-oval"],
  },
];

// ---------------------------------------------------------------------------
// Consultas (funções puras: servem no servidor e no cliente).

/** Todas as peças, na ordem dos dados. */
export function listarProdutos(): Produto[] {
  return produtos;
}

/** Peça pelo slug, ou undefined. */
export function obterProduto(slug: string): Produto | undefined {
  return produtos.find((produto) => produto.slug === slug);
}

/** Peças relacionadas ("Complete sua composição"), ignorando slugs inválidos. */
export function listarRelacionados(produto: Produto): Produto[] {
  return produto.relacionados
    .map((slug) => obterProduto(slug))
    .filter((item): item is Produto => item !== undefined);
}

/** Minúsculas e sem acentos, para a busca por texto. */
export function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function textoDeBusca(produto: Produto): string {
  return normalizarTexto(
    [
      produto.nome,
      produto.descricaoCurta,
      rotuloTipo(produto.tipo),
      rotuloEstampa(produto.estampa),
      ...produto.opcoesEstampa,
      ...produto.ambientes.map(rotuloCategoria),
    ].join(" "),
  );
}

/** Mesmo grupo: qualquer valor marcado serve (OU). Grupos diferentes: todos (E). */
function combina<T>(marcados: T[], valoresDaPeca: T[]): boolean {
  return marcados.length === 0 || marcados.some((valor) => valoresDaPeca.includes(valor));
}

function ordenar(lista: Produto[], ordem: OrdemCatalogo): Produto[] {
  const fator = ordem === "nome-za" ? -1 : 1;
  return [...lista].sort((a, b) => fator * a.nome.localeCompare(b.nome, "pt-BR"));
}

/** Aplica busca, filtros e ordem. Não altera a lista original. */
export function filtrarProdutos(
  filtros: FiltrosCatalogo,
  lista: Produto[] = produtos,
): Produto[] {
  const termos = normalizarTexto(filtros.busca).split(/\s+/).filter(Boolean);

  const resultado = lista.filter((produto) => {
    if (!combina(filtros.categoria, produto.ambientes)) return false;
    if (!combina(filtros.tipo, [produto.tipo])) return false;
    if (!combina(filtros.estampa, [produto.estampa])) return false;
    if (!combina(filtros.cor, produto.cores)) return false;
    if (termos.length > 0) {
      const texto = textoDeBusca(produto);
      if (!termos.every((termo) => texto.includes(termo))) return false;
    }
    return true;
  });

  return ordenar(resultado, filtros.ordem);
}
