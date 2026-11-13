"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { lerFiltros } from "@/lib/catalogFilters";
import { Catalog } from "@/components/catalog/Catalog/Catalog";

/** Lê os filtros da URL. Precisa ficar dentro de <Suspense> (cacheComponents). */
export function CatalogWithUrl() {
  const parametros = useSearchParams();
  const filtros = useMemo(() => lerFiltros(parametros), [parametros]);
  return <Catalog filtros={filtros} />;
}
