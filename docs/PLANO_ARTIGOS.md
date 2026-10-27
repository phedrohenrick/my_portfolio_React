# Plano — Seção de Artigos

> Status: **implementado** (aguardando a imagem do artigo e o Upstash Redis na Vercel) · Criado em 26/10/2026

## 1. Objetivo

Criar uma área de **artigos** no portfólio. O primeiro artigo é
**"Abstraction in Java to answer tech questions"** (classes abstratas, interfaces e 6 perguntas de entrevista).

- Na home, uma nova seção lista os artigos (cards).
- Clicar num card abre a **rota própria** do artigo: `/artigos/abstraction-in-java`.
- No fim do artigo, um **campo de comentários**: a pessoa informa **nome** + **comentário**, e os comentários ficam visíveis para todos.

## 2. Rotas

Hoje o app não tem roteador (`App.tsx` renderiza só `<Home />`). O `react-router-dom` já está instalado.

| Rota | Página |
|---|---|
| `/` | Home (sem mudanças de comportamento; links `#ancora` continuam funcionando) |
| `/artigos` | Lista de artigos (opcional, ver §7) |
| `/artigos/:slug` | Página do artigo |

- `BrowserRouter` em `main.tsx`; `ScrollToTop` ao trocar de rota.
- **`vercel.json`** com rewrite `/(.*) → /index.html` (exceto `/api/*`) para o refresh direto em `/artigos/...` não dar 404.

## 3. Home: nova seção

Entre **Conquistas** e **Recomendações** (ou onde preferir):

```
// 06 — artigos
O que tenho escrito
```

- Card no estilo dos cards existentes (`Card.tsx`): título, data em mono caixa alta (`OUT 2026`),
  resumo de 1–2 linhas, tags (`#java` `#oop` `#entrevistas`), tempo de leitura (`~6 min`), e `ler →`.

## 4. Página do artigo — identidade, mas não igual

Mantém a base do portfólio (fundo `foam`, Geist + Geist Mono, paleta pastel do mar), com cara de **leitura**:

- **Topo escuro curto** (faixa `#013f47` com uma onda pequena do `OceanWaves` deságuando no claro) com:
  `← voltar` · breadcrumb `~/artigos/abstraction-in-java` · seletor PT|EN.
- **Cabeçalho do artigo**: título grande em Geist, metadados em mono
  (`// 26 OUT 2026 · 6 min · #java #oop`).
- **Coluna de leitura** de ~70ch, corpo em Geist (sans) para leitura longa; mono fica para metadados e código.
- **Blocos de código** com fundo `abyss`, cabeçalho tipo janela de terminal (`● ● ●  MyAbstractClass.java`)
  e destaque de sintaxe leve feito à mão (keywords Java) — sem lib nova.
- **Callout ⚠️ "To remember"** como caixa `lagoon.soft` com borda à esquerda.
- **Perguntas de entrevista** como 6 cards numerados `Q1…Q6`, com a resposta curta em destaque
  (`YES` / `NO` em tag colorida) e a explicação embaixo.
- **"Key takeaway"** em bloco de destaque no fim.
- **Diagrama** (classe → interface → classe abstrata → subclasse): ver §6.
- Índice lateral (sumário) no desktop, sticky, destacando a seção atual. No mobile, some.

## 5. Comentários

O site é estático (Vite na Vercel), então precisa de um backend pequeno:

- **Função serverless da Vercel** em `api/comments.ts`:
  - `GET /api/comments?slug=...` → lista comentários (mais antigos primeiro).
  - `POST /api/comments` com `{ slug, name, comment }` → valida e salva.
- **Armazenamento:** **Upstash Redis** (integração gratuita do Marketplace da Vercel; um clique no painel
  cria as variáveis de ambiente). Uma lista por artigo: `comments:<slug>`.
- **Validação/anti-spam:** nome 2–60 caracteres, comentário 2–1000; campo *honeypot* invisível;
  limite simples por IP (ex.: 3 comentários/min). Texto é renderizado como texto puro (sem HTML).
- **UI:** formulário com **Nome** e **Comentário** (obrigatórios), botão `enviar`, estados de
  carregando/erro/sucesso; lista com nome, data relativa (`há 2 dias`) e avatar com a inicial.
- **Moderação:** comentários aparecem na hora. Para apagar um comentário indevido, faço pelo painel do Upstash
  (ou, se quiser, uma rota protegida por senha — fora do escopo inicial).

> **Ação sua:** no painel da Vercel → Storage → criar **Upstash Redis** e conectar ao projeto.
> Localmente, `vercel dev` (ou `vercel env pull`) para testar a API.

## 6. Conteúdo

- Artigo guardado em `src/data/articles/abstraction-in-java.ts` como blocos tipados
  (`heading`, `paragraph`, `code`, `callout`, `list`, `image`, `qa`) — sem dependência de Markdown.
- `src/data/articles/index.ts` com metadados (slug, título, data, tags, resumo, tempo de leitura).
- **Imagem do diagrama:** o `image.png` do artigo **não veio** na mensagem. Duas opções:
  1. você me manda a imagem e ela vai para `src/assets/images/articles/`;
  2. eu desenho o diagrama em SVG na paleta do site (classe azul → interface → abstrata → subclasse),
     já com os nomes do exemplo de pagamento (`CheckoutService`, `PaymentService`, ...).
- **Revisão do texto:** proponho corrigir só erros de digitação/ortografia, sem mudar o sentido
  (ex.: "enswer" → "answer", "signatura" → "signature", "helo" → "whole", "recipy" → "recipe",
  "deacople" → "decouple", "couse" → "cause", "previews image" → "previous image"),
  e o exemplo de pagamento que repete "CreditCardPayment" duas vezes → "CreditCardPayment or PixPayment".

## 7. Decisões em aberto

1. **Idioma:** artigo só em inglês (com a UI ao redor traduzida PT/EN) ou também versão PT?
2. **Diagrama:** sua imagem ou SVG desenhado por mim?
3. **Correção de typos:** posso corrigir?
4. **Página `/artigos`** com a lista completa agora, ou só a seção na home por enquanto?
5. **Comentários:** ok com Vercel + Upstash Redis e publicação imediata (sem aprovação prévia)?

## 8. Arquivos

| Novo / alterado | Arquivo |
|---|---|
| alterado | `src/main.tsx`, `src/App.tsx` (rotas) |
| alterado | `src/pages/Home/Home.tsx` (nova seção), `src/locale/{pt,en}.json` |
| novo | `src/pages/Home/sections/Articles/Articles.tsx` |
| novo | `src/pages/Article/Article.tsx`, `src/pages/Article/blocks/*` |
| novo | `src/components/comments/{CommentForm,CommentList}.tsx` |
| novo | `src/data/articles/{index,abstraction-in-java}.ts` |
| novo | `api/comments.ts`, `vercel.json` |
| dep nova | `@upstash/redis` |
