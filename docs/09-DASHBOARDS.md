# 09 — Dashboards

**Status:** em consolidação

## 1. Objetivo

Definir o modelo de dashboards do Technolife Data Studio.

Dashboard é uma forma interativa de apresentar informação gerencial. Seu objetivo é ajudar o usuário a compreender uma situação, acompanhar indicadores, comparar cenários e navegar para detalhes relevantes.

Dashboard não deve ser tratado como coleção decorativa de gráficos.

## 2. Princípio

Um dashboard deve responder perguntas úteis.

Exemplos:

- O que exige atenção agora?
- O que mudou no período?
- Quais indicadores pioraram?
- Onde existe crescimento ou queda?
- Qual unidade está fora do esperado?
- Quais categorias concentram mais ocorrências?
- Onde existe oportunidade de redução de custo?
- Qual dimensão merece investigação?

## 3. Relação com Analysis

Dashboard consome uma ou mais Analyses.

```text
Dataset
   ↓
Analysis
   ↓
Dashboard
```

A lógica analítica não deve ser reimplementada dentro de cada gráfico.

Exemplo:

```text
Analysis: Receita mensal
├── KPI Receita total
├── Chart Evolução mensal
└── Table Receita por unidade
```

## 4. Estrutura

Dashboard pode conter:

- indicadores;
- gráficos;
- tabelas;
- textos;
- filtros;
- seções;
- títulos;
- alertas;
- elementos de navegação contextual.

Os componentes devem ser organizados em layout responsivo.

## 5. Dashboard Block

Cada bloco deve possuir:

- id;
- type;
- title opcional;
- analysis binding;
- configuration;
- layout;
- visibility rules quando aplicável.

Tipos candidatos:

- metric;
- chart;
- table;
- text;
- image;
- divider;
- spacer;
- section.

## 6. Indicadores

Indicadores devem apresentar um valor com contexto suficiente.

Exemplo ruim:

```text
127
```

Exemplo melhor:

```text
Chamados vencidos
127
+18% vs período anterior
```

Indicadores podem incluir:

- valor;
- unidade;
- variação;
- período;
- comparação;
- estado;
- link contextual.

## 7. Gráficos

A escolha do gráfico deve ser compatível com o tipo de pergunta.

Exemplos:

- linha para evolução temporal;
- barras para comparação;
- barras empilhadas para composição;
- área quando houver justificativa;
- pizza/donut apenas quando realmente útil para composição simples;
- dispersão quando houver relação entre medidas;
- histogramas quando distribuição fizer sentido.

Não oferecer tipos de gráfico apenas para aumentar quantidade de opções.

## 8. Configuração de gráfico

Pode incluir:

- Analysis;
- dimensão;
- métricas;
- séries;
- ordenação;
- limite;
- título;
- legenda;
- rótulos;
- formato numérico;
- eixo;
- tooltip;
- cores semânticas;
- comportamento de clique.

Configurações devem ser orientadas às capabilities dos Fields.

## 9. Filtros do dashboard

Dashboard pode possuir filtros globais.

Exemplos:

- período;
- unidade;
- cliente;
- departamento;
- categoria.

Filtro global pode alimentar Parameters de múltiplas Analyses.

```text
Filtro global: Período
→ Analysis A.period
→ Analysis B.period
→ Analysis C.period
```

O binding deve ser explícito.

## 10. Filtros locais

Um bloco pode possuir filtros próprios quando necessário.

Esses filtros não devem confundir o usuário sobre o contexto global.

A interface deve deixar claro se o filtro afeta:

- dashboard inteiro;
- seção;
- bloco específico.

## 11. Interação

Interações possíveis:

- hover;
- seleção;
- clique;
- drill-down;
- drill-through;
- mudança de filtro;
- navegação para detalhe;
- abrir relatório relacionado.

Interação deve ter objetivo funcional.

## 12. Drill-down

Exemplo:

```text
Chamados por categoria
→ clicar em EMAIL
→ detalhar subcategorias
```

A hierarquia precisa ser configurada ou derivada de metadados conhecidos.

## 13. Drill-through

Exemplo:

```text
Chamados vencidos: 18
→ clicar
→ abrir lista filtrada com esses 18 registros
```

Sempre que possível, indicadores devem permitir chegar ao dado que os compõe.

## 14. Estado de atualização

Dashboard deve indicar quando necessário:

- momento da última atualização;
- período exibido;
- Source indisponível;
- dados parciais;
- amostragem;
- cache/materialização.

Não transmitir falsa impressão de tempo real.

## 15. Dashboard operacional vs executivo

### Operacional

Mais próximo do trabalho do dia a dia.

Características:

- atualização frequente;
- filtros;
- listas;
- detalhes;
- ações de investigação.

### Executivo

Mais sintético.

Características:

- KPIs;
- evolução;
- comparação;
- tendências;
- menor densidade;
- foco em decisão.

O mesmo produto deve suportar ambos sem criar dois sistemas.

## 16. Layout

O Criador deve organizar blocos em uma grade.

Requisitos:

- responsividade;
- hierarquia visual;
- alinhamento;
- tamanhos mínimos;
- comportamento previsível;
- leitura em telas comuns de desktop;
- adaptação para telas menores.

A engine de grid ainda será definida.

## 17. Navegação

Dashboards publicados devem ser fáceis de encontrar para consumidores autorizados.

Não é necessário expor Dataset, Analysis ou configuração interna.

Exemplo:

```text
Dashboards
├── Visão financeira
├── Atendimento
└── Operações
```

## 18. Favoritos e recentes

Podem ser considerados posteriormente para reduzir navegação.

Não são requisito inicial.

## 19. Exportação

Dashboard não deve ser confundido com relatório.

Exportar um dashboard como imagem/PDF pode ser útil, mas isso não substitui um Report documental bem definido.

Quando a necessidade for documento formal, usar Report.

## 20. Segurança

Cada bloco deve respeitar:

- permissão do Dashboard;
- permissão da Analysis;
- permissão do Dataset;
- permissão de Field;
- restrições de linha.

Um Dashboard não amplia acesso.

## 21. Performance

Dashboards podem disparar várias consultas.

O sistema deve controlar:

- concorrência;
- deduplicação de consultas iguais;
- cache quando definido;
- cancelamento;
- paginação;
- prioridade;
- limites.

A implementação deve evitar carregar tudo de todas as fontes de uma vez.

## 22. Estados de interface

Cada bloco deve prever:

- loading;
- vazio;
- erro;
- sem permissão;
- fonte indisponível.

O dashboard deve continuar utilizável quando um bloco falhar isoladamente, sempre que possível.

## 23. Publicação

Estados candidatos:

- draft;
- published;
- archived.

Somente dashboards publicados aparecem para consumidores.

## 24. Critérios de aceite

O sistema de dashboards está alinhado quando:

1. blocos reutilizam Analyses;
2. filtros globais possuem bindings explícitos;
3. indicadores possuem contexto;
4. gráficos não são decorativos;
5. usuário pode chegar ao detalhe quando aplicável;
6. falha de um bloco não destrói necessariamente o dashboard inteiro;
7. segurança é aplicada em todas as camadas;
8. layout é responsivo;
9. estado de atualização é claro;
10. o consumidor não precisa conhecer a arquitetura de dados.
