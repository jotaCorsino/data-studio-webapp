# 17 — Testes e Qualidade

**Status:** em consolidação

## 1. Objetivo

Definir como o Technolife Data Studio deve ser validado durante o desenvolvimento.

Qualidade não significa apenas build sem erro. Cada fatia precisa provar comportamento funcional, segurança, compatibilidade e experiência.

## 2. Princípio

```text
requisito
→ critério de aceite
→ implementação
→ teste
→ homologação
```

Uma feature não deve ser considerada concluída apenas porque a interface aparece.

## 3. Pirâmide prática

O projeto deve combinar:

- testes de unidade;
- testes de domínio;
- testes de integração;
- testes de API;
- testes de componentes;
- testes end-to-end;
- smoke tests de implantação;
- homologação funcional.

A proporção final depende da stack.

## 4. Testes de domínio

Prioridade alta.

Cobrir:

- filtros;
- parâmetros;
- períodos relativos;
- agrupamentos;
- métricas;
- aliases;
- bindings;
- compatibilidade;
- relações;
- permissões;
- regras de Report;
- regras de Automation.

## 5. Connectors

Cada Connector deve possuir testes para:

- configuração;
- conexão;
- descoberta;
- schema;
- capabilities;
- paginação;
- filtros;
- erros;
- limites;
- normalização.

Conector específico não deve depender apenas de teste manual contra produção.

## 6. Datasets

Cobrir:

- Field identity;
- tipos;
- labels;
- schema changes;
- publicação;
- permissões;
- row restrictions.

## 7. Reports

Cobrir:

- parâmetros;
- agrupamento em múltiplas tabelas;
- colunas comuns;
- colunas específicas;
- visibilidade;
- aliases;
- orientação;
- data de geração;
- cabeçalho/rodapé;
- paginação;
- preview;
- geração de PDF;
- incompatibilidade.

## 8. Dashboards

Cobrir:

- binding de Analysis;
- filtros globais;
- filtros locais;
- loading;
- vazio;
- erro isolado;
- drill-through;
- permissão;
- responsividade crítica.

## 9. Presentations

Cobrir:

- parâmetros;
- slides;
- bindings;
- tabelas longas;
- gráficos;
- identidade;
- consistência com Execution;
- exportação.

## 10. Automations

Cobrir:

- schedule;
- timezone;
- período relativo;
- autorização;
- idempotência;
- retry;
- falha parcial;
- distribuição;
- pause;
- incompatibilidade.

## 11. Segurança

Testes devem verificar:

- autorização backend;
- acesso negado;
- Field restrito;
- row restriction;
- segredo não exposto;
- CSRF;
- injection;
- SSRF controls;
- upload limits;
- download privado.

## 12. End-to-end

Fluxos críticos devem possuir E2E.

Primeiro fluxo obrigatório:

```text
login
→ acessar modelo publicado
→ informar parâmetros
→ gerar preview
→ exportar PDF
```

Depois:

```text
Criador
→ configurar fonte/dataset
→ criar Analysis
→ criar Report
→ publicar
→ Consumidor executar
```

## 13. Golden use case

O primeiro caso de uso real será utilizado como teste de regressão do produto.

A especificação fica em `casos-de-uso/001-PRESTACAO-DE-CONTAS.md`.

Mudanças arquiteturais importantes devem preservar o comportamento definido ali, salvo alteração deliberada de produto.

## 14. Fixtures

Fixtures devem:

- ser sintéticas;
- representar casos reais;
- não conter dados pessoais reais;
- cobrir variações;
- ser determinísticas.

## 15. Casos extremos

Incluir:

- zero registros;
- um registro;
- muitos registros;
- Field ausente;
- Field renomeado;
- null;
- caracteres especiais;
- Unicode;
- datas limítrofes;
- timezone;
- tabela larga;
- texto longo;
- Source lenta;
- Source indisponível.

## 16. Regressão visual

Pode ser útil em:

- Report;
- PDF;
- Presentation;
- componentes críticos.

Não substituir teste funcional.

## 17. PDF

Validação deve observar:

- número de páginas;
- conteúdo;
- ausência de truncamento;
- header/footer;
- orientação;
- legibilidade;
- caracteres;
- quebra de tabela;
- consistência com preview.

## 18. Performance

Estabelecer cenários realistas antes de otimizar.

Medir:

- tempo de consulta;
- tempo de geração;
- tamanho de resposta;
- uso de memória;
- dashboard com múltiplos blocos;
- automações concorrentes.

## 19. Compatibilidade

Quando schema muda, testes devem garantir que o sistema:

- detecta;
- não troca Field silenciosamente;
- informa problema;
- impede geração incorreta quando necessário.

## 20. Build e lint

Pipeline deve incluir, conforme stack:

- formatter;
- lint;
- typecheck;
- unit tests;
- build;
- security/dependency checks;
- integration tests aplicáveis.

## 21. Pull Request

Cada PR deve registrar:

- tarefa;
- objetivo;
- escopo;
- arquivos principais;
- testes;
- riscos;
- pendências;
- screenshots quando UI;
- decisão documental quando aplicável.

## 22. Homologação

Features visuais ou de fluxo passam por homologação humana.

A homologação deve usar critérios escritos.

Não aceitar “parece bom” como único critério.

## 23. Definition of Done

Uma tarefa está concluída quando:

1. escopo implementado;
2. critérios de aceite atendidos;
3. testes relevantes passam;
4. build/lint/typecheck passam;
5. documentação canônica atualizada quando necessário;
6. segurança revisada quando aplicável;
7. nenhum segredo/dado real foi versionado;
8. PR está limpo e compreensível;
9. homologação ocorreu quando exigida;
10. não existem pendências escondidas dentro da implementação.

## 24. Critérios de qualidade de produto

Além de testes técnicos, avaliar:

- simplicidade;
- consistência;
- acessibilidade;
- clareza;
- previsibilidade;
- desempenho;
- segurança;
- manutenção.

## 25. Regra anti-regressão

Bug corrigido deve receber teste quando for reproduzível de forma automatizável.

Especialmente para:

- parsers;
- mappings;
- filtros;
- permissões;
- paginação;
- geração;
- automação.
