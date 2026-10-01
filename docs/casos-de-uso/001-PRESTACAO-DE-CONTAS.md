# Caso de Uso 001 — Prestação de Contas

**Status:** caso piloto para desenvolvimento  
**Objetivo:** provar o Data Studio de ponta a ponta com um relatório real.

## 1. Contexto

Uma empresa de suporte técnico registra atendimentos em um sistema de chamados.

Os chamados contêm informações como:

- data;
- cliente;
- categoria;
- status;
- assunto;
- responsável;
- campos específicos conforme categoria.

Um gestor precisa gerar periodicamente uma prestação de contas de um cliente em determinado período.

O processo precisa ser simples para o usuário operacional e configurável pelo Criador.

## 2. Resultado esperado

O consumidor deve conseguir:

```text
abrir Prestação de contas
→ escolher Cliente
→ escolher Período
→ Gerar
→ revisar Preview
→ Exportar PDF
```

Nenhuma seleção manual de colunas deve ser obrigatória no uso diário.

## 3. Source

A implementação piloto utilizará uma Source conectada ao sistema de chamados.

O mecanismo técnico exato dependerá do Connector adotado na Fase 1.

O caso de uso não depende de upload manual como fluxo final.

## 4. Dataset

Dataset conceitual:

```text
Chamados
```

Fields necessários incluem equivalentes funcionais a:

- Data;
- Cliente;
- Categoria;
- Status;
- Assunto;
- Responsável;
- campos específicos da categoria.

Os nomes nativos podem ser diferentes. O Dataset define identidade e labels.

## 5. Structural Mapping

O Report deve configurar explicitamente:

```text
filtro principal   → Field Cliente
filtro de período  → Field Data
separar tabelas por→ Field Categoria
```

Não hardcodar esses nomes no engine.

## 6. Parameters expostos

### Cliente

Tipo:

```text
datasetFieldValue
```

Origem:

```text
Dataset Chamados
Field Cliente
```

Obrigatório para a prestação por cliente.

### Período

Tipo:

```text
period
```

Deve oferecer opções convenientes, incluindo período personalizado.

## 7. Filtros internos

O caso piloto não exige obrigatoriamente filtro de Status.

Filtros adicionais podem ser definidos pelo Criador conforme necessidade sem mudar o core.

## 8. Agrupamento

Após filtros:

```text
groupBy = Categoria
```

Cada categoria com registros gera uma tabela.

Categorias sem registros não geram tabela vazia.

## 9. Colunas comuns

O Report deve permitir configurar os Fields exibidos em todas as tabelas.

Configuração inicial sugerida:

```text
Data
Cliente
Categoria
Status
Assunto
Responsável
```

Essa lista é configuração inicial do caso, não hardcode do engine.

O Criador pode alterar seleção e ordem.

## 10. Fields específicos por categoria

Alguns Fields são semanticamente ligados a determinada categoria.

Exemplo conceitual:

```text
Categoria EMAIL
- Subcategoria
- Problema/Requisição

Categoria BACKUP
- Tipo
- Destino
```

A forma como essa associação será modelada no Dataset/Report deve ser explícita.

No caso piloto, um Connector especializado pode fornecer esses metadados.

O core não deve depender de prefixo textual como única solução universal.

## 11. Labels

Cada Field mantém identidade técnica.

Exemplo:

```text
technical/source identity:
email_subcategory

label:
Subcategoria
```

O Criador pode alterar o display label:

```text
Subcategoria
→ Serviço
```

sem alterar o binding.

## 12. Visibilidade por categoria

O Criador pode mostrar ou ocultar colunas para cada tabela.

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

Regras:

- não remover Field do Dataset;
- não afetar automaticamente outras categorias;
- manter ao menos uma coluna visível;
- refletir no preview;
- persistir no Report.

## 13. Ordem

Colunas devem seguir a ordem configurada no Report.

Não usar posição nativa da Source como regra de apresentação.

## 14. Documento

Configuração inicial:

- título: `Relatório de prestação de contas`;
- papel: A4;
- orientação: Retrato por padrão;
- opção Paisagem;
- identidade institucional;
- cabeçalho;
- rodapé;
- numeração de páginas;
- data de geração configurável;
- exibição da data de geração configurável.

## 15. Identidade

O Report herda da Instance:

- logo;
- nome;
- contato;
- site;
- dados institucionais suportados.

## 16. Cabeçalho

Deve apresentar, conforme configuração:

- identidade da organização;
- título;
- cliente;
- período;
- data de geração quando habilitada.

## 17. Corpo

Estrutura:

```text
Categoria A
[tabela]

Categoria B
[tabela]

Categoria C
[tabela]
```

Cada seção deve permanecer identificável em páginas subsequentes quando necessário.

## 18. Paginação

Requisitos:

- A4 real;
- multipágina;
- não cortar conteúdo de forma ilegível;
- repetir cabeçalho de tabela quando necessário;
- tratar linhas grandes;
- preservar categoria;
- número de página;
- rodapé coerente.

## 19. Legibilidade

O sistema deve detectar configuração excessivamente larga.

Pode sugerir:

- Paisagem;
- ocultar colunas;
- reduzir conteúdo;
- dividir informação.

Não reduzir fonte indefinidamente.

## 20. Preview

Consumidor vê uma prévia fiel ao documento antes de exportar.

Alterações permitidas na execução, como orientação quando exposta, devem refletir na prévia.

Configurações estruturais pertencem ao Criador.

## 21. Execution

Ao gerar:

```text
Model
+ Cliente
+ Período
+ configuração efetiva
→ Execution
```

Preview e PDF devem pertencer à mesma Execution lógica.

## 22. PDF

O PDF deve:

- corresponder ao preview;
- ser legível;
- possuir todas as páginas;
- respeitar orientação;
- respeitar identidade;
- não conter controles da aplicação;
- não truncar dados silenciosamente.

## 23. Configuração do Criador

Fluxo desejado:

```text
Studio
→ Report Prestação de contas
→ Estrutura
   - filtro principal
   - período
   - agrupamento
→ Tabelas
   - colunas comuns
   - colunas por categoria
   - aliases
   - ordem
→ Documento
   - título
   - data
   - orientação
   - cabeçalho/rodapé
→ Preview
→ Publicar
```

## 24. Preview vivo no Studio

Alterações de baixo risco devem refletir imediatamente:

- visibilidade;
- aliases;
- título;
- data;
- orientação.

Mudanças que redefinem estrutura podem requerer validação explícita.

## 25. Automação futura do mesmo Model

Após o fluxo manual estar estável:

```text
Automation:
Prestação mensal Cliente X

Schedule:
todo dia 1

Parameter:
período = mês anterior

Output:
PDF

Distribution:
e-mail
```

Não criar outro relatório para automatizar.

## 26. Critérios de aceite funcionais

1. Consumer lista somente Models autorizados.
2. Prestação de contas abre sem mostrar conceitos técnicos.
3. Cliente oferece valores permitidos.
4. Período aceita padrão e personalizado.
5. Gerar cria Execution.
6. Registros são filtrados pelo cliente.
7. Registros são filtrados pelo período.
8. Dados são agrupados pela categoria configurada.
9. Somente categorias com dados geram tabela.
10. Colunas comuns aparecem conforme configuração.
11. Colunas específicas respeitam categoria.
12. Visibilidade por categoria é respeitada.
13. Alias não altera Field identity.
14. Ordem configurada é respeitada.
15. Preview é paginado.
16. PDF corresponde à Execution.
17. Source indisponível gera erro compreensível.
18. Field ausente gera incompatibilidade explícita.
19. Permissões são aplicadas no backend.
20. Nenhuma credencial de Source chega ao browser.

## 27. Critérios de aceite de UX

1. Consumer precisa basicamente de Cliente + Período.
2. Ação principal é Gerar.
3. Configuração avançada não aparece para Consumer.
4. Estados loading/empty/error são claros.
5. Preview é legível.
6. Exportar PDF é fácil de encontrar.
7. Voltar não destrói parâmetros sem necessidade.
8. Defaults reduzem preenchimento.

## 28. Critérios de aceite do Criador

1. Structural Mapping é editável.
2. Colunas comuns são configuráveis.
3. Colunas específicas são configuráveis.
4. Labels são editáveis.
5. Visibilidade por categoria é editável.
6. Opções documentais são editáveis.
7. Preview responde às alterações.
8. Report pode ser publicado.
9. Consumer não vê rascunho.
10. Mudança de schema é detectada.

## 29. Dados de teste

Fixtures devem incluir:

- pelo menos dois clientes;
- pelo menos três categorias;
- categoria com um Field específico;
- categoria com dois Fields específicos;
- registros fora do período;
- registro com null;
- texto longo;
- categoria sem registros após filtro;
- Field opcional ausente em parte dos registros.

## 30. Papel deste caso

Este caso é a primeira prova do produto.

A implementação pode evoluir, mas não deve transformar a arquitetura inteira em regras exclusivas de chamados.

O objetivo é provar que um caso específico pode ser construído sobre abstrações genéricas.
