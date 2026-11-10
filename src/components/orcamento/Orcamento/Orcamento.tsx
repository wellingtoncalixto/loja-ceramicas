"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ItemOrcamento } from "@/components/orcamento/ItemOrcamento/ItemOrcamento";
import { ResumoOrcamento } from "@/components/orcamento/ResumoOrcamento/ResumoOrcamento";
import type { LinhaOrcamento } from "@/components/orcamento/ResumoOrcamento/mensagemWhatsapp";
import { rotas } from "@/data/navigation";
import { obterProduto } from "@/data/produtos";
import { MAXIMO_OBSERVACOES, contarPecas, useOrcamento } from "@/lib/orcamento";
import styles from "./Orcamento.module.scss";

/** Lista do orçamento, observações e resumo (tudo no navegador, sem servidor). */
export function Orcamento() {
  const {
    itens,
    observacoes,
    carregado,
    alterarQuantidade,
    remover,
    limpar,
    definirObservacoes,
  } = useOrcamento();
  const [aviso, setAviso] = useState("");
  const tituloLista = useRef<HTMLHeadingElement>(null);
  // Quando a lista esvazia por ação do usuário, o foco vai para o título do estado vazio.
  const focarVazio = useRef(false);
  const aoMontarTituloVazio = (titulo: HTMLHeadingElement | null) => {
    if (titulo && focarVazio.current) {
      focarVazio.current = false;
      titulo.focus();
    }
  };

  // Peças que saíram do catálogo (slug antigo salvo no navegador) são ignoradas.
  const linhas: LinhaOrcamento[] = itens.flatMap((item) => {
    const produto = obterProduto(item.slug);
    return produto ? [{ item, produto }] : [];
  });
  const totalPecas = contarPecas(linhas.map(({ item }) => item));

  // Antes de ler o navegador: espaço reservado, sem "vazio" piscando.
  if (!carregado) {
    return (
      <p className={styles.carregando} aria-busy="true">
        Carregando a sua seleção…
      </p>
    );
  }

  if (linhas.length === 0) {
    return (
      <section aria-labelledby="vazio-titulo" className={styles.vazio}>
        <h2
          id="vazio-titulo"
          ref={aoMontarTituloVazio}
          tabIndex={-1}
          className={styles.vazioTitulo}
        >
          Sua seleção está vazia.
        </h2>
        <p className={styles.vazioTexto}>
          Escolha peças no catálogo e use “+&nbsp;Orçamento” para montar a sua composição.
        </p>
        <Link href={rotas.catalogo} className={styles.botaoCatalogo}>
          Ver o catálogo
        </Link>
        <p role="status" className={styles.oculto}>
          {aviso}
        </p>
      </section>
    );
  }

  function aoRemover({ item, produto }: LinhaOrcamento) {
    const ultimo = linhas.length === 1;
    focarVazio.current = ultimo;
    remover(item.id);
    setAviso(`${produto.nome} removido do orçamento.`);
    // O botão some com o item: o foco volta para o título da lista
    // (ou para o título do estado vazio, se era o último).
    if (!ultimo) tituloLista.current?.focus();
  }

  function aoAlterar({ item, produto }: LinhaOrcamento, quantidade: number) {
    alterarQuantidade(item.id, quantidade);
    setAviso(`${produto.nome}: ${quantidade} ${quantidade === 1 ? "unidade" : "unidades"}.`);
  }

  function aoLimpar() {
    if (!window.confirm("Remover todas as peças e observações do orçamento?")) return;
    focarVazio.current = true;
    limpar();
    setAviso("Orçamento limpo.");
  }

  return (
    <div className={styles.grade}>
      <div className={styles.principal}>
        <h2 ref={tituloLista} tabIndex={-1} className={styles.oculto}>
          Peças selecionadas
        </h2>
        <ul className={styles.lista}>
          {linhas.map((linha) => (
            <ItemOrcamento
              key={linha.item.id}
              item={linha.item}
              produto={linha.produto}
              onAlterarQuantidade={(quantidade) => aoAlterar(linha, quantidade)}
              onRemover={() => aoRemover(linha)}
            />
          ))}
        </ul>

        <div className={styles.acoesLista}>
          <Link href={rotas.catalogo} className={styles.link}>
            + Escolher mais peças
          </Link>
          <button type="button" className={styles.limpar} onClick={aoLimpar}>
            Limpar seleção
          </button>
        </div>

        <div className={styles.observacoes}>
          <label htmlFor="observacoes" className={styles.rotulo}>
            Observações para a loja
          </label>
          <textarea
            id="observacoes"
            className={styles.campo}
            rows={3}
            maxLength={MAXIMO_OBSERVACOES}
            placeholder="Conte suas dúvidas ou as combinações que procura."
            value={observacoes}
            onChange={(evento) => definirObservacoes(evento.target.value)}
          />
        </div>
      </div>

      <div className={styles.lateral}>
        <ResumoOrcamento linhas={linhas} totalPecas={totalPecas} observacoes={observacoes} />
      </div>

      <p role="status" className={styles.oculto}>
        {aviso}
      </p>
    </div>
  );
}
