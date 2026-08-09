# Handoff — Astro portfolio

Estado observado em 8 de agosto de 2026:

- a migração para Astro 5 e ClientRouter está materialmente presente;
- `npm run check` é o gate canônico de build e das duas suítes locais;
- SEO usa título e descrição específicos de cada rota e um `site` canônico centralizado no `astro.config.mjs`;
- o workflow é exclusivamente de qualidade e não contém etapas de Pages ou deploy;
- o snapshot local de auditoria permanece sem `.git`; a cópia publicável deve nascer de um clone do repositório remoto auto-inicializado;
- nenhum deploy, push ou publicação foi executado.

Os artefatos de auditoria em `.agents/`, o pedido original, notas `TEST_*`, dependências e builds não pertencem ao snapshot publicável. Merge e configuração de Pages continuam dependendo de aprovação separada.
