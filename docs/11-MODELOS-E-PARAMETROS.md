# 11 — Modelos e Parâmetros

**Status:** em consolidação

## 1. Objetivo

Definir como configurações complexas do Data Studio se tornam experiências simples e reutilizáveis para o consumidor.

Model é a ponte entre:

```text
complexidade configurada pelo Criador
e
execução simples pelo Consumidor
```

## 2. Model

Model representa uma configuração pronta para execução.

Pode apontar para:

- Report;
- Presentation;
- outra saída executável formalmente suportada.

Dashboards normalmente são consumidos de forma interativa, mas podem também utilizar Parameters e publicação.

## 3. O que Model encapsula

Pode encapsular:

- Presentation Definition;
- Analysis bindings;
- Parameters;
- defaults;
- configurações de saída;
- regras de execução;
- permissões;
- metadados;
- estado de publicação.

## 4. Objetivo de UX

O consumidor deve ver apenas os parâmetros necessários.

Exemplo:

```text
Relatório de prestação mensal

Cliente
[ ACME ]

Período
[ Mês anterior ]

[ Gerar ]
```

O consumidor não configura:

- Dataset;
- agrupamento;
- colunas;
- aliases;
- filtros internos;
- layout;
- cabeçalho;
- engine.

## 5. Parameter

Parameter representa uma informação variável entre execuções.

Propriedades:

- id;
- key;
- label;
- description;
- type;
- required;
- default;
- validation;
- options;
- visibility;
- binding.

## 6. Tipos de Parameter

Candidatos:

- text;
- integer;
- decimal;
- boolean;
- date;
- datetime;
- period;
- relativePeriod;
- enum;
- multiEnum;
- datasetFieldValue.

A lista deve evoluir somente quando necessário.

## 7. Parameter de período

Período é um tipo importante.

Pode representar:

- data inicial/final;
- hoje;
- ontem;
- esta semana;
- semana anterior;
- este mês;
- mês anterior;
- este ano;
- ano anterior;
- últimos N dias;
- personalizado.

A Execution resolve o período relativo para valores absolutos.

## 8. Default

Default reduz fricção.

Exemplos:

```text
período = mês anterior
unidade = todas permitidas
mostrarDataGeracao = true
```

Default não pode violar permissão.

## 9. DatasetFieldValue

Permite preencher opções a partir de um Field.

Exemplo:

```text
Parameter: Cliente
Options:
  Dataset = Chamados
  Field = Cliente
```

A consulta de opções deve respeitar permissões.

## 10. Binding

Binding liga Parameter à configuração executável.

Exemplo:

```text
Parameter: periodo
→ Analysis.filter.opened_at

Parameter: cliente
→ Analysis.filter.customer_id
```

Bindings devem ser explícitos e validáveis.

## 11. Parameter interno

Nem todo parâmetro precisa ser exibido.

Exemplo:

```text
status = Resolvido
```

pode estar fixado na Analysis.

## 12. Parameter avançado

Um Model pode ter parâmetros raros ocultos em uma área “Mais opções”.

Exemplo:

```text
Período
Cliente

[ Mais opções ]
  Categoria
  Responsável
```

A divulgação progressiva é preferível a formulários enormes.

## 13. Validação

Parameter deve validar:

- tipo;
- obrigatoriedade;
- limites;
- opções;
- dependências;
- formato.

A validação definitiva ocorre no backend.

## 14. Dependência entre Parameters

Pode existir relação.

Exemplo:

```text
País
→ Estado
→ Cidade
```

ou:

```text
Empresa
→ Unidade
```

A primeira versão pode limitar dependências complexas.

## 15. Visibilidade condicional

Pode ser útil futuramente.

Exemplo:

```text
Modo = Personalizado
→ mostrar data inicial
→ mostrar data final
```

Não criar linguagem genérica de regras antes de necessidade concreta.

## 16. Model state

Estados candidatos:

- draft;
- published;
- archived.

Somente published aparece para execução normal.

## 17. Model versioning

A execução histórica precisa saber qual configuração efetiva foi usada.

Possíveis estratégias:

- versão explícita;
- snapshot da configuração;
- hash;
- combinação.

A implementação será decidida depois.

O requisito é não perder rastreabilidade.

## 18. Publicação

Fluxo conceitual:

```text
Criador configura
→ valida
→ testa
→ publica
→ Consumidor passa a executar
```

Uma alteração estrutural pode gerar nova versão ou exigir nova publicação.

## 19. Duplicação

Criador pode precisar duplicar um Model para criar variação.

Essa operação deve copiar configuração sem compartilhar estado mutável indevido.

## 20. Template vs Model

Os termos ainda podem ser refinados.

Direção:

- Template pode representar estrutura reutilizável para criar outros objetos;
- Model representa configuração concreta pronta para executar.

Não introduzir ambos no código sem necessidade clara.

## 21. Execução

Ao executar um Model:

1. carregar definição publicada;
2. validar acesso;
3. validar Parameters;
4. resolver defaults;
5. resolver períodos relativos;
6. aplicar bindings;
7. validar dependências;
8. criar Execution;
9. consultar dados;
10. gerar Outputs.

## 22. Model e Automation

Automation referencia Model.

Não copia suas regras.

```text
Automation
→ Model publicado
→ Parameters
→ Execution
```

## 23. Critérios de aceite

Modelos e parâmetros estão alinhados quando:

1. consumidor não vê complexidade interna;
2. Parameters são tipados;
3. defaults reduzem esforço;
4. períodos relativos funcionam;
5. bindings são explícitos;
6. permissões são respeitadas;
7. Model pode ser publicado;
8. execução é rastreável;
9. Automation reutiliza Model;
10. alterações não destroem histórico.
