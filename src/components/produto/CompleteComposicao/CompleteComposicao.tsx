import { CardProduto } from "@/components/ui/CardProduto/CardProduto";
import { ListaCarrossel } from "@/components/ui/ListaCarrossel/ListaCarrossel";
import type { Produto } from "@/types/produto";
import styles from "./CompleteComposicao.module.scss";

type CompleteComposicaoProps = {
  produtos: Produto[];
};

/** "Complete sua composição": peças relacionadas com "+ Orçamento". */
export function CompleteComposicao({ produtos }: CompleteComposicaoProps) {
  return (
    <section aria-labelledby="complete-titulo" className={styles.complete}>
      <h2 id="complete-titulo" className={styles.titulo}>
        Complete sua composição
      </h2>
      <ListaCarrossel className={styles.grade}>
        {produtos.map((produto) => (
          <li key={produto.slug} className={styles.item}>
            <CardProduto
              produto={produto}
              tamanhosFoto="(min-width: 1152px) 360px, (min-width: 768px) 30vw, 70vw"
              mostrarDetalhes={false}
              varianteBotao="link"
            />
          </li>
        ))}
      </ListaCarrossel>
    </section>
  );
}
