import Image from "next/image";
import Link from "next/link";
import { categorias } from "@/data/categorias";
import styles from "./Categorias.module.scss";

// Grade: 2 colunas no celular, 4 a partir de md. Fotos com no máximo ~270px de largura.
const tamanhosFoto = "(min-width: 1152px) 270px, (min-width: 768px) 23vw, 46vw";

export function Categorias() {
  return (
    <section aria-labelledby="categorias-titulo" className={styles.categorias}>
      <h2 id="categorias-titulo" className={styles.titulo}>
        Encontre peças para cada espaço
      </h2>

      <ul className={styles.grade}>
        {categorias.map((categoria) => (
          <li key={categoria.href}>
            {/* Um único link por card. O nome vem antes no DOM (leitores de tela
                anunciam a categoria primeiro); a foto sobe visualmente via order. */}
            <Link href={categoria.href} className={styles.card}>
              <span className={styles.nome}>{categoria.nome}</span>
              <span className={styles.midia}>
                <Image
                  src={categoria.imagem}
                  alt={categoria.alt}
                  fill
                  sizes={tamanhosFoto}
                  className={styles.foto}
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className={styles.legenda}>Categorias e peças ilustrativas</p>
    </section>
  );
}
