> Hist?rico: esta moderniza??o foi revertida a pedido do propriet?rio. Consulte [responsividade.md](responsividade.md) para o estado atual.

# Auditoria inicial — CONS.TREIN

## Estrutura encontrada

Next.js 16.2 / React 19 / TypeScript, App Router com uma única rota pública. Tailwind 4, shadcn/Radix, carrossel Embla, bibliotecas de gráficos e formulários instaladas, embora a home não precisasse delas. CSS duplicado em app/globals.css e styles/globals.css. Sem testes, sem ESLint instalado/configurado e sem repositório Git neste diretório.

A home importava Header, WelcomeScreen, Hero, InfiniteCarousel, About, Projects, Partners e Footer. Services e CTA existiam, mas não eram renderizados. O menu apontava para #servicos mesmo com a seção ausente.

## Problemas confirmados

- Preloader e animações de logo, typewriter, cursor e alternância automática entre quatro vídeos no hero (arquivos somando aproximadamente 21 MB).
- Oito treinamentos duplicados no DOM; seis parceiros duplicados no DOM.
- Contadores iniciando em zero. Valores de 150 treinamentos, 2.500 profissionais e 50 empresas presentes no código sem fonte ou comprovação: retirados da apresentação e preservados no arquivo de conteúdo original.
- Identidade inconsistente: logo CONS.TREIN com alt LF Treinamentos, título focado em Luiz Fernando e copyright LF Treinamentos.
- Cards com cursor de interação sem navegação; CTA de orçamento sem ação; modal de projetos sem gestão completa do foco.
- Configuração ignorava erros TypeScript e desativava otimização de imagens.
- Três famílias tipográficas externas e referências de fontes não carregadas; estilos de animação sem redução de movimento.
- Sem canonical, sitemap, robots ou entidades estruturadas.
- Serviços não publicados continham promessas de cargas horárias, validade de certificados e referências normativas sem fontes. Conteúdo preservado em docs/original-content.md; promessas não reproduzidas como fatos confirmados.

## Inventário preservado

- Oito treinamentos: NR-20, NR-23, NR-33, NR-35, APH, Bombeiro Civil, Resgate Técnico Operacional e Plano de Resgate.
- Seis experiências de campo, com descrições e tópicos originais.
- Seis empresas exibidas originalmente: Neoenergia, Supergasbras, Vila Galé, EHS Consultoria, Messtra e TEMAPE. Outros logos na pasta pública não foram promovidos a clientes sem evidência no conteúdo publicado.
- Oito qualificações de Luiz Fernando, consultoria, supervisão e planos de emergência.
- WhatsApp comercial existente, telefone, e-mail, Instagram, LinkedIn, Recife/PE e crédito do desenvolvedor.
- Fotografias e vídeos originais mantidos no disco. Vídeos deixam de ser baixados automaticamente.

## Direção visual e referências

Fotografia real, tipografia editorial, grid estático, superfícies escuras, vermelho concentrado em ações, divisores e identificação técnica. Referências consultadas para princípios de organização, sem copiar layouts ou usar material fotográfico externo:

- [Petzl — Technical rescue](https://www.petzl.com/US/en/Professional/Technical-rescue): apresentação de conteúdo por contexto de aplicação e protagonismo do material de campo.
- [Awwwards — Business e projetos contemporâneos](https://www.awwwards.com/websites/%231a191b/): exploração de hierarquia, composição e tipografia.
- [Awwwards / Google — The Need for Speed](https://www.awwwards.com/brainfood-mobile-performance-vol3.pdf): referência de compromisso entre expressão visual e desempenho.

O acesso ao site informado pelo navegador de pesquisa retornou erro. A auditoria factual foi realizada sobre todos os componentes e dados do projeto local, fonte da implementação.

## Decisões sobre dados

CONS.TREIN é apresentada como marca; Luiz Fernando como bombeiro civil e instrutor associado. Não foi atribuída a condição de fundador ou responsável legal. Recife/PE é localização presente no rodapé original; não se inferiu cobertura nacional nem endereço completo.

As páginas detalhadas reutilizam descrições existentes, com públicos deduzidos diretamente dos títulos e contextos originais. Perguntas tratam apenas da contratação e navegação efetivamente disponíveis; não são apresentadas como depoimentos ou dúvidas coletadas de clientes. Modalidade, carga horária e condições específicas são encaminhadas ao contato comercial.
