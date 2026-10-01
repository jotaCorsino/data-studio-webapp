# 08 — Relatórios

**Status:** em consolidação

## 1. Objetivo

Definir o sistema de relatórios do Technolife Data Studio.

Relatório é uma forma de apresentação documental de uma análise. Não é o centro do produto, mas é uma de suas saídas mais importantes.

O sistema deve combinar grande poder de configuração com execução simples.

## 2. Princípio

Um relatório deve ser configurado uma vez e executado muitas vezes.

```text
Criador configura
        ↓
Modelo publicado
        ↓
Consumidor informa parâmetros
        ↓
Preview
        ↓
PDF / impressão / outra saída suportada
```

O consumidor não deve reconstruir colunas, agrupamentos ou layout em cada execução.

## 3. Separação de responsabilidades

A configuração de relatório deve separar pelo menos três dimensões.

### Estrutura de dados

Define de onde vêm os dados e como são organizados.

Exemplos:

- Analysis;
- Field de filtro principal;
- Field de período;
- Field de agrupamento;
- métricas;
- ordenação.

### Estrutura de apresentação

Define o que aparece e como aparece.

Exemplos:

- blocos;
- tabelas;
- colunas;
- aliases;
- gráficos;
- indicadores;
- ordem;
- visibilidade.

### Configuração documental

Define propriedades do documento.

Exemplos:

- título;
- papel;
- orientação;
- margens;
- cabeçalho;
- rodapé;
- data de geração;
- identidade;
- paginação.

Essas três dimensões não devem ser misturadas em uma única configuração opaca.

## 4. Structural Mapping

Um relatório pode precisar atribuir papéis a Fields.

Exemplos:

```text
Filtro principal    → Cliente
Filtro de período   → Data
Separar tabelas por → Categoria
```

No produto genérico esses papéis não podem depender de nomes específicos.

O Criador seleciona Fields compatíveis.

## 5. Relatórios parametrizados

Parâmetros permitem que o mesmo relatório seja executado em contextos diferentes.

Exemplos:

- cliente;
- período;
- unidade;
- departamento;
- responsável;
- categoria;
- limite;
- status.

O Criador decide quais parâmetros são expostos ao Consumidor.

O Consumidor não recebe automaticamente todos os filtros técnicos da Analysis.

## 6. Defaults inteligentes

Parâmetros frequentes devem poder ter valores padrão.

Exemplo:

```text
Período
[ Mês anterior ]
```

é preferível a obrigar o usuário a preencher duas datas em toda execução.

Defaults podem ser relativos, desde que sejam resolvidos no momento da Execution.

## 7. Tabelas repetidas por grupo

Um relatório pode gerar múltiplas tabelas a partir de um Field de agrupamento.

Exemplo conceitual:

```text
groupField = categoria

EMAIL
[tabela]

BACKUP
[tabela]

SERVIDOR
[tabela]
```

Grupos sem registros após os filtros não precisam gerar tabelas vazias, salvo configuração explícita.

## 8. Colunas comuns

Uma definição de tabela pode possuir Fields comuns a todos os grupos.

Exemplo:

```text
Data
Cliente
Status
Assunto
Responsável
```

Esses Fields não devem ser hardcoded no core.

O Criador escolhe os Fields comuns conforme Dataset e objetivo do relatório.

## 9. Colunas específicas por grupo

Determinados grupos podem possuir Fields que só fazem sentido naquele contexto.

Exemplo:

```text
EMAIL
  Subcategoria
  Tipo de solicitação

BACKUP
  Destino
  Tipo de rotina
```

O mecanismo deve preservar a identidade técnica desses Fields.

## 10. Visibilidade por tabela/grupo

O Criador deve poder definir quais colunas aparecem em cada tabela quando a definição do relatório gera grupos diferentes.

Exemplo:

```text
EMAIL
[x] Data
[x] Cliente
[x] Assunto
[ ] Status
[x] Serviço

BACKUP
[x] Data
[x] Cliente
[ ] Assunto
[x] Status
[x] Destino
```

Ocultar uma coluna em um grupo:

- não remove o Field do Dataset;
- não altera a identidade da origem;
- não muda automaticamente outros grupos;
- deve refletir imediatamente na prévia;
- deve persistir na definição do relatório.

Uma tabela não deve terminar sem nenhuma coluna visível. A interface deve impedir ou corrigir esse estado de forma previsível.

## 11. Labels e aliases

O Criador deve poder ajustar nomes exibidos sem renomear a origem.

Exemplo:

```text
sourceIdentity = EMAIL > Subcategoria
displayLabel   = Serviço
```

A mesma regra vale para labels compactos usados apenas em documentos.

O sistema deve distinguir:

- nome técnico;
- label do Dataset;
- alias da Analysis quando houver;
- label específico da apresentação quando necessário.

Não duplicar níveis de alias sem necessidade.

## 12. Ordem de colunas

O modelo de domínio deve permitir ordem previsível de colunas.

A UX final de reordenação ainda será definida.

Regra já fixada: a ordem efetiva precisa pertencer à definição do relatório e não depender acidentalmente da posição original da coluna na Source.

## 13. Papel visual da coluna

Largura, alinhamento e comportamento visual não devem depender do texto literal do nome de origem.

No produto genérico, uma coluna pode possuir configuração de apresentação como:

- largura preferida;
- largura mínima/máxima;
- alinhamento;
- formato;
- prioridade de quebra;
- papel visual;
- comportamento responsivo/documental.

Evitar regras como “a coluna chamada Data sempre tem 12%”.

## 14. Configurações documentais

Devem existir independentemente da estrutura dos dados.

Candidatas:

- título;
- subtítulo;
- exibir data de geração;
- valor da data de geração quando configurável;
- orientação;
- formato de página;
- cabeçalho;
- rodapé;
- identidade da organização;
- numeração;
- margens.

### Data de geração

A exibição da data deve poder ser configurável.

```text
[x] Exibir data de geração
```

Isso é uma preferência documental, não filtro de dados.

## 15. Identidade institucional

Relatórios podem reutilizar a identidade configurada na Instance:

- logo;
- nome;
- contato;
- site;
- e-mail;
- outros campos institucionais formalmente suportados.

A identidade não deve ser repetida manualmente em cada modelo, salvo override explicitamente permitido.

## 16. Preview vivo

A configuração de relatório deve possuir feedback rápido.

Sempre que uma alteração for segura e de baixo custo, a prévia deve refletir a mudança sem exigir uma sequência burocrática de “salvar → fechar → gerar novamente”.

Exemplos:

- visibilidade de coluna;
- alias;
- título;
- exibição de data;
- orientação;
- opção documental.

A persistência pode ser automática quando apropriada.

Configurações estruturais de maior impacto podem exigir ação explícita, caso isso proteja o usuário de mudanças acidentais.

A decisão deve ser feita por risco da ação, não por consistência artificial de todos os formulários.

## 17. Persistência

No produto final, configurações de relatório pertencem ao backend/banco da Instance.

Não usar armazenamento local do navegador como fonte oficial da configuração compartilhada.

Preferências estritamente pessoais podem, futuramente, usar armazenamento local quando isso for explicitamente definido.

## 18. Estado publicado

Um relatório pode precisar de estados como:

```text
rascunho
publicado
arquivado
```

A necessidade e semântica final serão consolidadas junto ao versionamento de modelos.

Consumidores devem enxergar somente aquilo que estiver publicado e autorizado.

## 19. Compatibilidade com mudanças de Dataset

Uma definição de relatório pode ficar inválida quando Fields mudam.

O sistema deve detectar:

- Field ausente;
- Field incompatível;
- tipo alterado;
- agrupamento indisponível;
- parâmetro sem binding;
- coluna específica removida.

Não selecionar silenciosamente um Field diferente apenas para manter a tela funcionando.

O Criador deve receber uma indicação clara do problema e poder corrigir o binding.

## 20. Preview e Output

Preview e PDF devem derivar da mesma configuração efetiva da Execution.

Conceitualmente:

```text
Model
+ Parameters
+ resolved data
+ effective presentation config
        ↓
Execution
        ├── HTML Preview
        └── PDF
```

O PDF não deve buscar silenciosamente dados diferentes depois que a prévia foi aprovada sem alguma forma de reconciliação.

A política de snapshot/consistência será definida tecnicamente mais adiante.

## 21. PDF

Requisitos de produto:

- A4 como formato inicial importante;
- retrato e paisagem quando aplicável;
- multipágina;
- texto legível;
- conteúdo pesquisável/selecionável quando a engine permitir;
- paginação coerente;
- cabeçalho/rodapé consistentes;
- sem controles da interface;
- sem screenshot do dashboard;
- sem truncamento silencioso de conteúdo útil.

A engine ainda não está definida.

## 22. Legibilidade

O sistema deve detectar ou sinalizar configurações com risco de legibilidade.

Exemplos:

- colunas demais;
- larguras incompatíveis;
- conteúdo excessivamente denso;
- orientação inadequada.

Não resolver o problema diminuindo fonte indefinidamente.

Preferir:

- orientação adequada;
- ocultar Fields desnecessários;
- dividir informação;
- ajustar largura;
- usar outra estrutura de apresentação.

## 23. Configuração simples e avançada

A experiência do Criador deve trabalhar em camadas.

### Configuração comum

Mostrar primeiro o que é mais provável de ser ajustado.

### Configuração avançada

Expor:

- bindings estruturais;
- visibilidade por grupo;
- aliases;
- opções detalhadas;
- regras específicas.

Não despejar toda a configuração em uma única tela.

## 24. Salvamento automático

Alterações simples e reversíveis podem ser salvas automaticamente.

Exemplos candidatos:

- mostrar/ocultar coluna;
- mostrar/ocultar data;
- alias;
- pequenas preferências de apresentação.

Requisitos:

- feedback visual;
- tratamento de falha;
- estado consistente;
- não perder alterações silenciosamente.

Mudanças complexas podem continuar com salvamento explícito.

## 25. Relatório como Model executável

Para o Consumidor, um relatório publicado deve parecer algo simples.

Exemplo:

```text
Prestação mensal

Cliente
[ ACME ]

Período
[ Setembro de 2026 ]

[ Gerar ]
```

Toda configuração avançada já deve estar embutida no Model.

## 26. Relação com dashboards e apresentações

Relatório não deve duplicar regras analíticas.

Se um indicador, gráfico ou tabela usa uma Analysis reutilizável, a mesma Analysis pode alimentar Dashboard ou Presentation.

Cada mídia mantém seu próprio layout.

## 27. Automação

Um relatório publicado deve poder ser usado em Automation.

Exemplo:

```text
Model: Relatório financeiro mensal
Schedule: todo dia 1
Parameters:
  período = mês anterior
Output:
  PDF
Distribution:
  e-mail
```

A Automation não modifica a definição do relatório.

## 28. Critérios de aceite do sistema de relatórios

O sistema de relatórios estará alinhado quando:

1. Fields estruturais forem configuráveis;
2. colunas comuns não forem hardcoded;
3. grupos puderem produzir tabelas distintas;
4. colunas específicas puderem variar por grupo;
5. labels puderem mudar sem perder identidade;
6. visibilidade puder ser configurada sem apagar Field;
7. propriedades documentais forem separadas da lógica analítica;
8. preview refletir rapidamente mudanças;
9. configurações persistirem no backend;
10. incompatibilidades com Dataset forem explícitas;
11. consumidores executarem modelos com poucos passos;
12. preview e PDF representarem a mesma Execution;
13. o mesmo core analítico puder alimentar outras formas de apresentação.
