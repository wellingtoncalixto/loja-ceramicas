import { ProductCard } from "@/components/ui/ProductCard/ProductCard";
import { CarouselList } from "@/components/ui/CarouselList/CarouselList";
import type { Produto } from "@/types/product";
import styles from "./CompleteTheSet.module.scss";

type CompleteComposicaoProps = {
  produtos: Produto[];
};

/** "Complete sua composição": peças relacionadas com "+ Orçamento". */
export function CompleteTheSet({ produtos }: CompleteComposicaoProps) {
  return (
    <section aria-labelledby="complete-titulo" className={styles.complete}>
      <h2 id="complete-titulo" className={styles.titulo}>
        Complete sua composição
      </h2>
      <CarouselList className={styles.grade}>
        {produtos.map((produto) => (
          <li key={produto.slug} className={styles.item}>
            <ProductCard
              produto={produto}
              tamanhosFoto="(min-width: 1152px) 360px, (min-width: 768px) 30vw, 70vw"
              mostrarDetalhes={false}
              varianteBotao="link"
            />
          </li>
        ))}
      </CarouselList>
    </section>
  );
}
