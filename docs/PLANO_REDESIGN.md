# Plano de Redesign — Portfólio Phedro Henrick

> Status: **aguardando aprovação** · Criado em 15/10/2026

## 1. Objetivo

Reposicionar o portfólio para mostrar, de forma **empolgante e desenvolta**, quem eu sou como dev:
trabalho, projetos pessoais, participação no **TDC**, conquistas, como estudo e o que dizem de mim.

Referências:

- `src/assets/references/referencia1/` — portfólio atual (manter o **tema mar + tecnologia**).
- `src/assets/references/referencia2/` — yudiganeko.com (usar **tipografia**, **distribuição do conteúdo** e **voz em primeira pessoa**).

> **Regra de trabalho:** em qualquer dúvida de layout, espaçamento, tamanho de fonte, estilo de card, fotos ou comportamento, **consultar primeiro a `referencia2/`** e seguir o que ela faz. Se faltar referência para algo (outra tela, um estado de hover, a versão desktop, um detalhe específico), **pedir para eu adicionar mais prints na pasta `referencia2/`** em vez de inventar.

## 2. Decisões já tomadas

| Tema | Decisão |
|---|---|
| Base visual | **Sempre clara** (como a ref. 2). Única exceção: o **Hero**, escuro, com o SVG de mar e ondas animadas |
| Escrita | Aspecto **tecnológico**: fonte mono, comentários de código, prompts de terminal, metadados |
| Stack de UI | **Remover MUI, NextUI e Emotion** → apenas **Tailwind + framer-motion** |
| Conteúdo | Tenho fotos e conteúdo; o código nasce com **placeholders** em arquivos de dados para eu preencher |

## 3. Conceito: "Diário de bordo"

O mar deixa de ser só um fundo e vira a **narrativa**: o site é o diário de bordo de um dev.

- **Hero = superfície**: oceano escuro (`AnimatedBackground.svg`). A última onda do SVG já é `#eef7f7`, então ela "deságua" na base clara do resto da página.
- **Rota**: a timeline de experiência é o curso do navio, e cada empresa é uma **boia pastel `seaglass`** com um anel suave, que pulsa de leve quando entra na tela.
- **Sonar**: o indicador "agora" pulsa como um sonar (ping animado).
- **Escrita técnica**: os títulos de seção vêm como comentário de código, por exemplo:
  ```
  // 03 — experiência
  Minha rota até aqui
  ```
- **Metadados de navegação**: coordenadas de Goiânia no hero (`16°40'S 49°15'W`), datas em mono e caixa alta (`ABR 2025 — ATUAL`), tags como `#java`.

## 4. Design system

### Tipografia (igual à ref. 2)

| Uso | Fonte | Peso |
|---|---|---|
| Títulos, nome | **Geist** | 600–700 |
| Corpo, datas, tags, seletor de idioma | **Geist Mono** | 400–500 |

Carregadas via Google Fonts. Montserrat sai.

### Paleta: pastéis do espectro das ondas

Os acentos (boias, tags, ícones, bullets, destaques) saem do **mesmo espectro azul-esverdeado das ondas do hero** (`#466668 → #d4e0e0`). São **pastéis com personalidade**: um pouco mais saturados que as ondas, para não parecerem cinza, e longe de serem quase brancos. **O laranja sai.**

**Base**

| Token | Cor | Uso |
|---|---|---|
| `abyss` | `#012c32` | Texto principal, títulos, fundo do hero |
| `foam` | `#f7fbfa` | Fundo base (claro) |
| `mist` | `#5f7679` | Texto secundário, datas |
| `line` | `#dde6e5` | Bordas de cards e fotos, linha da timeline |

**Acentos pastel** (preenchimentos, não texto)

| Token | Cor | Personalidade / uso |
|---|---|---|
| `seaglass` | `#6fa8a8` | Vidro do mar: **boias da timeline**, acento principal, bullets `▸` |
| `lagoon` | `#7ba7c2` | Lagoa: links, indicador "agora" (sonar), ícones |
| `seafoam` | `#8dbfae` | Espuma verde: conquistas, status "lido" e "ativo" |
| `tide` | `#9bb4d4` | Maré azul-lavanda: tags secundárias, ícones da Estante |

Cada acento tem uma versão **`-soft`** (o mesmo tom a ~18% de opacidade) para fundo de tags e chips, e uma versão **`-ink`** escura para quando o tom precisa virar texto:

| Ink | Cor | Contraste em `foam` |
|---|---|---|
| `seaglass-ink` | `#2f6b6e` | 5.8:1 ✅ AA |
| `lagoon-ink` | `#3d6680` | 5.9:1 ✅ AA |

> Regra: os pastéis têm contraste ~2.5:1 no fundo claro, então **nunca são usados sozinhos como cor de texto**. Palavras-chave destacadas no texto (como o laranja da ref. 2) usam `seaglass-ink` em peso 600.

### Fotos (idênticas à ref. 2)

Todas as fotos seguem o padrão da referência 2: **cantos arredondados, nunca círculo**, com borda fina e sem filtros.

| Onde | Formato |
|---|---|
| **Hero** | Foto retrato (~3:4), raio ~20px, sombra suave, ao lado do "Oi! Eu sou o..." (lado a lado no desktop e no mobile, como na ref. 2). **Substitui o avatar redondo atual** |
| **Sobre** | Uma foto pessoal grande, centralizada, proporção natural, raio ~16px |
| **Experiência** (inclui as fotos do TDC) | **Faixa horizontal com rolagem** logo abaixo do nome da empresa: altura fixa (~240px mobile / ~300px desktop), **largura de acordo com a proporção de cada foto** (retrato fica estreita, paisagem fica larga), raio ~16px, borda 1px `line`, espaço de ~12px entre elas. A última foto fica **cortada na borda da tela** para indicar que dá para arrastar. Scroll-snap e sem barra de rolagem visível |
| **Livros** | Capa em proporção de livro (2:3), raio ~8px |
| **Recomendações** | Foto da pessoa pequena (~48px), raio ~12px (quadrada arredondada) |

Componente único **`PhotoStrip`** para as faixas, recebendo `{ src, alt }[]`. Clicar numa foto abre em tela cheia (lightbox simples).

### Componentes base

- **Card**: borda `line` de 1px, raio de 20px, fundo branco e sombra mínima, como os cards da ref. 2.
- **LinkCard**: ícone + título + `→` + descrição curta (usado em "Como me atualizo" e em links externos).
- **Tag**: mono, pequena, com `#` na frente.
- **SectionHeader**: comentário mono (`// 0X — nome`) + título em Geist + subtítulo em `mist`.
- **ImagePlaceholder**: quando a foto ainda não existe, mostra um gradiente oceano com ícone de onda, para o layout não quebrar.

## 5. Estrutura da página

| # | Seção | Conteúdo | Origem dos dados |
|---|---|---|---|
| 0 | **Sem navbar** (como a ref. 2) | No topo do hero, só o **logotipo em texto** à esquerda (`phedro` pequeno sobre `henrick` grande, em Geist, como o "yudi ganeko") e o **seletor PT/EN** discreto em mono à direita. Os dois rolam junto com a página (nada fixo). A página é lida de cima a baixo, sem menu | i18n |
| 1 | **Hero** (escuro) | Foto retrato com cantos arredondados (ver "Fotos"), `Oi! Eu sou o`, **Phedro Henrick**, `dev backend java · cloud`, frase "Hoje construo os sistemas do **TDC** na **Global Code**", linha de terminal digitando, CTAs (currículo / contato), redes, coordenadas | i18n |
| 2 | **Sobre mim** (inclui "Como me atualizo") ⭐ | Uma seção só (ver 5.1): texto em 1ª pessoa → bloco "agora" com sonar → **Como me atualizo** (roadmap.sh + CS50 lado a lado) → caixa de ferramentas | `about.ts`, `learning.ts` |
| 3 | **Experiência** | Timeline/rota no layout da ref. 2, com **o cargo como protagonista** (ver 5.2) | `experience.ts` |
| 4 | **Projetos** | Grid de cards (print, título, descrição curta, tags, links repo/demo, status). 1–2 em destaque maior | `projects.ts` |
| 5 | **Conquistas** | Cards/badges: olimpíadas, certificações, prêmios, marcos | `achievements.ts` |
| 6 | **Estante** | O que leio e assisto: 📚 Livros (capa + autor + status lido/lendo), ▶️ Canais do YouTube, 📝 Artigos — tudo em LinkCards | `bookshelf.ts` |
| 7 | **Recomendações** | Os comentários sobre mim, cada um linkado ao LinkedIn (ver 5.3) | `recommendations.ts` |
| 8 | **Contato / Rodapé** | "Mande um sinal 📡": e-mail, WhatsApp, LinkedIn, GitHub, currículo | i18n |

Sai a seção "Habilidades" isolada, com a grade escura de logos: ela vira a caixa de ferramentas no fim da seção 2.

### 5.1 Sobre mim + Como me atualizo — uma seção só

As antigas seções "Sobre + Agora" e "Como me atualizo" viram **uma seção contínua**, logo depois do hero e **antes da Experiência**. A leitura flui como na ref. 2: quem eu sou → o que estou fazendo → como estudo → com o que trabalho.

```
// 02 — sobre
Sobre mim                                        ← Geist, bold

Texto curto em 1ª pessoa, com palavras-chave     ← mono, palavras em `seaglass-ink`
destacadas (baseado no tx1/tx2 atuais).

┌ ◉ agora ───────────────────────────────┐      ← bloco "agora" com sonar `lagoon`
│ trabalhando em: …                       │
│ próximo passo:  …                       │
└─────────────────────────────────────────┘

Como me atualizo                                 ← subtítulo (Geist, menor que "Sobre mim")
Onde estudo e de onde vem meu roadmap.           ← mono, `mist`

┌────────────────────────┐  ┌────────────────────────┐
│ [logo roadmap.sh]      │  │ [logo CS50]            │
│ roadmap.sh  →          │  │ CS50 · Harvard  →      │
│ Trilhas da comunidade  │  │ Cursos de programação  │
│ para cada stack.       │  │ de Harvard, de graça.  │
└────────────────────────┘  └────────────────────────┘

nota de rodapé curta, mono, `mist`

Caixa de ferramentas                             ← tags agrupadas: Backend, Cloud, Dados, Front
#java #spring-boot #quarkus #kafka #aws …
```

- O bloco "agora" perde a linha "estudando", porque isso já fica nos cards logo abaixo.
- No desktop, o texto e o bloco "agora" podem ficar lado a lado; os cards e a caixa de ferramentas ocupam a largura toda.
- Uma foto pessoal opcional (ver "Fotos") entra entre o texto e o "Como me atualizo", se eu enviar.

**Cards do "Como me atualizo"** (mesmo estilo da seção "Como estou estudando" da ref. 2):

| Card | Link | Logo | Descrição |
|---|---|---|---|
| **roadmap.sh** | https://roadmap.sh/ | Ícone oficial (`roadmap.sh/manifest/apple-touch-icon.png`), salvo em `public/images/learning/roadmap.png` | Trilhas da comunidade para cada stack. É daí que vem o que eu estudo em seguida |
| **CS50 · Harvard** | https://cs50.harvard.edu/x/ | Logo oficial do CS50, salvo em `public/images/learning/cs50.png` | Cursos de programação de Harvard, **de graça** |

- **Lado a lado** no desktop (grid de 2 colunas); empilhados no mobile, como na ref. 2.
- O card segue a ref. 2: borda fina `line`, raio de 20px, logo em quadrado arredondado, título com `→` e descrição em mono `mist`. No hover, a borda vira `lagoon` e a seta desliza um pouco para a direita.
- Os dois abrem em nova aba (`target="_blank" rel="noreferrer"`).
- Os textos ficam em `learning.ts` (pt/en), para dar para adicionar outros cards depois.

### 5.2 Experiência — layout da ref. 2, foco no cargo

Mesma estrutura visual da "Minha experiência" da referência 2, com uma diferença: **o cargo vem antes e maior que a empresa**.

```
│
●  Desenvolvedor Backend Java              ← cargo: Geist, bold, grande (protagonista)
│  ABR 2025 — ATUAL                         ← período: mono, caixa alta, `mist`
│  @ Global Code — The Developer's Conference  ← empresa: mono, menor, `seaglass-ink`
│
│  ┌──────┐ ┌────────────┐ ┌───           ← PhotoStrip (fotos com cantos arredondados,
│  │      │ │            │ │                 a última cortada na borda)
│  └──────┘ └────────────┘ └───
│
│  ▸ Atuo na construção e manutenção de módulos RESTful...
│  ▸ ...
│
●  Desenvolvedor Full Stack — Projeto Autônomo
│  ...
```

- **Linha vertical** fina (`line`) à esquerda, como na ref. 2.
- **Boia que desce com o scroll** ⭐: em vez de uma boia parada em cada cargo, há **uma única boia `seaglass`** que **percorre a linha conforme o scroll**. A posição dela acompanha o quanto da seção já foi lido (de 0% no primeiro cargo a 100% no último).
  - Implementação: `useScroll({ target: secaoExperiencia })` + `useSpring` do framer-motion, para o movimento sair suave e com leve inércia, como algo flutuando na água.
  - **Rastro**: o trecho da linha que a boia já percorreu fica pintado em `seaglass`; o resto continua `line`.
  - **Marcos**: cada cargo tem um ponto pequeno e vazado na linha. Quando a boia passa por ele, o ponto **acende** (preenche em `seaglass`) e o cargo ganha opacidade total; os cargos ainda não alcançados ficam levemente esmaecidos.
  - **Balanço**: enquanto desce, a boia oscila de leve (±2px na horizontal e uma pequena rotação), como se estivesse na água.
  - **Acessibilidade**: com `prefers-reduced-motion`, a boia não se move; os marcos aparecem todos acesos e o conteúdo fica 100% visível.
- **Textos:** uso **as descrições atuais (`exp1`–`exp4` do `pt.json`/`en.json`) sem reescrever**. Para ficar no formato de lista da ref. 2, cada frase vira um item `▸` (marcador `seaglass`). Se a descrição tiver uma frase só, ela vira um único item.
- **Ordem:** da mais recente para a mais antiga, igual hoje (Global Code → Priatoo → IFG → Telgo).
- **Link** "visitar site →" continua no Priatoo.
- Sem fotos cadastradas para a experiência, a `PhotoStrip` não aparece (nada de placeholder vazio nessa seção).

### 5.3 Recomendações — comentários linkados ao LinkedIn

Os comentários que as pessoas fizeram sobre mim continuam no site, agora **linkados ao LinkedIn** para servir de prova social verificável.

```
// 07 — recomendações
O que dizem sobre mim

┌──────────────────────────────────────────────┐
│ “ Trabalhar com o Phedro foi uma experiência │   ← texto da recomendação (mono)
│   excelente. Mostra seu comprometimento...   │
│                                              │
│ [foto] Rafael Xavier ↗                       │   ← nome linka pro perfil dele no LinkedIn
│        Analista de Redes · trabalhou comigo  │
│                                              │
│                     ver no LinkedIn →        │   ← link pra recomendação no meu perfil
└──────────────────────────────────────────────┘
```

- **Dois links por card**:
  1. **Nome do autor** → perfil do autor no LinkedIn.
  2. **"ver no LinkedIn →"** → a página de recomendações do meu perfil: `https://www.linkedin.com/in/phedroleao/details/recommendations/`. O LinkedIn não tem link individual por recomendação, então todos apontam para essa página. Ela exige login para ver.
- O ícone do LinkedIn aparece pequeno no canto do card, em `lagoon`, para deixar claro de onde veio o texto.
- **Conteúdo inicial**: as duas recomendações que já existem (**Rafael Xavier** e **Adriano Aparecido**), com textos e fotos atuais (`rafa.jpg`, `adriano.jpg`). Basta adicionar mais itens em `recommendations.ts`.
- **Layout**: grid de 2 colunas no desktop e 1 no mobile. Se passar de 4 recomendações, vira uma faixa horizontal com rolagem, igual à `PhotoStrip`.
- Foto do autor quadrada com cantos arredondados (ver "Fotos"). Destaques no texto em `seaglass-ink`.
- **Corrigir o link do meu LinkedIn** em todo o site: hoje o hero usa a URL antiga e longa (`/in/phedro-henrick-da-silva-le%C3%A3o-b13b96234/`). O perfil atual, segundo o `linkedin.pdf`, é `/in/phedroleao`. Ele fica centralizado em `social.ts`.

## 6. Arquitetura

```
src/
  data/                 ← conteúdo editável (pt/en no mesmo objeto)
    about.ts
    experience.ts
    projects.ts
    achievements.ts
    learning.ts
    bookshelf.ts
    recommendations.ts
    social.ts
  components/
    ui/                 ← Card, LinkCard, Tag, SectionHeader, ImagePlaceholder, Icon
  pages/Home/sections/  ← uma pasta por seção
  locale/pt.json, en.json  ← apenas textos curtos de interface
public/images/          ← fotos (experiência (inclui TDC), capas, pessoas)
```

- **Conteúdo bilíngue nos dados**: `{ pt: "...", en: "..." }` + helper `useLocalized()`. Adicionar um livro ou evento novo é editar uma lista, sem tocar em componentes.
- **Remover**: `@mui/*`, `@nextui-org/react`, `@emotion/*`, `swiper`, `react-scroll`, `theme.ts`, `NavBar`, `StyledButton`, `StyledCard`, `StyledSlide`, `navio`, `Functions/Translate.tsx` (que está quebrado).
- **Manter**: React, Vite, Tailwind, framer-motion, i18next, react-helmet, Vercel Analytics.
- **Acessibilidade**: `prefers-reduced-motion` desliga ondas e animações; contraste AA na base clara; `alt` em todas as imagens.

## 7. Fases

1. **Fundação**: fontes, tokens no Tailwind, remoção de MUI/NextUI/Emotion, componentes `ui/`, logotipo + seletor de idioma no topo do hero.
2. **Hero + Sobre mim** (texto, agora, Como me atualizo, caixa de ferramentas).
3. **Experiência** (timeline com fotos e boia no scroll).
4. **Projetos**.
5. **Conquistas**.
6. **Estante + Recomendações**.
7. **Contato**, SEO (título, descrição, Open Graph), responsividade, revisão de animações e build final.

Cada fase termina com `npm run build` passando.

## 8. Conteúdo que eu preciso fornecer

- [ ] Fotos: hero (nova, se quiser), Global Code / TDC (palco, totens, equipe) — vão na faixa de fotos da experiência Global Code, IFG, outros
- [ ] Conquistas: nome, ano, descrição e imagem/link
- [ ] Livros: título, autor, capa e status (lido/lendo)
- [ ] Canais do YouTube: nome, link e por que recomendo
- [ ] Artigos: título, autor/site e link
- [ ] Recomendações do LinkedIn: para cada uma, o **link do perfil do autor** (Rafael e Adriano inclusos), nome, cargo, texto e foto. Novas recomendações, se houver
- [ ] *(futuro, opcional)* Reescrever as experiências como bullets de impacto com números. Por ora, as descrições atuais ficam como estão
- [ ] Bloco "agora": no que estou trabalhando e o que estou estudando
