# Visual e responsividade

O acabamento Liquid Glass fica restrito aos cards de imagens e legendas do carrossel **Treinamentos em Ação** (`#carrossel`). A seção de projetos usa cards sólidos com fotos destacadas, textos em fluxo e uma, duas ou três colunas. As demais seções preservam a identidade original.

- `src/styles/liquid-glass.css`: material do carrossel, com seletores e variáveis limitados à seção; alternativa opaca para redução de transparência e navegadores sem suporte a desfoque.
- `src/styles/responsive.css`: encaixe dos cards, logo, menu com rolagem, modal limitado à altura disponível, espaçamento do hero e foco visível. Essas regras são independentes do efeito de vidro.
- Com movimento reduzido, o carrossel pode ser percorrido horizontalmente sem animação automática.
- `src/styles/interactions.css`: cursores, estados de interação, animação ao rolar e layout dos projetos. O seletor de idiomas possui navegação por teclado, fechamento por Escape ou clique externo e opções com áreas de toque de 48 px.
- Traduções em português, inglês, espanhol e chinês simplificado; preferência salva localmente e atributo `lang` atualizado.

Execute `npm.cmd run dev` e abra http://localhost:3000. Os testes em `tests/e2e` verificam larguras de 320 a 2560 px, celular na horizontal, menu, modal, idiomas, toque e preferências de acessibilidade.

O backup anterior ao acabamento global está em `docs/backups/antes-liquid-glass.zip`.
