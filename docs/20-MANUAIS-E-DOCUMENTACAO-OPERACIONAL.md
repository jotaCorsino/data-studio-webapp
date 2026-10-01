# 20 — Manuais e Documentação Operacional

**Status:** requisitos definidos; conteúdo final obrigatório antes da release comercial da V1

## 1. Objetivo

Definir os manuais que devem acompanhar o Technolife Data Studio.

Os manuais finais não devem ser escritos integralmente antes da implementação estabilizar, porque precisam representar com precisão:

- telas reais;
- nomes reais;
- caminhos reais;
- requisitos reais;
- comandos reais;
- políticas comerciais aprovadas;
- retenção aprovada;
- processo de licenciamento efetivamente implementado.

A V1 não é considerada pronta para implantação comercial sem esses materiais homologados.

## 2. Entregáveis obrigatórios

A V1 terá três manuais principais:

1. Manual de Implantação e Ativação;
2. Manual de Desativação, Offboarding e Remoção;
3. Manual do Usuário.

Os arquivos finais ficarão em `docs/manuais/`.

## 3. Público de cada manual

### Implantação e Ativação

Público:

- técnicos da Technolife;
- parceiros autorizados quando aplicável.

Não é manual público de usuário final.

### Desativação e Remoção

Público:

- técnicos responsáveis pelo offboarding;
- administração/suporte autorizado.

### Manual do Usuário

Público:

- consumidores;
- criadores;
- administradores, com seções diferenciadas.

## 4. Manual de Implantação e Ativação

Deve ensinar de ponta a ponta como implantar uma nova Instance em ambiente cPanel homologado.

Conteúdo mínimo obrigatório:

### Pré-requisitos

- versão de PHP;
- extensões;
- loader de proteção;
- banco;
- cron;
- HTTPS;
- domínio/subdomínio;
- acesso necessário;
- limites de hospedagem;
- conectividade com Sources.

### Preparação

- criar subdomínio;
- configurar document root;
- criar banco;
- criar usuário de banco;
- permissões;
- storage privado;
- variáveis/segredos;
- SMTP quando necessário.

### Upload/install

- pacote correto;
- integridade;
- diretórios;
- permissões;
- dependências/runtime;
- migrations;
- cache/build quando aplicável.

### Ativação

- gerar/obter Instance ID;
- registrar cliente;
- registrar domínio;
- ativar licença;
- validar lease;
- confirmar estado ACTIVE.

### Configuração inicial

- identidade;
- primeiro administrador;
- e-mail;
- timezone;
- Sources;
- teste de Connector;
- Dataset inicial;
- permissões básicas.

### Jobs

- configurar cron;
- validar scheduler;
- validar fila quando existir;
- teste de execução.

### Testes finais

Checklist:

- login;
- HTTPS;
- licença;
- banco;
- Source;
- Report;
- PDF;
- e-mail;
- automação;
- storage;
- permissões.

### Entrega

- registrar versão;
- data;
- Instance ID;
- domínio;
- responsável;
- evidências;
- backup inicial;
- observações.

## 5. Requisito de passo a passo

O manual de implantação deve ser operacional.

Não pode usar instruções vagas como:

> Configure o banco corretamente.

Deve mostrar o procedimento concreto na versão homologada do produto e do cPanel.

Quando útil, incluir:

- caminhos;
- nomes de telas;
- exemplos;
- comandos;
- screenshots;
- resultado esperado;
- solução de problemas.

## 6. Manual de Desativação, Offboarding e Remoção

Deve responder claramente:

- quando iniciar o processo;
- quem autoriza;
- quando suspender a licença;
- quando revogar;
- como preservar dados;
- como entregar/exportar dados quando contratado;
- quanto tempo guardar;
- quando apagar;
- como remover a aplicação;
- como documentar a conclusão.

## 7. Etapas mínimas do offboarding

Fluxo conceitual:

```text
cancelamento confirmado
→ registrar data efetiva
→ bloquear novas mudanças comerciais conforme política
→ backup final
→ exportações previstas
→ suspender/revogar licença
→ período de retenção
→ remover webapp
→ remover banco/storage conforme política
→ remover secrets
→ remover cron/jobs
→ remover DNS/subdomínio quando aplicável
→ registrar evidência
→ encerrar Instance no Control Plane
```

A ordem final deve respeitar contrato e política de retenção.

## 8. Retenção

Antes da V1 comercial precisam existir valores oficiais para:

- retenção de backups;
- retenção do banco interno;
- retenção de Outputs;
- retenção de logs;
- retenção de dados no Control Plane;
- exceções contratuais/legais.

O manual deve apresentar prazos concretos, não “por algum tempo”.

## 9. Não apagar antes da hora

O procedimento deve impedir exclusão prematura.

O técnico precisa confirmar:

- cancelamento efetivo;
- autorização;
- backup;
- exportação;
- fim da retenção;
- ausência de hold jurídico/contratual;
- escopo correto da Instance.

## 10. Remoção técnica

O manual final deve cobrir:

- aplicação;
- arquivos;
- banco;
- usuário de banco;
- storage;
- cron;
- secrets;
- SMTP/API credentials;
- cache;
- logs;
- domínio/subdomínio;
- certificados quando exclusivos;
- backups temporários.

Não remover Sources ou bancos da empresa que não pertençam ao Data Studio.

## 11. Revogação da licença

Offboarding deve incluir:

- status no Control Plane;
- timestamp;
- motivo;
- responsável;
- confirmação de revogação;
- encerramento da Instance quando aplicável.

## 12. Evidência de encerramento

Checklist final deve registrar:

- Instance;
- cliente;
- domínio;
- data;
- operador;
- backup;
- exportação;
- data de expurgo;
- arquivos removidos;
- banco removido;
- cron removido;
- licença revogada;
- observações.

## 13. Manual do Usuário

Deve ensinar o produto pela ótica de tarefa, não pela arquitetura interna.

Estrutura mínima:

### Primeiros passos

- acesso;
- login;
- navegação;
- perfil;
- ajuda.

### Início

- visão geral;
- recentes;
- atalhos;
- estados.

### Relatórios

- localizar;
- preencher parâmetros;
- gerar;
- interpretar preview;
- PDF;
- histórico quando existir.

### Dashboards

- abrir;
- filtros;
- indicadores;
- gráficos;
- drill-down;
- drill-through;
- período/atualização.

### Apresentações

- localizar;
- parâmetros;
- gerar;
- visualizar;
- exportar.

### Studio

Para Criadores:

- Dataset;
- Analysis;
- Report;
- Dashboard;
- Model;
- publicação.

A linguagem deve evitar detalhes técnicos que não ajudem na tarefa.

### Automações

- criar quando permitido;
- agenda;
- parâmetros;
- destinatários;
- testar;
- pausar;
- histórico;
- falhas.

### Administração

Para administradores:

- usuários;
- perfis;
- permissões;
- Sources;
- identidade;
- licenciamento visível ao admin quando apropriado.

## 14. Exemplos práticos

O Manual do Usuário deve usar exemplos reais/sintéticos.

Exemplos:

- gerar prestação mensal;
- comparar mês atual e anterior;
- filtrar dashboard por unidade;
- exportar PDF;
- programar relatório mensal;
- localizar erro de Source;
- criar relatório simples.

## 15. Imagens

Quando a interface estiver estabilizada, o manual deve possuir screenshots relevantes.

Regras:

- não usar dados reais sensíveis;
- usar versão correspondente à release;
- destacar somente o necessário;
- atualizar imagem quando a UI mudar de forma significativa.

## 16. Linguagem

Todos os manuais:

- pt-BR;
- objetivos;
- passo a passo;
- termos consistentes com a interface;
- sem depender de conhecimento do repositório;
- sem pedir leitura de código.

## 17. Versionamento

Cada manual deve indicar:

- produto;
- versão;
- data;
- versão mínima compatível;
- última revisão.

Mudança relevante de interface/processo exige revisão do manual.

## 18. Formatos

Fonte canônica:

- Markdown no repositório.

Entregáveis podem incluir posteriormente:

- PDF;
- versão web/HTML;
- pacote para suporte.

A geração de outro formato não substitui o Markdown canônico.

## 19. Confidencialidade

Manual do Usuário pode ser distribuído a usuários autorizados.

Manuais técnicos podem conter procedimentos sensíveis e devem ter distribuição controlada.

Não documentar chaves, senhas ou secrets reais.

## 20. Definition of Done da V1

A V1 comercial não está concluída enquanto:

1. Manual de Implantação não foi executado do zero por um técnico em ambiente limpo homologado;
2. Manual de Offboarding não foi simulado ou validado em uma Instance de teste;
3. Manual do Usuário não corresponde à UI da release;
4. screenshots e nomes estão atualizados;
5. prazos de retenção estão definidos;
6. processo de licença está documentado;
7. troubleshooting básico foi validado;
8. versões dos documentos estão registradas.
