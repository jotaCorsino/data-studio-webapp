# 03 — Arquitetura

**Status:** arquitetura conceitual em consolidação  
**Observação:** este documento fixa responsabilidades e fronteiras arquiteturais. A base técnica da V1 está consolidada em `21-DECISOES-TECNICAS-V1.md`.

## 1. Objetivo

Definir uma arquitetura que permita conectar fontes diferentes, normalizar dados e reutilizar a mesma base analítica para relatórios, dashboards, apresentações e automações.

A arquitetura deve suportar crescimento sem obrigar cada integração ou cliente a criar uma versão diferente do produto.

## 2. Fluxo conceitual

```text
Sistema / Banco / Arquivo
          ↓
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
     ↙      ↓      ↘
Report  Dashboard  Presentation
          ↓
       Execution
          ↓
 Automation / Distribution
```

As entidades finais serão detalhadas em `04-MODELO-DE-DOMINIO.md`.

## 3. Source

Representa uma origem configurada em uma instância.

Exemplos:

- API de um sistema;
- banco MySQL;
- banco MariaDB;
- arquivo enviado;
- diretório/importação controlada;
- outra origem suportada.

A Source contém referência ao tipo de Connector e configuração não secreta necessária.

Credenciais ficam em mecanismo protegido e não devem ser tratadas como atributos comuns expostos ao frontend.

## 4. Connector

O Connector traduz uma origem específica para contratos compreendidos pelo Data Studio.

Responsabilidades possíveis:

- testar conexão;
- descobrir recursos;
- descobrir campos;
- declarar capacidades;
- validar configuração;
- executar leitura;
- aplicar filtros suportados;
- aplicar paginação;
- aplicar ordenação;
- normalizar resposta;
- traduzir erros externos.

O Connector não deve:

- decidir layout de relatório;
- conhecer dashboard;
- conhecer PDF;
- possuir regra específica de um cliente fora de sua própria integração;
- permitir acesso arbitrário ao provedor.

## 5. Capabilities

Fontes não possuem as mesmas capacidades.

Um Connector deve poder declarar, conforme contexto:

- paginação;
- filtro;
- operadores disponíveis;
- ordenação;
- agrupamento;
- agregações;
- descoberta de recursos;
- descoberta de campos;
- limites.

A interface deve respeitar essas capacidades.

Não apresentar ao usuário uma operação que a fonte não consegue realizar de forma segura ou suportada.

## 6. Dataset

Dataset é a fronteira entre origem e produto analítico.

Ele representa um conjunto de dados publicado para uso dentro do Data Studio.

Depois que um consumidor trabalha com Dataset, não deve precisar saber se a origem era:

- API;
- banco;
- CSV;
- XLSX;
- XML.

Responsabilidades:

- identidade;
- fonte/recurso de origem;
- campos publicados;
- metadados;
- capacidades efetivas;
- estado de publicação;
- restrições;
- descrição funcional.

## 7. Fields

Campo deve possuir identidade técnica estável e apresentação configurável.

Conceitualmente:

```text
id
technicalKey
label
normalizedType
capabilities
metadata
```

Tipos normalizados iniciais candidatos:

- identifier;
- text;
- integer;
- decimal;
- boolean;
- date;
- datetime;
- category.

A lista será fechada no documento de dados.

## 8. Analysis / View

Representa uma definição reutilizável de como interpretar ou recortar um Dataset.

Pode conter:

- campos;
- filtros;
- parâmetros;
- ordenações;
- agrupamentos;
- métricas;
- agregações;
- cálculos permitidos.

Essa camada evita repetir lógica em cada relatório ou gráfico.

Exemplo:

```text
Análise: Chamados concluídos por categoria

Dataset: Chamados
Filtro: status = concluído
Parâmetro: período
Agrupamento: categoria
Métrica: count()
```

A mesma análise pode alimentar um gráfico, indicador ou seção de relatório.

## 9. Presentation Model

Representa como informação é organizada para consumo.

A especificação será dividida em documentos próprios.

Elementos candidatos:

- título;
- texto;
- tabela;
- indicador;
- gráfico;
- imagem;
- divisor;
- espaço;
- seção;
- elementos específicos de documento ou apresentação.

Não assumir que relatório, dashboard e slide usam exatamente o mesmo renderer.

Compartilhar dados e conceitos quando útil, mas respeitar diferenças de mídia.

## 10. Report

Relatório é uma apresentação documental.

Características:

- orientação a páginas;
- tamanho de papel;
- margens;
- cabeçalho;
- rodapé;
- paginação;
- preview;
- PDF;
- impressão.

O relatório não é screenshot do dashboard.

## 11. Dashboard

Dashboard é uma apresentação interativa.

Características:

- layout responsivo;
- indicadores;
- gráficos;
- tabelas;
- filtros;
- interação;
- navegação para contexto detalhado quando aplicável.

Não deve herdar restrições de paginação A4.

## 12. Presentation

Apresentação é saída organizada em slides.

Características finais serão especificadas posteriormente.

O requisito arquitetural atual é que ela consuma dados e análises do mesmo core, evitando uma segunda camada de lógica analítica independente.

## 13. Model / Template

Um modelo é uma configuração reutilizável preparada para execução.

Pode referenciar:

- relatório;
- dashboard publicado quando fizer sentido;
- apresentação;
- parâmetros;
- padrões.

O nome final da entidade será consolidado no modelo de domínio.

## 14. Parameters

Parâmetros permitem variar uma execução sem alterar a definição.

Exemplos:

- período;
- cliente;
- departamento;
- unidade;
- categoria;
- responsável;
- valor limite.

Devem possuir:

- tipo;
- label;
- valor padrão quando aplicável;
- validação;
- opções permitidas;
- obrigatoriedade.

Parâmetros relativos, como “mês anterior”, são importantes para automações.

## 15. Execution

Execution representa uma realização concreta de uma configuração com parâmetros.

Conceitualmente:

```text
modelo
+
parâmetros resolvidos
+
contexto de usuário/permissão
+
momento
=
execução
```

A Execution deve permitir rastrear estado e resultado conforme necessidade do produto.

Ela é importante para garantir consistência entre:

- preview;
- PDF;
- apresentação;
- automação;
- histórico.

## 16. Automation

Automação agenda ou dispara execuções.

Ela não deve possuir uma lógica analítica paralela.

Referência conceitual:

```text
Automation
→ Model
→ Parameters
→ Schedule
→ Outputs
→ Distribution
```

## 17. Distribuição

Distribuição é a entrega de um resultado.

Primeiro candidato:

- e-mail.

Futuramente outros destinos podem ser suportados.

Destino não deve ser confundido com formato.

Exemplo:

```text
formato = PDF
destino = e-mail
```

## 18. Aplicação e backend

A direção é uma aplicação Web com frontend e backend separados por uma API interna controlada.

Princípios:

- frontend não acessa banco externo;
- frontend não guarda segredos de fonte;
- backend resolve conectores;
- backend aplica autorização;
- backend valida parâmetros;
- backend coordena geração e automações;
- banco interno guarda configuração e estado oficial do produto.

A V1 utiliza frontend React/TypeScript compilado, backend Symfony/PHP e API JSON same-origin. A especificação técnica completa está em `21-DECISOES-TECNICAS-V1.md`.

## 19. Query Specification

A interface não deve enviar SQL arbitrário ao backend como contrato normal.

A direção é um contrato estruturado, conceitualmente:

```text
QuerySpecification {
  dataset
  fields
  filters
  sorts
  groups
  metrics
  pagination
}
```

O backend:

1. valida permissão;
2. valida Dataset;
3. valida Field;
4. valida operadores;
5. aplica restrições obrigatórias;
6. verifica capabilities;
7. traduz para o Connector;
8. executa;
9. normaliza resposta.

## 20. Segurança da origem

O backend deve proteger:

- credenciais;
- URLs;
- destinos;
- redirects;
- timeout;
- volume;
- paginação;
- operações;
- logs.

Um Connector HTTP não pode virar SSRF/proxy arbitrário.

Um Connector SQL não pode virar console SQL livre.

## 21. Persistência interna

O banco interno deve ser fonte de verdade para:

- usuários;
- permissões;
- configuração da instância;
- fontes;
- datasets;
- metadados;
- análises;
- modelos;
- automações;
- histórico necessário;
- auditoria necessária.

Dados operacionais externos não devem ser copiados integralmente por padrão.

Caching ou materialização futura exige decisão explícita.

## 22. Instâncias

Direção arquitetural atual:

```text
um código-base
+
instâncias configuráveis
```

A estratégia de isolamento físico e lógico será fechada em documento próprio.

A direção atual favorece a possibilidade de instâncias separadas por organização, mantendo o mesmo produto.

## 23. Desenvolvimento vertical

Primeiro fluxo funcional deve provar a arquitetura completa, em vez de criar todas as telas abstratas antes dos dados reais.

Uma fatia inicial deve atravessar:

```text
login
→ fonte
→ connector
→ dataset
→ analysis
→ modelo
→ execução
→ preview
→ PDF
```

Somente depois ampliar o builder e os demais formatos.

## 24. Decisões técnicas

A base necessária para iniciar o scaffold está consolidada em `21-DECISOES-TECNICAS-V1.md`.

Já estão definidos para a V1:

- React + TypeScript + Vite no frontend;
- Symfony 7.4 LTS no backend;
- PHP 8.3 mínimo e 8.4 recomendado;
- MariaDB/MySQL;
- Doctrine ORM/DBAL;
- sessão same-origin;
- API JSON versionada;
- jobs persistidos e processados por cron one-shot;
- Symfony Mailer;
- storage privado;
- Dompdf como engine inicial de PDF;
- repositório único com Instance e Control Plane em aplicações separadas.

Permanecem sujeitos a spike/homologação antes da funcionalidade ou release correspondente:

- encoder/proteção final do backend;
- duração do lease e grace period;
- engine definitiva de apresentações;
- biblioteca de charts;
- política de cache/materialização;
- versionamento/snapshot definitivo de Models e Executions;
- retenção;
- limites mínimos de infraestrutura.

## 25. Critério arquitetural

Uma evolução está alinhada quando:

1. nova origem entra via Connector;
2. Dataset continua sendo contrato comum;
3. regras analíticas não vazam para Connector;
4. renderização não conhece tecnologia da fonte;
5. automação reutiliza uma configuração existente;
6. autorização é aplicada antes da consulta;
7. segredo permanece no backend;
8. configuração de cliente não exige fork;
9. uma fatia real consegue atravessar todas as camadas;
10. abstrações permanecem proporcionais aos requisitos reais.

## 26. Arquitetura de implantação licenciada

A direção da V1 é uma Instance instalada na hospedagem/cPanel da organização, mantendo dados e processamento próximos às Sources da empresa.

A arquitetura deve separar a Instance local de um serviço proprietário de controle operado pela Technolife.

```text
Technolife Control Plane
        │
        │ licença / lease / revogação
        ▼
Instance no cPanel do cliente
        │
        ├── frontend compilado
        ├── backend protegido
        ├── banco interno
        ├── storage privado
        └── Connectors
              ↓
           Sources locais/remotas
```

Regras:

- o cliente pode administrar sua hospedagem sem receber a chave privada de licenciamento;
- o código-fonte original do backend não integra o pacote normal de produção;
- uma cópia física dos arquivos não deve ser suficiente para ativar nova Instance;
- licença deve poder ser suspensa ou revogada remotamente;
- revogação não destrói dados;
- indisponibilidade temporária do Control Plane deve possuir tolerância;
- dados de negócio não precisam sair da Instance para validar licença.

A especificação detalhada está em `19-LICENCIAMENTO-E-PROTECAO-DO-PRODUTO.md`.

## 27. cPanel como ambiente inicial

A primeira linha de implantação deve ser compatível com hospedagem administrada por cPanel.

Isso influencia a escolha da stack e dos mecanismos de:

- PHP/runtime;
- banco MySQL/MariaDB;
- cron/jobs;
- storage;
- HTTPS;
- deploy;
- proteção do backend;
- ativação.

A compatibilidade precisa ser testada em ambiente representativo antes da release comercial.

## 28. Ciclo de vida da Instance

A arquitetura deve tratar explicitamente:

```text
provisionar
→ instalar
→ ativar
→ operar
→ atualizar
→ suspender
→ reativar
→ cancelar
→ reter conforme política
→ remover
```

Implantação e remoção são partes do produto operacional e terão manuais próprios.
