import type { Metadata } from "next";
import Link from "next/link";
import { ComoFunciona } from "@/components/orcamento/ComoFunciona/ComoFunciona";
import { Orcamento } from "@/components/orcamento/Orcamento/Orcamento";
import { rotas } from "@/data/navigation";
import styles from "./page.module.scss";

// Página pessoal (lista salva no navegador): fora dos resultados de busca.
export const metadata: Metadata = {
  title: "Meu orçamento",
  description:
    "Revise as peças, cores e estampas escolhidas e continue a conversa com a Loja Rossi pelo WhatsApp.",
  robots: { index: false, follow: true },
};

export default function OrcamentoPage() {
  return (
    <main id="conteudo" className={styles.conteudo}>
      <div className={styles.container}>
        <nav aria-label="Trilha de navegação" className={styles.trilha}>
          <ol>
            <li>
              <Link href={rotas.inicio}>Início</Link>
            </li>
            <li aria-current="page">Meu orçamento</li>
          </ol>
        </nav>

        {/* Mesmo h1 nas duas versões; só o texto visível muda, como na referência. */}
        <h1 className={styles.titulo}>
          <span className={styles.tituloCelular}>Meu orçamento</span>
          <span className={styles.tituloAmplo}>Sua composição, do seu jeito.</span>
        </h1>
        <p className={styles.subtitulo}>Revise suas escolhas antes de conversar com a loja.</p>

        <Orcamento />

        <ComoFunciona />
      </div>
    </main>
  );
}
