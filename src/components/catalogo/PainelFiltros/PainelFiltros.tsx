import type { Opcao } from "@/types/produto";
import { categoriasProduto, cores, estampas, tiposPeca } from "@/data/catalogo";
import type { FiltrosCatalogo, GrupoFiltro } from "@/lib/filtrosCatalogo";
import styles from "./PainelFiltros.module.scss";

type PainelFiltrosProps = {
  id: string;
  /** Só vale abaixo de lg (no desktop o painel fica sempre visível). */
  aberto: boolean;
  filtros: FiltrosCatalogo;
  totalResultados: number;
  quantidadeFiltros: number;
  aoAlternar: (grupo: GrupoFiltro, valor: string) => void;
  aoLimpar: () => void;
  aoFechar: () => void;
};

type GrupoProps = {
  grupo: GrupoFiltro;
  titulo: string;
  opcoes: (Opcao<string> & { hex?: string })[];
  marcados: string[];
  aoAlternar: (grupo: GrupoFiltro, valor: string) => void;
};

function Grupo({ grupo, titulo, opcoes, marcados, aoAlternar }: GrupoProps) {
  return (
    <fieldset className={styles.grupo}>
      <legend className={styles.legenda}>{titulo}</legend>
      <ul className={styles.opcoes}>
        {opcoes.map((opcao) => {
          const id = `filtro-${grupo}-${opcao.valor}`;
          return (
            <li key={opcao.valor}>
              <input
                id={id}
                type="checkbox"
                name={grupo}
                value={opcao.valor}
                checked={marcados.includes(opcao.valor)}
                onChange={() => aoAlternar(grupo, opcao.valor)}
                className={opcao.hex ? styles.checkboxCor : styles.checkbox}
              />
              <label htmlFor={id} className={styles.opcao}>
                {opcao.hex && (
                  <span
                    aria-hidden="true"
                    className={styles.amostra}
                    style={{ backgroundColor: opcao.hex }}
                  />
                )}
                {opcao.rotulo}
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

/** Filtros do catálogo: barra lateral no desktop, painel recolhível no celular. */
export function PainelFiltros({
  id,
  aberto,
  filtros,
  totalResultados,
  quantidadeFiltros,
  aoAlternar,
  aoLimpar,
  aoFechar,
}: PainelFiltrosProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      data-aberto={aberto ? "" : undefined}
      className={styles.painel}
    >
      <div className={styles.topo}>
        <h2 id={`${id}-titulo`} className={styles.titulo}>
          Filtrar por
        </h2>
        <button
          type="button"
          onClick={aoLimpar}
          disabled={quantidadeFiltros === 0}
          className={styles.limpar}
        >
          Limpar filtros
        </button>
      </div>

      <Grupo
        grupo="categoria"
        titulo="Ambiente"
        opcoes={categoriasProduto.map(({ valor, rotuloCurto }) => ({ valor, rotulo: rotuloCurto }))}
        marcados={filtros.categoria}
        aoAlternar={aoAlternar}
      />
      <Grupo
        grupo="tipo"
        titulo="Tipo de peça"
        opcoes={tiposPeca}
        marcados={filtros.tipo}
        aoAlternar={aoAlternar}
      />
      <Grupo
        grupo="estampa"
        titulo="Estampa"
        opcoes={estampas}
        marcados={filtros.estampa}
        aoAlternar={aoAlternar}
      />
      <Grupo
        grupo="cor"
        titulo="Cor"
        opcoes={cores}
        marcados={filtros.cor}
        aoAlternar={aoAlternar}
      />

      {/* Só no celular: fecha o painel e volta para a lista. */}
      <button type="button" onClick={aoFechar} className={styles.verResultados}>
        Ver {totalResultados} {totalResultados === 1 ? "peça" : "peças"}
      </button>
    </section>
  );
}
