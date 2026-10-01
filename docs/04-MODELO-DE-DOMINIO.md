# 04 — Modelo de Domínio

**Status:** em consolidação

## 1. Objetivo

Definir as entidades conceituais do Technolife Data Studio e separar claramente suas responsabilidades.

Este documento descreve o domínio do produto. Nomes técnicos de classes, tabelas ou endpoints podem mudar durante a implementação, mas não devem misturar responsabilidades que aqui estejam separadas.

## 2. Visão geral

```text
Instance
  │
  ├── Users / Roles / Permissions
  ├── Sources
  │     └── Connector
  │            ↓
  │         Dataset
  │            └── Fields
  │
  ├── Analyses / Views
  │
  ├── Presentation Definitions
  │     ├── Reports
  │     ├── Dashboards
  │     └── Presentations
  │
  ├── Models
  │     └── Parameters
  │
  ├── Executions
  │
  └── Automations
        └── Distribution
```

## 3. Instance

Representa uma instalação lógica do produto para uma organização.

Responsabilidades:

- identidade institucional;
- políticas da instância;
- usuários e permissões;
- fontes;
- datasets;
- análises;
- modelos;
- automações;
- configurações de distribuição;
- histórico e auditoria definidos para aquela organização.

A Instance não representa um cliente cadastrado nos sistemas externos. Ela representa a organização que utiliza aquela instalação do Data Studio.

## 4. Source

Representa uma origem de dados configurada.

Exemplos:

- API de um sistema corporativo;
- banco MySQL/MariaDB;
- banco relacional suportado;
- arquivo CSV;
- arquivo XLSX;
- arquivo SpreadsheetML/XML;
- integração específica.

A Source conhece:

- nome;
- tipo de Connector;
- configuração não secreta;
- estado;
- capacidades disponíveis;
- referência segura às credenciais;
- informações necessárias para diagnóstico.

A Source não define relatórios ou dashboards.

## 5. Connector

Representa a implementação responsável por conversar com um tipo de origem.

O Connector traduz entre:

```text
contrato interno do Data Studio
↕
protocolo/formato da origem
```

Pode oferecer:

- teste de conexão;
- descoberta de recursos;
- descoberta de campos;
- leitura;
- paginação;
- filtros;
- ordenação;
- agrupamento/agregação quando a origem suportar;
- normalização;
- tradução de erros;
- capabilities.

O Connector não recebe responsabilidade de apresentação.

## 6. Resource

Quando uma Source expõe vários recursos, o Resource representa uma unidade identificável da origem.

Exemplos:

- endpoint lógico;
- tabela;
- view;
- coleção;
- planilha;
- worksheet;
- recurso publicado pela API.

Nem todo Connector precisa expor descoberta automática de Resources.

## 7. Dataset

Dataset é um conjunto de dados publicado para uso analítico.

Ele constitui a fronteira estável entre a origem e as camadas superiores.

Um Dataset deve poder referenciar:

- Source;
- Resource;
- nome funcional;
- descrição;
- Fields;
- capabilities;
- estado de publicação;
- restrições;
- metadados necessários.

Consumidores de Dataset não devem precisar saber se a origem era API, SQL ou arquivo.

## 8. Field

Field representa um campo publicado de um Dataset.

Propriedades conceituais:

```text
id
technicalKey
sourceIdentity
label
normalizedType
capabilities
metadata
```

### Identidade técnica

Deve permanecer estável enquanto o campo representar a mesma origem lógica.

### Label

É o nome mostrado ao usuário.

Pode ser alterado sem destruir a identidade técnica.

### Tipo normalizado

Permite que filtros, métricas e componentes trabalhem independentemente do tipo nativo da origem.

## 9. Field Capability

Um Field pode declarar operações permitidas.

Exemplos:

- filterable;
- sortable;
- groupable;
- aggregatable;
- operators disponíveis;
- formato de apresentação;
- nullable;
- semantic role quando aplicável.

Não assumir que todos os Fields suportam as mesmas operações.

## 10. Analysis

Analysis representa uma interpretação reutilizável dos dados.

É responsável por definir **o que deve ser calculado ou selecionado**, sem decidir necessariamente como o resultado será apresentado.

Pode conter:

- Dataset;
- Fields selecionados;
- aliases/labels de apresentação;
- filtros;
- parâmetros;
- ordenação;
- agrupamentos;
- métricas;
- agregações;
- cálculos suportados.

Exemplo:

```text
Analysis: Chamados concluídos por categoria

Dataset: Chamados
Filtro: status = concluído
Parâmetro: período
Agrupar por: categoria
Métrica: quantidade
```

## 11. View

O termo View pode ser utilizado para representar uma forma reutilizável de consultar e organizar uma Analysis.

Ainda será consolidado se Analysis e View serão entidades separadas ou uma única entidade com estados/modos diferentes.

Regra já fixada: a lógica analítica reutilizável não deve precisar ser reconstruída dentro de cada gráfico, tabela ou relatório.

## 12. Presentation Definition

Representa uma definição de como resultados analíticos são organizados visualmente.

Subtipos conceituais:

- Report;
- Dashboard;
- Presentation.

Todos podem consumir Analyses, mas possuem regras de layout diferentes.

## 13. Presentation Block

Elemento reutilizável de uma apresentação.

Candidatos:

- Title;
- Text;
- Table;
- Metric/KPI;
- Chart;
- Image;
- Divider;
- Spacer;
- Section.

Um Block deve referenciar dados por contrato, e não executar acesso direto à Source.

## 14. Report

Report é uma Presentation Definition orientada a documento.

Pode conter:

- título;
- identidade;
- parâmetros expostos;
- seções;
- blocos;
- tabelas;
- regras de agrupamento;
- configurações de página;
- cabeçalho;
- rodapé;
- opções documentais;
- regras de visibilidade.

## 15. Dashboard

Dashboard é uma Presentation Definition interativa.

Pode conter:

- layout responsivo;
- indicadores;
- gráficos;
- tabelas;
- filtros;
- controles;
- drill-down;
- navegação contextual.

## 16. Presentation

Presentation é uma Presentation Definition orientada a slides.

Pode conter:

- sequência de slides;
- layouts;
- títulos;
- textos;
- gráficos;
- tabelas;
- indicadores;
- imagens;
- elementos institucionais.

A lógica analítica deve ser reutilizada do mesmo core.

## 17. Report Table Definition

Tabela de relatório merece uma entidade conceitual própria dentro do Report porque possui configuração mais rica do que uma simples lista de Fields.

Uma Report Table Definition pode conter:

- Analysis ou dataset de origem;
- agrupamento que gera uma ou várias tabelas;
- colunas comuns;
- colunas específicas por grupo;
- visibilidade por grupo;
- labels;
- ordem;
- formato;
- alinhamento;
- papel visual;
- regras de quebra;
- regras de largura;
- estado de compatibilidade.

### Colunas comuns

Fields exibidos em todas as tabelas produzidas pela definição.

### Colunas específicas

Fields disponíveis apenas em determinado grupo/contexto.

### Visibilidade por grupo

Permite que uma coluna exista na configuração geral, mas seja ocultada em determinados grupos sem alterar sua identidade.

## 18. Structural Mapping

Alguns modelos precisam mapear Fields para papéis estruturais.

Exemplos:

- filtro principal;
- campo de período;
- campo de agrupamento;
- campo de ordenação;
- identificador.

Esses papéis devem ser configuração do modelo/análise, não nomes hardcoded no core.

Exemplo:

```text
primaryFilterField = customer_name
periodField = opened_at
groupField = category
```

## 19. Display Alias

Alias é um rótulo visual aplicado sobre uma identidade de Field.

Regra:

```text
sourceIdentity != displayLabel
```

Isso permite que:

```text
EMAIL > Subcategoria
```

possa ser exibido como:

```text
Serviço
```

sem perder a ligação com a origem.

## 20. Document Settings

Configurações documentais pertencem à apresentação e não à lógica de dados.

Exemplos:

- título;
- orientação;
- tamanho de página;
- exibir/ocultar data de geração;
- cabeçalho;
- rodapé;
- identidade da organização;
- numeração;
- margens.

Isso deve permanecer separado de filtros, Fields e agrupamentos.

## 21. Model

Model representa uma configuração publicada/reutilizável pronta para execução.

Pode encapsular:

- Analysis;
- Presentation Definition;
- Parameters;
- defaults;
- regras de execução.

Um consumidor normalmente executa um Model, e não reconstrói a Analysis.

## 22. Parameter

Parameter é um valor variável entre execuções.

Propriedades conceituais:

- id;
- label;
- tipo;
- required;
- default;
- options;
- validation;
- binding.

Tipos candidatos:

- text;
- integer;
- decimal;
- boolean;
- date;
- datetime;
- period;
- relativePeriod;
- enum;
- datasetFieldValue.

## 23. Execution

Execution representa uma execução concreta.

Deve registrar, conforme política futura:

- Model;
- versão/configuração efetiva;
- parâmetros resolvidos;
- usuário ou automação responsável;
- instante;
- estado;
- outputs;
- falha;
- metadados de consistência.

A Execution é o ponto adequado para ligar preview e artefato final à mesma configuração efetiva.

## 24. Output

Output representa um resultado produzido por uma Execution.

Exemplos:

- HTML preview;
- PDF;
- apresentação;
- arquivo;
- snapshot visual permitido;
- resultado interativo quando aplicável.

Formato e destino são conceitos distintos.

## 25. Automation

Automation define execução recorrente ou programada.

Pode conter:

- Model;
- Parameters;
- schedule;
- outputs solicitados;
- Distribution;
- estado;
- próxima execução;
- última execução;
- política de erro.

## 26. Distribution

Distribution define como Outputs chegam aos destinatários.

Primeiro caso esperado:

- e-mail.

Pode conter:

- destinatários;
- assunto;
- mensagem;
- anexos/links;
- políticas de acesso;
- registro de envio.

## 27. User

Representa uma pessoa autenticável na Instance.

Não é equivalente a usuários existentes nas Sources externas.

## 28. Role

Role é um preset compreensível de capacidades.

O nome final dos presets ainda será definido.

## 29. Permission

Permission representa autorização efetiva.

Pode atuar sobre:

- Source;
- Dataset;
- Field;
- Analysis;
- Model;
- Report;
- Dashboard;
- Presentation;
- Automation;
- administração.

A aplicação final deve validar permissões no backend.

## 30. Compatibility State

Configurações reutilizáveis podem se tornar incompatíveis quando uma Source ou Dataset muda.

O produto deve representar explicitamente situações como:

- Field removido;
- Field renomeado na origem;
- tipo incompatível;
- capability perdida;
- agrupamento inválido;
- parâmetro sem binding.

Não escolher silenciosamente um Field aleatório para substituir outro ausente.

O sistema pode oferecer fallback controlado quando ele estiver explicitamente definido e validado.

## 31. Relações principais

```text
Instance
  ├── User
  ├── Source
  │     └── Resource
  │           └── Dataset
  │                 └── Field
  │
  ├── Analysis
  │     └── Dataset / Fields
  │
  ├── Report / Dashboard / Presentation
  │     └── Analysis
  │
  ├── Model
  │     ├── Presentation Definition
  │     └── Parameters
  │
  ├── Execution
  │     ├── Model
  │     ├── resolved Parameters
  │     └── Outputs
  │
  └── Automation
        ├── Model
        ├── Parameters
        ├── Schedule
        └── Distribution
```

## 32. Critério de qualidade do domínio

O modelo está saudável quando:

1. trocar a tecnologia da Source não exige alterar Report;
2. trocar o label de Field não perde identidade;
3. uma Analysis pode alimentar mais de uma apresentação;
4. uma apresentação não precisa conhecer credencial;
5. uma Automation reutiliza Model;
6. preview e exportação podem ser ligados à mesma Execution;
7. customização de cliente cabe em configuração;
8. incompatibilidades são detectadas;
9. entidades internas não são expostas ao consumidor sem necessidade;
10. o domínio continua compreensível sem depender de um caso de uso específico.
