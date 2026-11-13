import Link from "next/link";
import { rotas } from "@/data/navigation";
import styles from "./NotFoundPage.module.scss";

/** Conteúdo da página 404 (rotas inexistentes ou ainda não criadas). Usa o header do layout raiz. */
export function NotFoundPage() {
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
