import type { Metadata } from "next";
import Topo from "./components/Topo";
import { ThemeProvider } from "./context/ThemeContext";
import { PalleteProvider } from "./context/PalleteContext";
import "./globals.css";


export const metadata: Metadata = {
  title: "Open Pokédex",
  description: "Projeto Pokédex fullstack com Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ThemeProvider>
          <PalleteProvider>
            <div className="layout_pagina">
              <Topo />
              <main className="layout_main">{children}</main>
            </div>
          </PalleteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
