import { rotuloCor } from "@/data/catalog";
import type { ItemOrcamento } from "@/lib/quote";
import type { Produto } from "@/types/product";

export type LinhaOrcamento = {
  item: ItemOrcamento;
  produto: Produto;
};

export function textoPecas(total: number): string {
  return `${total} ${total === 1 ? "peça" : "peças"}`;
}

/**
 * Texto do pedido de orçamento para o WhatsApp (texto puro).
 * A codificação para a URL é feita uma única vez por linkWhatsapp()
 * (encodeURIComponent na mensagem inteira, incluindo as observações).
 */
export function montarMensagemWhatsapp(
  linhas: LinhaOrcamento[],
  totalPecas: number,
  observacoes: string,
): string {
  const itens = linhas.map(
    ({ item, produto }) =>
      `- ${item.quantidade}x ${produto.nome} (cor: ${rotuloCor(item.cor)}; estampa: ${item.estampa})`,
  );
  const partes = [
    "Olá! Vim pelo site da Loja Rossi e gostaria de um orçamento destas peças:",
    "",
    ...itens,
    "",
    `Total: ${textoPecas(totalPecas)}.`,
  ];
  const obs = observacoes.trim();
  if (obs) partes.push("", `Observações: ${obs}`);
  return partes.join("\n");
}
