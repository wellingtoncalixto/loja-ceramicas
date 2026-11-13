import { PinIcon } from "@/components/icons/icons";
import { MapLink } from "@/components/ui/MapLink/MapLink";
import { linkWhatsapp } from "@/data/contact";
import { lojaCidade, lojaPonto } from "@/data/store";
import styles from "./Help.module.scss";

type AjudaProps = {
  /** Título da barra (a home usa o padrão; outras páginas podem trocar). */
  titulo?: string;
};

/** Barra "Prefere escolher com ajuda?" com link para o WhatsApp. */
export function Help({ titulo = "Prefere escolher com ajuda?" }: AjudaProps) {
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
          <MapLink>
            <PinIcon className={styles.icone} />
            <span>
              {lojaPonto}{" "}
              <span aria-hidden="true">•</span>{" "}
              {lojaCidade}
            </span>
          </MapLink>
        </p>
      </div>
    </section>
  );
}
