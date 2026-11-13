// Dados reais da Loja Rossi (pesquisa de 2026-11-10; fontes em docs/equipe/CONTEXTO.md):
// https://centerloucaspedreira.com.br/loja/rossi e https://centerloucaspedreira.com.br/
// Confirmar com o cliente antes da publicação (guias antigos citam outro endereço).

export const lojaNome = "Loja Rossi";

/** Ponto de atendimento (centro de compras onde a loja fica). */
export const lojaPonto = "Center Louças";

/** Cidade exibida no header, no rodapé e na faixa de ajuda. */
export const lojaCidade = "Pedreira, SP";

/** Posição da loja dentro do Center Louças. */
export const lojaLocal = "Center Louças · Corredor 0, lojas 93 a 96";

// Espaço inseparável antes do traço: ao quebrar a linha, o traço desce junto com a cidade.
export const lojaEndereco = "Av. Antônio Serafim Petean, 2461 – Pedreira/SP";

export const lojaHorario = [
  { dias: "Terça a domingo", horas: "9h às 18h" },
  { dias: "Segunda-feira", horas: "atendimento facultativo" },
] as const;

export type Telefone = { exibicao: string; numero: string };

// Telefones públicos. O celular também é usado no link do WhatsApp
// (definido em src/data/contact.ts).
export const lojaTelefones: Telefone[] = [
  { exibicao: "(19) 3893-3477", numero: "+551938933477" },
  { exibicao: "(19) 99618-5606", numero: "+5519996185606" },
];

export function linkTelefone(telefone: Telefone): string {
  return `tel:${telefone.numero}`;
}

export const lojaInstagram = {
  usuario: "@lojarossi",
  url: "https://www.instagram.com/lojarossi/",
};

// Busca do Google Maps pelo nome do Center Louças + endereço (abre o lugar certo).
const consultaMapa = "Center Louças, Av. Antônio Serafim Petean, 2461, Pedreira - SP";

export const linkMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(consultaMapa)}`;
