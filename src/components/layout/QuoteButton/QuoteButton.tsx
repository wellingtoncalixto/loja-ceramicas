"use client";

import Link from "next/link";
import { BagIcon } from "@/components/icons/icons";
import { rotas } from "@/data/navigation";
import { useOrcamento } from "@/lib/quote";
import styles from "./QuoteButton.module.scss";

/** "Meu orçamento (N)" do header: único trecho do header que lê o orçamento. */
export function QuoteButton() {
  const { totalPecas } = useOrcamento();
  const descricao = `Meu orçamento, ${totalPecas} ${totalPecas === 1 ? "peça" : "peças"}`;

  return (
    <Link href={rotas.orcamento} aria-label={descricao} className={styles.orcamento}>
      <BagIcon className={styles.icone} />
      <span aria-hidden="true" className={styles.contador}>
        {totalPecas}
      </span>
      <span aria-hidden="true" className={styles.texto}>
        Meu orçamento ({totalPecas})
      </span>
    </Link>
  );
}
