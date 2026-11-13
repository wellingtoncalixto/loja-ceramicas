import Image from "next/image";
import Link from "next/link";
import { rotas } from "@/data/navigation";
import styles from "./AboutIntro.module.scss";

// Fatos da pesquisa (docs/equipe/CONTEXTO.md), sem histórias ou números inventados.
const destaques = [
  "Porcelana e faiança esmaltada decoradas",
  "Linha exclusiva de pinturas artesanais e aplicação de decalques",
  "Atendimento no atacado e no varejo",
];

// Celular e tablet: foto na largura da tela. Desktop: metade direita, no máximo ~576px.
const tamanhosFoto = "(min-width: 1152px) 576px, (min-width: 1024px) 50vw, 100vw";

/** Topo da página "Sobre a loja": quem é a loja, o que vende e chamada para o catálogo. */
export function AboutIntro() {
  return (
    <section aria-labelledby="sobre-titulo" className={styles.apresentacao}>
      <div className={styles.texto}>
        <p className={styles.selo}>Porcelanas &amp; Faianças</p>
        <h1 id="sobre-titulo" className={styles.titulo}>
          Sobre a Loja Rossi
        </h1>
        <p className={styles.descricao}>
          Porcelanas e faianças decoradas no Center Louças, em Pedreira (SP),
          para montar conjuntos de bebê, lavabo, mesa posta e cozinha.
        </p>

        <ul className={styles.destaques}>
          {destaques.map((destaque) => (
            <li key={destaque} className={styles.destaque}>
              {destaque}
            </li>
          ))}
        </ul>

        <Link href={rotas.catalogo} className={styles.botao}>
          Explorar peças
        </Link>
      </div>

      <div className={styles.midia}>
        <Image
          src="/images/demonstracao/01-pagina-inicial/07-inspiracao-kit-classico-dourado.png"
          alt="Kit de porcelana branca com filetes dourados"
          fill
          preload
          sizes={tamanhosFoto}
          className={styles.foto}
        />
      </div>
    </section>
  );
}
