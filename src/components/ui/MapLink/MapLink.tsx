import type { ReactNode } from "react";
import { linkMapa } from "@/data/store";
import styles from "./MapLink.module.scss";

type LinkMapaProps = {
  children: ReactNode;
  /** Classe extra (ex.: visual de botão). Sem ela, o link herda o visual do texto ao redor. */
  className?: string;
};

/** Link para a loja no Google Maps, em nova aba. Avisa leitores de tela do destino. */
export function MapLink({ children, className }: LinkMapaProps) {
  return (
    <a
      href={linkMapa}
      target="_blank"
      rel="noopener noreferrer"
      className={className ? `${styles.link} ${className}` : styles.link}
    >
      {children}
      <span className={styles.oculto}> (abre o Google Maps em nova aba)</span>
    </a>
  );
}
