"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { lerFiltros } from "@/lib/filtrosCatalogo";
import { Catalogo } from "@/components/catalogo/Catalogo/Catalogo";

/** Lê os filtros da URL. Precisa ficar dentro de <Suspense> (cacheComponents). */
export function CatalogoComUrl() {
  const parametros = useSearchParams();
  const filtros = useMemo(() => lerFiltros(parametros), [parametros]);
  return <Catalogo filtros={filtros} />;
}
