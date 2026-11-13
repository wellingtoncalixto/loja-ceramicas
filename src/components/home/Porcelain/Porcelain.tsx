import Image from "next/image";
import Link from "next/link";
import { rotas } from "@/data/navigation";
import styles from "./Porcelain.module.scss";

// Celular: foto na largura da tela. A partir de md: metade esquerda, no máximo ~576px.
const tamanhosFoto = "(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw";

export function Porcelain() {
  return (
    <section aria-labelledby="porcelanas-titulo" className={styles.porcelanas}>
      <div className={styles.faixa}>
        <div className={styles.texto}>
          <h2 id="porcelanas-titulo" className={styles.titulo}>
            Porcelanas decoradas, escolhas com personalidade.
          </h2>
          <p className={styles.descricao}>
            Conheça a Loja Rossi e suas possibilidades de composição para o dia
            a dia.
          </p>
          <Link href={rotas.sobre} className={styles.link}>
            Conheça a loja
          </Link>
        </div>

        <div className={styles.midia}>
          <Image
            src="/images/demonstracao/01-pagina-inicial/09-detalhe-rosa-porcelana.png"
            alt="Pote de porcelana com rosa na tampa e flores pintadas"
            fill
            sizes={tamanhosFoto}
            className={styles.foto}
          />
          <div aria-hidden="true" className={styles.degrade} />
        </div>
      </div>
    </section>
  );
}
