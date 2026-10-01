# 18 — Roadmap de Desenvolvimento

**Status:** proposta inicial para homologação

## 1. Objetivo

Organizar o desenvolvimento do Technolife Data Studio por fatias verticais que provem o produto de ponta a ponta.

O roadmap não deve criar dezenas de telas abstratas antes da primeira utilização real.

## 2. Regra

```text
uma fatia funcional completa
antes de expandir horizontalmente
```

## 3. Fase 0 — Fundação documental

Objetivo:

- consolidar visão;
- domínio;
- arquitetura;
- UX;
- segurança;
- implantação;
- caso de uso piloto;
- critérios de qualidade.

Saída:

- documentação canônica homologada;
- decisões técnicas pendentes identificadas;
- nenhuma dependência de repositório externo.

## 4. Fase 1 — Fundação técnica e frontend homologável

A fase inicial será dividida em três blocos.

### Bloco A — Scaffold técnico

#### FND-001 — Estrutura do repositório e CI

Criar:

```text
apps/web
apps/instance-api
apps/control-plane
tools
```

Configurar:

- React/TypeScript/Vite;
- Symfony 7.4;
- npm/composer lockfiles;
- lint;
- typecheck;
- PHPUnit;
- PHPStan;
- build;
- audits;
- CI inicial.

Sem feature de negócio.

Saída:

- monorepositório funcional;
- frontend compilável;
- backends inicializáveis;
- CI validando PHP 8.3/8.4 e web.

### Bloco B — Frontend-first e homologação visual

Depois do `FND-001`, construir o frontend real em `apps/web` antes do backend funcional.

Princípio:

```text
UI real
→ contratos TypeScript
→ dados sintéticos
→ homologação visual
→ ajustes
→ contratos estabilizados
```

Os dados sintéticos devem ficar atrás de adapters/repositories, para posterior substituição por `/api/v1`.

#### FE-001 — Design system e direção visual

Implementar:

- tokens;
- tipografia;
- cores;
- espaçamentos;
- radius;
- shadows;
- controles-base;
- estados;
- primeira composição visual.

Objetivo:

- estabelecer a personalidade visual do produto antes de multiplicar telas.

#### FE-002 — Shell e navegação

Implementar:

- sidebar;
- cabeçalho;
- rotas;
- navegação operacional;
- navegação Studio/Admin;
- responsividade;
- contexto de usuário sintético;
- loading/empty/error básicos.

#### FE-003 — Início / visão gerencial

Implementar página inicial com dados sintéticos:

- visão geral;
- indicadores;
- itens recentes;
- situações que exigem atenção;
- atalhos;
- hierarquia gerencial.

Objetivo:

- validar densidade e linguagem do produto.

#### FE-004 — Relatórios — operação

Implementar experiência do Consumidor:

```text
Relatórios
→ escolher modelo
→ parâmetros
→ gerar
→ preview
→ exportação simulada
```

Usar o caso de Prestação de Contas como principal fixture visual.

#### FE-005 — Studio de relatórios

Implementar a experiência configurável já especificada:

- Structural Mapping;
- filtro principal;
- período;
- agrupamento;
- colunas comuns;
- colunas específicas;
- visibilidade por grupo;
- aliases;
- ordem;
- configurações documentais;
- preview vivo.

Essa etapa deve receber atenção especial de homologação.

#### FE-006 — Dashboards

Implementar:

- KPIs;
- charts;
- tabelas;
- filtros globais;
- drill-through visual;
- estados.

Usar dados gerenciais sintéticos.

#### FE-007 — Dados e fontes

Implementar UX de:

- Sources;
- Resources;
- Datasets;
- Fields;
- estado;
- disponibilidade;
- compatibilidade;
- teste visual de conexão simulado.

Não implementar conexão real nesta etapa.

#### FE-008 — Automações

Implementar UX de:

- lista;
- criação;
- agenda;
- parâmetros;
- destinatários;
- estado;
- próxima execução;
- histórico;
- falhas.

#### FE-009 — Usuários e administração

Implementar UX de:

- usuários;
- perfis;
- permissões;
- identidade da Instance;
- configurações administrativas prioritárias.

### Regras das tarefas FE-*

- usar a skill de site/webapp building do Codex quando disponível;
- trabalhar no frontend definitivo em `apps/web`;
- não criar protótipo externo ao produto;
- dados sempre sintéticos;
- contracts/adapters tipados;
- nenhum segredo;
- nenhuma autorização simulada tratada como segurança real;
- uma etapa por PR;
- homologação visual antes da etapa dependente;
- ajustes solicitados fazem parte da homologação da própria etapa.

### Saída do Bloco B

```text
webapp navegável
+
direção visual homologada
+
principais jornadas homologadas
+
contratos frontend claros
```

Isso não significa que as funcionalidades de negócio estejam concluídas.

### Bloco C — Backend e infraestrutura

Após a homologação das principais experiências de frontend, implementar a base real.

#### FND-002 — Backend da Instance

Criar fundação:

- configuração;
- conexão MariaDB/MySQL;
- Doctrine;
- migrations;
- health check;
- logging;
- storage privado;
- tratamento uniforme de erro;
- namespace `/api/v1`.

#### FND-003 — Autenticação e autorização básica

Implementar:

- User;
- login;
- logout;
- sessão;
- password hashing;
- CSRF;
- estados de usuário;
- perfil inicial;
- rota `/me`;
- proteção backend.

A UI existente passa a consumir a autenticação real.

#### FND-004 — Integração do shell com backend

Substitui a antiga ideia de construir o shell somente nesta etapa.

Implementar:

- integração da UI homologada com sessão;
- contexto real de usuário;
- proteção de rotas;
- estados de permissão;
- tratamento de indisponibilidade da API.

#### FND-005 — Jobs e infraestrutura operacional

Implementar:

- transporte persistido no banco;
- comando one-shot;
- lock;
- cron contract;
- Mailer;
- diretórios privados;
- preflight CLI;
- smoke checks básicos.

#### FND-006 — Pipeline Report/PDF mínimo

Implementar:

```text
ReportDocument
→ HTML Preview
→ Dompdf
```

A UI homologada de relatório passa a consumir esse pipeline gradualmente.

#### FND-007 — Pacote de homologação cPanel

Produzir release não comercial/de desenvolvimento:

- frontend compilado;
- vendor PHP;
- migrations;
- scripts CLI;
- manifest;
- checklist.

Instalar em ambiente cPanel de homologação e registrar incompatibilidades.

Ainda não exige encoder/licença comercial completos.

### Saída da Fase 1

```text
frontend homologado
+
autenticação real
+
API
+
banco
+
jobs
+
PDF mínimo
+
CI
+
deploy de homologação cPanel
```

Somente depois iniciar a integração completa da Vertical 1 com Source e dados reais.

## 5. Vertical 1 — Prestação de contas end-to-end

Primeira prova real.

Fluxo operacional:

```text
login
→ Prestação de contas
→ Cliente
→ Período
→ Gerar
→ Preview
→ PDF
```

Camadas que precisam existir:

- Source;
- Connector;
- Dataset;
- Fields;
- Analysis;
- Parameters;
- Report;
- Model;
- Execution;
- PDF.

Saída:

- primeiro produto utilizável;
- arquitetura validada com dados reais;
- regressão definida pelo caso piloto.

## 6. Vertical 2 — Configuração do relatório

Transformar a primeira solução em configuração reutilizável.

Incluir:

- bindings estruturais;
- colunas comuns;
- colunas específicas por grupo;
- aliases;
- visibilidade por tabela;
- configuração documental;
- preview vivo;
- publicação.

Saída:

- Criador consegue modificar o relatório sem alterar código.

## 7. Vertical 3 — Administração de dados

Expandir Studio:

- Sources;
- teste de conexão;
- Resources;
- Datasets;
- Fields;
- metadados;
- compatibilidade;
- publicação.

Saída:

- nova fonte pode ser configurada de forma administrável dentro dos limites do Connector.

## 8. Vertical 4 — Analysis Builder

Generalizar lógica analítica:

- Fields;
- Filters;
- Parameters;
- Sort;
- Group;
- Metrics;
- preview de resultado;
- publicação.

Saída:

- lógica de análise deixa de ser específica do primeiro Report.

## 9. Vertical 5 — Report Builder

Generalizar composição:

- blocos;
- tabelas;
- indicadores;
- gráficos compatíveis;
- propriedades documentais;
- page settings;
- preview;
- publicação.

Saída:

- múltiplos Reports podem ser criados por configuração.

## 10. Vertical 6 — Dashboards

Incluir:

- layout;
- KPI;
- chart;
- table;
- filtro global;
- bindings;
- drill-through básico;
- publicação.

Saída:

- primeira análise pode alimentar dashboard e Report.

## 11. Vertical 7 — Apresentações

Incluir:

- Presentation Model;
- slides;
- layouts;
- bindings;
- gráficos;
- tabelas;
- preview;
- exportação.

Saída:

- dados analíticos podem gerar apresentação reutilizável.

## 12. Vertical 8 — Automations

Incluir:

- schedule;
- timezone;
- parâmetros relativos;
- jobs;
- Execution automatizada;
- PDF/apresentação;
- e-mail;
- histórico;
- retry/idempotência.

Saída:

- relatório mensal pode ser gerado e enviado sem ação manual.

## 13. Vertical 9 — Permissões avançadas

Após o core estar funcionando:

- custom permissions;
- Dataset scope;
- Field restrictions;
- row restrictions;
- publish permissions;
- export policies.

Autorização básica já precisa existir antes disso.

## 14. Vertical 10 — Segundo Connector real

Adicionar uma origem significativamente diferente da primeira.

Objetivo:

- provar Connector abstraction;
- identificar acoplamentos;
- testar capabilities.

Bom candidato dependerá do ambiente disponível.

## 15. Vertical 11 — Arquivos

Adicionar, conforme necessidade:

- CSV;
- XLSX;
- SpreadsheetML/XML.

Arquivos entram como Sources/Connectors e não como pipeline paralelo.

## 16. Vertical 12 — Relações e dados derivados

Somente após casos reais:

- relações;
- joins controlados;
- Fields calculados;
- Datasets derivados;
- métricas compostas.

Evitar começar o produto por aqui.

## 17. IA

IA não é requisito do core inicial.

Será avaliada quando o produto possuir:

- dados estruturados;
- metadados;
- segurança;
- Analysis;
- execução confiável.

Possíveis usos futuros:

- resumo;
- explicação;
- descoberta;
- sugestões;
- assistência ao Criador.

## 18. Ordem de prioridade

Prioridade conceitual:

```text
1. validar cedo a experiência do usuário
2. funcionar de ponta a ponta
3. ser seguro
4. ser simples
5. tornar-se configurável
6. ampliar formatos
7. ampliar fontes
8. ampliar sofisticação analítica
```

## 19. Regra para tarefas do Codex

Cada tarefa deve:

- partir da `main` atualizada;
- usar branch própria;
- possuir escopo pequeno;
- indicar documentos canônicos relevantes;
- definir critérios de aceite;
- executar validações;
- abrir PR;
- aguardar homologação antes da próxima etapa dependente;
- em tarefas `FE-*`, usar a skill de site/webapp building do Codex quando disponível;
- em tarefas `FE-*`, apresentar frontend navegável com dados sintéticos, sem inventar backend.

## 20. Não fazer

Evitar:

- criar dezenas de telas sem ciclos curtos de homologação;
- construir todos os builders antes do primeiro fluxo;
- criar suporte a dez Connectors sem uso real;
- construir multi-tenant cedo;
- construir linguagem própria de programação;
- criar sistema completo de ETL antes do caso real;
- criar IA antes do dado confiável;
- copiar toda a base externa para banco interno sem necessidade.

## 21. Marco inicial

O primeiro marco funcional é:

> Um usuário autenticado consegue gerar uma prestação de contas real a partir de uma Source conectada, informando apenas os parâmetros necessários, revisar a prévia e obter um PDF consistente.

Esse marco valida o produto melhor do que dezenas de telas mockadas.

## 22. Evolução do roadmap

Este documento deve mudar quando houver:

- aprendizado de uso;
- limitação técnica comprovada;
- nova prioridade comercial;
- dependência descoberta;
- decisão arquitetural.

Não mudar o roadmap apenas para refletir commits.

## 23. Vertical 13 — Licenciamento e proteção de release

Antes da V1 comercial:

- proteção do backend;
- processo de build/release;
- Instance ID;
- Control Plane;
- lease assinado;
- grace period;
- suspensão;
- revogação;
- reativação;
- binding da Instance;
- telemetria mínima;
- testes de cópia/migração.

Saída:

- pacote copiado para outro ambiente não funciona como nova Instance sem ativação válida.

## 24. Vertical 14 — Homologação de implantação cPanel

Executar instalação real do zero em ambiente homologado:

- domínio/subdomínio;
- PHP;
- loader;
- banco;
- storage;
- cron;
- HTTPS;
- ativação;
- Source;
- PDF;
- e-mail;
- automação;
- backup;
- atualização.

Saída:

- implantação repetível por técnico seguindo checklist.

## 25. Fase de fechamento da V1 — Manuais

Somente com fluxos estabilizados, produzir e homologar:

### Manual de Implantação e Ativação

Validado por um técnico que não participou diretamente da implementação da rotina de instalação, sempre que possível.

### Manual de Desativação, Offboarding e Remoção

Validado em uma Instance de teste do cancelamento até a remoção final.

### Manual do Usuário

Atualizado com a interface final, screenshots sintéticos e exemplos práticos.

A release comercial da V1 depende da homologação desses três manuais.

## 26. Marco de release comercial

Além do marco funcional, a V1 comercial exige:

1. fluxo principal homologado;
2. segurança mínima homologada;
3. licenciamento funcional;
4. pacote protegido;
5. instalação cPanel reproduzível;
6. backup/restauração testados;
7. offboarding testado;
8. política de retenção aprovada;
9. três manuais concluídos;
10. documentação compatível com a versão entregue.
