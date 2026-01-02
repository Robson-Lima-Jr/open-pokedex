import type { Metadata } from "next";
import Topo from "./components/Topo";
import {ThemeProvider} from "./context/ThemeContext"
import "./globals.css";


export const metadata: Metadata = {
  title: "Pokédex",
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
          <Topo />
          
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
