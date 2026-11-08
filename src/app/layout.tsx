import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import "./globals.scss";
import { Header } from "@/components/layout/Header/Header";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const siteTitle = "Loja Rossi — Porcelanas e faianças em Pedreira, SP";
const siteDescription =
  "Porcelanas e faianças da Loja Rossi, em Pedreira, SP. Kits para bebê, lavabo, mesa posta e cozinha: escolha peças, cores e estampas e monte do seu jeito.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | Loja Rossi",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Loja Rossi",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${lora.variable} ${sourceSans.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
