# Soren Investimentos — site institucional

Site de credibilidade institucional da Soren, assessoria de investimentos
autônoma multiprodutos.

## Rodar

```bash
npm install
npm run dev
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento em `localhost:5173` |
| `npm run build` | Typecheck + build de produção em `dist/` |
| `npm run preview` | Serve o build localmente |

## Stack

Vite 7 · React 19 · TypeScript · Tailwind CSS 4

## Identidade visual

Derivada de `Guideline SOREN.pptx` (Brand Guidelines — Linguagem Visual), nesta
mesma pasta. Os tokens vivem em [`src/index.css`](src/index.css).

### Paleta

Principal **dark green**, secundária **degradê bronze** — extraída do site em
produção (`soreninvestimentos.com.br`), não do `Guideline SOREN.pptx`. Ver
"Conflito de identidade" abaixo.

| Token | Hex | Papel |
| --- | --- | --- |
| `void` | `#050E0B` | base, verde quase preto |
| `forest` | `#0F2A20` | verde escuro — cor primária |
| `forest-lit` | `#16382A` | superfície elevada |
| `forest-line` | `#1E4636` | traço sobre verde |
| `bronze` | `#C9A876` | acento — paleta secundária |
| `bronze-lit` | `#E3CBA0` | topo do degradê |
| `bronze-deep` | `#8C6F45` | base do degradê |
| `bone` | `#F1ECE0` | texto sobre escuro |

O degradê bronze está nas utilidades `.bronze-gradient` (fundo) e
`.bronze-text` (texto) em `src/index.css`.

### Tipografia

Mesma dupla do site em produção, ambas no Google Fonts:

| Fonte | Papel |
| --- | --- |
| **Sora** | títulos (`.t-display`) e a virada em itálico leve (`.t-turn`) |
| **Inter** | corpo, menus, botões e etiquetas |

### Conflito de identidade — resolver

O `Guideline SOREN.pptx` desta pasta é o **Brand Guidelines da Akros Capital
Group / RTX S.A Holding**. Ele especifica outra paleta (creme, cinza, terracota,
bordô) e outras fontes (Almarena Neue, Helvetica Neue, Classico) — nada disso
bate com o site em produção da Soren.

O site segue o **site em produção**, que é a fonte viva da marca. Se o guideline
for a referência correta, é ele que precisa ser atualizado — não este código.

### Logo

`src/components/SorenMark.tsx` é uma marca **provisória** em vetor, no lockup do
site atual: SOREN em caixa alta com tracking largo, ponto bronze, INVESTIMENTOS
abaixo. Os arquivos oficiais estão na pasta raiz do projeto, fora do escopo desta
pasta — substituir quando forem movidos para cá.

## Antes de publicar

Tudo que precisa de dado real está marcado com `PREENCHER`:

```bash
grep -rn "PREENCHER" src/
```

O essencial:

1. **`src/content/site.ts`** — WhatsApp, e-mail, telefone, endereço, redes,
   razão social, CNPJ e a corretora parceira.
2. **`src/components/Contato.tsx`** — `ENDPOINT` do formulário. Vazio, o form
   redireciona para o WhatsApp em vez de fingir que enviou.
3. **Indicadores** (`indicadores` em `site.ts`) — patrimônio sob assessoria,
   famílias atendidas, anos de mercado. Enquanto `valor` estiver vazio a seção
   não renderiza, de propósito: número estimado publicado como fato é risco de
   compliance.
4. **Vídeo do hero** — ver `public/README-midia.md`. Sem o arquivo, o hero usa a
   ambientação em camadas de `OfficeAmbience.tsx`.
5. **Aviso regulatório no rodapé** — texto-base para escritório credenciado sob a
   Resolução CVM 178/2023. Precisa de revisão jurídica e, normalmente, de
   aprovação prévia do compliance da corretora parceira antes de ir ao ar.
6. **Política de privacidade e Termos de uso** — os links do rodapé apontam para
   `#`.

## Deploy

`vercel.json` já está configurado para Vite. Basta apontar o projeto da Vercel
para esta pasta.
