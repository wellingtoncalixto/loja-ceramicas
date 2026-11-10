/*
 * Estado do orçamento ("Meu orçamento") — só no navegador, sem banco.
 *
 * CONTRATO (usar somente em Client Components):
 *
 *   const {
 *     itens,             // ItemOrcamento[] (ordem de inclusão)
 *     totalPecas,        // soma das quantidades (contador do header)
 *     observacoes,       // texto "Observações para a loja"
 *     carregado,         // false até ler o localStorage (1º render = vazio)
 *     adicionar,         // (slug, quantidade = 1, opcoes?: { cor?, estampa? }) => void
 *     alterarQuantidade, // (id, quantidade) => void   (quantidade < 1 remove)
 *     remover,           // (id) => void
 *     limpar,            // () => void   (itens e observações)
 *     definirObservacoes,// (texto) => void
 *   } = useOrcamento();
 *
 * - Cada item é uma peça + cor + estampa. Adicionar a mesma combinação soma a
 *   quantidade; combinações diferentes viram itens separados.
 *   `id` = idItemOrcamento(slug, cor, estampa).
 * - Sem `opcoes`, usa a cor padrão e a 1ª estampa da peça (botão "+ Orçamento").
 *   Cor/estampa que a peça não oferece são trocadas pelas padrão.
 * - Quantidade entre 1 e QUANTIDADE_MAXIMA por item. Slugs inexistentes são ignorados.
 * - Persistência: localStorage (chave CHAVE_ORCAMENTO), com try/catch; se o
 *   navegador bloquear, o orçamento funciona só enquanto a aba estiver aberta.
 *   Sincroniza entre abas (evento "storage").
 * - Não há Provider: o hook usa useSyncExternalStore sobre um store do módulo.
 *   No servidor e na hidratação o estado é vazio (sem erro de hidratação);
 *   depois do carregamento, `carregado` fica true.
 * - Para exibir o item: obterProduto(item.slug) em src/data/produtos.ts e
 *   rotuloCor(item.cor) em src/data/catalogo.ts.
 */

import { useSyncExternalStore } from "react";
import type { Cor } from "@/types/produto";
import { obterProduto } from "@/data/produtos";

export type ItemOrcamento = {
  /** Identificador único da combinação peça + cor + estampa. */
  id: string;
  slug: string;
  cor: Cor;
  estampa: string;
  quantidade: number;
};

export type OpcoesItem = {
  cor?: Cor;
  estampa?: string;
};

type EstadoOrcamento = {
  itens: ItemOrcamento[];
  observacoes: string;
  carregado: boolean;
};

export const CHAVE_ORCAMENTO = "loja-rossi:orcamento:v1";
export const QUANTIDADE_MAXIMA = 99;
const MAXIMO_ITENS = 50;
export const MAXIMO_OBSERVACOES = 1000;

export function idItemOrcamento(slug: string, cor: Cor, estampa: string): string {
  return `${slug}|${cor}|${estampa}`;
}

/** Soma das quantidades. */
export function contarPecas(itens: ItemOrcamento[]): number {
  return itens.reduce((total, item) => total + item.quantidade, 0);
}

function limitarQuantidade(valor: number): number {
  if (!Number.isFinite(valor)) return 1;
  return Math.min(QUANTIDADE_MAXIMA, Math.max(1, Math.floor(valor)));
}

/** Monta um item válido (cor/estampa conferidas com a peça), ou null. */
function criarItem(
  slug: string,
  quantidade: number,
  opcoes: OpcoesItem = {},
): ItemOrcamento | null {
  const produto = obterProduto(slug);
  if (!produto) return null;
  const cor = opcoes.cor && produto.cores.includes(opcoes.cor) ? opcoes.cor : produto.corPadrao;
  const estampa =
    opcoes.estampa && produto.opcoesEstampa.includes(opcoes.estampa)
      ? opcoes.estampa
      : produto.opcoesEstampa[0];
  return {
    id: idItemOrcamento(slug, cor, estampa),
    slug,
    cor,
    estampa,
    quantidade: limitarQuantidade(quantidade),
  };
}

// ---------------------------------------------------------------------------
// Store do módulo (uma instância por aba).

const estadoVazio: EstadoOrcamento = { itens: [], observacoes: "", carregado: false };
let estado: EstadoOrcamento = estadoVazio;
const ouvintes = new Set<() => void>();

/** Lê e valida o que está salvo (dados podem ter sido editados à mão). */
function lerSalvo(): Pick<EstadoOrcamento, "itens" | "observacoes"> {
  try {
    const texto = window.localStorage.getItem(CHAVE_ORCAMENTO);
    if (!texto) return { itens: [], observacoes: "" };
    const dados: unknown = JSON.parse(texto);
    if (typeof dados !== "object" || dados === null) return { itens: [], observacoes: "" };
    const { itens, observacoes } = dados as { itens?: unknown; observacoes?: unknown };

    const validos: ItemOrcamento[] = [];
    if (Array.isArray(itens)) {
      for (const bruto of itens.slice(0, MAXIMO_ITENS)) {
        if (typeof bruto !== "object" || bruto === null) continue;
        const { slug, quantidade, cor, estampa } = bruto as Record<string, unknown>;
        if (typeof slug !== "string" || typeof quantidade !== "number") continue;
        const item = criarItem(slug, quantidade, {
          cor: typeof cor === "string" ? (cor as Cor) : undefined,
          estampa: typeof estampa === "string" ? estampa : undefined,
        });
        if (item && !validos.some((existente) => existente.id === item.id)) validos.push(item);
      }
    }
    return {
      itens: validos,
      observacoes:
        typeof observacoes === "string" ? observacoes.slice(0, MAXIMO_OBSERVACOES) : "",
    };
  } catch {
    return { itens: [], observacoes: "" };
  }
}

function salvar() {
  try {
    window.localStorage.setItem(
      CHAVE_ORCAMENTO,
      JSON.stringify({ itens: estado.itens, observacoes: estado.observacoes }),
    );
  } catch {
    // Armazenamento indisponível (modo privado, cota cheia): segue só em memória.
  }
}

function avisar() {
  ouvintes.forEach((ouvinte) => ouvinte());
}

function carregar() {
  if (estado.carregado || typeof window === "undefined") return;
  estado = { ...lerSalvo(), carregado: true };
}

function atualizar(mudanca: (atual: EstadoOrcamento) => Partial<EstadoOrcamento>) {
  carregar();
  estado = { ...estado, ...mudanca(estado) };
  salvar();
  avisar();
}

function aoMudarEmOutraAba(evento: StorageEvent) {
  if (evento.key !== null && evento.key !== CHAVE_ORCAMENTO) return;
  estado = { ...lerSalvo(), carregado: true };
  avisar();
}

function inscrever(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  if (ouvintes.size === 1) window.addEventListener("storage", aoMudarEmOutraAba);
  // Primeiro uso no cliente: carrega o salvo e avisa (sai do estado vazio da hidratação).
  if (!estado.carregado) {
    carregar();
    queueMicrotask(avisar);
  }
  return () => {
    ouvintes.delete(ouvinte);
    if (ouvintes.size === 0) window.removeEventListener("storage", aoMudarEmOutraAba);
  };
}

// Durante a hidratação o React usa o snapshot do servidor (vazio); depois, o real.
const obterEstado = () => estado;
const obterEstadoServidor = () => estadoVazio;

// ---------------------------------------------------------------------------
// Ações (funções estáveis; podem ser usadas fora do hook).

export function adicionar(slug: string, quantidade = 1, opcoes?: OpcoesItem) {
  const novo = criarItem(slug, quantidade, opcoes);
  if (!novo) return;
  atualizar(({ itens }) => {
    const existente = itens.find((item) => item.id === novo.id);
    if (existente) {
      return {
        itens: itens.map((item) =>
          item.id === novo.id
            ? { ...item, quantidade: limitarQuantidade(item.quantidade + novo.quantidade) }
            : item,
        ),
      };
    }
    if (itens.length >= MAXIMO_ITENS) return {};
    return { itens: [...itens, novo] };
  });
}

export function alterarQuantidade(id: string, quantidade: number) {
  if (quantidade < 1) {
    remover(id);
    return;
  }
  atualizar(({ itens }) => ({
    itens: itens.map((item) =>
      item.id === id ? { ...item, quantidade: limitarQuantidade(quantidade) } : item,
    ),
  }));
}

export function remover(id: string) {
  atualizar(({ itens }) => ({ itens: itens.filter((item) => item.id !== id) }));
}

export function limpar() {
  atualizar(() => ({ itens: [], observacoes: "" }));
}

export function definirObservacoes(texto: string) {
  atualizar(() => ({ observacoes: texto.slice(0, MAXIMO_OBSERVACOES) }));
}

const acoes = { adicionar, alterarQuantidade, remover, limpar, definirObservacoes };

/** Hook do orçamento. Ver o contrato no topo do arquivo. */
export function useOrcamento() {
  const atual = useSyncExternalStore(inscrever, obterEstado, obterEstadoServidor);
  return {
    itens: atual.itens,
    totalPecas: contarPecas(atual.itens),
    observacoes: atual.observacoes,
    carregado: atual.carregado,
    ...acoes,
  };
}
