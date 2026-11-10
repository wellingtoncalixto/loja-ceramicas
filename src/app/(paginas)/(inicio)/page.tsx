import { Ajuda } from "@/components/home/Ajuda/Ajuda";
import { Categorias } from "@/components/home/Categorias/Categorias";
import { ComoMontar } from "@/components/home/ComoMontar/ComoMontar";
import { Hero } from "@/components/home/Hero/Hero";
import { Inspiracao } from "@/components/home/Inspiracao/Inspiracao";
import { Porcelanas } from "@/components/home/Porcelanas/Porcelanas";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main id="conteudo" className={styles.conteudo}>
      <Hero />
      <Categorias />
      <ComoMontar />
      <Inspiracao />
      <Porcelanas />
      <Ajuda />
    </main>
  );
}
