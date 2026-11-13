import Image from "next/image";
import Link from "next/link";
import { CarouselList } from "@/components/ui/CarouselList/CarouselList";
import { inspiracoes } from "@/data/inspirations";
import styles from "./Inspiration.module.scss";

// Celular: carrossel com cards de 78% da tela. A partir de md: 3 colunas, no máximo ~350px cada.
const tamanhosFoto = "(min-width: 1152px) 350px, (min-width: 768px) 31vw, 78vw";

export function Inspiration() {
  return (
    <section aria-labelledby="inspiracao-titulo" className={styles.inspiracao}>
      <h2 id="inspiracao-titulo" className={styles.titulo}>
        Inspire a sua composição
      </h2>

      <CarouselList className={styles.grade}>
        {inspiracoes.map((item) => (
          <li key={item.nome} className={styles.item}>
            {/* Um único link por card (nome + "Ver peças"). O texto vem antes
                no DOM; a foto sobe visualmente via order. */}
            <Link href={item.href} className={styles.card}>
              <span className={styles.nome}>{item.nome}</span>
              <span className={styles.acao}>
                <span className={styles.acaoTexto}>Ver peças</span>
                <span aria-hidden="true">→</span>
              </span>
              <span className={styles.midia}>
                <Image
                  src={item.imagem}
                  alt={item.alt}
                  fill
                  sizes={tamanhosFoto}
                  className={styles.foto}
                />
              </span>
            </Link>
          </li>
        ))}
      </CarouselList>
    </section>
  );
}
