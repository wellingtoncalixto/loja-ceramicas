import type { Metadata } from "next";
import Link from "next/link";
import { rotas } from "@/data/navigation";
import styles from "./not-found.module.scss";

// O Next responde 404 e já injeta <meta name="robots" content="noindex">.
export const metadata: Metadata = {
  title: "Página em construção",
};

/** Página para rotas inexistentes (ainda não criadas). Usa o header do layout raiz. */
export default function NotFound() {
  return (
    <main id="conteudo" className={styles.conteudo}>
      <div className={styles.texto}>
        <p className={styles.selo}>Loja Rossi</p>
        <h1 className={styles.titulo}>Página em construção</h1>
        <p className={styles.subtitulo}>
          Esta parte do site ainda está sendo preparada. Enquanto isso, veja as
          outras peças na página inicial.
        </p>
        <Link href={rotas.inicio} className={styles.botao}>
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
