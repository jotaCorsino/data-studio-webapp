# 21 — Decisões Técnicas da V1

**Status:** base técnica aprovada para scaffold; itens marcados como "homologação obrigatória" ainda exigem spike antes da release comercial.

## 1. Objetivo

Fixar a stack técnica inicial do Technolife Data Studio para evitar que o desenvolvimento comece com decisões implícitas ou incompatíveis com o ambiente-alvo.

A prioridade da V1 é:

```text
cPanel-friendly
+
segura
+
implantável
+
manutenível
+
capaz de crescer
```

## 2. Ambiente-alvo

A V1 será projetada para uma Instance dedicada instalada em hospedagem Linux administrada por cPanel.

Características esperadas:

- Apache ou LiteSpeed compatível com cPanel;
- HTTPS;
- PHP via PHP-FPM/LSAPI ou handler homologado;
- PHP CLI acessível ao técnico por Terminal/SSH ou suporte equivalente do provedor;
- MySQL/MariaDB;
- Cron Jobs;
- possibilidade de habilitar extensões PHP obrigatórias;
- loader do mecanismo de proteção do backend;
- storage fora da área pública sempre que possível.

### Requisito de suporte técnico

A implantação oficialmente suportada exige que o técnico consiga:

- enviar/extrair arquivos;
- criar banco e usuário;
- configurar PHP;
- configurar cron;
- executar comandos PHP CLI de instalação/migration, diretamente ou com apoio do provedor.

A V1 não terá como requisito um instalador web público que execute migrations.

## 3. PHP

### Mínimo da V1

```text
PHP 8.3
```

### Recomendado

```text
PHP 8.4
```

### Matriz inicial de homologação

- PHP 8.3;
- PHP 8.4.

PHP 8.5 poderá ser adicionado após teste formal de todas as dependências e do encoder escolhido.

PHP 8.2 não será baseline comercial da V1 por estar próximo do fim do suporte oficial de segurança.

## 4. Extensões PHP mínimas

A matriz de implantação deverá verificar ao menos:

- ctype;
- curl;
- dom;
- fileinfo;
- filter;
- gd;
- iconv;
- intl;
- json;
- libxml;
- mbstring;
- openssl;
- PDO;
- pdo_mysql;
- session;
- simplexml;
- sodium;
- tokenizer;
- xml;
- xmlreader;
- xmlwriter;
- zip;
- zlib.

Dependências adicionais só podem virar obrigatórias após documentação.

## 5. Backend da Instance

### Framework

```text
Symfony 7.4 LTS
```

Motivos:

- LTS;
- suporte a PHP moderno;
- Security;
- Validator;
- Console;
- Mailer;
- Lock;
- Messenger;
- HttpClient;
- Cache;
- bom controle de arquitetura sem impor um frontend específico.

### Linguagem

```text
PHP 8.3-compatible syntax
```

Mesmo quando o ambiente recomendado usar PHP 8.4, evitar depender de sintaxe exclusiva de 8.4 no primeiro ciclo sem necessidade.

Isso amplia compatibilidade com clientes que estejam em PHP 8.3.

## 6. Frontend

### Stack

```text
React 19
TypeScript
Vite 8
```

O scaffold deverá usar versões estáveis atuais compatíveis entre si e registrar versões exatas no lockfile.

### Build

Node não é requisito de runtime no cPanel.

O fluxo é:

```text
código React/TypeScript
→ build controlado pela Technolife
→ assets estáticos
→ pacote de produção
→ cPanel
```

### Gerenciador de pacotes

```text
npm
```

Usar `package-lock.json`.

## 7. Componentes visuais

O produto possuirá design system próprio.

Direção:

- CSS variables para tokens;
- CSS modular por feature/componente;
- semantic HTML;
- componentes React próprios;
- sem framework visual completo como requisito inicial.

Bibliotecas headless de acessibilidade podem ser adicionadas pontualmente quando resolverem problema real, mas não devem definir a identidade visual do produto.

## 8. Roteamento frontend

Usar React Router ou equivalente estável aprovado no scaffold.

O roteamento é client-side para áreas do webapp.

A API permanece separada sob namespace próprio.

## 9. Estado e acesso a dados no frontend

Separar:

### Server state

Dados vindos da API:

- consultas;
- loading;
- retry;
- invalidação;
- cache de curta duração.

Pode utilizar biblioteca especializada como TanStack Query no scaffold, após validação de bundle e padrão de uso.

### UI state

Estado local de:

- dialogs;
- seleção;
- builder;
- layout;
- edição temporária.

Não colocar todo o sistema em um store global único.

## 10. API interna

### Origem

Frontend e backend são servidos no mesmo domínio.

Preferência:

```text
https://dados.empresa.com.br/
https://dados.empresa.com.br/api/v1/...
```

### Formato

JSON UTF-8.

### Versionamento

```text
/api/v1
```

Mudança incompatível de contrato exige versão nova ou migração coordenada.

### Erros

Adotar resposta estruturada consistente inspirada em Problem Details.

Erros de validação devem identificar Fields sem expor stack trace.

## 11. Autenticação da Instance

A V1 utiliza:

```text
sessão server-side
+
cookie seguro same-origin
```

Não usar JWT como mecanismo padrão do navegador.

Motivos:

- aplicação web same-origin;
- revogação de sessão simples;
- menor superfície de armazenamento de token no browser;
- integração natural com Symfony Security.

## 12. Sessão

Requisitos:

- cookie HttpOnly;
- Secure em produção;
- SameSite adequado;
- expiração;
- regeneração de identificador;
- logout server-side;
- invalidação de usuário desativado.

A estratégia inicial pode usar storage de sessão local privado da Instance.

## 13. Senhas

Usar Symfony PasswordHasher com algoritmo automático seguro.

Não fixar hash antigo por compatibilidade.

Preferir Argon2id quando o ambiente homologado oferecer suporte apropriado; permitir fallback seguro gerenciado pelo framework.

## 14. CSRF

Toda operação autenticada que altera estado e utiliza sessão deve ter proteção CSRF conforme o padrão definido na API/webapp.

Login e ações administrativas recebem atenção especial.

## 15. Banco interno

### Engines suportadas

V1:

- MariaDB;
- MySQL.

### Abstração

```text
Doctrine ORM + Doctrine DBAL
```

Uso:

- ORM para entidades internas do Data Studio;
- DBAL quando consulta estruturada ou controle fino for mais adequado;
- Connectors externos não devem reutilizar automaticamente a conexão do EntityManager interno.

### Charset

```text
utf8mb4
```

## 16. Migrations

Usar Doctrine Migrations.

Migrations:

- versionadas;
- executadas por CLI;
- incluídas no release;
- nunca feitas manualmente como processo padrão.

## 17. Sources SQL externas

Conexões a bancos externos usam conexão separada e controlada pelo Connector.

Requisitos:

- credencial read-only;
- PDO/DBAL;
- allowlist de recursos;
- prepared statements;
- timeout;
- limite de linhas;
- paginação;
- nenhuma migration na Source.

## 18. Jobs e automações

A V1 não depende de:

- Redis;
- RabbitMQ;
- daemon permanente;
- supervisor;
- Docker.

### Transporte

Usar fila persistida no banco interno, preferencialmente através do Symfony Messenger com Doctrine transport ou implementação equivalente.

### Execução

cPanel Cron chama um comando CLI de execução limitada.

Conceito:

```text
cron
→ comando one-shot
→ obter lock
→ registrar automações vencidas
→ processar lote limitado da fila
→ liberar lock
→ sair
```

Não manter worker infinito.

## 19. Lock de cron

Execuções sobrepostas devem ser impedidas por Symfony Lock ou mecanismo equivalente.

Isso é obrigatório porque cron pode iniciar uma nova execução antes da anterior terminar.

## 20. Frequência do cron

Base inicial:

```text
a cada 1 minuto
```

Pode ser flexibilizada conforme plano de hospedagem.

Automação da V1 terá precisão operacional compatível com esse modelo, não de segundos.

## 21. Limites de job

Cada ciclo deve ter:

- limite de tempo;
- limite de jobs;
- memória;
- lock;
- tratamento de falha;
- retry controlado.

Um relatório pesado não pode bloquear indefinidamente o cron.

## 22. E-mail

Usar Symfony Mailer.

Configuração por Instance:

- SMTP host;
- port;
- encryption;
- username;
- secret protegido;
- sender;
- políticas de destinatário.

O navegador nunca recebe credenciais SMTP.

## 23. Storage

Estrutura conceitual:

```text
public/
  assets públicos
  front controller

var/
  cache
  logs
  sessions

storage/
  private/
    outputs/
    uploads/
    temp/
```

`storage/private` deve ficar fora do document root quando o ambiente permitir.

Caso a hospedagem imponha outra estrutura, o acesso público precisa ser negado explicitamente.

## 24. Upload

Arquivos recebidos:

- nunca usam nome original como caminho físico confiável;
- ficam em storage privado;
- recebem identificador interno;
- possuem tamanho e tipo validados;
- não são executáveis.

## 25. PDF da V1

### Engine inicial

```text
Dompdf
```

Motivos:

- PHP puro;
- compatível com cPanel;
- sem Chromium/headless browser no servidor;
- adequado ao primeiro caso tabular;
- integra-se a HTML/CSS estruturado;
- licença compatível com uso comercial mediante cumprimento das obrigações da biblioteca.

### Regra arquitetural

O Report gera primeiro um `ReportDocument` lógico.

Depois:

```text
ReportDocument
├── HTML Preview
└── PDF Renderer (Dompdf)
```

Não gerar PDF a partir de screenshot do browser.

### Limite

A primeira fatia de PDF prioriza tabelas e documento A4.

Gráficos em PDF terão renderer próprio posterior e não devem depender de screenshot do dashboard.

## 26. Charts no webapp

A biblioteca de charts será selecionada no scaffold do Dashboard com preferência por uma solução:

- madura;
- acessível;
- interativa;
- MIT/Apache ou licença comercialmente compatível;
- capaz de trabalhar a partir de `ChartSpec` neutro.

A escolha não deve acoplar a Analysis ao formato da biblioteca.

## 27. Apresentações

### Formato prioritário

```text
PPTX
```

por permitir uso em PowerPoint/LibreOffice e edição posterior.

### Engine candidata

```text
PHPOffice/PHPPresentation
```

### Homologação obrigatória

Antes da Vertical de Apresentações, realizar spike para validar:

- PHP 8.3/8.4;
- geração PPTX;
- tabelas;
- imagens;
- gráficos;
- tema;
- tamanho do arquivo;
- memória;
- compatibilidade com PowerPoint e LibreOffice;
- impacto de licença LGPL-3.0 no pacote comercial.

A engine só se torna definitiva após esse gate.

## 28. Planilhas

Quando CSV/XLSX/SpreadsheetML entrarem como Sources:

- CSV pode usar parser próprio controlado ou biblioteca pequena;
- XLSX/SpreadsheetML terão preferência por PhpSpreadsheet quando tecnicamente adequado;
- validar versão e advisories de segurança antes de cada release.

## 29. Proteção do backend

### Estratégia

O backend PHP de produção será distribuído codificado/protegido.

### Homologação obrigatória

Antes da release comercial, comparar em ambiente cPanel real:

- SourceGuardian 17;
- ionCube compatível com a matriz PHP escolhida.

Critérios:

- suporte PHP 8.3/8.4;
- disponibilidade de Loader no hosting;
- facilidade de instalação;
- estabilidade com Symfony;
- proteção;
- automação de release;
- licensing hooks quando úteis;
- custo/licença;
- atualização de PHP.

### Regra

Nosso Control Plane continua sendo a autoridade da licença mesmo que o encoder ofereça mecanismo próprio de licensing.

O encoder é uma camada adicional de proteção, não a única.

## 30. Criptografia do licenciamento

Usar criptografia assimétrica moderna.

Preferência:

```text
Ed25519 via libsodium
```

para assinatura de leases/tokens internos quando apropriado.

A chave privada fica somente no Control Plane.

A Instance recebe apenas material público de verificação e suas próprias credenciais de instalação.

## 31. Ativação da Instance

Fluxo técnico pretendido:

```text
Technolife cria registro da Instance
→ gera activation token de uso limitado
→ técnico instala pacote
→ Instance gera identidade local
→ envia activation token + identidade + domínio
→ Control Plane valida
→ registra binding
→ emite lease assinado
→ Instance entra ACTIVE
```

Activation token:

- expira;
- possui uso limitado;
- não é licença permanente;
- não fica exposto em logs.

## 32. Lease

Lease contém ao menos:

- Instance ID;
- status;
- domínio autorizado;
- issuedAt;
- expiresAt;
- versão/features quando aplicável;
- identificador da instalação;
- assinatura.

Valores exatos de duração e grace period serão fechados após teste de operação.

## 33. Repositório

O projeto permanecerá em um único repositório privado canônico.

Estrutura inicial pretendida:

```text
/
├── apps/
│   ├── web/
│   ├── instance-api/
│   └── control-plane/
├── docs/
├── tools/
└── README.md
```

### apps/web

React/TypeScript.

### apps/instance-api

Backend Symfony instalado no cliente.

### apps/control-plane

Serviço Symfony controlado exclusivamente pela Technolife.

### tools

Build, release, validação e utilitários.

Não extrair packages compartilhados antes de existir duplicação real que justifique isso.

## 34. Deploy do cliente

O pacote do cliente NÃO inclui:

```text
apps/control-plane/
source frontend TypeScript
.git/
ferramentas de desenvolvimento
tests desnecessários
chaves privadas
secrets Technolife
```

Inclui:

- frontend já compilado;
- backend protegido;
- dependencies PHP de produção;
- migrations necessárias;
- assets;
- scripts operacionais aprovados.

## 35. Composer no cliente

Composer é ferramenta de desenvolvimento/build.

O pacote oficial leva `vendor/` de produção já resolvido e testado.

O cliente não precisa executar `composer install` no cPanel para uma implantação normal.

## 36. Node no cliente

Node não é requisito de runtime.

O pacote leva frontend compilado.

## 37. Pipeline de CI

CI do repositório deverá executar:

### Frontend

- lint;
- typecheck;
- unit tests;
- build;
- dependency audit.

### Backend

- PHPUnit;
- static analysis;
- code style;
- Composer audit;
- migrations validation;
- integration tests.

### E2E

Playwright para fluxos críticos quando o scaffold possuir frontend + backend integrados.

## 38. Pipeline de release

Fluxo alvo:

```text
tag/release candidate
→ CI completa
→ build frontend
→ composer install --no-dev
→ preparar pacote
→ proteger/encode backend
→ gerar manifest + checksums
→ assinar release
→ publicar artefato privado
→ implantação controlada
```

A etapa de encoder pode inicialmente ocorrer em workstation/runner controlado pela Technolife caso a licença comercial não seja adequada para GitHub-hosted runner.

## 39. Atualizações

A V1 não deve autoatualizar silenciosamente.

Direção inicial:

- Technolife gera release;
- técnico executa atualização;
- preflight;
- backup;
- migrations;
- substituição do pacote;
- smoke test;
- confirmação de versão.

Automação segura de update pode vir depois.

## 40. Logs

Backend usa logging estruturado.

Separar:

- application;
- security;
- job/automation;
- licensing.

Não registrar payload completo de Dataset por padrão.

## 41. Cache

A V1 não exige Redis.

Usar cache de filesystem/banco quando necessário.

Cache de dados analíticos só entra quando um caso real justificar e deve respeitar permissões.

## 42. Dependências explicitamente não obrigatórias na V1

- Docker em produção;
- Redis;
- RabbitMQ;
- Kubernetes;
- Elasticsearch;
- Node runtime no cliente;
- Chromium/Puppeteer no cliente;
- daemon permanente;
- microservices no cliente;
- multi-tenant centralizado.

## 43. Control Plane

O Control Plane poderá usar a mesma base tecnológica:

```text
Symfony 7.4
PHP 8.3+
MariaDB/MySQL
```

Ele é deployment separado.

Responsabilidades iniciais:

- Instances;
- activation tokens;
- leases;
- suspension/revocation;
- audit de licenciamento;
- versões autorizadas;
- administração Technolife.

Não armazenar dados analíticos dos clientes.

## 44. Decisões ainda não fechadas

Dependem de spike/homologação:

1. SourceGuardian vs ionCube;
2. duração do lease;
3. grace period;
4. PHPPresentation como engine definitiva;
5. biblioteca de charts;
6. limites mínimos de CPU/RAM/storage;
7. matriz exata MariaDB/MySQL;
8. estratégia final de assinatura do artefato de release;
9. política de retenção.

Esses itens não bloqueiam o scaffold, mas bloqueiam a release comercial quando relacionados à entrega.

## 45. Critério de aceitação da base técnica

A base está adequada quando:

1. desenvolvimento local não depende do cPanel;
2. produção não depende de Node;
3. produção não depende de Composer;
4. cron substitui worker permanente;
5. API é same-origin;
6. sessão não usa token em localStorage;
7. banco interno é separado das Sources;
8. Report gera PDF sem browser headless;
9. Control Plane é separado do pacote do cliente;
10. backend pode ser protegido antes da distribuição;
11. deploy é reproduzível;
12. stack cabe no ambiente de hospedagem homologado.
