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

O site usa quatro cores semânticas centralizadas. As regras completas estão em
[`PALETTE_GUIDELINES.md`](PALETTE_GUIDELINES.md).

| Token | Hex | Papel |
| --- | --- | --- |
| `primary` | `#004849` | CTAs, estados ativos e superfícies institucionais |
| `card` | `#F2F2F2` | cards, formulários e blocos de apoio |
| `background` | `#FFFFFF` | fundo geral e superfícies claras |
| `positive` | `#000000` | textos sobre superfícies claras |
| `negative` | `#FFFFFF` | textos sobre verde, vídeo ou imagens escuras |
| `accent` | `#B07A3E` | detalhes e animações autorizados |

### Tipografia

Dupla tipográfica institucional do projeto:

| Fonte | Papel |
| --- | --- |
| **Commuter Sans** | headlines e títulos (`.t-display` e `.t-turn`) |
| **Helvetica Now Display** | textos, menus, botões e etiquetas |

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
