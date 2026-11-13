import Image from "next/image";
import { passosComoMontar } from "@/data/howToAssemble";
import styles from "./HowToAssemble.module.scss";

// Celular: foto escondida (não é baixada). Tablet: ~46% à direita. Desktop: ~38% à direita.
const tamanhosFoto = "(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 1px";

export function HowToAssemble() {
  return (
    // id: destino do link "Como montar meu conjunto" do Hero.
    <section
      id="como-montar"
      aria-labelledby="como-montar-titulo"
      className={styles.comoMontar}
    >
      <div className={styles.conteudo}>
        <div className={styles.texto}>
          <h2 id="como-montar-titulo" className={styles.titulo}>
            Seu conjunto começa com uma escolha.
          </h2>

          <ol className={styles.passos}>
            {passosComoMontar.map((passo) => (
              <li key={passo.numero} className={styles.passo}>
                <span aria-hidden="true" className={styles.numero}>
                  {passo.numero}
                </span>
                <span className={styles.nomePasso}>{passo.titulo}</span>
              </li>
            ))}
          </ol>

          <p className={styles.nota}>
            Você pode consultar peças avulsas e compor o conjunto com
            atendimento pelo WhatsApp.
          </p>
        </div>
      </div>

      <div className={styles.midia}>
        <Image
          src="/images/demonstracao/01-pagina-inicial/05-como-montar-potes-passarinhos.png"
          alt="Potes de porcelana com passarinho na tampa"
          fill
          sizes={tamanhosFoto}
          className={styles.foto}
        />
        <div aria-hidden="true" className={styles.degrade} />
      </div>
    </section>
  );
}
