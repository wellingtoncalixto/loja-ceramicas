import type {
  CategoriaProduto,
  CategoriaSlug,
  Cor,
  Estampa,
  Opcao,
  OpcaoCor,
  TipoPeca,
} from "@/types/product";

// Fonte única das opções do catálogo (categorias, tipos, estampas e cores).
// A ordem aqui é a ordem exibida nos filtros.

export const categoriasProduto: CategoriaProduto[] = [
  { valor: "kits-para-bebe", rotulo: "Kits para bebê", rotuloCurto: "Bebê" },
  { valor: "lavabo", rotulo: "Lavabo", rotuloCurto: "Lavabo" },
  { valor: "mesa-posta", rotulo: "Mesa posta", rotuloCurto: "Mesa posta" },
  { valor: "cozinha", rotulo: "Cozinha", rotuloCurto: "Cozinha" },
];

export const tiposPeca: Opcao<TipoPeca>[] = [
  { valor: "potes", rotulo: "Potes" },
  { valor: "bandejas", rotulo: "Bandejas" },
  { valor: "saboneteiras", rotulo: "Saboneteiras" },
  { valor: "porta-escovas", rotulo: "Porta-escovas" },
  { valor: "xicaras", rotulo: "Xícaras" },
  { valor: "copos", rotulo: "Copos" },
];

export const estampas: Opcao<Estampa>[] = [
  { valor: "florais", rotulo: "Florais" },
  { valor: "poas", rotulo: "Poás" },
  { valor: "infantis", rotulo: "Infantis" },
  { valor: "lisas", rotulo: "Lisas" },
];

export const cores: OpcaoCor[] = [
  { valor: "branco", rotulo: "Branco", hex: "#f7f6f4" },
  { valor: "bege", rotulo: "Bege", hex: "#f1dcc4" },
  { valor: "rosa", rotulo: "Rosa", hex: "#f6dbe2" },
  { valor: "azul", rotulo: "Azul", hex: "#cfdcef" },
  { valor: "lavanda", rotulo: "Lavanda", hex: "#d9cdf0" },
];

/** Busca o rótulo de uma opção; devolve o próprio valor se não achar. */
function rotuloDe<T extends string>(lista: Opcao<T>[], valor: T): string {
  return lista.find((opcao) => opcao.valor === valor)?.rotulo ?? valor;
}

export function obterCategoria(valor: CategoriaSlug): CategoriaProduto | undefined {
  return categoriasProduto.find((categoria) => categoria.valor === valor);
}

export const rotuloCategoria = (valor: CategoriaSlug) => rotuloDe(categoriasProduto, valor);
export const rotuloTipo = (valor: TipoPeca) => rotuloDe(tiposPeca, valor);
export const rotuloEstampa = (valor: Estampa) => rotuloDe(estampas, valor);
export const rotuloCor = (valor: Cor) => rotuloDe(cores, valor);
