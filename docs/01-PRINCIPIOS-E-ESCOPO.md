# 01 — Princípios e Escopo

**Status:** em consolidação

## 1. Objetivo

Definir o que o Technolife Data Studio deve ser, o que ele pode fazer e quais fronteiras não devem ser ultrapassadas sem decisão explícita de produto.

## 2. Princípios permanentes

### 2.1 Dados viram informação

O produto não existe para apenas exibir registros brutos.

Deve permitir organização, filtragem, comparação, agregação, cálculo e apresentação de dados de forma que apoiem compreensão.

### 2.2 Simplicidade no uso

Uma tarefa frequente deve exigir o mínimo razoável de decisões.

Campos opcionais e configurações avançadas devem ser apresentados sob demanda.

### 2.3 Complexidade concentrada

A configuração técnica fica no Studio e na Administração.

Usuários operacionais não devem precisar entender:

- credenciais;
- endpoints;
- SQL;
- schema;
- tipos internos;
- detalhes de paginação da fonte;
- estrutura técnica do conector.

### 2.4 Conector primeiro

A arquitetura deve aceitar diferentes tipos de origem por meio de conectores.

Arquivo, API e banco relacional são variações da entrada, não produtos diferentes.

### 2.5 Dataset como fronteira

Depois da normalização, consumidores do dado trabalham com um contrato comum.

Relatórios e dashboards não devem implementar parsers de origem.

### 2.6 Configuração antes de código específico

Customização deve ser feita preferencialmente através de:

- fontes;
- datasets;
- metadados;
- análises;
- modelos;
- parâmetros;
- layouts;
- automações;
- identidade;
- permissões.

Código específico por cliente é exceção.

### 2.7 Segurança por desenho

Segurança não é etapa final.

Credenciais, autorização, restrições de dados e isolamento fazem parte do desenho das entidades e fluxos.

### 2.8 Documento não é screenshot

PDF e apresentações são saídas estruturadas derivadas da mesma execução lógica que alimenta a prévia correspondente.

### 2.9 Automação reutiliza modelos

Automação não deve recriar regra analítica.

Ela executa uma configuração previamente definida com parâmetros, agenda e destino.

### 2.10 Informação útil antes de ornamentação

Gráficos, indicadores e dashboards devem existir quando ajudam a compreender, comparar ou agir.

Evitar gráficos apenas decorativos.

## 3. Escopo funcional do produto

A direção funcional inclui:

### Integração de dados

- cadastro de fontes;
- conectores;
- credenciais protegidas;
- teste de conexão;
- descoberta de recursos quando suportada;
- leitura somente autorizada;
- arquivos como fonte quando aplicável.

### Modelagem leve

- datasets;
- campos;
- tipos normalizados;
- labels;
- capacidades;
- filtros;
- ordenação;
- agrupamento;
- métricas;
- cálculos compatíveis com a arquitetura;
- relações quando formalmente definidas no modelo futuro.

### Análise

- seleção de campos;
- filtros;
- agrupamentos;
- agregações;
- métricas;
- parâmetros;
- ordenações;
- reutilização.

### Apresentação

- tabelas;
- KPIs;
- gráficos;
- dashboards;
- relatórios;
- PDF;
- apresentações.

### Reutilização

- modelos;
- parâmetros;
- versões ou estados publicados quando necessário;
- histórico de execução conforme definição futura.

### Automação

- agenda;
- parâmetros;
- execução;
- geração de saída;
- distribuição;
- registro de resultado;
- tratamento de falha.

### Governança

- usuários;
- perfis;
- permissões;
- restrições de acesso;
- identidade da instância;
- auditoria proporcional;
- configuração administrativa.

## 4. O que o Data Studio não é

### Não é ERP

Não deve assumir responsabilidade por registrar todas as operações da empresa.

### Não é CRM

Pode analisar dados comerciais e de clientes, mas não deve automaticamente virar o sistema de relacionamento comercial.

### Não é help desk

Pode analisar tickets, porém o tratamento operacional de chamados pertence ao sistema de origem.

### Não é sistema de RH

Pode analisar dados de RH conforme autorização, mas não assume automaticamente folha, admissão ou demais processos.

### Não é planilha genérica

O objetivo não é recriar todos os comportamentos de Excel dentro do navegador.

### Não é banco de dados operacional paralelo

O produto deve evitar duplicar toda a base da empresa sem necessidade arquitetural.

O banco interno guarda principalmente configuração, metadados, segurança, modelos, histórico e dados derivados necessários ao funcionamento.

### Não é proxy HTTP arbitrário

Usuários não devem poder usar a aplicação para realizar qualquer requisição externa sem regras do conector.

### Não é cliente SQL aberto

O produto não deve oferecer SQL arbitrário como experiência padrão de usuário.

### Não é ferramenta de programação

Recursos configuráveis devem possuir limites claros. Não criar linguagem de script irrestrita apenas para oferecer flexibilidade.

## 5. Leitura das fontes

A direção padrão é somente leitura.

Quando a origem for banco relacional:

- credencial deve ter menor privilégio;
- preferir usuário read-only;
- não permitir escrita por engano;
- operações permitidas devem ser controladas;
- consultas precisam de limites, timeout e paginação quando necessário.

Quando a origem for API:

- o conector só usa operações necessárias para leitura;
- um endpoint que tecnicamente utilize POST para pesquisa pode ser aceito desde que a semântica seja somente leitura;
- ações de mutação não entram automaticamente no escopo.

## 6. Customização por cliente

A instalação de um cliente pode ter:

- identidade própria;
- fontes próprias;
- datasets próprios;
- modelos próprios;
- dashboards próprios;
- automações próprias;
- usuários próprios;
- permissões próprias.

Isso não justifica alterar o core para cada cliente.

A regra é:

```text
mesmo produto
+
configurações diferentes
```

## 7. Apresentações

Apresentações fazem parte da visão do produto, mas sua especificação detalhada ainda será definida.

O requisito de produto já consolidado é: uma análise deve poder alimentar uma saída em formato de apresentação estruturada, sem exigir reconstrução manual dos dados.

Não assumir neste momento uma engine específica.

## 8. Inteligência e IA

O produto é uma plataforma de inteligência gerencial no sentido de transformar dados em informação.

Isso não implica que inteligência artificial seja obrigatória para a primeira versão.

IA poderá ser avaliada futuramente para:

- explicação;
- resumo;
- descoberta;
- auxílio à configuração;
- identificação de padrões;

desde que existam controles de segurança, transparência e qualidade.

Não depender de IA para funcionalidades fundamentais como filtros, métricas, relatórios e dashboards.

## 9. Escopo inicial de desenvolvimento

A primeira implementação não precisa entregar toda a visão.

A estratégia é construir uma fatia vertical capaz de provar:

1. autenticação mínima;
2. uma fonte real;
3. um conector real;
4. um dataset;
5. campos;
6. uma análise/visão;
7. parâmetros;
8. um relatório real;
9. preview;
10. PDF.

Depois expandir reutilizando os mesmos contratos.

## 10. Critério para nova feature

Antes de adicionar uma funcionalidade, responder:

- qual problema resolve?
- quem usa?
- com que frequência?
- é operacional ou administrativa?
- já existe outro mecanismo que resolve?
- exige novo conceito de domínio?
- pode ser configuração?
- altera segurança?
- precisa estar no menu global?
- como será testada?

Se essas respostas não estiverem claras, a feature não deve ser adicionada por antecipação.
