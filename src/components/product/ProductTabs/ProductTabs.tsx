"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import styles from "./ProductTabs.module.scss";

export type AbaProduto = {
  id: string;
  rotulo: string;
  /** Conteúdo montado no servidor; todas as abas ficam no HTML. */
  conteudo: ReactNode;
};

type AbasProdutoProps = {
  abas: AbaProduto[];
};

/**
 * Abas "Descrição / Medidas e cuidados / Como combinar" (padrão ARIA de abas):
 * setas, Home e End movem entre as abas; Tab vai para o conteúdo.
 */
export function ProductTabs({ abas }: AbasProdutoProps) {
  const prefixo = useId();
  const [ativa, setAtiva] = useState(0);
  const botoes = useRef<(HTMLButtonElement | null)[]>([]);

  function irPara(indice: number) {
    const total = abas.length;
    const proxima = (indice + total) % total;
    setAtiva(proxima);
    botoes.current[proxima]?.focus();
  }

  function aoTeclar(evento: KeyboardEvent<HTMLDivElement>) {
    const acoes: Record<string, () => void> = {
      ArrowRight: () => irPara(ativa + 1),
      ArrowLeft: () => irPara(ativa - 1),
      Home: () => irPara(0),
      End: () => irPara(abas.length - 1),
    };
    const acao = acoes[evento.key];
    if (!acao) return;
    evento.preventDefault();
    acao();
  }

  return (
    <div className={styles.abas}>
      <div role="tablist" aria-label="Informações da peça" className={styles.lista} onKeyDown={aoTeclar}>
        {abas.map((aba, indice) => (
          <button
            key={aba.id}
            ref={(elemento) => {
              botoes.current[indice] = elemento;
            }}
            type="button"
            role="tab"
            id={`${prefixo}-aba-${aba.id}`}
            aria-selected={indice === ativa}
            aria-controls={`${prefixo}-painel-${aba.id}`}
            tabIndex={indice === ativa ? 0 : -1}
            className={styles.aba}
            onClick={() => setAtiva(indice)}
          >
            {aba.rotulo}
          </button>
        ))}
      </div>

      {abas.map((aba, indice) => (
        <div
          key={aba.id}
          role="tabpanel"
          id={`${prefixo}-painel-${aba.id}`}
          aria-labelledby={`${prefixo}-aba-${aba.id}`}
          tabIndex={0}
          hidden={indice !== ativa}
          className={styles.painel}
        >
          {aba.conteudo}
        </div>
      ))}
    </div>
  );
}
