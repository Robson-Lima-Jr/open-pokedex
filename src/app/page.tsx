import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import { IconeSeta, IconeFiltro, IconePokeball } from "./components/icons/Icons";

export default function Home() {
  return (
    <div className={styles.fundo_main}>
      <main className={`container_base ${styles.container_home}`}>
        <div className="titulo_area">
          <h1 className="titulo_h1">
            <IconePokeball className="h1_icone" />

            <span>Pokédex</span>
          </h1>

          <p className="paragrafo_h1">Projeto desenvolvimento Web</p>
        </div>

        <section className="section_main">
          <h2 className="subtitulo_h2"><IconeSeta className="h2_icone" /><span>Introdução</span></h2>

          <p className="texto_p">Este projeto foi criado como parte dos meus estudos em desenvolvimento web, usando Pokémon como temática <em> ( eu sei que existem umas 15.000 Pokédex que o pessoal faz para práticar - mas convenhamos, é bem divertido )</em>.</p>

          <p className="texto_p">O objetivo principal é testar alguns dos conceitos que venho aprendendo e também aplicar algumas ideias próprias para ver como ficam na prática, tentando manter sempre um estilo o mais próximo possível do <strong>profissional.</strong></p>

          <p className="texto_p">O motivo de escolher <Link href="https://www.pokemon.com/br" target="_blank" className="link_main">Pokémon</Link> como tema é bem simples: eu gosto muito da franquia e jogo desde os anos 2000. Além disso, já existem mais de <strong>1000 Pokémon</strong>, o que ajuda bastante na hora de criar os cards e trabalhar com consumo de API.</p>

          <Image src="/img-page/bidoof-2.png" alt="Bidoof programando" width={300} height={300} title="Bidoof tendo problemas pra programar" className={styles.main_imagens} />

          <p className="texto_p">A ideia do projeto é aplicar conceitos como <strong>Mobile First</strong>, <strong>Dark/Light Mode</strong> e também paletas de cores inspiradas nos três primeiros jogos lançados no ocidente: <strong>Red, Blue e Yellow</strong> (o Yellow um pouco depois).
            Teremos ainda mais duas páginas: a <Link href="/pokedex" className="link_main">Pokédex</Link> e a de <Link href="/Games" className="link_main">Games</Link>, onde explicarei melhor os detalhes de cada uma.</p>
          <p className="texto_p">O objetivo do projeto é apenas para estudo e prática, sem qualquer objetivo comercial ou monetário.</p>
        </section>

        <section className="section_main">
          <h2 className="subtitulo_h2"><IconeSeta className="h2_icone" /><span>Temática</span></h2>

          <p className="texto_p">Como já mencionei, tentei aplicar alguns elementos visuais que lembram o universo Pokémon, como as paletas temáticas, além dos ícones de Solrock e Lunatone para os modos de tema.
            Também utilizei fontes clássicas dos jogos da primeira geração em alguns títulos e seções da Pokédex, para dar um toque mais nostálgico.</p>

          <p className="texto_p">Também, para testar, deixei o Pokémon de capa de cada um dos jogos como plano de fundo nesta página. Sempre que a paleta for alterada, o Pokémon correspondente aparecerá no fundo.</p>
          <Image src="/img-page/bidoof-1.png" alt="Bidoof programando" width={300} height={300} title="Bidoof descobriu que fez bobagem na centralização da div" className={styles.main_imagens} />
        </section>

        <section className="section_main">
          <h2 className="subtitulo_h2"><IconeSeta className="h2_icone" /><span>Tecnologias</span></h2>

          <ul className="lista_ul">
            <li className="lista_li">
              <IconePokeball className="icone_li" />
              <span>Next.js</span>
            </li>

            <li className="lista_li">
              <IconePokeball className="icone_li" />
              <span>React</span>
            </li>

            <li className="lista_li">
              <IconePokeball className="icone_li" />
              <span>Context API</span>
            </li>

            <li className="lista_li">
              <IconePokeball className="icone_li" />
              <span>TypeScript</span>
            </li>

            <li className="lista_li">
              <IconePokeball className="icone_li" />
              <span>CSS Modules</span>
            </li>

            <li className="lista_li">
              <IconePokeball className="icone_li" />
              <span>Mobile First</span>
            </li>

            <li className="lista_li">
              <IconePokeball className="icone_li" />
              <span>Dark / Light Theme</span>
            </li>

            <li className="lista_li">
              <IconePokeball className="icone_li" />
              <span>Paleta de cores dinâmica (Red / Blue / Yellow)</span>
            </li>

            <li className="lista_li">
              <IconePokeball className="icone_li" />
              <span>Consumo de API externa (PokéAPI)</span>
            </li>

            <li className="lista_li">
              <IconePokeball className="icone_li" />
              <span>Imagens em WebP quando possível</span>
            </li>

            <li className="lista_li">
              <IconePokeball className="icone_li" />
              <span>Fonte temática customizada</span>
            </li>
          </ul>


          <p className="texto_p">Durante o desenvolvimento, utilizei o ChatGPT como ferramenta de apoio para revisão de texto, troca de ideias e geração de algumas imagens, mantendo o foco no aprendizado prático e na implementação manual do projeto.</p>
        </section>
      </main>
    </div>
  );
};
