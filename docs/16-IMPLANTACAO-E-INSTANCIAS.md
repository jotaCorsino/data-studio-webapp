# 16 — Implantação e Instâncias

**Status:** em consolidação

## 1. Objetivo

Definir a direção de implantação do Technolife Data Studio sem criar forks do produto para cada cliente.

## 2. Princípio

```text
um código-base
+
configuração por Instance
```

Customização de cliente ocorre preferencialmente por dados e configuração.

## 3. Instance

Cada organização pode possuir uma Instance própria com:

- banco interno;
- usuários;
- perfis;
- Sources;
- credenciais;
- Datasets;
- Analyses;
- Reports;
- Dashboards;
- Presentations;
- Models;
- Automations;
- identidade;
- storage;
- configurações de e-mail.

## 4. Direção inicial de isolamento

A direção preferida é suportar implantação isolada por organização usando o mesmo software.

Exemplo:

```text
mesma versão do produto

Empresa A
├── banco A
├── storage A
└── secrets A

Empresa B
├── banco B
├── storage B
└── secrets B
```

Isso oferece isolamento sem manter branches diferentes.

## 5. Multi-tenant

Multi-tenant centralizado pode ser avaliado futuramente.

Não é requisito para o primeiro ciclo.

A arquitetura não deve presumir que todas as organizações compartilham banco.

## 6. Fork por cliente

Não é fluxo normal.

Somente considerar quando existir requisito incompatível com o produto configurável e houver decisão explícita.

## 7. Configuração

Separar:

### Configuração de ambiente

Exemplos:

- DB URL;
- app secret;
- storage;
- SMTP;
- base URL;
- environment.

### Configuração de produto

No banco interno:

- identidade;
- Sources;
- Models;
- permissões;
- automações;
- preferências.

## 8. Segredos

Segredos de infraestrutura ficam fora do repositório.

Estratégia depende do ambiente:

- env;
- secret manager;
- arquivo protegido;
- mecanismo do provedor.

## 9. Ambientes

Recomendado:

- development;
- staging/homologação;
- production.

Uma instalação pequena pode adaptar, mas produção não deve ser ambiente de teste.

## 10. Deploy

Fluxo desejado:

```text
build/test
→ backup
→ preflight
→ deploy
→ migrations
→ cache/build
→ smoke test
→ liberar
```

## 11. Preflight

Validar:

- versão de runtime;
- extensões;
- banco;
- migrations;
- storage;
- permissões de filesystem;
- SMTP quando requerido;
- cron/worker;
- variáveis obrigatórias;
- HTTPS/base URL.

## 12. Migrations

Schema interno deve usar migrations versionadas.

Regras:

- reproduzíveis;
- revisáveis;
- rollback/forward strategy;
- backup antes de alterações críticas;
- não editar banco manualmente como processo normal.

## 13. Jobs

A V1 utiliza jobs persistidos no banco interno e execução por cPanel Cron.

Direção:

```text
cron
→ comando CLI one-shot
→ lock
→ agendar automações vencidas
→ processar lote da fila
→ sair
```

Não exigir daemon permanente, Redis, RabbitMQ ou Supervisor.

A implementação utilizará Symfony Messenger com transporte Doctrine ou mecanismo equivalente aprovado, com lock obrigatório contra sobreposição.

## 14. Storage

Separar:

- assets públicos;
- uploads privados;
- outputs privados;
- temporários.

PDFs e apresentações não devem ficar em diretório público previsível.

## 15. Backup

Política deve cobrir:

- banco;
- storage privado necessário;
- configurações;
- segredos conforme estratégia segura.

Testar restauração.

## 16. Rollback

Deploy deve ter caminho de reversão compatível com migrations e versão de aplicação.

Evitar release que torna rollback impossível sem planejamento.

## 17. Logs

Produção precisa de logs acessíveis ao suporte, com:

- timestamp;
- nível;
- contexto;
- request/job id;
- erro sanitizado.

## 18. Health checks

Aplicação pode expor diagnóstico controlado para:

- app;
- banco;
- storage;
- worker;
- scheduler.

Não expor credenciais ou detalhes sensíveis.

## 19. Atualização do produto

Instances devem conseguir seguir uma linha comum de versões.

Customização por configuração reduz risco de atualização.

## 20. Compatibilidade de configuração

Release precisa considerar migrations de:

- banco;
- Models;
- schemas internos;
- configuração persistida.

Não quebrar configurações silenciosamente.

## 21. Identidade por Instance

Cada Instance pode configurar:

- nome;
- logo;
- contatos;
- identidade visual permitida.

Isso não altera o código-base.

## 22. Domínio/subdomínio

Direção preferida:

- domínio ou subdomínio dedicado por Instance.

Exemplos:

```text
dados.empresa.com.br
studio.empresa.com.br
```

A convenção não é obrigatória.

## 23. Conectividade com Sources

Algumas Sources estarão:

- internet;
- VPN;
- rede privada;
- localhost/mesmo servidor;
- allowlist por IP.

A implantação deve considerar topologia antes de prometer integração.

## 24. Banco interno

O banco interno não substitui os bancos das Sources.

Ele armazena o estado do Data Studio.

## 25. Retenção

Definir políticas para:

- Executions;
- Outputs;
- logs;
- auditoria;
- temporários.

Não guardar tudo indefinidamente por padrão.

## 26. Capacidade

Planejamento deve considerar:

- número de usuários;
- volume de consultas;
- tamanho das Sources;
- número de dashboards;
- automações;
- outputs;
- concorrência.

A arquitetura inicial deve evitar assumir escala extrema, mas também não bloquear crescimento básico.

## 27. Observabilidade

Métricas candidatas:

- erros;
- latência;
- jobs pendentes;
- automações falhas;
- tempo de geração;
- consultas por Connector;
- uso de storage.

## 28. Critérios de aceite

Implantação está alinhada quando:

1. mesmo código atende múltiplas Instances;
2. secrets ficam fora do Git;
3. banco e storage são isoláveis;
4. migrations são versionadas;
5. jobs possuem mecanismo definido;
6. outputs são privados;
7. backup e rollback existem;
8. configuração de cliente não exige fork;
9. observabilidade permite suporte;
10. conectividade da Source é considerada por Instance.

## 29. Ambiente inicial homologado

O primeiro alvo de implantação é hospedagem administrada por cPanel.

A V1 deverá homologar uma matriz mínima contendo:

- versão de cPanel/ambiente representativo;
- versões de PHP suportadas;
- extensões necessárias;
- tecnologia de proteção/loader do backend;
- MySQL/MariaDB suportado;
- cron;
- limites mínimos de memória/execução;
- HTTPS;
- storage privado;
- acesso de rede necessário às Sources.

O Manual de Implantação deve refletir essa matriz.

## 30. Pacote de release

A Technolife gera um pacote de produção separado do repositório de desenvolvimento.

O pacote não deve incluir por padrão:

- `.git`;
- código-fonte original do backend quando a proteção homologada estiver disponível;
- testes internos desnecessários;
- fixtures internas;
- secrets;
- chaves privadas;
- tooling de desenvolvimento.

## 31. Ativação

Após o deploy técnico, a Instance ainda precisa ser ativada.

Fluxo conceitual:

```text
instalação
→ Instance ID
→ registro no Control Plane
→ vínculo com organização/domínio
→ emissão de lease
→ estado ACTIVE
→ smoke test
```

Instalação física e ativação comercial são etapas separadas.

## 32. Migração legítima de servidor

Trocar de hospedagem não deve exigir burlar a licença.

Deve existir procedimento para:

- preparar novo ambiente;
- migrar banco/storage;
- atualizar domínio/fingerprint quando necessário;
- reativar a Instance;
- invalidar vínculo antigo;
- executar smoke tests.

## 33. Cancelamento e remoção

Cancelamento inicia um fluxo formal de offboarding.

A remoção não acontece automaticamente no momento da suspensão de licença.

O processo deve observar:

- data efetiva;
- backup;
- exportações previstas;
- retenção;
- revogação;
- remoção técnica;
- evidência.

O procedimento oficial será o `MANUAL-DE-DESATIVACAO-E-REMOCAO.md`.

## 34. Retenção

Os prazos finais ainda não estão definidos.

Antes da release comercial, devem ser fixados valores para:

- banco interno;
- backups;
- Outputs;
- logs;
- metadados do Control Plane;
- temporários.

A política precisa distinguir o que está sob controle da Technolife do que permanece na hospedagem controlada pelo cliente.

## 35. Manuais operacionais

A V1 deve possuir:

- Manual de Implantação e Ativação;
- Manual de Desativação, Offboarding e Remoção;
- Manual do Usuário.

Os requisitos estão em `20-MANUAIS-E-DOCUMENTACAO-OPERACIONAL.md`.


## 36. Matriz técnica inicial da V1

A implantação homologada começa com:

```text
Frontend: React + TypeScript + Vite
Backend: Symfony 7.4 LTS
PHP mínimo: 8.3
PHP recomendado: 8.4
Banco: MariaDB ou MySQL
Jobs: banco + cPanel Cron
PDF: Dompdf
E-mail: SMTP via Symfony Mailer
API: same-origin /api/v1
Autenticação: sessão server-side
```

Node e Composer são ferramentas de desenvolvimento/build e não requisitos de runtime da implantação normal.

O pacote de produção leva:

- frontend compilado;
- dependências PHP de produção resolvidas;
- backend protegido quando a release for comercial;
- migrations;
- assets;
- scripts operacionais aprovados.

Detalhes completos: `21-DECISOES-TECNICAS-V1.md`.

## 37. Requisito de Terminal/SSH

A implantação oficialmente suportada da V1 exige acesso a PHP CLI por Terminal/SSH ou execução equivalente fornecida pelo provedor.

Isso permite:

- migrations;
- preflight;
- cache;
- diagnóstico;
- smoke tests;
- atualização;
- operação de jobs.

Um instalador web público não faz parte da V1.
