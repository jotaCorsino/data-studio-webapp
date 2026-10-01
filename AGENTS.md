# AGENTS.md — Technolife Data Studio

## 1. Finalidade

Este arquivo define as regras obrigatórias para agentes de desenvolvimento que trabalhem neste repositório.

O objetivo é permitir que um agente compreenda o produto, implemente tarefas e valide alterações usando **somente o conteúdo deste repositório e a tarefa recebida**.

## 2. Fonte única de verdade

Este repositório é a fonte canônica do Technolife Data Studio.

Regras obrigatórias:

- não depender de outros repositórios para compreender requisitos;
- não usar conversas anteriores como especificação;
- não instruir outro agente a consultar protótipos ou projetos externos;
- não copiar comportamento de um sistema externo apenas por semelhança;
- quando uma ideia for adotada, ela precisa estar descrita nos documentos canônicos deste repositório;
- em caso de conflito entre código e documentação canônica, a divergência deve ser apontada antes de expandir o comportamento conflitante;
- não inventar requisito ausente para “completar” o produto.

## 3. Ordem de leitura

Antes de implementar uma tarefa relevante, consultar nesta ordem:

1. `README.md`;
2. `AGENTS.md`;
3. `docs/README.md`;
4. documento canônico da área afetada;
5. código e testes existentes da área.

Não é necessário reler todos os documentos do projeto a cada tarefa. Ler o conjunto mínimo necessário, preservando as regras transversais de produto, UX, segurança e arquitetura.

## 4. Natureza do produto

O Technolife Data Studio é uma plataforma de inteligência gerencial e apoio à tomada de decisão.

Sua finalidade é transformar dados já existentes nas fontes da empresa em informação útil para gestão.

O produto pode gerar e apresentar informação por meio de:

- análises;
- tabelas;
- indicadores;
- gráficos;
- dashboards;
- relatórios;
- PDF;
- apresentações;
- execuções programadas;
- distribuição automática.

Esses elementos são formas de consumo da informação. O produto não deve ser reduzido conceitualmente a um simples “gerador de relatórios”.

## 5. Princípio central de experiência

A complexidade técnica deve ficar escondida do usuário sempre que ela não for necessária para a tarefa atual.

Regra:

```text
poderoso por dentro
+
simples por fora
```

Isso implica:

- navegação global curta;
- poucas decisões para ações frequentes;
- formulários com o mínimo necessário;
- opções avançadas sob demanda;
- contexto conhecido deve preencher contexto automaticamente;
- ações administrativas separadas da operação cotidiana;
- conceitos técnicos internos não viram automaticamente itens de menu;
- estados de loading, vazio, erro e permissão devem ser claros e compactos;
- uma funcionalidade nova não recebe navegação própria só porque existe.

## 6. Separação de experiências

O produto deve preservar duas experiências conceituais.

### Operação

Usuários consomem informações já preparadas:

- abrir dashboard;
- executar análise;
- informar parâmetros;
- gerar relatório;
- exportar;
- consultar histórico.

### Studio e Administração

Usuários autorizados configuram:

- fontes;
- conectores;
- datasets;
- campos;
- análises;
- visões;
- relatórios;
- dashboards;
- modelos;
- parâmetros;
- automações;
- usuários;
- permissões;
- identidade da instância.

Essas experiências podem compartilhar o mesmo aplicativo, mas a complexidade do Studio não deve dominar a interface operacional.

## 7. Arquitetura conceitual obrigatória

A direção conceitual do produto é:

```text
Source
  ↓
Connector
  ↓
Dataset
  ↓
Fields
  ↓
Analysis / View
  ↓
Presentation Model
  ↓
Report / Dashboard / Presentation
  ↓
Execution
  ↓
Automation / Distribution
```

Os nomes finais de algumas entidades ainda podem ser refinados na documentação, mas as separações de responsabilidade devem ser preservadas.

### Regra de neutralidade da origem

Depois que dados são normalizados em um Dataset, consumidores posteriores não devem precisar conhecer o formato ou tecnologia da origem.

Um relatório não deve possuir lógica especial porque a origem era CSV, API, MySQL ou outro conector.

## 8. Identidade técnica e apresentação

Nunca confundir identidade do dado com rótulo visual.

Um campo deve poder manter uma identidade técnica estável e receber um nome de apresentação diferente.

Exemplo conceitual:

```text
technical key: ticket_owner_name
label: Responsável
```

Renomear um rótulo não pode destruir a capacidade do sistema de localizar o campo de origem.

## 9. Configuração antes de customização de código

A regra comercial e arquitetural é:

```text
configurar
→ estender
→ somente em último caso customizar código específico
```

Não criar fork, condição por cliente ou hardcode de organização como caminho normal para personalização.

Preferir:

- configuração;
- metadados;
- templates;
- modelos;
- conectores;
- parâmetros;
- identidade da instância.

## 10. Segurança

Princípios obrigatórios desde o início:

- navegador nunca recebe credenciais de fontes externas;
- autorização real é validada no backend;
- ocultar botão não é segurança;
- conexões externas devem operar com o menor privilégio possível;
- fontes de banco devem ser somente leitura por padrão;
- não expor SQL arbitrário ao usuário como caminho normal;
- não transformar conectores HTTP em proxy arbitrário;
- segredos não entram no Git, logs ou payloads de frontend;
- dados sensíveis não devem ser persistidos no browser por conveniência;
- toda entrada externa é não confiável até validação;
- arquivos gerados e históricos respeitam autorização;
- automações executam com contexto de autorização definido, nunca como administrador implícito.

A especificação detalhada será mantida em `docs/15-SEGURANCA.md` quando criada.

## 11. Estratégia frontend-first e validação vertical

A estratégia aprovada para o início da V1 é **frontend-first**, com homologação visual antes do backend funcional.

Isso não autoriza criar um frontend descartável ou um sistema fictício paralelo.

Durante a fase visual:

```text
apps/web real
+
contratos TypeScript
+
fixtures sintéticas
+
adapters de dados
+
homologação visual
```

Depois da homologação das principais jornadas:

```text
mesma interface
+
/api/v1 real
+
backend Symfony
+
dados reais
+
validação ponta a ponta
```

Regras:

- componentes criados na fase visual permanecem como base do produto;
- fixtures devem ser sintéticas, tipadas e isoladas;
- mocks não podem virar autoridade de regra de negócio;
- contratos devem facilitar substituição por API real;
- segurança, autorização e validação definitiva continuam pertencendo ao backend;
- a primeira prova funcional completa continua sendo o caso de uso de Prestação de Contas;
- após a fase de UX, voltar a desenvolver em fatias verticais, evitando longas fases isoladas de frontend ou backend.

Cada abstração relevante deve posteriormente ser validada por um caso real de ponta a ponta.

## 12. Escopo e overengineering

Não adicionar antecipadamente:

- campos;
- menus;
- filtros;
- configurações;
- abstrações;
- infraestrutura;
- dependências;
- papéis;
- estados;
- serviços externos;

apenas porque podem ser úteis no futuro.

Uma extensão arquitetural deve resolver requisito documentado ou permitir evolução claramente prevista sem aumentar desnecessariamente o custo da versão atual.

## 13. UX

Diretrizes permanentes:

- desktop é uma experiência importante, sem impedir responsividade;
- sidebar representa grandes áreas de trabalho, não todas as entidades internas;
- visões de uma área pertencem ao conteúdo dessa área;
- ações frequentes ficam visíveis;
- ações raras podem ir para menu contextual;
- edição curta pode usar painel lateral;
- fluxos longos ou estruturados podem usar página própria;
- breadcrumbs somente quando ajudam;
- dados secundários não devem dominar telas principais;
- dashboards devem ajudar a compreender ou agir, não decorar a interface;
- indicadores devem ser vinculáveis ao contexto de origem quando aplicável;
- acessibilidade não é opcional;
- cor nunca deve ser o único meio de comunicar estado.

## 14. Documentos gerados

Relatórios, PDFs e apresentações são documentos derivados de dados estruturados.

Não tratar screenshot da interface como documento oficial.

Direção:

```text
dados + parâmetros
→ modelo lógico de execução
→ preview
→ saída
```

Preview e artefato exportado devem representar a mesma execução lógica.

## 15. Alterações arquiteturais

Um agente não deve alterar silenciosamente conceitos centrais.

Mudanças que afetem qualquer um destes pontos exigem atualização documental explícita:

- fluxo de dados;
- modelo de domínio;
- responsabilidade de Connector;
- responsabilidade de Dataset;
- segurança;
- autenticação;
- autorização;
- implantação;
- persistência;
- execução de automações;
- geração documental;
- stack principal.

Quando a tarefa exigir uma mudança não coberta pela documentação, registrar a necessidade antes de implementar uma nova regra permanente.

## 16. Código

Quando a implementação começar:

- preferir módulos pequenos e responsabilidades claras;
- evitar arquivos monolíticos;
- evitar lógica de domínio em componentes visuais;
- manter contratos tipados quando a stack permitir;
- separar acesso a dados, domínio e apresentação;
- não duplicar regra de negócio entre frontend e backend;
- frontend pode validar para UX, mas backend continua sendo autoridade;
- código deve possuir nomes de domínio coerentes com a documentação em pt-BR na interface e nomes técnicos consistentes na implementação.

## 17. Testes

Toda feature deverá definir critérios de aceite antes ou junto da implementação.

Testes devem priorizar:

- regras de domínio;
- permissões;
- filtros e agregações;
- normalização de dados;
- contratos de conectores;
- parâmetros;
- geração de saída;
- regressões de casos de uso;
- segurança;
- estados relevantes da interface.

Não considerar uma feature homologada apenas porque “abre no navegador”.

## 18. Documentação durante o desenvolvimento

Documentação não é diário de commits.

Atualizar os documentos canônicos quando:

- um conceito muda;
- um requisito é consolidado;
- uma decisão arquitetural é tomada;
- uma restrição importante é descoberta;
- uma feature altera o comportamento oficial.

Evitar documentação duplicada. Quando houver um documento canônico para o assunto, atualizá-lo em vez de criar outro arquivo redundante.

## 19. Estado atual

O projeto está em fundamentação.

Não iniciar desenvolvimento funcional apenas para preencher o repositório. Primeiro consolidar os documentos essenciais e o primeiro fluxo vertical.

## 20. Licenciamento e proteção do produto

A implantação comercial possui requisitos de propriedade intelectual.

Agentes não devem:

- transformar proteção/licenciamento em código opcional sem autorização;
- colocar chave privada de licenciamento no repositório;
- incluir `.git` em pacote de release;
- fazer deploy do backend original desprotegido por conveniência quando a estratégia homologada exigir proteção;
- criar kill switch destrutivo;
- enviar dados operacionais ao Control Plane sem requisito documentado.

Consultar `docs/19-LICENCIAMENTO-E-PROTECAO-DO-PRODUTO.md` para tarefas relacionadas.

## 21. Manuais obrigatórios

A V1 comercial exige três manuais finais:

- implantação e ativação;
- desativação/offboarding/remoção;
- usuário.

Não preencher os manuais finais com passos especulativos.

Durante o desenvolvimento, atualizar requisitos e decisões canônicas. Os procedimentos finais devem ser escritos a partir da release estabilizada e testados de ponta a ponta.

Consultar `docs/20-MANUAIS-E-DOCUMENTACAO-OPERACIONAL.md`.


## 22. Stack técnica da V1

Para tarefas de implementação da V1, a base canônica é `docs/21-DECISOES-TECNICAS-V1.md`.

Resumo:

```text
Frontend: React 19 + TypeScript + Vite 8
Backend: Symfony 7.4 LTS
PHP: 8.3 mínimo / 8.4 recomendado
Banco: MariaDB/MySQL
ORM/DBAL: Doctrine
API: JSON same-origin /api/v1
Auth: sessão server-side
Jobs: fila no banco + cron one-shot
PDF: Dompdf
E-mail: Symfony Mailer
```

Não trocar framework, banco, autenticação, estratégia de job ou PDF por preferência do agente.

Mudança de stack exige decisão documental explícita antes de implementação.

Node e Composer são ferramentas de desenvolvimento/build; não devem virar dependências de runtime do cPanel sem nova decisão.

## 23. Estrutura do repositório

Direção inicial:

```text
apps/web
apps/instance-api
apps/control-plane
docs
tools
```

O Control Plane pertence ao mesmo repositório canônico para manter o projeto autossuficiente, mas é deployment separado e nunca entra no pacote do cliente.

Não extrair bibliotecas compartilhadas prematuramente.

## 24. Sequência inicial de desenvolvimento

A sequência aprovada é:

```text
FND-001 — scaffold técnico
→ FE-001 ... FE-009 — frontend e homologação visual
→ FND-002 ... FND-007 — backend e infraestrutura
→ Vertical 1 — Prestação de Contas real
```

As tarefas visuais podem ser refinadas conforme a homologação, mas não devem antecipar backend fictício ou regras de negócio não documentadas.

Consultar `docs/18-ROADMAP.md` para a ordem canônica.


## 25. Painel de acompanhamento

O `README.md` contém a seção **Acompanhamento do desenvolvimento**, que funciona como painel executivo do projeto.

Sempre que uma tarefa ou etapa alterar de estado, o mesmo PR deve atualizar a linha correspondente no painel.

Estados permitidos:

- `CONCLUÍDO`;
- `EM ANDAMENTO`;
- `PLANEJADO`;
- `AGUARDANDO HOMOLOGAÇÃO`;
- `BLOQUEADO`.

Regras:

- somente uma etapa principal deve ser marcada como `EM ANDAMENTO`, salvo trabalho paralelo explicitamente autorizado;
- tarefa implementada mas ainda não validada deve ficar como `AGUARDANDO HOMOLOGAÇÃO`, não `CONCLUÍDO`;
- após homologação, atualizar para `CONCLUÍDO` antes de iniciar a próxima etapa dependente;
- manter a seção `Etapa atual` e o `Próximo marco` coerentes com a tabela;
- o painel é um resumo; detalhes técnicos continuam em `docs/18-ROADMAP.md`;
- não criar nova etapa no painel sem também formalizar seu lugar no roadmap quando ela representar mudança real de planejamento.


## 26. Uso de skills de frontend pelo Codex

Para tarefas `FE-*`, quando o ambiente do Codex disponibilizar uma skill de **site building**, **webapp building**, **sites-building** ou equivalente, o agente deve utilizá-la como apoio principal de construção visual.

A skill deve ser usada para:

- composição de layout;
- responsividade;
- componentes;
- hierarquia visual;
- consistência;
- refinamento de UX;
- acessibilidade visual/interativa;
- qualidade de implementação do frontend.

A skill não substitui:

- `README.md`;
- `AGENTS.md`;
- `docs/14-UX-E-DESIGN-SYSTEM.md`;
- requisitos da tarefa;
- contratos de domínio.

Regras para `FE-*`:

1. trabalhar no frontend real em `apps/web`;
2. preservar React + TypeScript + Vite;
3. evitar mockup estático sem interação;
4. usar dados sintéticos enquanto a API não existir;
5. encapsular dados sintéticos atrás de contratos/adapters;
6. não inventar comportamento de backend;
7. implementar estados loading, empty, error e permission quando fizer sentido ao fluxo;
8. manter responsividade e acessibilidade;
9. abrir PR por etapa;
10. aguardar homologação visual antes da próxima etapa dependente.

Se a skill não estiver disponível no ambiente, seguir as mesmas regras manualmente e registrar essa limitação no PR, sem trocar de stack.
