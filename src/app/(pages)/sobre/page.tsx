import type { Metadata } from "next";
import Link from "next/link";
import { Help } from "@/components/home/Help/Help";
import { AboutIntro } from "@/components/about/AboutIntro/AboutIntro";
import { AboutPedreira } from "@/components/about/AboutPedreira/AboutPedreira";
import { VisitStore } from "@/components/about/VisitStore/VisitStore";
import { rotas } from "@/data/navigation";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Sobre a loja",
  description:
    "A Loja Rossi fica no Center Louças, em Pedreira (SP): porcelana e faiança esmaltada decoradas, pinturas artesanais e decalques, no atacado e no varejo. Veja endereço, horário e telefones.",
};

export default function SobrePage() {
  return (
    <main id="conteudo" className={styles.conteudo}>
      <nav aria-label="Trilha de navegação" className={styles.trilha}>
        <ol>
          <li>
            <Link href={rotas.inicio}>Início</Link>
          </li>
          <li aria-current="page">Sobre a loja</li>
        </ol>
      </nav>

      <AboutIntro />
      <AboutPedreira />
      <VisitStore />
      <Help titulo="Quer ajuda para montar o seu conjunto?" />
    </main>
  );
}
