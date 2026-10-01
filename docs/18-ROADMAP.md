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

## 4. Fase 1 — Scaffold técnico

As decisões-base estão consolidadas em `21-DECISOES-TECNICAS-V1.md`.

A Fase 1 deve ser implementada em tarefas independentes e homologáveis.

### FND-001 — Estrutura do repositório e CI

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
- build;
- audits;
- CI inicial.

Sem feature de negócio.

### FND-002 — Backend da Instance

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

Sem Source real ainda.

### FND-003 — Autenticação e autorização básica

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

### FND-004 — Shell do webapp

Implementar:

- shell React;
- rotas;
- design tokens iniciais;
- sidebar;
- page header;
- estados loading/empty/error;
- login;
- integração com sessão.

Sem catálogo fictício extenso.

### FND-005 — Jobs e infraestrutura operacional

Implementar:

- transporte persistido no banco;
- comando one-shot;
- lock;
- cron contract;
- Mailer;
- diretórios privados;
- preflight CLI;
- smoke checks básicos.

### FND-006 — Pipeline de Report/PDF mínimo

Implementar os contratos mínimos:

```text
ReportDocument
→ HTML Preview
→ Dompdf
```

Usar fixture sintética, ainda sem Connector real.

### FND-007 — Pacote de homologação cPanel

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
aplicação-base
+
login
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

Somente depois iniciar a Vertical 1 de negócio.

Evitar construir catálogo, builders ou mocks extensos nesta fase.

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
1. funcionar de ponta a ponta
2. ser seguro
3. ser simples
4. tornar-se configurável
5. ampliar formatos
6. ampliar fontes
7. ampliar sofisticação analítica
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
- aguardar homologação antes da próxima etapa dependente.

## 20. Não fazer

Evitar:

- FE-001 até FE-034 antes de backend;
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
