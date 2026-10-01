# 07 — Análises e Visões

**Status:** em consolidação

## 1. Objetivo

Definir a camada que transforma dados publicados em informação reutilizável.

Analysis/View é o núcleo lógico entre Dataset e apresentação.

## 2. Papel

```text
Dataset
  ↓
Analysis / View
  ↓
Table / KPI / Chart / Report / Dashboard / Presentation
```

A camada existe para evitar que cada componente visual reconstrua filtros, agrupamentos e métricas.

## 3. Analysis

Uma Analysis define o significado da consulta.

Pode conter:

- Dataset;
- Fields;
- filtros;
- parâmetros;
- ordenação;
- agrupamentos;
- métricas;
- cálculos;
- limites;
- relações utilizadas quando suportadas.

## 4. View

View representa uma configuração reutilizável pronta para consumo ou composição.

Ainda será decidido se Analysis e View serão duas entidades persistidas ou um único conceito com estados diferentes.

Distinção candidata:

```text
Analysis = lógica analítica
View     = forma publicada de consultar essa lógica
```

Não fixar essa separação em código antes da decisão final.

## 5. Seleção de Fields

O Criador escolhe quais Fields participam da Analysis.

Cada seleção pode ter:

- Field id;
- label de apresentação;
- função;
- visibilidade;
- formato.

Não duplicar dados apenas para mudar label.

## 6. Filter

Filter restringe registros.

Propriedades conceituais:

- Field;
- operator;
- value;
- parameter binding opcional;
- composição lógica.

Exemplo:

```text
status equals "Resolvido"
```

## 7. Composição lógica

Filtros precisam eventualmente suportar:

- AND;
- OR;
- grupos.

A UX deve manter o caso comum simples.

Não abrir um construtor lógico complexo quando filtros simples forem suficientes.

## 8. Parameter Binding

Um filtro pode receber valor de Parameter.

Exemplo:

```text
Field: customer_id
Operator: equals
Value: {{ cliente }}
```

Isso transforma uma Analysis fixa em uma análise reutilizável.

## 9. Período

Período é um caso importante de parâmetro.

Deve suportar:

- intervalo absoluto;
- hoje;
- ontem;
- esta semana;
- semana anterior;
- este mês;
- mês anterior;
- este ano;
- período personalizado;
- outras opções consolidadas futuramente.

Para automação, períodos relativos devem ser resolvidos no momento da Execution.

## 10. Sort

Sort define ordenação.

Propriedades:

- Field;
- direction;
- priority.

Não depender da ordem natural da Source.

## 11. Group

Grouping reúne registros por um ou mais Fields quando suportado.

Exemplos:

- categoria;
- cliente;
- departamento;
- mês;
- status.

Agrupamento deve possuir semântica tipada.

Agrupar datetime por mês não é necessariamente igual a agrupar o valor bruto.

## 12. Metric

Metric resume dados.

Exemplos:

- quantidade;
- soma;
- média;
- mínimo;
- máximo;
- distintos;
- taxa;
- cálculo derivado.

Metric deve declarar:

- nome;
- operação;
- Field quando aplicável;
- formato;
- regras de null;
- cálculo.

## 13. Dimensão

Dimensão é um Field usado para segmentar ou contextualizar uma métrica.

Exemplo:

```text
métrica: receita
dimensão: mês
```

ou:

```text
métrica: chamados
dimensão: categoria
```

O termo pode ser usado na UX avançada, mas não precisa ser obrigatório em toda interface.

## 14. Granularidade temporal

Análises de data devem poder trabalhar com granularidades como:

- dia;
- semana;
- mês;
- trimestre;
- ano.

Regras de calendário precisam ser consistentes com locale/timezone da Instance.

## 15. Cálculos

O produto pode suportar cálculos controlados.

Exemplos:

- diferença;
- percentual;
- margem;
- duração;
- taxa;
- comparação com período anterior.

Não executar JavaScript, PHP, SQL ou código arbitrário fornecido pelo usuário.

## 16. Comparação

Comparações gerenciais são parte importante do propósito.

Exemplos:

- período atual vs anterior;
- unidade A vs B;
- categoria A vs B;
- realizado vs meta quando houver Dataset correspondente.

A arquitetura deve permitir comparação sem duplicar manualmente toda a Analysis.

A especificação detalhada virá em evolução própria.

## 17. Resultado tabular

Toda Analysis deve possuir uma representação de resultado compreensível pelo core.

Conceitualmente:

```text
schema
rows
metadata
pagination
summary
```

Componentes visuais consomem esse resultado.

## 18. Query Planning

O backend decide como executar uma Analysis.

Pode:

- empurrar filtros para a Source;
- agregar na Source;
- executar transformação interna suportada;
- combinar etapas.

O frontend não decide SQL ou detalhes do provedor.

## 19. Limites de resultado

Análise interativa deve possuir:

- paginação;
- limite;
- timeout;
- proteção contra consultas excessivas.

Preview de configuração pode usar amostragem controlada quando necessário.

Amostragem deve ser indicada quando puder alterar interpretação.

## 20. Reutilização

Uma mesma Analysis pode alimentar:

- tabela;
- indicador;
- gráfico;
- seção de relatório;
- dashboard;
- slide.

Exemplo:

```text
Analysis: Receita mensal
├── KPI Receita total
├── Chart evolução
├── Report financeiro
└── Presentation diretoria
```

## 21. Publicação

Analysis/View pode precisar de estados:

- draft;
- published;
- archived.

Consumidores acessam apenas objetos publicados e autorizados.

## 22. Parâmetros expostos

O Criador decide quais Parameters o consumidor pode informar.

Parâmetros internos podem existir sem aparecer ao consumidor.

Exemplo:

```text
interno:
status = concluído

exposto:
cliente
período
```

## 23. Labels

Analysis pode fornecer aliases específicos para o contexto.

Um Field chamado tecnicamente:

```text
resolved_at
```

pode aparecer na Analysis como:

```text
Data de resolução
```

A identidade continua sendo o Field.

## 24. Compatibilidade

Analysis deve ser validada quando Dataset muda.

Estados possíveis:

- válida;
- requer atenção;
- incompatível.

Problemas:

- Field removido;
- tipo mudou;
- operator não suportado;
- agregação indisponível;
- relação quebrada.

## 25. Permissões

Execução de Analysis respeita:

- acesso ao objeto;
- acesso ao Dataset;
- acesso aos Fields;
- restrições obrigatórias de linha.

Uma Analysis publicada não amplia permissão sobre os dados.

## 26. Visão simples para o consumidor

Consumidor não precisa ver o editor.

Pode receber:

```text
Desempenho de atendimento

Cliente
[ ACME ]

Período
[ Mês anterior ]

[ Analisar ]
```

## 27. Studio para o Criador

Fluxo candidato:

```text
Nova análise
→ escolher Dataset
→ selecionar Fields
→ filtros
→ parâmetros
→ agrupamentos
→ métricas
→ ordenar
→ validar resultado
→ salvar
→ publicar
```

A interface detalhada será especificada em UX.

## 28. Relação com Report

Report consome Analysis.

Configurações como:

- mostrar Field;
- esconder Field em uma tabela;
- título;
- orientação;
- cabeçalho;

pertencem ao Report, não à Analysis.

Já filtros, agrupamentos e métricas reutilizáveis pertencem preferencialmente à Analysis.

## 29. Relação com Dashboard

Dashboard consome uma ou várias Analyses.

Filtros globais de Dashboard podem alimentar Parameters das Analyses.

Exemplo:

```text
Filtro global: período
→ Analysis A.period
→ Analysis B.period
→ Analysis C.period
```

## 30. Relação com Presentation

Presentation consome Analyses para gerar slides.

Os dados não devem ser copiados manualmente para o slide como regra normal.

## 31. Critérios de aceite

A camada está adequada quando:

1. lógica analítica é reutilizável;
2. filtros são tipados;
3. Parameters podem alimentar filtros;
4. agrupamentos não dependem de nomes hardcoded;
5. métricas podem ser compartilhadas;
6. apresentação não reimplementa query;
7. permissões são respeitadas;
8. mudança de Dataset gera validação;
9. consumidor não precisa entender a Analysis internamente;
10. o backend mantém controle sobre a execução.
