# 05 — Fontes e Conectores

**Status:** em consolidação

## 1. Objetivo

Definir como o Technolife Data Studio se conecta a sistemas, bancos e arquivos sem acoplar o restante do produto à tecnologia de origem.

## 2. Princípio

A arquitetura é orientada a conectores.

```text
origem específica
→ Connector
→ contrato normalizado
→ Dataset
```

Relatórios, dashboards, análises e automações não devem implementar acesso direto à origem.

## 3. Source

Source representa uma origem configurada dentro de uma Instance.

Exemplos:

- sistema corporativo via API;
- banco MySQL/MariaDB;
- banco relacional suportado;
- arquivo CSV;
- arquivo XLSX;
- arquivo SpreadsheetML/XML;
- integração específica.

Propriedades conceituais:

- id;
- nome;
- descrição;
- connectorType;
- configuração;
- referência de credencial;
- estado;
- capabilities;
- diagnóstico;
- timestamps.

## 4. Connector Type

Connector Type identifica uma implementação disponível no produto.

Exemplos futuros:

```text
http-api
mysql
mariadb
csv
xlsx
spreadsheetml
hesk-api
```

Um conector específico pode conhecer as particularidades de um sistema quando isso trouxer valor real.

Exemplo:

```text
conector genérico HTTP
≠
conector especializado para um produto
```

Ambos podem coexistir.

## 5. Contrato conceitual de Connector

Uma implementação pode oferecer operações equivalentes a:

```text
testConnection()
discoverResources()
discoverFields(resource)
getCapabilities(context)
fetch(querySpecification)
```

Nem todo Connector precisa suportar todas as operações.

## 6. Teste de conexão

O teste deve responder de forma funcional se a configuração é utilizável.

Pode validar:

- alcance;
- autenticação;
- autorização mínima;
- recurso;
- versão/protocolo;
- capacidade necessária.

Não deve retornar segredo ao navegador.

## 7. Descoberta

Quando suportado, Connector pode descobrir:

### Resources

Exemplos:

- tabelas;
- views;
- endpoints;
- coleções;
- worksheets.

### Fields

Exemplos:

- nome técnico;
- tipo nativo;
- nullable;
- metadados;
- capacidades inferidas.

Descoberta não implica publicação automática.

Um administrador deve poder revisar o que será exposto como Dataset.

## 8. Capabilities

Capabilities evitam fingir que todas as fontes são iguais.

Exemplos:

- filter;
- sort;
- pagination;
- group;
- aggregate;
- resourceDiscovery;
- fieldDiscovery;
- dateRange;
- fullText;
- limit;
- offset;
- cursor.

Capabilities podem variar por Resource ou Field.

## 9. Query Specification

A aplicação utiliza uma consulta estruturada.

Exemplo conceitual:

```text
{
  dataset,
  fields,
  filters,
  sorts,
  groups,
  metrics,
  page
}
```

O Connector recebe somente especificação já validada pelo backend.

## 10. Pushdown

Sempre que seguro e suportado, filtros, ordenações, agrupamentos e agregações podem ser executados na origem para reduzir volume e custo.

Isso é uma otimização.

A semântica do produto não deve depender da origem suportar todas as operações.

O sistema precisa declarar claramente quando uma operação não é possível.

## 11. Conectores SQL

A direção de segurança para bancos relacionais é:

- usuário de banco dedicado;
- somente leitura;
- acesso somente aos objetos necessários;
- prepared statements;
- allowlist de Resources/Fields publicados;
- limites;
- paginação;
- timeout;
- controle de custo;
- sem SQL arbitrário enviado pelo navegador;
- sem comandos de escrita.

O Data Studio não é console SQL.

## 12. Conectores HTTP/API

Devem proteger:

- base URL;
- hosts permitidos;
- redirects;
- autenticação;
- headers;
- timeout;
- tamanho de resposta;
- paginação;
- rate limits;
- métodos permitidos.

Um Connector HTTP não é proxy arbitrário.

POST pode ser usado por uma API para pesquisa somente leitura quando a semântica do provedor exigir, mas isso não autoriza mutações.

## 13. Arquivos como Source

Arquivos também entram pelo contrato de Connector.

Tipos iniciais candidatos:

- CSV;
- XLSX;
- SpreadsheetML/XML.

O pipeline deve ser:

```text
arquivo
→ parser/connector
→ schema
→ Dataset
```

As camadas superiores não devem conhecer o formato original.

## 14. Credenciais

Credenciais são segredos.

Regras:

- armazenadas no backend;
- nunca retornadas integralmente após salvamento;
- nunca registradas em log;
- nunca versionadas;
- mascaradas quando exibidas;
- substituição explícita;
- criptografia/secret storage conforme arquitetura de implantação;
- acesso administrativo controlado.

## 15. Estado da Source

Estados conceituais candidatos:

- draft;
- active;
- unavailable;
- misconfigured;
- disabled.

Não confundir indisponibilidade transitória com remoção de configuração.

## 16. Diagnóstico

Administrador autorizado pode consultar informações como:

- último teste;
- último acesso bem-sucedido;
- erro sanitizado;
- latência aproximada;
- Resource indisponível;
- problema de autenticação;
- capability incompatível.

Não exibir detalhes sensíveis da infraestrutura sem necessidade.

## 17. Recursos publicados

Descobrir uma tabela ou endpoint não torna seus dados automaticamente disponíveis a todos.

Fluxo desejado:

```text
Source
→ descobrir/mapear Resource
→ selecionar Fields
→ configurar metadados
→ publicar Dataset
```

## 18. Mudança de schema

Connector deve permitir detectar, quando possível:

- Field novo;
- Field removido;
- tipo alterado;
- Resource removido;
- capability alterada.

Essas mudanças devem alimentar estado de compatibilidade dos Datasets e modelos dependentes.

## 19. Atualização dos dados

Por padrão, Dataset conectado representa consulta à fonte atual.

Estratégias futuras podem incluir:

- cache;
- materialização;
- snapshot;
- atualização agendada.

Nenhuma deve ser assumida como padrão sem requisito.

## 20. Segurança de rede

Conectores externos exigem proteção contra:

- SSRF;
- DNS rebinding quando aplicável;
- redirects inesperados;
- acesso a metadata services;
- hosts privados não autorizados;
- portas arbitrárias;
- protocolos não suportados.

A política exata será definida em Segurança.

## 21. Limites

Toda Source deve operar com limites proporcionais:

- número máximo de registros;
- timeout;
- tamanho de resposta;
- concorrência;
- paginação;
- tentativas;
- rate limit.

O sistema não deve permitir que uma visualização simples derrube a origem.

## 22. Conector específico vs genérico

Preferir Connector específico quando ele puder:

- traduzir semântica;
- mapear Resources de forma amigável;
- expor capabilities corretas;
- proteger melhor a origem;
- reduzir configuração manual.

Preferir Connector genérico quando o contrato puder ser expresso com segurança sem código específico.

## 23. Critérios de aceite

A camada está adequada quando:

1. nova origem pode ser adicionada sem alterar Reports;
2. segredo fica no backend;
3. Resource pode ser publicado seletivamente;
4. capabilities são declaradas;
5. consulta é validada antes do Connector;
6. SQL/HTTP arbitrário não é exposto ao consumidor;
7. falhas são traduzidas;
8. alterações de schema podem ser detectadas;
9. arquivos usam o mesmo conceito de Source;
10. segurança e limites são aplicados por padrão.
