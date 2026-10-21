# Scrollcraft: Conceitos de Scrollytelling para o Portfólio Pessoal & Acadêmico
*(Baseado no estudo de Nate Herk e referências de design editorial/Awwwards)*

## 1. Visão Geral
Este documento traz as especificações de design para elevar o site `pedroivovasconcelos.github.io` (desenvolvido em Astro 5 com `ClientRouter` e View Transitions) de um site estático elegante para uma experiência editorial imersiva e de alto impacto visual.

---

## 2. Gramáticas Escolhidas

### A. Typographic Poster (No Hero Pessoal)
- **Conceito:** A tipografia monumental é a protagonista visual.
- **Implementação:**
  - O nome e o posicionamento usam `clamp(3.5rem, 10vw, 11rem)` com fontes de proporção geométrica refinada.
  - Ao iniciar a rolagem, as letras sofrem um leve aumento de tracking (`letter-spacing`) e uma transição suave de opacidade, cedendo espaço para a síntese biográfica e de atuação.
  - Sem necessidade de fotografias clichês de banco de imagens; a própria arquitetura tipográfica comunica autoridade e rigor.

### B. Chaptered Editorial (Na Seção de Produtos & Áreas de Atuação)
- **Conceito:** Ritmo de livro de design e ensaio visual aprofundado.
- **Implementação:**
  - Capítulos ancorados (`sticky top-20`) com numeração serifada clássica (`01 / FAROLIO`, `02 / QUANTORIN`, `03 / STERNA`).
  - Conforme o leitor percorre a tese de cada produto, o capítulo correspondente se ilumina, mantendo o contexto de navegação permanente.
  - Linhas de texto com métrica de leitura ideal (`max-w-prose`), garantindo legibilidade impecável tanto no tema claro quanto no escuro.

### C. Gallery com Deslocamento Horizontal
- **Conceito:** Vitrine contemporânea de produtos e patentes/papers.
- **Implementação:**
  - Os produtos e sistemas são apresentados em cartões com elevação sutil e bordas finas com acabamento de vidro fosco (`backdrop-blur`).
  - O scroll vertical aciona uma translação X suave nos cards, simulando uma visita a uma galeria de arquitetura.

---

## 3. Signature Move: "The Editorial Inversion"
- Ao transitar da introdução para a área técnica profunda de cada produto, o fundo realiza uma inversão cromática suave e contextual, destacando os diagramas arquiteturais e mantendo a taxa de contraste em conformidade estrita com as diretrizes de acessibilidade WCAG AAA.
