import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/types/produto";
import { rotaProduto } from "@/data/navigation";
import {
  BotaoAdicionarOrcamento,
  type VarianteBotaoOrcamento,
} from "@/components/ui/BotaoAdicionarOrcamento/BotaoAdicionarOrcamento";
import styles from "./CardProduto.module.scss";

type CardProdutoProps = {
  produto: Produto;
  /** Atributo sizes da foto, conforme a grade onde o card aparece. */
  tamanhosFoto: string;
  /** Nível do título do card (padrão h3). */
  nivelTitulo?: "h2" | "h3";
  /** "eager" só para cards visíveis sem rolar (padrão "lazy"). */
  carregamento?: "eager" | "lazy";
  /** Mostra o link "Ver detalhes" (padrão true). A foto sempre leva à peça. */
  mostrarDetalhes?: boolean;
  /** Visual do botão "+ Orçamento" (padrão "contorno"). */
  varianteBotao?: VarianteBotaoOrcamento;
};

/**
 * Card de peça (catálogo e "Complete sua composição").
 * Funciona em Server e Client Components; só o botão do orçamento é client.
 * Foto quadrada (as fotos de produto são 1:1).
 */
export function CardProduto({
  produto,
  tamanhosFoto,
  nivelTitulo: Titulo = "h3",
  carregamento = "lazy",
  mostrarDetalhes = true,
  varianteBotao = "contorno",
}: CardProdutoProps) {
  const href = rotaProduto(produto.slug);

  return (
    <article className={styles.card} data-detalhes={mostrarDetalhes ? "" : undefined}>
      {/* Atalho de mouse/toque; para teclado e leitor de tela o link é o "Ver detalhes". */}
      <Link href={href} tabIndex={-1} aria-hidden="true" className={styles.midia}>
        <Image
          src={produto.imagem}
          alt={produto.alt}
          fill
          sizes={tamanhosFoto}
          loading={carregamento}
          className={styles.foto}
        />
      </Link>

      <Titulo className={styles.nome}>
        {mostrarDetalhes ? (
          produto.nome
        ) : (
          <Link href={href} className={styles.linkNome}>
            {produto.nome}
          </Link>
        )}
      </Titulo>

      <div className={styles.acoes}>
        {mostrarDetalhes && (
          <Link href={href} className={styles.detalhes}>
            Ver detalhes<span className={styles.oculto}> de {produto.nome}</span>
          </Link>
        )}
        <BotaoAdicionarOrcamento
          slug={produto.slug}
          nomeProduto={produto.nome}
          variante={varianteBotao}
        />
      </div>
    </article>
  );
}
