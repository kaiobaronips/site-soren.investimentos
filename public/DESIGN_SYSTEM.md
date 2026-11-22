# Design System — Soren Investimentos

> Documento de referência para design, conteúdo e implementação do site Soren.
> Estado documentado em 28 de agosto de 2026, com base nos componentes e estilos existentes.

## 1. Propósito

O design da Soren deve comunicar direção, clareza e confiança sem recorrer aos clichês visuais do mercado financeiro. A experiência combina sobriedade institucional com uma composição editorial: grandes títulos, espaços generosos, superfícies limpas, imagens humanas e interações discretas.

Este documento é a referência geral do sistema. Para regras exclusivamente relacionadas à aplicação de cores, consulte também [`PALETTE_GUIDELINES.md`](./PALETTE_GUIDELINES.md).

### Princípios

1. **Clareza antes de ornamentação.** A hierarquia deve nascer de tamanho, peso, espaço e contraste.
2. **Decisão como narrativa.** Textos e interfaces conduzem o usuário para uma próxima ação compreensível.
3. **Sofisticação silenciosa.** Evitar excesso de sombras, efeitos, animações e elementos decorativos.
4. **Consistência institucional.** Tokens e componentes existentes têm preferência sobre soluções locais.
5. **Acessibilidade por padrão.** Toda interação deve funcionar com teclado, foco visível e tecnologias assistivas.

---

## 2. Base técnica e fontes de verdade

- React 19 + TypeScript.
- Vite 7.
- Tailwind CSS 4, configurado em [`src/index.css`](./src/index.css).
- Conteúdo centralizado em [`src/content/site.ts`](./src/content/site.ts).
- Primitivos compartilhados em [`src/components/ui.tsx`](./src/components/ui.tsx).
- Componentes de página em `src/components/`.
- Mídia estática em `public/`.

Ordem de precedência para decisões de implementação:

1. tokens de `src/index.css`;
2. regras deste documento e de `PALETTE_GUIDELINES.md`;
3. componentes compartilhados existentes;
4. padrões recorrentes nos componentes de página;
5. nova solução local, somente quando os níveis anteriores não atendem ao caso.

---

## 3. Identidade visual

### 3.1 Paleta oficial

| Papel | Token Tailwind | Valor | Aplicação |
| --- | --- | --- | --- |
| Primária | `primary` | `#004849` | CTAs, ícones, foco, bordas ativas e superfícies institucionais |
| Card | `card` | `#F2F2F2` | Cards, formulários e blocos de apoio |
| Fundo | `background` | `#FFFFFF` | Fundo geral, seções e superfícies elevadas |
| Texto positivo | `positive` | `#000000` | Texto sobre superfícies claras |
| Texto negativo | `negative` | `#FFFFFF` | Texto sobre verde, preto, vídeo ou imagem escura |
| Acento | `accent` | `#B07A3E` | Ênfase pontual, progresso, marcações e estados autorizados |

Uso no código:

```tsx
<section className="bg-background text-positive" />
<article className="bg-card text-positive" />
<aside className="bg-primary text-negative" />
```

### 3.2 Regras de cor

- Usar somente os tokens oficiais. Não inserir hexadecimais nos componentes.
- Usar `background` como superfície padrão de seção e `card` para blocos de apoio.
- Criar hierarquia de texto com escala, peso e opacidade; não introduzir novos cinzas.
- Usar `primary` em ações, controles, indicadores, bordas ativas e foco.
- Usar `accent` com parcimônia. O bronze não é uma cor-base para corpo de texto.
- No header e no mega-menu, `accent` pode indicar hover, foco e seleção.
- Nos demais contextos, preferir mudança de opacidade; o bronze é permitido quando já fizer parte do padrão do componente, como progresso, marcador ou CTA editorial.
- Bordas claras usam principalmente `border-primary/15`, `/20` ou `/25`.
- Bordas sobre superfícies escuras usam `border-negative/10` a `/50`.
- Sombras, quando necessárias, devem derivar de `primary`, normalmente `shadow-primary/10` ou `/20`.
- Overlays sobre vídeo ou imagem devem derivar dos tokens existentes por opacidade.
- Não usar gradientes como recurso regular do sistema.

### 3.3 Combinações de superfície

| Contexto | Superfície | Texto | Borda/apoio |
| --- | --- | --- | --- |
| Página e seção padrão | `bg-background` | `text-positive` | `border-primary/15` |
| Card ou faixa secundária | `bg-card` | `text-positive` | `border-primary/15` |
| Bloco institucional | `bg-primary` | `text-negative` | `border-negative/15` |
| Hero com vídeo | vídeo + fallback `bg-primary` | `text-negative` | overlay quando necessário |
| Footer | `bg-positive` | `text-negative` | `border-negative/10` |

---

## 4. Tipografia

### 4.1 Famílias

| Papel | Família | Pesos disponíveis | Token/classe |
| --- | --- | --- | --- |
| Display e marca | Commuter Sans | 300, 400, 700 | `font-display`, `.t-display`, `.t-turn` |
| Corpo e interface | Helvetica Now Display | 300, 400, 500 | `font-sans` |

Fallbacks:

- Display: Arial, sans-serif.
- Corpo: Helvetica Neue, Arial, sans-serif.

As fontes são carregadas por `@font-face` em `src/index.css` com `font-display: swap`.

### 4.2 Estilos semânticos

#### Display principal — `.t-display`

- Commuter Sans, peso 400 por padrão.
- `line-height: 1.04`.
- `letter-spacing: -0.05em`.
- `text-wrap: balance`.
- Usado em títulos editoriais, chamadas e números expressivos.

#### Virada editorial — `.t-turn`

- Commuter Sans, peso 300.
- Usado para a segunda linha ou trecho de contraste dentro de um título.

#### Eyebrow — `.t-eyebrow`

- 11 px (`0.6875rem`).
- Peso 700, caixa alta.
- Reservado para rótulos curtos e institucionais.

#### Corpo

- Base: 16 px, peso 400.
- Corpo ampliado: 18–20 px em telas médias e grandes.
- `leading-relaxed` para leitura editorial.
- Usar `text-pretty` em parágrafos.

#### Interface e apoio

- Links, botões e campos: geralmente 14 px.
- Metadados e avisos: 10–12 px.
- Dados e numeração devem usar `tabular-nums`.

### 4.3 Escala recorrente

| Papel | Implementação recorrente |
| --- | --- |
| Hero / título máximo | `text-[clamp(2.45rem,4.2vw,3.95rem)]` |
| Título editorial grande | entre `clamp(2.35rem,4.7vw,4.4rem)` e `clamp(2.4rem,5vw,4.8rem)` |
| Título de seção compartilhado | `text-[clamp(2.15rem,4.5vw,4rem)]` |
| Título intermediário | entre `clamp(1.5rem,3vw,2.5rem)` e `clamp(1.9rem,3.8vw,3.35rem)` |
| Título de card | `text-2xl` a `text-4xl` |
| Corpo editorial | `text-base md:text-lg` |
| Corpo de apoio | `text-sm` |
| Legal/metadados | `text-xs` ou 10–11 px |

Não criar uma nova escala sem necessidade. Escolher primeiro o papel semântico mais próximo.

### 4.4 Regras tipográficas

- Títulos devem usar `text-balance`; parágrafos devem usar `text-pretty`.
- Evitar caixa alta fora de eyebrows e CTAs compactos.
- Evitar pesos excessivos. A voz da marca depende principalmente dos pesos 300–500.
- Não aplicar espaçamento entre letras por conveniência. As exceções existentes são o lockup da marca, CTAs compactos e alguns rótulos em caixa alta.
- Não usar apenas opacidade muito baixa em textos essenciais. Opacidades de 35–45% ficam restritas a informação secundária ou indisponível.

---

## 5. Layout e espaçamento

### 5.1 Container

O container principal tem largura máxima de **1380 px**:

```tsx
<div className="mx-auto w-full max-w-[1380px]" />
```

Margens laterais responsivas:

| Faixa | Padding horizontal |
| --- | --- |
| Base | `px-5` — 20 px |
| `md` | `md:px-8` — 32 px |
| `xl` | `xl:px-10` — 40 px |

### 5.2 Seções

O primitivo `Section` define o padrão:

```tsx
<section className="relative scroll-mt-28 bg-background px-5 py-20 md:px-8 md:py-28 xl:px-10">
  <div className="mx-auto w-full max-w-[1380px]">...</div>
</section>
```

- Espaçamento vertical: 80 px no mobile e 112 px a partir de `md`.
- Offset de âncora: `scroll-mt-28`, compatível com o header fixo.
- Usar `className` apenas para variações de superfície ou necessidades estruturais justificadas.

### 5.3 Breakpoints

O projeto usa os breakpoints padrão do Tailwind CSS:

| Prefixo | Largura mínima | Uso típico no site |
| --- | ---: | --- |
| `sm` | 640 px | pequenos ajustes de modal e mídia |
| `md` | 768 px | tipografia ampliada, grids de 2 colunas e paddings maiores |
| `lg` | 1024 px | composições editoriais, sticky, sobreposição e grids assimétricos |
| `xl` | 1280 px | navegação desktop, mega-menu e padding máximo |
| `2xl` | 1536 px | ajustes pontuais da experiência orbital |

O site é mobile-first. A experiência não deve depender de hover para revelar informação essencial.

### 5.4 Grid e composição

- Preferir `grid` para relações editoriais de duas ou mais áreas.
- Grids assimétricos existentes usam proporções como `0.8fr/1.2fr`, `0.9fr/1.1fr` e `1.25fr/0.75fr`.
- Gaps principais variam de 32 a 96 px (`gap-8` a `gap-24`) conforme a densidade.
- Divisores de 1 px substituem sombras em listas, acordes e sequências.
- Blocos de mídia podem ocupar a largura total do card, sempre com `object-cover` e dimensões estáveis para evitar salto de layout.
- Para altura de viewport, usar `dvh`, como em `min-h-dvh`; não usar `h-screen`.
- Elementos fixos inferiores devem respeitar `env(safe-area-inset-bottom)`.

### 5.5 Forma, bordas e sombras

- A composição principal é ortogonal: cards editoriais, painéis e modais têm cantos retos.
- Pílulas (`rounded-full`) são reservadas para CTAs, controles compactos, avatares e ícones circulares.
- O formulário de contato usa `rounded-2xl` como exceção vigente.
- Bordas finas têm prioridade sobre sombra.
- Sombras são discretas e funcionais, usadas hoje no header, formulário e botão flutuante.

### 5.6 Camadas

Escala de `z-index` atualmente usada:

| Camada | Valor | Exemplo |
| --- | ---: | --- |
| Conteúdo local | `z-10` | rodapé sticky do diagnóstico |
| Ação flutuante | `z-40` | WhatsApp FAB |
| Navegação fixa | `z-50` | Header |
| Modal | `z-[70]` | Overlay e painel modal |

Novas camadas devem reutilizar essa escala; evitar valores arbitrários adicionais.

---

## 6. Componentes

### 6.1 Primitivos compartilhados

#### `Section`

Responsável pelo container, paddings, offset de âncora e superfície padrão. É a base para novas seções.

#### `SectionHead`

Título editorial com até duas linhas (`linha1` + `virada`), texto opcional e alinhamento central opcional. Usar em introduções de seção quando a composição aceitar largura máxima de 2xl.

#### `Reveal`

Atualmente é um wrapper estrutural sem animação. O parâmetro `delay` é aceito por compatibilidade, mas não produz efeito. Não presumir entrada animada.

### 6.2 Navegação

#### Header

- Fixo no topo, com altura de 104 px no início e 80 px após scroll.
- Sobre o hero: transparente, texto e marca negativos.
- Após scroll ou abertura de menu: fundo branco, texto positivo, borda e sombra discretas.
- Navegação desktop completa a partir de `xl`.
- Menu mobile abaixo de `xl`, com rolagem e safe area inferior.
- Mega-menu usa duas colunas, descrição editorial e links agrupados.
- Todo botão somente com ícone precisa de `aria-label`.

#### Footer

- Fundo preto (`positive`) e texto branco (`negative`).
- Quatro áreas em desktop: Soren, Para você, Para sua empresa e atendimento.
- Inclui redes sociais, texto regulatório e links legais.
- Links secundários podem usar `text-negative/45`, com hover em `accent`.

### 6.3 Ações

#### CTA primário

```tsx
<button className="rounded-full bg-primary px-6 py-4 text-sm font-bold text-negative transition-opacity duration-200 hover:opacity-85">
  Iniciar diagnóstico
</button>
```

- Verde sólido sobre superfícies claras.
- Texto branco, peso 700.
- Pílula quando o CTA é independente; versão retangular compacta é usada dentro do modal de abertura.
- Hover preferencial por opacidade. O bronze é permitido nas variações editoriais já existentes.

#### CTA secundário

```tsx
<a className="rounded-full border border-primary/25 px-6 py-3 text-sm text-positive transition-colors duration-200 hover:border-primary hover:text-primary">
  Descobrir meu momento
</a>
```

- Fundo transparente.
- Borda de baixa opacidade.
- Pode incluir seta com deslocamento horizontal de até `translate-x-1`.

#### Botão de ícone

- Área mínima recorrente de 44–48 px (`size-11` ou `size-12`).
- Forma circular quando isolado.
- Ícone decorativo com `aria-hidden="true"` e nome acessível no botão.

### 6.4 Cards e listas interativas

- Cards padrão usam `bg-card`; cards selecionados podem inverter para `bg-primary text-negative`.
- Grupos sequenciais compartilham bordas para formar uma única estrutura visual.
- Estado ativo deve ser perceptível por cor, texto e atributo ARIA (`aria-pressed` ou `aria-expanded`).
- Ícones “+” podem girar 45° para comunicar abertura/fechamento.
- Acordeões devem manter resumo e título no gatilho e associar o conteúdo com `aria-controls`.
- Não esconder informação essencial exclusivamente em hover.

Padrões existentes:

- `Metodo`: seletor em grade + painel de detalhe.
- `Caminho`: lista de etapas + imagem e progresso.
- `Solucoes`: acordeão de verticais.
- `Niveis`: cards selecionáveis + lista de focos.
- `EquipeOrbit`: carrossel/órbita com controles anterior e próximo e anúncio `aria-live`.

### 6.5 Formulários

- Labels sempre visíveis e associados ao campo.
- Campos usam fundo transparente e borda inferior `border-primary/20`.
- Foco troca a borda para `primary` e mantém indicação visual clara.
- Placeholder usa `text-positive/35` ou `/45`.
- Texto de campo: 14 px.
- Textarea pode ser redimensionada apenas quando a composição permitir; o formulário atual usa `resize-none`.
- Erros e confirmação aparecem próximos à ação em uma região `aria-live="polite"`.
- Estado de envio desabilita o CTA e preserva feedback textual.
- Nunca bloquear colagem em inputs ou textareas.
- Inputs numéricos ou dados financeiros devem usar `tabular-nums`.

### 6.6 Modais

O `ModalShell` é a casca obrigatória dos fluxos atuais:

- variante central: painel de até 560 px, quadrado a partir de `sm`;
- variante lateral: painel de até 560 px, alinhado à direita e com rolagem própria;
- fundo preto a 70%;
- painel branco levemente translúcido, sem sombra e com barra verde superior de 6 px;
- fechamento por botão, clique no overlay e tecla `Escape`;
- foco preso dentro do diálogo, scroll da página bloqueado e foco devolvido ao elemento anterior;
- `role="dialog"`, `aria-modal="true"` e `aria-labelledby` obrigatórios.

Novos diálogos complexos devem preferir uma primitiva acessível consolidada. A implementação manual atual deve ser mantida somente enquanto o projeto não adotar uma biblioteca de primitivas.

### 6.7 Mídia

- Imagens informativas precisam de `alt` descritivo.
- Marcas redundantes em links já nomeados podem usar `alt=""` e `aria-hidden="true"`.
- Vídeos de ambientação devem ser mudos, inline, em loop e `aria-hidden`.
- Vídeos com conteúdo devem oferecer controles e poster.
- Usar `loading="lazy"` em imagens fora da primeira dobra.
- Preservar uma superfície de fallback (`bg-primary`, `bg-positive` ou `bg-card`) durante o carregamento.

---

## 7. Interação e movimento

### 7.1 Padrão

- Feedbacks de hover, foco e seleção: até **200 ms**.
- Entradas curtas: `ease-out`.
- Animar somente `transform` e `opacity` sempre que possível.
- Setas deslocam no máximo 4 px (`translate-x-1`).
- Indicadores e linhas usam `scaleX` com origem à esquerda.
- Não animar propriedades de layout em novos componentes.
- Não adicionar animação apenas como decoração.

### 7.2 Redução de movimento

`src/index.css` já cobre `prefers-reduced-motion: reduce`:

- remove scroll suave;
- reduz duração de animações e transições a um valor efetivamente instantâneo;
- limita animações a uma iteração.

Qualquer nova animação precisa continuar legível quando esse modo estiver ativo. Loops devem pausar fora da viewport.

### 7.3 Exceções vigentes

O sistema contém animações mais longas em áreas específicas:

- header: transição de altura em 300 ms;
- mega-menu: algumas transições em 400 ms;
- modal lateral: entrada em 420 ms;
- modal central: entrada em 900 ms com atraso de 120 ms;
- saída dos modais: 320 ms.

Esses valores descrevem o produto atual, mas não devem ser copiados para novos feedbacks de interface. Mudanças futuras devem convergir interações para até 200 ms, preservando apenas movimentos narrativos que tenham justificativa explícita.

---

## 8. Acessibilidade

### 8.1 Foco e teclado

- O foco global usa contorno `primary` de 2 px, offset de 3 px e raio de 3 px.
- Não remover foco sem fornecer alternativa equivalente.
- Todo controle deve ser alcançável e operável por teclado.
- Hover e foco devem apresentar estados equivalentes.
- Componentes compostos devem seguir padrões ARIA apropriados.

### 8.2 Semântica

- Manter uma única hierarquia lógica de títulos, começando pelo `h1` do hero.
- Usar `button` para ações e `a` para navegação.
- Estados binários usam `aria-pressed`; conteúdo expansível usa `aria-expanded` e `aria-controls`.
- Diálogos precisam de nome acessível.
- Atualizações assíncronas e mudanças importantes podem usar `aria-live="polite"`.
- Elementos puramente decorativos usam `aria-hidden="true"`.

### 8.3 Contraste e legibilidade

- Texto principal sobre claro: `positive`.
- Texto principal sobre escuro: `negative`.
- Opacidade reduzida só em conteúdo secundário; revisar contraste de textos pequenos antes da publicação.
- Não depender apenas de cor para comunicar erro, seleção ou progresso.
- Alvos de toque devem se aproximar de 44 × 44 px ou mais.

### 8.4 Conteúdo e preferências do usuário

- Respeitar `prefers-reduced-motion`.
- Não bloquear zoom, seleção ou colagem.
- Manter mensagens de erro específicas e perto do campo ou ação afetada.
- Empty states devem oferecer uma próxima ação clara.

---

## 9. Voz e conteúdo

### Personalidade verbal

- Filosófica, precisa e segura.
- Centrada em decisão, direção, patrimônio e tempo — não em produto ou promessa.
- Próxima sem ser informal; institucional sem ser burocrática.
- Frases curtas podem funcionar como aforismos, seguidas de explicação objetiva.

### Regras editoriais

- Evitar promessas de rentabilidade, superlativos vagos e urgência artificial.
- Não publicar estimativas como fatos.
- Diferenciar claramente assessoria, custódia, gestão e decisão do investidor.
- CTAs devem nomear a ação: “Iniciar diagnóstico”, “Fale conosco”, “Converse com a Soren”.
- Alt text descreve o conteúdo e a função da imagem, sem repetir texto adjacente.
- Conteúdo institucional ou regulatório marcado como `PREENCHER` deve ser validado antes da publicação.

---

## 10. Padrões de implementação

### Preferir

- tokens semânticos (`bg-primary`) em vez de valores brutos (`bg-[#004849]`);
- componentes compartilhados antes de duplicar estruturas;
- classes Tailwind padrão e valores arbitrários apenas quando já sustentados pelo layout;
- `size-*` para elementos quadrados;
- lógica de renderização direta em vez de efeitos quando possível;
- `text-balance`, `text-pretty` e `tabular-nums` conforme o tipo de conteúdo;
- transições explícitas, como `transition-[opacity,transform]`, em vez de `transition-all`.

### Evitar

- novas cores ou tons fora dos seis tokens oficiais;
- gradientes, glows e grandes superfícies com blur;
- misturar sistemas de primitivas acessíveis na mesma interação;
- valores arbitrários de `z-index`;
- animações de largura, altura, margem, padding ou posição;
- sombras fortes como principal forma de hierarquia;
- cards arredondados por padrão;
- criar comportamento de teclado e foco manualmente quando uma primitiva acessível adequada estiver disponível.

### Classes utilitárias de referência

```tsx
// Seção
<Section id="exemplo" className="bg-card">...</Section>

// Título editorial
<h2 className="t-display text-balance text-[clamp(2.15rem,4.5vw,4rem)] text-positive">
  Clareza para decidir.
</h2>

// Corpo
<p className="max-w-xl text-pretty text-base leading-relaxed text-positive md:text-lg">
  Estratégia para construir e acompanhamento para sustentar.
</p>

// Divisor
<div className="h-px bg-primary/20" />

// Superfície invertida
<article className="bg-primary p-8 text-negative md:p-12">...</article>
```

---

## 11. Exceções e dívida visual observada

Estas observações não alteram automaticamente o código, mas devem orientar futuras revisões:

- `OfficeAmbience.tsx` contém gradientes e cores RGBA diretas. O componente não está conectado à árvore atual da aplicação e deve ser tratado como experimento/legado, não como referência do sistema.
- `SorenMark.tsx` e `MostradorTicks.tsx` também não estão conectados à página atual; os logos publicados são `logo1.png` e `logo2.png`.
- Há tracking arbitrário em CTAs compactos e no hero. Preservar somente as exceções existentes; não expandir o padrão.
- O formulário de contato usa `rounded-2xl`, enquanto a maior parte da linguagem editorial usa cantos retos.
- O modal implementa foco manualmente e tem durações superiores ao padrão de interação. Uma futura migração deve adotar uma primitiva acessível única e revisar o motion.
- `Reveal` não anima no estado atual, apesar de aceitar `delay`. Não documentar nem usar esse parâmetro como promessa visual.

---

## 12. Checklist antes de publicar

### Visual

- [ ] Usa apenas `primary`, `card`, `background`, `positive`, `negative` e `accent`.
- [ ] Não contém hexadecimais ou novos tons dentro de componentes.
- [ ] Cards usam `bg-card`; seções padrão usam `bg-background`.
- [ ] Texto usa o token correto para a superfície.
- [ ] Bronze aparece apenas como acento autorizado.
- [ ] Títulos usam `text-balance` e corpo usa `text-pretty`.
- [ ] O layout funciona nos breakpoints `sm`, `md`, `lg`, `xl` e, quando aplicável, `2xl`.

### Interação

- [ ] Hover, foco, ativo, carregamento, sucesso, erro e desabilitado estão definidos quando aplicáveis.
- [ ] Feedbacks comuns não ultrapassam 200 ms.
- [ ] Movimento usa principalmente `transform` e `opacity`.
- [ ] A interface continua compreensível com movimento reduzido.
- [ ] Elementos fixos respeitam safe areas.

### Acessibilidade

- [ ] Toda ação funciona com teclado.
- [ ] Foco é visível e não fica oculto pelo header.
- [ ] Botões de ícone têm nome acessível.
- [ ] Imagens têm `alt` adequado e decoração está oculta.
- [ ] Estados expansíveis/selecionáveis expõem ARIA correspondente.
- [ ] Erros aparecem perto da ação e são anunciados quando necessário.
- [ ] Textos pequenos e com opacidade reduzida mantêm contraste suficiente.

### Conteúdo e compliance

- [ ] Nenhum campo `PREENCHER` necessário permanece vazio.
- [ ] Contatos e links sociais estão configurados.
- [ ] Textos regulatórios foram revisados pela área responsável.
- [ ] Nenhuma promessa, estimativa ou vínculo institucional não confirmado foi publicado como fato.

---

## 13. Manutenção do sistema

Ao introduzir um novo padrão recorrente:

1. confirmar que ele não pode ser resolvido por um token ou componente existente;
2. validar acessibilidade, responsividade e estados;
3. extrair o padrão para `src/components/ui.tsx` ou outro componente compartilhado quando houver pelo menos dois usos reais;
4. adicionar ou ajustar tokens em `src/index.css`, evitando valores locais;
5. atualizar este documento e, se envolver cor, `PALETTE_GUIDELINES.md`;
6. verificar a aplicação em mobile, desktop, teclado e movimento reduzido.

O objetivo do sistema não é congelar o site. É permitir evolução sem perder a identidade Soren.
