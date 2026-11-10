import type { Metadata } from "next";
import { PaginaNaoEncontrada } from "@/components/layout/PaginaNaoEncontrada/PaginaNaoEncontrada";

// Arquivo especial do Next: precisa ficar em app/. O conteúdo fica em components.
// O Next responde 404 e já injeta <meta name="robots" content="noindex">.
export const metadata: Metadata = {
  title: "Página em construção",
};

export default function NotFound() {
  return <PaginaNaoEncontrada />;
}
