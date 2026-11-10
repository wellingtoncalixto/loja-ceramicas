"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { obterCategoria } from "@/data/catalogo";
import { filtrarProdutos } from "@/data/produtos";
import {
  alternarFiltro,
  contarFiltros,
  filtrosVazios,
  montarQuery,
  ordensCatalogo,
  type FiltrosCatalogo,
  type GrupoFiltro,
  type OrdemCatalogo,
} from "@/lib/filtrosCatalogo";
import { CardProduto } from "@/components/ui/CardProduto/CardProduto";
import { BuscaCatalogo } from "@/components/catalogo/BuscaCatalogo/BuscaCatalogo";
import { PainelFiltros } from "@/components/catalogo/PainelFiltros/PainelFiltros";
import styles from "./Catalogo.module.scss";

// Grade: 2 colunas no celular, 3 a partir de sm (no desktop, ao lado dos filtros).
const tamanhosFoto =
  "(min-width: 1152px) 280px, (min-width: 1024px) 23vw, (min-width: 640px) 30vw, 46vw";
// Cards da 1ª linha (visíveis sem rolar no desktop) carregam sem lazy.
const cardsSemLazy = 3;

type CatalogoProps = {
  /** Filtros lidos da URL (ver CatalogoComUrl). */
  filtros: FiltrosCatalogo;
};

/**
 * Busca, filtros, ordem e grade do catálogo.
 * A URL é a fonte da verdade: cada mudança troca a query com
 * history.replaceState (integrado ao roteador do Next, sem nova requisição).
 * Uma cópia local aplica a mudança no mesmo clique (checkbox e lista sem
 * atraso) e é ressincronizada quando a URL muda (ex.: links do header).
 */
export function Catalogo({ filtros: filtrosDaUrl }: CatalogoProps) {
  const [filtros, setFiltros] = useState(filtrosDaUrl);
  const [urlAnterior, setUrlAnterior] = useState(filtrosDaUrl);
  if (filtrosDaUrl !== urlAnterior) {
    setUrlAnterior(filtrosDaUrl);
    setFiltros(filtrosDaUrl);
  }

  const [painelAberto, setPainelAberto] = useState(false);
  const botaoFiltrarRef = useRef<HTMLButtonElement>(null);
  const resultadosRef = useRef<HTMLHeadingElement>(null);
  const idPainel = useId();

  const resultado = useMemo(() => filtrarProdutos(filtros), [filtros]);
  const quantidadeFiltros = contarFiltros(filtros);

  // Esc fecha o painel de filtros (celular) e devolve o foco ao botão.
  useEffect(() => {
    if (!painelAberto) return;
    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setPainelAberto(false);
        botaoFiltrarRef.current?.focus();
      }
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [painelAberto]);

  function aplicar(novos: FiltrosCatalogo) {
    setFiltros(novos);
    window.history.replaceState(null, "", `${window.location.pathname}${montarQuery(novos)}`);
  }

  const aoAlternar = (grupo: GrupoFiltro, valor: string) =>
    aplicar(alternarFiltro(filtros, grupo, valor));
  const aoLimpar = () => aplicar({ ...filtrosVazios, ordem: filtros.ordem });
  const aoBuscar = (busca: string) => aplicar({ ...filtros, busca });
  const aoOrdenar = (ordem: OrdemCatalogo) => aplicar({ ...filtros, ordem });

  function fecharPainel() {
    setPainelAberto(false);
    resultadosRef.current?.focus();
  }

  // Título: nome da categoria quando só ela está marcada; senão, "Todas as peças".
  const apenasCategoria =
    filtros.categoria.length === 1 && quantidadeFiltros === 1
      ? obterCategoria(filtros.categoria[0])
      : undefined;
  const titulo = apenasCategoria?.rotulo ?? "Todas as peças";
  const contagem = `${resultado.length} ${resultado.length === 1 ? "peça" : "peças"}`;

  return (
    <div className={styles.catalogo}>
      <BuscaCatalogo key={filtros.busca} valorInicial={filtros.busca} aoBuscar={aoBuscar} />

      <div className={styles.corpo}>
        <div className={styles.barraFiltros}>
          <button
            ref={botaoFiltrarRef}
            type="button"
            aria-expanded={painelAberto}
            aria-controls={idPainel}
            onClick={() => setPainelAberto((aberto) => !aberto)}
            className={styles.botaoFiltrar}
          >
            Filtrar
            {quantidadeFiltros > 0 && (
              <span className={styles.selo}>
                {quantidadeFiltros}
                <span className={styles.oculto}>
                  {quantidadeFiltros === 1 ? " filtro ativo" : " filtros ativos"}
                </span>
              </span>
            )}
          </button>
        </div>

        <PainelFiltros
          id={idPainel}
          aberto={painelAberto}
          filtros={filtros}
          totalResultados={resultado.length}
          quantidadeFiltros={quantidadeFiltros}
          aoAlternar={aoAlternar}
          aoLimpar={aoLimpar}
          aoFechar={fecharPainel}
        />

        <section aria-labelledby="resultados-titulo" className={styles.resultados}>
          <div className={styles.topoResultados}>
            <h2 id="resultados-titulo" ref={resultadosRef} tabIndex={-1} className={styles.titulo}>
              {titulo}
              <span className={styles.subtitulo}> · seleção ilustrativa</span>
            </h2>
            <p role="status" className={styles.contagem}>
              {contagem}
            </p>
            <label className={styles.ordem}>
              <span className={styles.oculto}>Ordenar por</span>
              <select
                value={filtros.ordem}
                onChange={(evento) => aoOrdenar(evento.target.value as OrdemCatalogo)}
                className={styles.selecao}
              >
                {ordensCatalogo.map((opcao) => (
                  <option key={opcao.valor} value={opcao.valor}>
                    {opcao.rotulo}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {resultado.length > 0 ? (
            <ul className={styles.grade}>
              {resultado.map((produto, indice) => (
                <li key={produto.slug}>
                  <CardProduto
                    produto={produto}
                    tamanhosFoto={tamanhosFoto}
                    carregamento={indice < cardsSemLazy ? "eager" : "lazy"}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.vazio}>
              <p className={styles.vazioTitulo}>Nenhuma peça encontrada.</p>
              <p>Tente desmarcar algum filtro ou buscar por outra palavra.</p>
              <button type="button" onClick={aoLimpar} className={styles.vazioBotao}>
                Limpar filtros
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
