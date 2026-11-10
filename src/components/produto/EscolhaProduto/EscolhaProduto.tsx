"use client";

import { useId, useState } from "react";
import { BotaoAdicionarOrcamento } from "@/components/ui/BotaoAdicionarOrcamento/BotaoAdicionarOrcamento";
import { linkWhatsapp } from "@/data/contato";
import { QUANTIDADE_MAXIMA } from "@/lib/orcamento";
import type { Cor, OpcaoCor } from "@/types/produto";
import styles from "./EscolhaProduto.module.scss";

type EscolhaProdutoProps = {
  slug: string;
  nome: string;
  /** Cores que a peça oferece, já com rótulo e amostra. */
  cores: OpcaoCor[];
  corPadrao: Cor;
  /** Estampas de interesse (a 1ª é a padrão). */
  estampas: string[];
};

function limitar(valor: number): number {
  if (!Number.isFinite(valor)) return 1;
  return Math.min(QUANTIDADE_MAXIMA, Math.max(1, Math.floor(valor)));
}

/** Cor, estampa e quantidade de interesse + "Adicionar ao orçamento". */
export function EscolhaProduto({ slug, nome, cores, corPadrao, estampas }: EscolhaProdutoProps) {
  const id = useId();
  const [cor, setCor] = useState<Cor>(corPadrao);
  const [estampa, setEstampa] = useState(estampas[0] ?? "");
  // Texto do campo separado do número: permite apagar e digitar de novo.
  const [textoQuantidade, setTextoQuantidade] = useState("1");
  const quantidade = limitar(Number.parseInt(textoQuantidade, 10));

  const rotuloCorAtual = cores.find((opcao) => opcao.valor === cor)?.rotulo ?? "";
  const mensagem = `Olá! Vim pelo site da Loja Rossi e gostaria de consultar outras combinações de cores e estampas para a peça "${nome}".`;

  function mudarQuantidade(valor: number) {
    setTextoQuantidade(String(limitar(valor)));
  }

  return (
    <div className={styles.escolha}>
      {cores.length > 0 && (
        <fieldset className={styles.grupo}>
          <legend className={styles.rotulo}>
            Cor de interesse<span className={styles.valorAtual}>: {rotuloCorAtual}</span>
          </legend>
          <div className={styles.amostras}>
            {cores.map((opcao) => (
              <button
                key={opcao.valor}
                type="button"
                className={styles.amostra}
                style={{ backgroundColor: opcao.hex }}
                aria-pressed={opcao.valor === cor}
                aria-label={opcao.rotulo}
                title={opcao.rotulo}
                onClick={() => setCor(opcao.valor)}
              />
            ))}
          </div>
          <p className={styles.nota}>Opções ilustrativas, sujeitas a confirmação.</p>
        </fieldset>
      )}

      {estampas.length > 1 ? (
        <div className={styles.grupo}>
          <label htmlFor={`${id}-estampa`} className={styles.rotulo}>
            Estampa de interesse
          </label>
          <select
            id={`${id}-estampa`}
            className={styles.selecao}
            value={estampa}
            onChange={(evento) => setEstampa(evento.target.value)}
          >
            {estampas.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        </div>
      ) : (
        estampas.length === 1 && (
          <p className={styles.grupo}>
            <span className={styles.rotulo}>Estampa</span>
            <span className={styles.estampaUnica}>{estampas[0]}</span>
          </p>
        )
      )}

      <div className={styles.grupo}>
        <label htmlFor={`${id}-quantidade`} className={styles.rotulo}>
          Quantidade
        </label>
        <div className={styles.quantidade}>
          <button
            type="button"
            className={styles.passo}
            aria-label="Diminuir quantidade"
            aria-disabled={quantidade <= 1 || undefined}
            onClick={() => mudarQuantidade(quantidade - 1)}
          >
            <span aria-hidden="true">−</span>
          </button>
          <input
            id={`${id}-quantidade`}
            className={styles.campo}
            type="number"
            inputMode="numeric"
            min={1}
            max={QUANTIDADE_MAXIMA}
            value={textoQuantidade}
            onChange={(evento) => setTextoQuantidade(evento.target.value)}
            onBlur={() => mudarQuantidade(quantidade)}
          />
          <button
            type="button"
            className={styles.passo}
            aria-label="Aumentar quantidade"
            aria-disabled={quantidade >= QUANTIDADE_MAXIMA || undefined}
            onClick={() => mudarQuantidade(quantidade + 1)}
          >
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>

      <div className={styles.acoes}>
        <BotaoAdicionarOrcamento
          slug={slug}
          nomeProduto={nome}
          quantidade={quantidade}
          opcoes={{ cor, estampa }}
          texto="Adicionar ao orçamento"
          variante="principal"
        />
        <a
          href={linkWhatsapp(mensagem)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.consultar}
        >
          Consultar outras combinações
          <span className={styles.oculto}> (abre o WhatsApp em nova aba)</span>
        </a>
      </div>

      <p className={styles.aviso}>
        A loja confirma cores, estampas e composição no atendimento.
      </p>
    </div>
  );
}
