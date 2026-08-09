# Portfólio pessoal

Site estático de Pedro Ivo Vasconcelos reconstruído em Astro 5. A página apresenta produtos e áreas de atuação, inclui tema claro/escuro persistente, metadados estruturados, rota 404 e navegação com o `ClientRouter`/View Transitions do Astro.

Este snapshot foi preparado para revisão no repositório público `pedroivovasconcelos/pedroivovasconcelos.github.io`. O domínio canônico configurado é `https://pedroivovasconcelos.github.io`, mas GitHub Pages e qualquer outro deploy permanecem desativados até aprovação explícita posterior.

## Estrutura

- `src/components/` — componentes Astro da página.
- `src/layouts/Layout.astro` — shell, SEO, dados estruturados e ClientRouter.
- `src/scripts/theme.js` — persistência e reidratação do tema após transições.
- `src/pages/` — página inicial e erro 404.
- `public/` — `robots.txt` e `sitemap.xml`.
- `tests/` — verificação do artefato e testes empíricos de transição, tema e acessibilidade.
- `SNAPSHOT_INVENTORY.md` — fronteira exata entre o conteúdo revisável e os artefatos locais excluídos.

## Desenvolvimento e validação

Pré-requisito: Node.js 20 ou mais recente.

```bash
npm ci
npm run dev
```

Antes de qualquer publicação, execute o gate local completo:

```bash
npm run check
```

O comando gera o site estático em `dist/` e executa as duas suítes. Ele valida estrutura, metadados, acessibilidade básica, ClientRouter e persistência de tema no artefato compilado; não substitui uma revisão visual em navegadores reais.

## Publicação futura

O workflow `.github/workflows/quality.yml` apenas executa `npm run check`; ele não configura Pages, não monta artefato de deploy e não publica o site. Uma eventual publicação exige uma mudança separada, revisada e explicitamente autorizada. Antes dela:

1. confirmar que o endereço canônico, o sitemap e os links públicos estão corretos;
2. revisar conteúdo e privacidade;
3. decidir se e como GitHub Pages será configurado;
4. autorizar explicitamente merge e publicação.

## Limites de privacidade

O site não contém e-mail, telefone, localização, empregador, clientes, métricas ou links para repositórios privados. Qualquer novo conteúdo deve manter essa fronteira até aprovação explícita.
