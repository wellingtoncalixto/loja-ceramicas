import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Ajuda } from "@/components/home/Ajuda/Ajuda";
import { Catalogo } from "@/components/catalogo/Catalogo/Catalogo";
import { CatalogoComUrl } from "@/components/catalogo/CatalogoComUrl/CatalogoComUrl";
import { rotas } from "@/data/navigation";
import { filtrosVazios } from "@/lib/filtrosCatalogo";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Catálogo de peças",
  description:
    "Catálogo da Loja Rossi: potes, bandejas, saboneteiras e xícaras de porcelana para kits de bebê, lavabo, mesa posta e cozinha. Filtre por ambiente, estampa e cor.",
};

/** Lê a query no pedido: o HTML já chega com os filtros do link aplicados. */
async function CatalogoDoPedido({ searchParams }: Pick<PageProps<"/catalogo">, "searchParams">) {
  await searchParams;
  return <CatalogoComUrl />;
}

export default function CatalogoPage({ searchParams }: PageProps<"/catalogo">) {
  return (
    <main id="conteudo" className={styles.conteudo}>
      <div className={styles.container}>
        <nav aria-label="Trilha de navegação" className={styles.trilha}>
          <ol>
            <li>
              <Link href={rotas.inicio}>Início</Link>
            </li>
            <li aria-current="page">Todas as peças</li>
          </ol>
        </nav>

        <h1 className={styles.titulo}>Encontre as peças para a sua composição.</h1>
        <p className={styles.subtitulo}>
          Explore por ambiente, tipo de peça, cor ou estampa.
        </p>

        {/* Shell estático (todas as peças) + parte dinâmica com os filtros da URL,
            enviada na mesma resposta. Depois disso tudo roda no navegador. */}
        <Suspense fallback={<Catalogo filtros={filtrosVazios} />}>
          <CatalogoDoPedido searchParams={searchParams} />
        </Suspense>
      </div>

      <Ajuda titulo="Precisa de ajuda para combinar?" />
    </main>
  );
}
