import { Help } from "@/components/home/Help/Help";
import { Categories } from "@/components/home/Categories/Categories";
import { HowToAssemble } from "@/components/home/HowToAssemble/HowToAssemble";
import { Hero } from "@/components/home/Hero/Hero";
import { Inspiration } from "@/components/home/Inspiration/Inspiration";
import { Porcelain } from "@/components/home/Porcelain/Porcelain";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main id="conteudo" className={styles.conteudo}>
      <Hero />
      <Categories />
      <HowToAssemble />
      <Inspiration />
      <Porcelain />
      <Help />
    </main>
  );
}
