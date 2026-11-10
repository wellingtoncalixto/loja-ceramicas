import { Categorias } from "@/components/home/Categorias/Categorias";
import { Hero } from "@/components/home/Hero/Hero";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main id="conteudo" className={styles.conteudo}>
      <Hero />
      <Categorias />
    </main>
  );
}
