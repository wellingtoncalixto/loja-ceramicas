// Contatos da loja usados em mais de uma parte do site.

// PLACEHOLDER FICTÍCIO: a referência não mostra o número do WhatsApp.
// Trocar pelo número real da loja (só dígitos, com 55 + DDD) após a aprovação.
export const whatsappNumero = "5519000000000";

// Mensagem inicial sugerida ao abrir a conversa.
export const whatsappMensagem =
  "Olá! Vim pelo site da Loja Rossi e gostaria de ajuda para escolher as peças.";

export function linkWhatsapp(mensagem: string = whatsappMensagem) {
  return `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}

// Nome do ponto de atendimento exibido junto da cidade (texto da referência).
export const lojaPonto = "Center Louças";
