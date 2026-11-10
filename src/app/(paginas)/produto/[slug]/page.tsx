import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Ajuda } from "@/components/home/Ajuda/Ajuda";
import { AbasProduto } from "@/components/produto/AbasProduto/AbasProduto";
import { CompleteComposicao } from "@/components/produto/CompleteComposicao/CompleteComposicao";
import { EscolhaProduto } from "@/components/produto/EscolhaProduto/EscolhaProduto";
import { GaleriaProduto } from "@/components/produto/GaleriaProduto/GaleriaProduto";
import { cores, obterCategoria, rotuloCategoria } from "@/data/catalogo";
import { rotaCategoria, rotas } from "@/data/navigation";
import { listarProdutos, listarRelacionados, obterProduto } from "@/data/produtos";
import styles from "./page.module.scss";

// Todas as peças são conhecidas no build: cada página sai pronta (estática).
export function generateStaticParams() {
  return listarProdutos().map((produto) => ({ slug: produto.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/produto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const produto = obterProduto(slug);
  if (!produto) return {};
  return {
    title: produto.nome,
    description: produto.descricaoCurta,
  };
}

// O slug é lido fora de <Suspense> de propósito: assim uma peça inexistente
// responde 404 de verdade (notFound antes de enviar a página). Os dados são
// locais e as páginas válidas já saem prontas do build. `instant = false`
// declara essa escolha (a navegação espera a página da peça, que é leve).
export const instant = false;

export default async function ProdutoPage({ params }: PageProps<"/produto/[slug]">) {
  const { slug } = await params;
  const produto = obterProduto(slug);
  if (!produto) notFound();

  const categoria = obterCategoria(produto.categoria);
  const coresDaPeca = cores.filter((cor) => produto.cores.includes(cor.valor));
  const relacionados = listarRelacionados(produto);

  return (
    <main id="conteudo" className={styles.conteudo}>
      <div className={styles.container}>
        <nav aria-label="Trilha de navegação" className={styles.trilha}>
          <ol>
            <li>
              <Link href={rotas.inicio}>Início</Link>
            </li>
            <li>
              <Link href={rotaCategoria(produto.categoria)}>
                {rotuloCategoria(produto.categoria)}
              </Link>
            </li>
            <li aria-current="page">{produto.nome}</li>
          </ol>
        </nav>

        <div className={styles.principal}>
          <GaleriaProduto fotos={produto.galeria} />

          <div className={styles.info}>
            <p className={styles.selo}>
              Peças avulsas <span aria-hidden="true">•</span>{" "}
              {categoria?.rotuloCurto ?? rotuloCategoria(produto.categoria)}
            </p>
            <h1 className={styles.titulo}>{produto.nome}</h1>
            <p className={styles.descricao}>{produto.descricaoCurta}</p>
            <p className={styles.consulta}>Valor e disponibilidade sob consulta</p>

            <EscolhaProduto
              slug={produto.slug}
              nome={produto.nome}
              cores={coresDaPeca}
              corPadrao={produto.corPadrao}
              estampas={produto.opcoesEstampa}
            />
          </div>
        </div>

        <AbasProduto
          abas={[
            {
              id: "descricao",
              rotulo: "Descrição",
              conteudo: (
                <>
                  <h2 className={styles.abaTitulo}>{produto.descricaoLonga.titulo}</h2>
                  <p className={styles.abaTexto}>{produto.descricaoLonga.texto}</p>
                  <ul className={styles.lista}>
                    {produto.descricaoLonga.detalhes.map((detalhe) => (
                      <li key={detalhe.rotulo}>
                        <strong>{detalhe.rotulo}:</strong> {detalhe.valor}
                      </li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              id: "medidas",
              rotulo: "Medidas e cuidados",
              conteudo: (
                <ul className={styles.lista}>
                  {produto.medidasECuidados.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ),
            },
            {
              id: "combinar",
              rotulo: "Como combinar",
              conteudo: <p className={styles.abaTexto}>{produto.comoCombinar}</p>,
            },
          ]}
        />

        {relacionados.length > 0 && <CompleteComposicao produtos={relacionados} />}
      </div>

      <Ajuda titulo="Quer ajuda para montar o conjunto?" />
    </main>
  );
}
