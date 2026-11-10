import { PinIcon } from "@/components/icons/icons";
import { linkWhatsapp, lojaPonto } from "@/data/contato";
import { storeLocation } from "@/data/navigation";
import styles from "./Ajuda.module.scss";

type AjudaProps = {
  /** Título da barra (a home usa o padrão; outras páginas podem trocar). */
  titulo?: string;
};

/** Barra "Prefere escolher com ajuda?" com link para o WhatsApp. */
export function Ajuda({ titulo = "Prefere escolher com ajuda?" }: AjudaProps) {
  return (
    <section aria-labelledby="ajuda-titulo" className={styles.ajuda}>
      <div className={styles.faixa}>
        <h2 id="ajuda-titulo" className={styles.titulo}>
          {titulo}
        </h2>
        <a
          href={linkWhatsapp()}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.botao}
        >
          Conversar no WhatsApp
          <span className={styles.oculto}> (abre o WhatsApp em nova aba)</span>
        </a>
        <p className={styles.local}>
          <PinIcon className={styles.icone} />
          <span>
            {lojaPonto}{" "}
            <span aria-hidden="true">•</span>{" "}
            {storeLocation}
          </span>
        </p>
      </div>
    </section>
  );
}
