# 10 — Apresentações

**Status:** em consolidação

## 1. Objetivo

Definir a geração de apresentações no Technolife Data Studio.

Apresentação é uma saída estruturada em slides alimentada pelas mesmas Analyses utilizadas em relatórios e dashboards.

O objetivo é permitir que informações gerenciais possam ser apresentadas em reuniões, revisões periódicas, comitês e acompanhamentos sem reconstrução manual em software externo.

## 2. Princípio

```text
Analysis
  ↓
Presentation Model
  ↓
Slides
  ↓
Arquivo de apresentação / visualização
```

Dados não devem ser copiados manualmente para cada slide como regra normal.

## 3. Casos de uso

Exemplos:

- reunião mensal de diretoria;
- apresentação de resultados;
- prestação de contas;
- revisão operacional;
- acompanhamento de indicadores;
- apresentação financeira;
- relatório executivo em formato de slides.

## 4. Presentation Definition

Pode conter:

- título;
- tema;
- identidade institucional;
- slides;
- parâmetros;
- bindings de Analysis;
- layouts;
- opções de exportação.

## 5. Slide

Slide é unidade de apresentação.

Pode conter:

- título;
- subtítulo;
- texto;
- indicador;
- gráfico;
- tabela;
- imagem;
- observação;
- rodapé;
- elementos de identidade.

## 6. Slide Layout

Layouts candidatos:

- título;
- título + conteúdo;
- dois conteúdos;
- indicador principal;
- gráfico principal;
- tabela;
- comparação;
- imagem + texto;
- seção;
- encerramento.

A lista deve ser enxuta e extensível.

## 7. Dados dinâmicos

Elementos do slide podem receber dados da Execution.

Exemplo:

```text
Slide: Resultado financeiro

KPI: Receita
Chart: Receita por mês
Text: Período analisado
```

Todos podem utilizar Parameters resolvidos da mesma Execution.

## 8. Consistência

Uma apresentação gerada deve refletir uma única Execution lógica.

Não misturar dados de momentos diferentes sem indicação.

## 9. Texto dinâmico

Campos de texto podem incluir variáveis controladas.

Exemplo:

```text
"Resultados de {{periodo.label}}"
```

A interpolação deve usar variáveis conhecidas, sem executar código.

## 10. Tabelas em slides

Tabelas precisam respeitar limites de legibilidade.

Quando os dados excederem o espaço:

- resumir;
- paginar em múltiplos slides;
- limitar com indicação;
- mover detalhe para Report;
- escolher outra visualização.

Não reduzir fonte indefinidamente.

## 11. Gráficos

Gráficos devem reutilizar especificações compatíveis com o sistema de dashboards quando possível.

A renderização pode ser diferente por causa do formato fixo do slide.

## 12. Identidade institucional

A Presentation deve herdar, por padrão:

- logo;
- nome da organização;
- identidade visual permitida;
- rodapé institucional.

Override deve ser explícito.

## 13. Tema

Tema deve definir aspectos como:

- tipografia;
- cores;
- fundo;
- espaçamentos;
- estilos de título;
- estilo de gráfico;
- identidade.

Tema não deve alterar lógica de dados.

## 14. Preview

O Criador deve poder visualizar a apresentação antes da exportação.

A prévia deve refletir:

- parâmetros;
- dados;
- layout;
- tema;
- quebras.

## 15. Formatos

A visão do produto inclui apresentações exportáveis.

A engine e o formato técnico ainda não estão definidos.

Possibilidades a avaliar futuramente:

- PPTX;
- PDF em formato de slides;
- apresentação HTML;
- múltiplos formatos.

A escolha deve considerar:

- fidelidade;
- edição posterior;
- compatibilidade;
- custo de implementação;
- performance;
- automação.

## 16. Model reutilizável

Apresentação deve ser publicável como Model.

Exemplo:

```text
Apresentação mensal da diretoria

Parâmetros:
- período
- unidade

Saída:
- apresentação
```

## 17. Automação

Uma Presentation pode ser gerada automaticamente.

Exemplo:

```text
todo dia 1
→ período = mês anterior
→ gerar apresentação
→ enviar para diretoria
```

## 18. Segurança

O arquivo gerado herda as restrições da Execution.

Distribuição deve validar:

- destinatários;
- permissões;
- sensibilidade;
- expiração quando aplicável.

## 19. Critérios de aceite

Apresentações estarão alinhadas quando:

1. reutilizarem Analyses;
2. não exigirem copiar dados manualmente;
3. parâmetros funcionarem como nos Reports;
4. slides forem estruturados;
5. identidade institucional for reutilizável;
6. preview e arquivo final representarem a mesma Execution;
7. tabelas preservarem legibilidade;
8. automações puderem gerar apresentações;
9. a engine escolhida não obrigar duplicação da lógica analítica;
10. o sistema não depender de um único layout rígido.
