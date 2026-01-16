import type { Metadata } from "next";
import Topo from "./components/Topo";
import { ThemeProvider } from "./context/ThemeContext";
import { PalleteProvider } from "./context/PalleteContext";
import { MenuProvider } from "./context/MenuContext";
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
            <MenuProvider>
              <div className="layout_pagina">
                <Topo />
                <main className="layout_main">
                  {children}
                </main>
              </div>
            </MenuProvider>
          </PalleteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
