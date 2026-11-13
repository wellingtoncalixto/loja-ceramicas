import Image from "next/image";
import Link from "next/link";
import { lojaCidade } from "@/data/store";
import { rotas } from "@/data/navigation";
import { rodapeAtendimento, rodapeAviso, rodapeNavegue } from "@/data/footer";
import { PinIcon } from "@/components/icons/icons";
import { MapLink } from "@/components/ui/MapLink/MapLink";
import type { NavItem } from "@/types/navigation";
import styles from "./Footer.module.scss";

type ColunaProps = { id: string; titulo: string; itens: NavItem[] };

function Coluna({ id, titulo, itens }: ColunaProps) {
  return (
    <nav aria-labelledby={id} className={styles.coluna}>
      <h2 id={id} className={styles.titulo}>
        {titulo}
      </h2>
      <ul className={styles.lista}>
        {itens.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className={styles.link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Rodapé comum a todas as páginas (Server Component). */
export function Footer() {
  return (
    <footer className={styles.rodape}>
      <div className={styles.conteudo}>
        <div className={styles.marca}>
          <Link href={rotas.inicio} className={styles.logoLink}>
            <Image
              src="/images/logo-loja-rossi.png"
              alt="Loja Rossi — página inicial"
              width={1683}
              height={935}
              sizes="(min-width: 768px) 160px, 140px"
              className={styles.logo}
            />
          </Link>
          <p className={styles.localizacao}>
            <MapLink>
              <PinIcon className={styles.iconeLocalizacao} />
              {lojaCidade}
            </MapLink>
          </p>
        </div>

        <Coluna id="rodape-navegue" titulo="Navegue" itens={rodapeNavegue} />
        <Coluna id="rodape-atendimento" titulo="Atendimento" itens={rodapeAtendimento} />
      </div>

      <p className={styles.aviso}>
        <span>
          {rodapeAviso[0]}{" "}
          <span aria-hidden="true" className={styles.separador}>
            •
          </span>{" "}
          {rodapeAviso[1]}
        </span>
      </p>
    </footer>
  );
}
