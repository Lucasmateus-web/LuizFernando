> Hist?rico: esta moderniza??o foi revertida a pedido do propriet?rio. Consulte [responsividade.md](responsividade.md) para o estado atual.

# Entrega técnica — CONS.TREIN

Validação final em **14/09/2026**, sobre compilação de produção servida em `http://localhost:3001`. O site público não foi alterado por esta execução.

## 1. Redesign e identidade

Home institucional com identidade CONS.TREIN, tipografia Inter variável local, paleta escura, vermelho nas ações, divisores técnicos e numeração editorial. Novo hero com fotografia real, proposta imediatamente legível e CTAs funcionais. Luiz Fernando permanece identificado como bombeiro civil e instrutor, sem atribuição de cargo societário não confirmado.

Foram preservados oito treinamentos, seis experiências, seis parceiros publicados, oito qualificações, localização, contatos e crédito do desenvolvedor. Serviços de consultoria, supervisão e planos de emergência passaram a integrar a navegação. O conteúdo anterior foi arquivado em [original-content.md](original-content.md).

## 2. Problemas corrigidos

- Duplicação de cards e logos para marquee, texto digitado, contadores iniciados em zero e vídeos automáticos.
- Introdução bloqueante, botão de orçamento sem ação, cards sem destino e navegação para seção ausente.
- Identidade LF Treinamentos inconsistente com CONS.TREIN.
- Otimização de imagens desativada, erros TypeScript ignorados e fontes externas redundantes.
- Falhas de foco e rótulos acessíveis; marcador de codificação que invalidava os tokens CSS.
- Tratamento da rota inexistente ajustado; a resposta 404 foi validada. O NoFallbackError da configuração anterior não reapareceu na validação final.

Valores comerciais sem comprovação e promessas normativas sem fonte foram retirados da apresentação, mantendo rastreabilidade na auditoria.

## 3. Componentes e arquitetura

Refatorados: `Header`, `Hero`, `About`, `Projects`, `Partners`, `Services`, `CTA` e `Footer`.

Criados: `Brand`, `ContactButton`, `SectionHeading`, `TrainingCard`, `TrainingSection` e `RevealObserver`. Dados em `content/`; marca e contatos em `config/site.ts` e `lib/contact.ts`.

Criadas oito páginas `/treinamentos/[slug]`, com conteúdo específico, objetivo, público, fotografias, contexto prático, informações de contratação, perguntas objetivas, contatos e treinamentos relacionados. As rotas são pré-renderizadas. Detalhes comerciais não confirmados são encaminhados ao contato, sem inventar condições.

Bibliotecas e componentes sem uso removidos. Dependências de produção reduzidas a Next.js, React, React DOM e Lucide. A home é renderizada no servidor; menu e observer concentram a interatividade no cliente.

## 4. Animações

Entrada única do hero com opacity/translate, escala fotográfica discreta (1.025 → 1), reveals únicos de aproximadamente 450 ms e stagger de 55 ms nos cards. Hovers curtos, deslocamento de seta e escala de imagem até 1.03. A foto principal permanece visível durante sua entrada para não atrasar a percepção do conteúdo. Sem loops, typewriter, autoplay ou contadores animados. `prefers-reduced-motion` desativa movimentos e rolagem suave.

## 5. Responsividade e inspeção visual

Testes de home e oito páginas em **320, 360, 390, 430, 480, 768, 1024, 1280, 1440 e 1920 px**. Nenhum overflow horizontal detectado.

Grid de treinamentos com uma, duas ou quatro colunas; projetos com composição editorial e último registro ocupando a linha; parceiros com duas, três ou seis colunas. Container máximo de 80 rem. Menu mobile próprio em dialog, com bloqueio da rolagem de fundo, Escape, ciclo de foco e fechamento por link. Capturas atualizadas em [screenshots](screenshots/), incluindo home completa, hero, menu e detalhe.

## 6. Performance

Imagens com `next/image`, dimensões reservadas, `sizes`, AVIF/WebP e lazy loading abaixo da dobra. Qualidade dos cards ajustada para 65; hero para 70, com `fetchPriority="high"`. Fonte WOFF2 local de aproximadamente 48 KB e ícones leves. Nenhuma requisição de vídeo na medição final. CSS sem biblioteca de animação.

Lighthouse mobile final, em ambiente local com simulação de rede/CPU:

| Indicador | Resultado |
| --- | --- |
| Performance | **92/100** |
| Acessibilidade | **100/100** |
| Boas práticas | **100/100** |
| SEO | **100/100** |
| FCP | 1,0 s |
| LCP | **2,8 s** |
| Total Blocking Time | 240 ms |
| CLS | **0** |
| Speed Index | 1,7 s |

A navegação medida registrou 21 requisições, aproximadamente 159 KB de JavaScript transferido, 49 KB de fonte e 287 KB de imagens. Os valores refletem o cenário auditado, não a totalidade de recursos após percorrer o site inteiro.

A meta de pontuação mobile foi atingida. **LCP ainda ficou acima da meta interna de 2,5 s.** O relatório aponta espaço para reduzir bytes de imagens e custos do runtime. INP não foi medido em campo; TBT não é equivalente a INP. Core Web Vitals reais dependem da publicação e do tráfego, portanto não há garantia de métricas de produção.

Relatórios: [Lighthouse HTML](lighthouse/mobile.html) e [JSON](lighthouse/mobile.json).

## 7. Acessibilidade

Landmarks, um H1 por página, hierarquia de títulos, alt text, skip link, foco visível, links semânticos e elementos nativos. Menu testado com Tab, Shift+Tab, Enter, Space e Escape. Projetos usam `details/summary`, acessíveis sem mouse. Contraste verificado por axe/Lighthouse e rótulos acessíveis conferidos com regra específica.

Axe não encontrou violações nos cenários testados da home, menu e detalhe. A avaliação automatizada não certifica conformidade integral; não foi realizada auditoria humana com leitor de tela ou dispositivos físicos.

## 8. SEO

Title e description institucionais, metadados específicos de treinamento, canonical, Open Graph, Twitter Card, favicon e Apple icon padronizados. `lang="pt-BR"`, robots e sitemap com nove URLs. JSON-LD separa Organization e Person; páginas de treinamento descrevem Service. Sem endereço, CNPJ, horários, avaliações ou estatísticas inventados.

## 9. Arquivos principais

- `app/page.tsx`, `app/layout.tsx`, `app/globals.css`.
- `app/treinamentos/[slug]/page.tsx`, `app/not-found.tsx`.
- `app/robots.ts`, `app/sitemap.ts`, `app/fonts/`.
- `components/` e `content/`.
- `config/site.ts`, `lib/contact.ts`, `next.config.mjs`.
- `package.json`, `package-lock.json`, `eslint.config.mjs`, `playwright.config.ts`.
- `tests/site.spec.ts`, `scripts/`, `public/brand-icon.svg`, `public/apple-icon.png`, `public/og-image.jpg`.

## 10. Confirmações ainda necessárias do proprietário

- Programas, modalidades, cargas horárias, certificados e condições comerciais de cada treinamento.
- Comprovação e atualização de números comerciais, caso deseje voltar a publicá-los.
- Cargo societário de Luiz Fernando, razão social e dados legais, se pertinentes à publicação.
- Significado/publicação da qualificação “Black Hawk - 97”, preservada como no conteúdo original.
- Atualidade das qualificações, autorizações de uso de fotografias/logos e escopo geográfico de atendimento.
- Casos com contexto empresarial adicional e resultados documentados, caso deseje aprofundar os registros.

Os canais comerciais foram preservados; nenhuma mensagem foi enviada para testar atendimento ou entrega.

## 11. Limites e publicação

**Deploy não realizado.** O domínio configurado continua `https://constrein.vercel.app`; é necessário publicar o projeto no ambiente Vercel correspondente. Não há repositório Git neste diretório, portanto não foi criado commit ou PR. A prévia local validada usa a porta 3001, pois a porta 3000 já estava ocupada.

Não foram inventadas FAQs normativas, depoimentos ou métricas. Não foi criado formulário sem backend. O teste em navegador foi realizado com Chromium; Safari, Firefox, leitor de tela e métricas reais de produção permanecem fora do escopo executado.

## 12. Testes finais

- `npm.cmd run build`: **aprovado**, incluindo checagem TypeScript e geração estática.
- `npm.cmd run lint`: **aprovado**.
- `npm.cmd run typecheck`: **aprovado**.
- `SITE_URL=http://localhost:3001 npm test`: **24 testes aprovados em 35,1 s**, processo concluído normalmente.
- Relatório HTML do Playwright gerado em `playwright-report/index.html`.
- Lighthouse concluído normalmente; resultados acima.
- Inspeção visual final das capturas e confirmação de navegação, imagens e grades.

O [README](../README.md) contém instruções de execução e manutenção. No PowerShell, defina `$env:SITE_URL='http://localhost:3001'` para testar a prévia atual. Os scripts de screenshots e Lighthouse também aceitam `SITE_URL`.
