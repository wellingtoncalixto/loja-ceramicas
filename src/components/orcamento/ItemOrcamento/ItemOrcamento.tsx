import Image from "next/image";
import Link from "next/link";
import { rotuloCor } from "@/data/catalogo";
import { rotaProduto } from "@/data/navigation";
import { QUANTIDADE_MAXIMA, type ItemOrcamento as Item } from "@/lib/orcamento";
import type { Produto } from "@/types/produto";
import styles from "./ItemOrcamento.module.scss";

type ItemOrcamentoProps = {
  item: Item;
  produto: Produto;
  onAlterarQuantidade: (quantidade: number) => void;
  onRemover: () => void;
};

/** Uma linha da lista: foto, nome, cor · estampa, quantidade e "Remover". */
export function ItemOrcamento({ item, produto, onAlterarQuantidade, onRemover }: ItemOrcamentoProps) {
  const noMinimo = item.quantidade <= 1;
  const noMaximo = item.quantidade >= QUANTIDADE_MAXIMA;
  const cor = rotuloCor(item.cor);

  return (
    <li className={styles.item}>
      <div className={styles.midia}>
        <Image
          src={produto.imagem}
          alt={produto.alt}
          fill
          sizes="(min-width: 64rem) 170px, 72px"
          className={styles.foto}
        />
      </div>

      <div className={styles.info}>
        <h3 className={styles.nome}>
          <Link href={rotaProduto(produto.slug)} className={styles.linkNome}>
            {produto.nome}
          </Link>
        </h3>
        <p className={styles.opcoes}>
          <span className={styles.oculto}>Cor: </span>
          {cor}
          <span aria-hidden="true"> · </span>
          <span className={styles.oculto}>, estampa: </span>
          {item.estampa}
        </p>
      </div>

      {/* aria-disabled em vez de disabled: o foco não se perde no limite. */}
      <div className={styles.quantidade} role="group" aria-label={`Quantidade de ${produto.nome}`}>
        <button
          type="button"
          className={styles.passo}
          aria-label={`Diminuir quantidade de ${produto.nome}`}
          aria-disabled={noMinimo || undefined}
          onClick={() => !noMinimo && onAlterarQuantidade(item.quantidade - 1)}
        >
          <span aria-hidden="true">−</span>
        </button>
        <span className={styles.valor}>{item.quantidade}</span>
        <button
          type="button"
          className={styles.passo}
          aria-label={`Aumentar quantidade de ${produto.nome}`}
          aria-disabled={noMaximo || undefined}
          onClick={() => !noMaximo && onAlterarQuantidade(item.quantidade + 1)}
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>

      <button
        type="button"
        className={styles.remover}
        aria-label={`Remover ${produto.nome} (${cor}, ${item.estampa})`}
        onClick={onRemover}
      >
        Remover
      </button>
    </li>
  );
}
