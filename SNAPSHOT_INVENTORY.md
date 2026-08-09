# Inventário do snapshot público

Revisado em 9 de agosto de 2026 para o primeiro pull request de `pedroivovasconcelos/pedroivovasconcelos.github.io`.

## Incluído

- aplicação Astro em `src/`;
- arquivos públicos estritamente necessários em `public/`;
- testes automatizados em `tests/`;
- `astro.config.mjs`, `tsconfig.json`, `package.json` e `package-lock.json`;
- workflow de revisão `.github/workflows/quality.yml` e workflow controlado de Pages `.github/workflows/deploy-pages.yml`, com actions fixadas por SHA;
- `README.md`, `HANDOFF.md`, `.gitignore` e este inventário.

## Excluído

- `.agents/` e seus briefings, análises e logs de orquestração;
- `ORIGINAL_REQUEST.md`, `TEST_INFRA.md` e `TEST_READY.md`;
- `node_modules/`, `.astro/` e `dist/`;
- logs, arquivos `.env` e qualquer configuração local.

Esses itens continuam no diretório local de auditoria, mas não fazem parte do repositório público.

## Privacidade e publicação

O site publica apenas o nome de Pedro, descrição profissional, projetos já públicos e o perfil público do LinkedIn. Não inclui e-mail, telefone, localização exata, empregador, clientes, métricas privadas, repositórios privados, credenciais ou detalhes internos de infraestrutura.

O repositório é público para revisão de código, mas isso não autoriza merge ou deploy. O workflow de Pages não executa em pull requests: somente um `push` em `main` após merge ou um despacho manual pode publicar. O GitHub ativou Pages automaticamente por este ser o repositório público reservado do usuário; o snapshot Astro permanece não publicado e merge ou despacho manual exigem decisão separada.
