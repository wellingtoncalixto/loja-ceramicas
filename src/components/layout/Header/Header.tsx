import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { mainNavigation, storeLocation } from "@/data/navigation";
import { BagIcon, PinIcon, SearchIcon } from "@/components/icons/icons";
import { MobileMenu } from "@/components/layout/MobileMenu/MobileMenu";
import { NavLinks } from "@/components/layout/NavLinks/NavLinks";
import { NavList } from "@/components/layout/NavList/NavList";
import styles from "./Header.module.scss";

/** Header comum a todas as páginas. Só a nav e o menu móvel são Client Components. */
export function Header() {
  return (
    <header className={styles.header}>
      <a href="#conteudo" className={styles.pularConteudo}>
        Pular para o conteúdo
      </a>

      <div className={styles.barra}>
        {/* Esquerda: menu (celular) / localização (md+) */}
        <div className={styles.esquerda}>
          <MobileMenu items={mainNavigation} location={storeLocation} />
          <p className={styles.localizacao}>
            <PinIcon className={styles.iconeLocalizacao} />
            {storeLocation}
          </p>
        </div>

        {/* Centro: logo */}
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/images/logo-loja-rossi.png"
            alt="Loja Rossi — página inicial"
            width={1683}
            height={935}
            loading="eager"
            fetchPriority="low"
            sizes="(min-width: 1024px) 220px, (min-width: 768px) 180px, 108px"
            className={styles.logo}
          />
        </Link>

        {/* Direita: busca e orçamento */}
        <div className={styles.direita}>
          <button type="button" aria-label="Buscar peças" className={styles.busca}>
            <SearchIcon className={styles.icone} />
          </button>
          <span aria-hidden="true" className={styles.divisor} />
          <Link
            href="/orcamento"
            aria-label="Meu orçamento, 0 itens"
            className={styles.orcamento}
          >
            <BagIcon className={styles.iconeOrcamento} />
            <span aria-hidden="true" className={styles.contador}>
              0
            </span>
            <span aria-hidden="true" className={styles.textoOrcamento}>
              Meu orçamento (0)
            </span>
          </Link>
        </div>
      </div>

      <nav aria-label="Principal" className={styles.nav}>
        <Suspense fallback={<NavList items={mainNavigation} variant="desktop" />}>
          <NavLinks items={mainNavigation} variant="desktop" />
        </Suspense>
      </nav>
    </header>
  );
}
