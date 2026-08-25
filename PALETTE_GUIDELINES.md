# Guideline de paleta — Soren

## Paleta oficial

| Papel | Token | Cor | Uso principal |
| --- | --- | --- | --- |
| Primária | `primary` | `#004849` | CTAs, ícones, foco, bordas ativas e superfícies institucionais |
| Cards | `card` | `#F2F2F2` | Cards, formulários e blocos de apoio |
| Background | `background` | `#FFFFFF` | Fundo geral, seções e superfícies elevadas |
| Texto positivo | `positive` | `#000000` | Todo texto sobre superfícies claras |
| Texto negativo | `negative` | `#FFFFFF` | Todo texto sobre verde, vídeo ou imagem escura |
| Acento | `accent` | `#B07A3E` | Detalhes e animações autorizados explicitamente |

## Regras de aplicação

1. Use somente os tokens definidos em `src/index.css`. Não adicione cores hexadecimais diretamente nos componentes.
2. O fundo padrão de páginas e seções é `background`. Não use tons intermediários para alternar seções.
3. Todo elemento visual tratado como card deve usar `card`.
4. Em superfícies claras, todo texto usa `positive`. Hierarquia tipográfica deve ser criada por tamanho, peso e opacidade.
5. `primary` é reservado para ações, controles, ícones, indicadores, bordas ativas e estados de foco.
6. Em superfícies `primary`, vídeos ou imagens escuras, todo texto usa `negative`.
7. O header segue a superfície: branco sobre hero e preto quando estiver sobre fundo claro.
8. O bronze `accent` não é uma cor-base de texto. Só pode ser usado quando solicitado explicitamente.
9. Exceção vigente: textos e barras do header e dropdown mudam para `accent` no hover e no foco.
10. Outros estados de hover devem variar opacidade sem introduzir novas cores de texto.
11. Bordas usam `primary` com baixa opacidade. Sombras, quando necessárias, também derivam de `primary` com opacidade.
12. Overlays sobre vídeo ou imagem usam `primary` com opacidade.
13. Variações por opacidade são permitidas; novas cores e tons derivados não são permitidos.

## Tokens no código

```css
--color-primary: #004849;
--color-card: #f2f2f2;
--color-background: #ffffff;
--color-positive: #000000;
--color-negative: #ffffff;
--color-accent: #b07a3e;
```

Classes preferenciais: `bg-primary`, `bg-card`, `bg-background`, `text-positive`, `text-negative`, `text-accent`, `border-primary/20` e `shadow-primary/10`.

## Verificação antes de publicar

- Confirmar que não existem cores hexadecimais fora de `src/index.css`.
- Confirmar que cards usam `bg-card` e seções usam `bg-background`.
- Confirmar que textos sobre fundos claros usam `text-positive`.
- Confirmar que textos sobre verde, vídeo ou imagem escura usam `text-negative`.
- Confirmar que `text-accent` aparece somente em usos autorizados.
- Confirmar foco visível em links, botões e campos.
- Revisar contraste de textos pequenos antes da publicação.
