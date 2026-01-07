import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.fundo_main}>
      <main className={styles.container_base}>
        <h1><span>◓</span> Projeto Pokédex</h1>

        <section className={styles.section_main}>
          <h2>▶ Intro do Projeto</h2>

          <p>Este projeto foi criado como parte dos meus estudos em desenvolvimento web, usando Pokémon como temática <em> ( eu sei que existem umas 15.000 Pokédex que o pessoal faz para práticar - mas convenhamos, é bem divertido )</em>.</p>

          <p> O objetivo principal é testar alguns dos conceitos que venho aprendendo e também aplicar algumas ideias próprias para ver como ficam na prática, tentando manter sempre um estilo o mais próximo possível do <strong>profissional.</strong></p>

          <p>O motivo de escolher <Link href="https://www.pokemon.com/br" target="_blank" className={styles.link_main}>Pokémon</Link> como tema é bem simples: eu gosto muito da franquia e jogo desde os anos 2000. Além disso, já existem mais de <strong>1000 Pokémon</strong>, o que ajuda bastante na hora de criar os cards e trabalhar com consumo de API.</p>

          <Image src="/img-page/bidoof-2.png" alt="Bidoof programando" width={300} height={300} title="Bidoof tendo problemas pra programar" className={styles.main_imagens} />

          <p>A ideia do projeto é aplicar conceitos como <strong>Mobile First</strong>, <strong>Dark/Light Mode</strong> e também paletas de cores inspiradas nos três primeiros jogos lançados no ocidente: <strong>Red, Blue e Yellow</strong> (o Yellow um pouco depois).
            Teremos ainda mais duas páginas: a <Link href="/pokedex" className={styles.link_main}>Pokédex</Link> e a de <Link href="/Games" className={styles.link_main}>Games</Link>, onde explicarei melhor os detalhes de cada uma.</p>
          <p>O objetivo do projeto é apenas para estudo e prática, sem qualquer objetivo comercial ou monetário.</p>
        </section>

        <section className={styles.section_main}>
          <h2>▶ Temática do Site</h2>
          <p>Como já mencionei, tentei aplicar alguns elementos visuais que lembram o universo Pokémon, como as paletas temáticas, além dos ícones de Solrock e Lunatone para os modos de tema.
            Também utilizei fontes clássicas dos jogos da primeira geração em alguns títulos e seções da Pokédex, para dar um toque mais nostálgico.</p>
          <p>Também, para testar, deixei o Pokémon de capa de cada um dos jogos como plano de fundo nesta página. Sempre que a paleta for alterada, o Pokémon correspondente aparecerá no fundo.</p>
          <Image src="/img-page/bidoof-1.png" alt="Bidoof programando" width={300} height={300} title="Bidoof descobriu que fez bobagem na centralização da div" className={styles.main_imagens} />
        </section>

        <section className={styles.section_main}>
          <h2>▶ Tecnologias Utilizadas</h2>
          <ul>
            <li><span>◓</span> Next.js</li>

            <li><span>◓</span> React</li>

            <li><span>◓</span> Context API</li>

            <li><span>◓</span> TypeScript</li>

            <li><span>◓</span> CSS Modules</li>

            <li><span>◓</span> Mobile First</li>

            <li><span>◓</span> Dark/Light Theme</li>

            <li><span>◓</span> Paleta de cores dinâmica (Red / Blue / Yellow)</li>

            <li><span>◓</span> Consumo de API externa (PokéAPI)</li>

            <li><span>◓</span> Imagens em WebP quando possível</li>

            <li><span>◓</span> Fonte temática customizada</li>
          </ul>
          <p>Durante o desenvolvimento, utilizei o ChatGPT como ferramenta de apoio para revisão de texto, troca de ideias e geração de algumas imagens, mantendo o foco no aprendizado prático e na implementação manual do projeto.</p>
        </section>
      </main>
    </div>
  );
};
