# Restauração do visual original e responsividade

Registro histórico da restauração em 15/09/2026: visual original restaurado do ZIP `C:\Users\lucas\Downloads\LuizFernando-master.zip`. O acabamento visual posterior está documentado em [liquid-glass.md](liquid-glass.md).

## Escopo aplicado

- Layout, textos, logo, cores, fontes visuais, vídeos, animações, carrosséis, contadores e estrutura da home originais restaurados.
- Ajustes concentrados em `app/responsive.css`.
- Cabeçalho passa a usar o menu compacto até 1023 px, evitando sobreposição entre logo e navegação.
- Menu limitado à altura disponível, rolável em telas baixas, com Escape e bloqueio da rolagem de fundo enquanto aberto.
- Hero usa a altura estável da janela móvel.
- Cards ganham dimensões suficientes para não cortar seus textos nas telas menores.
- Modal de projetos cabe na janela e permite rolar até o CTA, inclusive em orientação horizontal.

A importação Inter de `next/font/google` foi removida por não ser usada na tipografia visual original (Outfit/Plus Jakarta Sans continuam no CSS). Isso evita que a compilação dependa desse download adicional. Nenhum texto comercial, contato ou seção foi reescrito.

## Verificação

- Build de produção aprovado. A configuração original `ignoreBuildErrors` foi mantida; o build não valida integralmente os tipos.
- 11 testes Playwright aprovados: 320, 360, 390, 430, 480, 768, 1024, 1280, 1440 e 1920 px, mais 667 × 375 px na horizontal.
- Verificados overflow horizontal, encaixe do logo, menu, modal, rolagem até o CTA e fechamento por Escape.
- Inspeção visual de celular e desktop concluída.
- Comparação com ZIP confirma `app/page.tsx`, `app/globals.css`, About, Footer, Partners e WelcomeScreen sem alterações.

Servidor atual: `http://localhost:3000`.

A compilação da modernização foi preservada em `docs/modernizacao-compilada.zip`, junto às capturas existentes. Não foi gerado um backup completo dos fontes modernizados. O ZIP original permanece intacto. As pontuações Lighthouse e os testes de 24 casos da modernização não se aplicam a esta versão restaurada.
