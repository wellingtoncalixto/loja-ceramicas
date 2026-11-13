// Modelo de dados das peças (mockado, sem banco). Usado por catálogo,
// página do produto e orçamento.

export type CategoriaSlug = "kits-para-bebe" | "lavabo" | "mesa-posta" | "cozinha";
export type TipoPeca =
  | "potes"
  | "bandejas"
  | "saboneteiras"
  | "porta-escovas"
  | "xicaras"
  | "copos";
export type Estampa = "florais" | "poas" | "infantis" | "lisas";
export type Cor = "branco" | "bege" | "rosa" | "azul" | "lavanda";

/** Opção de filtro/seleção: valor usado na URL e rótulo exibido. */
export type Opcao<T extends string> = {
  valor: T;
  rotulo: string;
};

export type CategoriaProduto = Opcao<CategoriaSlug> & {
  /** Rótulo curto (filtro "Ambiente" e selo da página do produto). */
  rotuloCurto: string;
};

export type OpcaoCor = Opcao<Cor> & {
  /** Cor de exibição da amostra (swatch). */
  hex: string;
};

export type ImagemProduto = {
  src: string;
  alt: string;
  /** Legenda curta da miniatura na galeria (ex.: "Peça", "Estampa"). */
  rotulo: string;
};

export type DetalheProduto = {
  rotulo: string;
  valor: string;
};

export type Produto = {
  slug: string;
  nome: string;
  /** Categoria principal (breadcrumb e selo da página do produto). */
  categoria: CategoriaSlug;
  /** Ambientes onde a peça aparece no filtro; sempre inclui `categoria`. */
  ambientes: CategoriaSlug[];
  tipo: TipoPeca;
  /** Família de estampa usada no filtro do catálogo. */
  estampa: Estampa;
  /** Estampas de interesse oferecidas na página do produto (a 1ª é a padrão). */
  opcoesEstampa: string[];
  /** Cores de interesse (filtro "Cor" e amostras na página do produto). */
  cores: Cor[];
  /** Cor pré-selecionada (usada pelo "+ Orçamento" do card). */
  corPadrao: Cor;
  /** Frase curta abaixo do nome (cards/página do produto). */
  descricaoCurta: string;
  /** Aba "Descrição" da página do produto. */
  descricaoLonga: {
    titulo: string;
    texto: string;
    detalhes: DetalheProduto[];
  };
  /** Aba "Medidas e cuidados". */
  medidasECuidados: string[];
  /** Aba "Como combinar". */
  comoCombinar: string;
  /** Imagem do card e foto principal da página do produto (alt curto). */
  imagem: string;
  alt: string;
  /** Galeria da página do produto; a 1ª é a própria foto principal. */
  galeria: ImagemProduto[];
  /** Slugs da seção "Complete sua composição". */
  relacionados: string[];
};
