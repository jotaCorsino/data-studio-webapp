# 06 — Dados, Datasets e Campos

**Status:** em consolidação

## 1. Objetivo

Definir o contrato de dados interno do Technolife Data Studio.

A camada de Dataset deve permitir que o restante do produto trabalhe com dados de forma consistente, independentemente da origem.

## 2. Dataset como contrato

```text
Source específica
      ↓
Connector
      ↓
Dataset
      ↓
Analysis
```

Dataset não é apenas uma tabela física. É um conjunto de dados publicado com semântica, schema e capacidades conhecidas.

## 3. Dataset

Propriedades conceituais:

- id;
- name;
- description;
- sourceId;
- resourceId;
- state;
- fields;
- capabilities;
- securityPolicy;
- refresh/materialization policy quando existir;
- metadata;
- version/schema fingerprint quando necessário.

## 4. Estado

Estados candidatos:

- draft;
- published;
- incompatible;
- archived.

Apenas published deve ser utilizado normalmente por consumidores.

## 5. Field

Field representa uma informação disponível no Dataset.

Propriedades:

- id;
- technicalKey;
- sourceIdentity;
- label;
- normalizedType;
- nativeType opcional;
- nullable;
- description;
- capabilities;
- semantic metadata;
- formatting metadata quando apropriado.

## 6. Identidade

A identidade de Field deve sobreviver a alterações de apresentação.

```text
sourceIdentity: customer_name
label: Cliente
```

Alterar `Cliente` para `Empresa` não altera o binding técnico.

## 7. Tipos normalizados

Candidatos iniciais:

- identifier;
- text;
- integer;
- decimal;
- boolean;
- date;
- datetime;
- category.

Possíveis extensões futuras:

- duration;
- currency;
- percentage;
- json;
- geographic;
- email;
- url.

Não adicionar tipos apenas para estilização quando um formato de apresentação resolver.

## 8. Valor nativo e valor exibido

O sistema deve distinguir:

- valor bruto/normalizado;
- valor formatado para apresentação.

Exemplo:

```text
raw: 1234.5
type: decimal
format: currency BRL
display: R$ 1.234,50
```

Filtros e cálculos operam sobre valor tipado, não sobre string formatada.

## 9. Datas

Datas exigem semântica clara.

Distinguir:

- date;
- datetime;
- timezone quando aplicável.

Filtros de período precisam possuir limites previsíveis.

Não depender de parsing visual ambíguo.

## 10. Category

Campos categóricos representam conjunto discreto de valores úteis para:

- filtros;
- agrupamento;
- séries de gráfico;
- segmentação.

Não assumir que todo texto deve ser Category.

## 11. Capabilities de Field

Um Field pode declarar:

- filterable;
- sortable;
- groupable;
- aggregatable;
- searchable;
- operators;
- supportedAggregations.

A interface deve derivar controles dessas capacidades.

## 12. Operadores

Exemplos por tipo:

### Text

- equals;
- notEquals;
- contains;
- startsWith;
- endsWith;
- isEmpty;
- isNotEmpty.

### Number

- equals;
- notEquals;
- gt;
- gte;
- lt;
- lte;
- between;
- isEmpty.

### Date/Datetime

- equals;
- before;
- after;
- between;
- relativePeriod;
- isEmpty.

### Category

- equals;
- notEquals;
- in;
- notIn;
- isEmpty.

A lista final precisa refletir capacidades reais do backend/Connector.

## 13. Metadados semânticos

O Criador pode adicionar descrição e significado.

Exemplo:

```text
technicalKey: resolved_at
label: Resolvido em
description: Data e hora em que o chamado foi encerrado
```

Isso ajuda a evitar uso incorreto.

## 14. Papéis semânticos

Alguns Fields podem receber papéis opcionais, como:

- identifier;
- name;
- timestamp;
- status;
- amount;
- category.

Papéis ajudam sugestões e apresentação, mas não devem criar hardcode global baseado no nome do Field.

## 15. Dataset derivado

O produto deve admitir a evolução para Datasets derivados.

Um Dataset derivado pode resultar de:

- seleção de Fields;
- filtros persistentes;
- cálculo;
- relação entre dados;
- agregação;
- transformação suportada.

A implementação inicial pode limitar esse recurso.

## 16. Relações entre dados

O produto precisa eventualmente permitir que informações relacionadas sejam combinadas.

Exemplo:

```text
Pedidos.customer_id
→ Clientes.id
```

Uma relação deve ser explícita e validada.

Não realizar joins automáticos apenas por nomes semelhantes.

## 17. Join / composição

A arquitetura deve comportar, futuramente:

- relação dentro da mesma Source;
- relação entre Resources da mesma origem;
- Dataset derivado;
- composição entre Datasets.

A primeira versão não precisa executar joins federados entre fontes distintas.

Cross-source join pode exigir materialização ou camada específica e deve ser introduzido conscientemente.

## 18. Cardinalidade

Relações devem poder declarar:

- one-to-one;
- one-to-many;
- many-to-one;
- many-to-many quando suportado.

A cardinalidade afeta agregações e risco de duplicação.

O sistema deve evitar gerar métricas incorretas por joins que multiplicam linhas sem aviso.

## 19. Field calculado

Field calculado representa valor derivado.

Exemplos:

- margem = receita - custo;
- tempo de resolução;
- faixa de atraso;
- percentual.

Requisitos:

- expressão controlada;
- tipos conhecidos;
- validação;
- sem execução de código arbitrário.

A linguagem de cálculo ainda será definida.

## 20. Métrica

Metric representa cálculo agregado reutilizável.

Exemplos:

- count;
- sum;
- average;
- min;
- max;
- distinct count quando suportado;
- taxa calculada.

Metric pode pertencer à Analysis em vez do Dataset. A separação final será consolidada.

## 21. Null e vazio

O sistema deve diferenciar quando possível:

- null;
- string vazia;
- zero;
- false;
- data ausente.

Apresentação pode simplificar, mas lógica analítica não deve confundir valores.

## 22. Schema fingerprint / versão

Para detectar incompatibilidade, Dataset pode manter uma representação do schema publicado.

Mudanças relevantes:

- Field removido;
- tipo alterado;
- capability alterada;
- Resource alterado.

Isso permite validar dependências antes da execução.

## 23. Publicação

Fluxo conceitual:

```text
Resource descoberto
→ revisar Fields
→ definir labels/tipos/metadados
→ aplicar restrições
→ publicar Dataset
```

Publicar é uma decisão administrativa.

## 24. Segurança do Dataset

Permissões podem atuar em:

- Dataset;
- Field;
- linhas/restrições obrigatórias.

Restrições de linha devem ser aplicadas no backend antes de retornar dados.

Não confiar em filtro enviado pelo frontend para segurança.

## 25. Dados sensíveis

Field pode possuir classificação ou marcação de sensibilidade.

Exemplos futuros:

- público interno;
- restrito;
- pessoal;
- financeiro;
- confidencial.

Isso pode influenciar:

- permissão;
- exportação;
- automação;
- logging;
- distribuição.

A taxonomia final será definida em Segurança.

## 26. Materialização

Por padrão, Dataset não significa cópia integral da origem.

Materialização pode ser adotada para:

- performance;
- snapshot;
- histórico;
- integração sem consulta online;
- análise cross-source.

Precisa de política explícita de:

- atualização;
- retenção;
- segurança;
- origem da verdade.

## 27. Qualidade de dados

O sistema deve permitir sinalizar problemas como:

- Field ausente;
- tipo inesperado;
- valor inválido;
- alta taxa de null;
- schema alterado.

Não é objetivo inicial virar plataforma completa de data quality, mas erros que comprometem análise precisam ser visíveis.

## 28. Critérios de aceite

A camada de dados está adequada quando:

1. Field possui identidade técnica separada de label;
2. tipos são normalizados;
3. operações são guiadas por capabilities;
4. Dataset pode ser publicado seletivamente;
5. filtros usam valores tipados;
6. mudança de schema é detectável;
7. relações são explícitas;
8. joins não multiplicam dados silenciosamente;
9. segurança pode atuar até Field/linha;
10. Analysis não precisa conhecer schema nativo da Source.
