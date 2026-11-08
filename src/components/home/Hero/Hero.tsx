import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className={styles.hero}>
      {/* Texto vem antes no DOM (ordem de leitura); a foto sobe visualmente via order abaixo de lg. */}
      <div className={styles.conteudo}>
        <div className={styles.texto}>
          <p className={styles.selo}>Porcelanas &amp; Faianças</p>
          <h1 id="hero-titulo" className={styles.titulo}>
            Escolha cada detalhe.
            <br />
            Monte do seu jeito.
          </h1>
          <p className={styles.subtitulo}>
            Peças, cores e estampas para compor com a sua casa.
          </p>
          <div className={styles.acoes}>
            <Link href="/catalogo" className={styles.botao}>
              Explorar peças
            </Link>
            <Link href="#como-montar" className={styles.link}>
              Como montar meu conjunto
            </Link>
          </div>
        </div>
      </div>

      {/* Foto: capa acima do texto no celular e tablet; à direita, com degradê, a partir de lg. */}
      <div className={styles.midia}>
        <Image
          src="/images/demonstracao/01-pagina-inicial/01-banner-kit-ovelhinhas.png"
          alt="Kit de higiene para bebê em porcelana branca com estampa de ovelhinhas e bolinhas: dois potes com tampa de madeira, garrafa térmica e copo sobre bandeja oval"
          fill
          preload
          sizes="(min-width: 1024px) 56vw, 100vw"
          className={styles.foto}
        />
        <div aria-hidden="true" className={styles.degradeLateral} />
        <div aria-hidden="true" className={styles.degradeInferior} />
      </div>
    </section>
  );
}
