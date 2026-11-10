"use client";

import { useEffect, useRef, useState } from "react";
import { adicionar, type OpcoesItem } from "@/lib/orcamento";
import styles from "./BotaoAdicionarOrcamento.module.scss";

export type VarianteBotaoOrcamento = "contorno" | "principal" | "link";

type BotaoAdicionarOrcamentoProps = {
  slug: string;
  /** Nome da peça, para o rótulo acessível e o aviso de confirmação. */
  nomeProduto: string;
  quantidade?: number;
  /** Cor/estampa escolhidas; sem elas, usa as padrão da peça. */
  opcoes?: OpcoesItem;
  /** Texto visível (padrão: "+ Orçamento"). O nome acessível é "<texto>: <nomeProduto>". */
  texto?: string;
  variante?: VarianteBotaoOrcamento;
  className?: string;
};

const classeVariante: Record<VarianteBotaoOrcamento, string> = {
  contorno: styles.contorno,
  principal: styles.principal,
  link: styles.link,
};

const tempoConfirmacao = 2000;

/** Adiciona a peça ao orçamento e mostra "Adicionado" por 2 s (anunciado ao leitor de tela). */
export function BotaoAdicionarOrcamento({
  slug,
  nomeProduto,
  quantidade = 1,
  opcoes,
  texto = "+ Orçamento",
  variante = "contorno",
  className,
}: BotaoAdicionarOrcamentoProps) {
  const [aviso, setAviso] = useState("");
  const temporizador = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  function aoClicar() {
    adicionar(slug, quantidade, opcoes);
    setAviso(`${nomeProduto} adicionado ao orçamento.`);
    clearTimeout(temporizador.current);
    temporizador.current = setTimeout(() => setAviso(""), tempoConfirmacao);
  }

  return (
    <>
      <button
        type="button"
        onClick={aoClicar}
        aria-label={`${texto}: ${nomeProduto}`}
        data-adicionado={aviso ? "" : undefined}
        className={[styles.botao, classeVariante[variante], className].filter(Boolean).join(" ")}
      >
        {/* Os dois textos ocupam o mesmo lugar: o botão não muda de largura. */}
        <span className={styles.texto}>{texto}</span>
        <span aria-hidden="true" className={styles.confirmacao}>
          Adicionado ✓
        </span>
      </button>
      <span role="status" className={styles.oculto}>
        {aviso}
      </span>
    </>
  );
}
