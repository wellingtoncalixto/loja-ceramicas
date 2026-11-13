import { textoBemFormado } from "@/lib/text";

// Contatos da loja usados em mais de uma parte do site.
// Endereço, horário e telefones ficam em src/data/store.ts.

// Celular da loja, (19) 99618-5606 (decisão do usuário). Só dígitos, com 55 + DDD.
export const whatsappNumero = "5519996185606";

// Mensagem inicial sugerida ao abrir a conversa.
export const whatsappMensagem =
  "Olá! Vim pelo site da Loja Rossi e gostaria de ajuda para escolher as peças.";

export function linkWhatsapp(mensagem: string = whatsappMensagem) {
  return `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(textoBemFormado(mensagem))}`;
}
