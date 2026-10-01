# 15 — Segurança

**Status:** em consolidação

## 1. Objetivo

Definir requisitos de segurança do Technolife Data Studio desde a arquitetura.

O produto terá acesso a dados corporativos, credenciais de fontes, relatórios e automações. Segurança não pode ser adicionada somente no final.

## 2. Princípios

- menor privilégio;
- deny by default;
- defesa em profundidade;
- segredos no backend;
- autorização server-side;
- validação de toda entrada;
- rastreabilidade proporcional;
- isolamento;
- exposição mínima de dados.

## 3. Fronteiras de confiança

Principais zonas:

```text
Browser
  ↕
Backend Data Studio
  ↕
Banco interno / Storage
  ↕
Sources externas
  ↕
Serviços de distribuição
```

Cada fronteira exige validação.

## 4. Autenticação

Requisitos:

- credenciais armazenadas com hash seguro quando login local;
- sessão segura;
- cookies HttpOnly;
- Secure em HTTPS;
- SameSite apropriado;
- expiração;
- rotação quando aplicável;
- logout;
- invalidação.

## 5. Autorização

Toda ação sensível deve ser autorizada no backend.

Não confiar em:

- rota oculta;
- botão escondido;
- Field desabilitado;
- payload vindo do browser.

## 6. CSRF

Operações autenticadas que alteram estado devem possuir proteção compatível com a arquitetura escolhida.

## 7. XSS

Dados vindos de Sources são não confiáveis.

Requisitos:

- escaping;
- evitar HTML arbitrário;
- sanitização quando conteúdo rico for permitido;
- CSP quando viável;
- não interpolar conteúdo externo em scripts.

## 8. SQL Injection

Conectores SQL:

- prepared statements;
- allowlist de Fields;
- allowlist de Resources;
- sem concatenação de SQL com valor de usuário;
- sem SQL arbitrário vindo do frontend.

## 9. SSRF

Conectores HTTP exigem:

- hosts controlados;
- protocolos permitidos;
- redirects controlados;
- bloqueio de metadata endpoints;
- bloqueio de destinos privados não autorizados;
- resolução segura;
- timeout;
- limites.

## 10. Segredos

Incluem:

- senhas;
- API keys;
- tokens;
- client secrets;
- SMTP credentials.

Regras:

- nunca Git;
- nunca localStorage;
- nunca resposta completa ao frontend;
- nunca log;
- mascarar na UI;
- substituir sem revelar;
- criptografar/secret-store conforme implantação.

## 11. Source read-only

Credenciais externas devem ter somente leitura por padrão.

Não confiar apenas na intenção do Connector: também restringir na própria origem quando possível.

## 12. Uploads

Quando arquivos forem suportados:

- validar tipo real;
- validar tamanho;
- nomear internamente;
- não executar conteúdo;
- storage privado;
- parser robusto;
- proteção contra zip bombs quando formatos compactados;
- limites de planilha/XML;
- tratamento de fórmulas quando aplicável.

## 13. Fórmulas de planilha

Arquivos XLSX podem conter fórmulas.

O produto deve decidir explicitamente se:

- usa valor calculado armazenado;
- ignora fórmula;
- recalcula com engine segura.

Nunca executar fórmula como código do sistema.

## 14. XML

Parser XML deve:

- desabilitar entidades externas;
- impedir XXE;
- limitar tamanho/profundidade;
- tratar namespaces com segurança.

## 15. Dados no browser

Não persistir Dataset sensível em localStorage por conveniência.

Cache client-side precisa ser temporário e compatível com risco.

## 16. Logs

Logs não devem conter:

- senhas;
- tokens;
- connection strings completas;
- payloads sensíveis sem necessidade;
- dados pessoais em excesso.

Usar correlation/request ids quando útil.

## 17. Erros

Consumidor recebe mensagem funcional.

Log interno recebe detalhe técnico sanitizado.

Nunca exibir stack trace em produção.

## 18. Storage

Arquivos gerados devem ser privados.

Requisitos candidatos:

- nome não previsível;
- autorização antes de download;
- expiração;
- retenção;
- limpeza;
- criptografia em repouso conforme ambiente.

## 19. E-mail

Envio pode vazar dados.

Requisitos:

- validação de destinatário;
- política por Instance;
- cuidado com anexos;
- links autenticados/temporários quando usados;
- registrar envio sem guardar segredo.

## 20. Permissão em exportação

Ter acesso visual não implica automaticamente poder exportar.

Arquitetura deve permitir política separada quando necessário.

## 21. Row-level security

Restrição obrigatória precisa ser aplicada antes do dado sair do backend.

Não adicionar condição somente na UI.

## 22. Automations

Automations devem:

- revalidar autorização;
- não executar como admin implícito;
- registrar contexto;
- evitar destinatários indevidos;
- pausar em incompatibilidade crítica;
- possuir idempotência.

## 23. Rate limiting

Aplicar onde houver risco:

- login;
- teste de Source;
- geração pesada;
- exportação;
- API;
- automações;
- endpoints de opções dinâmicas.

## 24. Limites de consulta

Proteger Sources e infraestrutura com:

- max rows;
- max duration;
- max response;
- pagination;
- concurrency;
- cancellation;
- quota quando necessário.

## 25. Dependências

- usar versões suportadas;
- atualizar;
- auditar vulnerabilidades;
- minimizar dependências;
- bloquear dependência sem necessidade clara.

## 26. Headers

Produção deve considerar:

- Content-Security-Policy;
- X-Content-Type-Options;
- Referrer-Policy;
- frame-ancestors;
- HSTS quando aplicável;
- políticas de cookies.

## 27. CORS

Preferir same-origin entre frontend e backend.

Se CORS for necessário, usar allowlist explícita.

## 28. HTTPS

Produção exige HTTPS.

Credenciais ou sessões não devem trafegar em HTTP.

## 29. Backup

Backup deve incluir:

- banco interno;
- configurações;
- modelos;
- automações;
- metadados;
- arquivos necessários.

Segredos precisam de estratégia segura de restauração.

## 30. Auditoria

Eventos sensíveis devem ser auditáveis.

Evitar transformar auditoria em cópia integral de dados de negócio.

## 31. Privacidade

O produto pode processar dados pessoais.

A implantação deve permitir:

- acesso mínimo;
- retenção;
- exclusão quando aplicável;
- rastreabilidade;
- políticas organizacionais.

Requisitos legais específicos serão tratados conforme cliente/jurisdição.

## 32. Segurança de desenvolvimento

- sem segredo em fixture real;
- sem dados reais em teste público;
- ambiente separado;
- migrations revisáveis;
- defaults seguros;
- debug desligado em produção.

## 33. Referência de maturidade

A implementação deve buscar boas práticas compatíveis com aplicações corporativas modernas e utilizar um baseline verificável de segurança de aplicação, a ser definido junto da stack.

## 34. Critérios de aceite

Segurança está alinhada quando:

1. segredo nunca chega ao browser;
2. autorização é server-side;
3. Sources são read-only;
4. SQL arbitrário não é exposto;
5. HTTP arbitrário não é exposto;
6. arquivos são privados;
7. automações revalidam acesso;
8. logs são sanitizados;
9. limites protegem Sources;
10. produção exige HTTPS.
