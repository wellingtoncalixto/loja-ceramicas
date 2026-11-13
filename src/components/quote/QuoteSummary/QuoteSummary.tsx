"use client";

import { useState } from "react";
import { linkWhatsapp } from "@/data/contact";
import { montarMensagemWhatsapp, textoPecas, type LinhaOrcamento } from "./whatsappMessage";
import styles from "./QuoteSummary.module.scss";

type ResumoOrcamentoProps = {
  linhas: LinhaOrcamento[];
  totalPecas: number;
  observacoes: string;
};

/** Caixa "Resumo da seleção" com o botão "Continuar no WhatsApp" (envio mockado). */
export function QuoteSummary({ linhas, totalPecas, observacoes }: ResumoOrcamentoProps) {
  const [enviado, setEnviado] = useState(false);
  const href = linkWhatsapp(montarMensagemWhatsapp(linhas, totalPecas, observacoes));

  return (
    <section aria-labelledby="resumo-titulo" className={styles.resumo}>
      <h2 id="resumo-titulo" className={styles.titulo}>
        Resumo da seleção
      </h2>
      <p className={styles.total}>
        {textoPecas(totalPecas)} {totalPecas === 1 ? "selecionada" : "selecionadas"}
      </p>
      <p className={styles.texto}>
        Valores, opções e disponibilidade serão confirmados pela loja.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.botao}
        onClick={() => setEnviado(true)}
      >
        Continuar no WhatsApp
        <span className={styles.oculto}> (abre o WhatsApp em nova aba)</span>
      </a>
      <p className={styles.nota}>
        <span className={styles.notaCurta}>Revise antes de enviar.</span>
        <span className={styles.notaLonga}>Você revisa a mensagem antes de enviar.</span>
      </p>
      <p role="status" className={styles.confirmacao} data-visivel={enviado ? "" : undefined}>
        {enviado
          ? "Pronto! Abrimos o WhatsApp em uma nova aba com a sua seleção. Nada foi enviado ao site: a conversa segue direto com a loja."
          : ""}
      </p>
    </section>
  );
}
