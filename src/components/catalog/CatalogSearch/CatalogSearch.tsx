"use client";

import { useState, type FormEvent } from "react";
import { SearchIcon } from "@/components/icons/icons";
import styles from "./CatalogSearch.module.scss";

type BuscaCatalogoProps = {
  /** Busca atual (da URL). Use `key={valorInicial}` para ressincronizar. */
  valorInicial: string;
  aoBuscar: (texto: string) => void;
};

/** "Buscar peças ou estampas": aplica ao enviar (Enter ou botão "Buscar"). */
export function CatalogSearch({ valorInicial, aoBuscar }: BuscaCatalogoProps) {
  const [texto, setTexto] = useState(valorInicial);

  function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    aoBuscar(texto);
  }

  return (
    <form role="search" onSubmit={aoEnviar} className={styles.busca}>
      <label htmlFor="busca-catalogo" className={styles.oculto}>
        Buscar peças ou estampas
      </label>
      <div className={styles.campo}>
        <SearchIcon className={styles.icone} />
        <input
          id="busca-catalogo"
          type="search"
          name="q"
          value={texto}
          maxLength={80}
          autoComplete="off"
          placeholder="Buscar peças ou estampas"
          onChange={(evento) => setTexto(evento.target.value)}
          className={styles.entrada}
        />
      </div>
      <button type="submit" className={styles.botao}>
        Buscar
      </button>
    </form>
  );
}
