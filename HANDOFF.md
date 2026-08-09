# Handoff — Astro portfolio

Estado observado em 9 de agosto de 2026:

- a migração para Astro 5 e ClientRouter está materialmente presente;
- `npm run check` é o gate canônico de build e das duas suítes locais;
- SEO usa título e descrição específicos de cada rota e um `site` canônico centralizado no `astro.config.mjs`;
- `.github/workflows/quality.yml` continua sendo o gate de revisão e executa em pull requests;
- `.github/workflows/deploy-pages.yml` prepara a publicação por GitHub Actions, mas só executa em `push` para `main` ou `workflow_dispatch`, nunca em pull requests;
- todas as actions externas estão fixadas por SHA, com permissões restritas a `contents: read`, `pages: write` e `id-token: write`, concorrência serializada e environment `github-pages`;
- o snapshot local de auditoria permanece sem `.git`; a cópia publicável deve nascer de um clone do repositório remoto auto-inicializado;
- o GitHub ativou automaticamente Pages para o repositório público reservado `pedroivovasconcelos.github.io`; a API não permite desativá-lo, então o build type foi mantido em `workflow`;
- nenhum merge, despacho manual ou deploy do snapshot Astro foi executado.

Os artefatos de auditoria em `.agents/`, o pedido original, notas `TEST_*`, dependências e builds não pertencem ao snapshot publicável. Enquanto o PR permanecer aberto, o endereço público continua servindo apenas o conteúdo auto-inicializado de `main`. Merge ou despacho manual acionaria publicação e continua dependendo de aprovação separada.
