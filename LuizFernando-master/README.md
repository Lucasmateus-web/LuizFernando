# CONS.TREIN — visual original com Liquid Glass

O site preserva a identidade original restaurada de `LuizFernando-master.zip`, com responsividade e acabamento Liquid Glass apenas no carrossel de imagens “Treinamentos em Ação”. Os projetos usam cards renovados com superfícies sólidas, e o cabeçalho inclui um seletor de idiomas. Conteúdo, identidade, fotos, vídeos, carrosséis e ordem das seções foram mantidos.

Os ajustes de layout estão em `src/styles/responsive.css`; o vidro do carrossel está em `src/styles/liquid-glass.css`. As fontes originais Outfit e Plus Jakarta Sans são servidas localmente por `src/styles/fonts.css`, com arquivos e licenças em `public/fonts/`.

- Cards do carrossel com reflexos discretos e legendas sobre vidro escuro.
- Cabeçalho, botões, painéis e modal com os estilos anteriores ao acabamento global.
- Foco visível, alternativa opaca para redução de transparência/maior contraste e redução das animações CSS conforme a preferência do navegador.

- Menu recolhido até 1023 px para evitar sobreposição com o logo.
- Painel do menu com rolagem em telas baixas e fechamento por Escape.
- Hero com altura baseada na área visível do navegador móvel.
- Cards com espaço para seus textos em telas menores.
- Modais limitados à altura da tela, com rolagem interna.
- Link “Serviços” direcionado ao carrossel de treinamentos existente.
- Idiomas PT, EN, ES e chinês simplificado, com seletor no cabeçalho e preferência salva no navegador.
- Projetos com fotos destacadas e textos em fluxo, em uma, duas ou três colunas conforme a tela.
- Animações de entrada ao rolar, respeitando movimento reduzido; controles com cursor pointer e áreas de toque de pelo menos 44 px nos principais botões.

As traduções estão em `src/features/home/data/translations.ts`. A interação e o visual dos projetos estão em `src/styles/interactions.css`, importado pelo layout da aplicação.

## Executar

```sh
npm install
npm run build
npm start
```

Abra `http://localhost:3000`. No PowerShell com restrição de scripts, utilize `npm.cmd`.

## Testar

```sh
npm test -- --fully-parallel --workers=2
```

Os testes reutilizam o servidor ativo ou iniciam a compilação de produção. Para outro endereço, defina `SITE_URL`. Execute `npm run check` para validar lint, tipos e arquitetura.

Os testes verificam navegação, responsividade, encaixe dos cards, menu, modal, idiomas, persistência da preferência, toque e movimento reduzido. Capturas e relatórios ficam em `artifacts/`.

Veja [a documentação da versão atual](docs/liquid-glass.md).

## Histórico

O backup dos fontes imediatamente anteriores ao acabamento de vidro está em `docs/antes-liquid-glass.zip`. Os relatórios da modernização ampla e da restauração em `docs/` são históricos. A compilação da modernização ampla está arquivada em `docs/modernizacao-compilada.zip`. O ZIP original em Downloads permanece intacto.
