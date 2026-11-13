import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { lojaCidade } from "@/data/store";
import { mainNavigation } from "@/data/navigation";
import { PinIcon, SearchIcon } from "@/components/icons/icons";
import { QuoteButton } from "@/components/layout/QuoteButton/QuoteButton";
import { MobileMenu } from "@/components/layout/MobileMenu/MobileMenu";
import { NavLinks, NavLinksPorCaminho } from "@/components/layout/NavLinks/NavLinks";
import { MapLink } from "@/components/ui/MapLink/MapLink";
import styles from "./Header.module.scss";

/** Header comum a todas as páginas. Só a nav, o menu móvel e o botão do orçamento são Client Components. */
export function Header() {
  return (
    <header className={styles.header}>
      <a href="#conteudo" className={styles.pularConteudo}>
        Pular para o conteúdo
      </a>

      <div className={styles.barra}>
        {/* Esquerda: menu (celular) / localização (md+) */}
        <div className={styles.esquerda}>
          <MobileMenu items={mainNavigation} location={lojaCidade} />
          <p className={styles.localizacao}>
            <MapLink>
              <PinIcon className={styles.iconeLocalizacao} />
              {lojaCidade}
            </MapLink>
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
          <QuoteButton />
        </div>
      </div>

      <nav aria-label="Principal" className={styles.nav}>
        <Suspense fallback={<NavLinksPorCaminho items={mainNavigation} variant="desktop" />}>
          <NavLinks items={mainNavigation} variant="desktop" />
        </Suspense>
      </nav>
    </header>
  );
}
