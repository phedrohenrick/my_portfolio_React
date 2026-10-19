# Plano — Ondas interativas no Hero

> Status: **aguardando aprovação** · Criado em 19/10/2026

## Objetivo

As ondas do hero passam a **reagir ao usuário**:

- **Desktop:** ao passar o mouse sobre as ondas, a água "segue" o cursor, subindo de leve perto dele, como se o mouse empurrasse a superfície.
- **Celular (e clique no desktop):** ao tocar, nasce uma **marola**, um pulso que se espalha para os dois lados pelas camadas de onda e vai perdendo força.

O visual atual se mantém: as mesmas 10 camadas, as mesmas cores (`#144146` → `#eef7f7`), a mesma altura e o mesmo balanço contínuo. A última onda continua emendando com a base clara do site.

## Por que precisa mudar a técnica

Hoje as ondas são o arquivo `AnimatedBackground.svg` aplicado como `background-image`. Uma imagem de fundo **não recebe eventos** de mouse nem de toque, e a animação interna dela não pode ser controlada pelo código.

## Como vai ser feito

1. **Novo componente `OceanWaves`** (`src/components/ui/OceanWaves.tsx`), que desenha as ondas num `<canvas>` no lugar do SVG de fundo.
2. **10 camadas** com as mesmas cores e as mesmas linhas de base do SVG atual (de y≈380 a y≈513, na proporção original de 1366×633).
3. **Balanço contínuo:** cada camada é uma soma de senoides com velocidade própria. As do fundo são lentas e as da frente mais rápidas, como no SVG, em que os ciclos vão de 25s a 2,5s.
4. **Física da interação:** cada camada guarda uma "superfície de molas", em colunas a cada ~8px. É a técnica clássica de água 2D: cada coluna é uma mola, e a energia se propaga para as vizinhas e se dissipa aos poucos.
   - **Hover:** aplica uma força suave e contínua na coluna sob o cursor. As camadas da frente reagem mais e as do fundo menos, o que dá profundidade.
   - **Toque ou clique:** aplica um impulso forte no ponto tocado, gerando a marola que se espalha.
5. **Não atrapalha o resto do hero:** os eventos são escutados no hero inteiro, sem bloquear os botões, os links ou a rolagem da página no celular.

## Desempenho e acessibilidade

- Animação com `requestAnimationFrame`, densidade de pixels limitada a 2× e **pausa automática** quando o hero sai da tela ou a aba fica em segundo plano.
- **`prefers-reduced-motion`:** as ondas aparecem paradas, sem animação nem interação, como hoje.
- O canvas é decorativo (`aria-hidden`).
- O `AnimatedBackground.svg` fica no projeto como referência, mas deixa de ser usado no hero.

## Arquivos

| Arquivo | Mudança |
|---|---|
| `src/components/ui/OceanWaves.tsx` | **Novo**: canvas, camadas, física e eventos |
| `src/pages/Home/sections/Hero/Hero.tsx` | Troca a `div` com o SVG de fundo por `<OceanWaves />` |

## Ajustes finos (constantes no topo do componente)

- Força do hover e do toque.
- Velocidade de propagação e de amortecimento da marola.
- Quanto cada camada reage (frente × fundo).

## Verificação

- `npm run build` e `npm run lint` passando.
- Conferência visual no navegador: desktop (hover e clique) e celular (toque).
