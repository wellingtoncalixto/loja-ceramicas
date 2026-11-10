import type { CategoriaSlug, Cor, Estampa, Opcao, TipoPeca } from "@/types/produto";
import { categoriasProduto, cores, estampas, tiposPeca } from "@/data/catalogo";

/*
 * Filtros do catálogo <-> URL (fonte única da verdade é a URL).
 *
 * Parâmetros (repetíveis para marcar mais de um valor no mesmo grupo):
 *   /catalogo?categoria=lavabo&tipo=potes&tipo=bandejas&estampa=florais&cor=rosa&q=rosa&ordem=nome-za
 *
 * - Valores desconhecidos são ignorados (URL editada à mão não quebra a página).
 * - `ordem` padrão é "nome-az" e não aparece na URL.
 */

export type OrdemCatalogo = "nome-az" | "nome-za";

export type FiltrosCatalogo = {
  categoria: CategoriaSlug[];
  tipo: TipoPeca[];
  estampa: Estampa[];
  cor: Cor[];
  /** Texto livre ("Buscar peças ou estampas"). */
  busca: string;
  ordem: OrdemCatalogo;
};

/** Grupos de checkbox (mesmo nome do parâmetro na URL). */
export type GrupoFiltro = "categoria" | "tipo" | "estampa" | "cor";

export const ordensCatalogo: Opcao<OrdemCatalogo>[] = [
  { valor: "nome-az", rotulo: "Nome A–Z" },
  { valor: "nome-za", rotulo: "Nome Z–A" },
];

const ordemPadrao: OrdemCatalogo = "nome-az";
const tamanhoMaximoBusca = 80;

export const filtrosVazios: FiltrosCatalogo = {
  categoria: [],
  tipo: [],
  estampa: [],
  cor: [],
  busca: "",
  ordem: ordemPadrao,
};

const valoresValidos: Record<GrupoFiltro, readonly string[]> = {
  categoria: categoriasProduto.map((opcao) => opcao.valor),
  tipo: tiposPeca.map((opcao) => opcao.valor),
  estampa: estampas.map((opcao) => opcao.valor),
  cor: cores.map((opcao) => opcao.valor),
};

const grupos: GrupoFiltro[] = ["categoria", "tipo", "estampa", "cor"];

type ParametrosLeitura = Pick<URLSearchParams, "get" | "getAll">;

function lerGrupo<T extends string>(parametros: ParametrosLeitura, grupo: GrupoFiltro): T[] {
  const validos = valoresValidos[grupo];
  // Sem repetidos e na ordem das opções (URL estável para o mesmo filtro).
  const marcados = new Set(parametros.getAll(grupo));
  return validos.filter((valor) => marcados.has(valor)) as T[];
}

/** Lê os filtros de URLSearchParams (ou do useSearchParams do Next). */
export function lerFiltros(parametros: ParametrosLeitura): FiltrosCatalogo {
  const ordem = parametros.get("ordem");
  return {
    categoria: lerGrupo<CategoriaSlug>(parametros, "categoria"),
    tipo: lerGrupo<TipoPeca>(parametros, "tipo"),
    estampa: lerGrupo<Estampa>(parametros, "estampa"),
    cor: lerGrupo<Cor>(parametros, "cor"),
    busca: (parametros.get("q") ?? "").slice(0, tamanhoMaximoBusca),
    ordem: ordensCatalogo.some((opcao) => opcao.valor === ordem)
      ? (ordem as OrdemCatalogo)
      : ordemPadrao,
  };
}

/** Monta a query string ("?..." ou "") a partir dos filtros. */
export function montarQuery(filtros: FiltrosCatalogo): string {
  const parametros = new URLSearchParams();
  for (const grupo of grupos) {
    for (const valor of filtros[grupo]) parametros.append(grupo, valor);
  }
  const busca = filtros.busca.trim().slice(0, tamanhoMaximoBusca);
  if (busca) parametros.set("q", busca);
  if (filtros.ordem !== ordemPadrao) parametros.set("ordem", filtros.ordem);
  const texto = parametros.toString();
  return texto ? `?${texto}` : "";
}

/** Marca ou desmarca um valor de um grupo (devolve novos filtros). */
export function alternarFiltro(
  filtros: FiltrosCatalogo,
  grupo: GrupoFiltro,
  valor: string,
): FiltrosCatalogo {
  const atuais = filtros[grupo] as string[];
  const marcado = atuais.includes(valor);
  const proximos = marcado
    ? atuais.filter((item) => item !== valor)
    : valoresValidos[grupo].filter((item) => item === valor || atuais.includes(item));
  return { ...filtros, [grupo]: proximos };
}

/** Quantos filtros estão ativos (checkbox + busca). A ordem não conta. */
export function contarFiltros(filtros: FiltrosCatalogo): number {
  const marcados = grupos.reduce((total, grupo) => total + filtros[grupo].length, 0);
  return marcados + (filtros.busca.trim() ? 1 : 0);
}
