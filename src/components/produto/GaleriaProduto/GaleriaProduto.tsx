"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImagemProduto } from "@/types/produto";
import styles from "./GaleriaProduto.module.scss";

type GaleriaProdutoProps = {
  /** A 1ª foto é a principal (carregada com prioridade). */
  fotos: ImagemProduto[];
};

/** Foto principal da peça com miniaturas que trocam a foto exibida. */
export function GaleriaProduto({ fotos }: GaleriaProdutoProps) {
  const [ativa, setAtiva] = useState(0);
  const foto = fotos[ativa] ?? fotos[0];

  if (!foto) return null;

  return (
    <div className={styles.galeria}>
      <figure className={styles.figura}>
        <div className={styles.principal}>
          {/* key: troca a imagem inteira, sem mostrar a foto antiga esticada. */}
          <Image
            key={foto.src}
            src={foto.src}
            alt={foto.alt}
            fill
            preload={ativa === 0}
            sizes="(min-width: 1152px) 600px, (min-width: 768px) 52vw, 100vw"
            className={styles.foto}
          />
        </div>
        <figcaption className={styles.legenda}>Foto ilustrativa</figcaption>
      </figure>

      {fotos.length > 1 && (
        <ul className={styles.miniaturas} aria-label="Fotos da peça">
          {fotos.map((item, indice) => (
            <li key={item.src}>
              <button
                type="button"
                className={styles.miniatura}
                aria-pressed={indice === ativa}
                onClick={() => setAtiva(indice)}
              >
                <span className={styles.midia}>
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 140px, 25vw"
                    className={styles.fotoMiniatura}
                  />
                </span>
                <span className={styles.rotulo}>
                  <span className={styles.oculto}>Ver foto: </span>
                  {item.rotulo}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
