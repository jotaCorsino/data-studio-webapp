# 12 — Automações e Distribuição

**Status:** em consolidação

## 1. Objetivo

Definir como o Technolife Data Studio executa modelos automaticamente e distribui seus resultados.

Automação deve eliminar tarefas repetitivas sem duplicar lógica analítica.

## 2. Princípio

```text
Model publicado
+
Parameters
+
Schedule
+
Outputs
+
Distribution
=
Automation
```

## 3. Automation

Propriedades conceituais:

- id;
- name;
- modelId;
- parameters;
- schedule;
- outputs;
- distributions;
- enabled;
- owner;
- authorization context;
- nextRunAt;
- lastRunAt;
- lastStatus;
- retryPolicy quando aplicável.

## 4. Exemplo

```text
Automação:
Relatório financeiro mensal

Agenda:
Dia 1 de cada mês às 08:00

Parâmetros:
Período = mês anterior

Saídas:
PDF
Apresentação

Distribuição:
E-mail para diretoria e financeiro
```

## 5. Schedule

Schedule define quando executar.

Casos iniciais importantes:

- diário;
- semanal;
- mensal;
- dia específico;
- horário específico;
- timezone da Instance.

A engine final ainda será definida.

## 6. Timezone

Toda Automation deve possuir semântica clara de timezone.

Preferência inicial:

- usar timezone da Instance como padrão;
- permitir override somente quando houver caso real.

Não armazenar recorrência sem saber em qual timezone será interpretada.

## 7. Relative Parameters

Automação depende fortemente de parâmetros relativos.

Exemplo:

```text
period = previous_month
```

No momento da Execution:

```text
2026-10-01
→ previous_month
→ 2026-09-01 a 2026-09-30
```

A resolução deve ficar registrada na Execution.

## 8. Outputs

Automation pode solicitar um ou mais Outputs suportados pelo Model.

Exemplos:

- PDF;
- apresentação;
- outro arquivo.

Nem todo Model precisa suportar todos os formatos.

## 9. Distribution

Distribution define onde o Output será entregue.

Primeiro canal prioritário:

- e-mail.

Futuros candidatos:

- armazenamento interno;
- link;
- webhook;
- integração corporativa.

Não implementar canais futuros antes de requisito.

## 10. E-mail

Uma distribuição por e-mail pode conter:

- destinatários;
- cópia;
- assunto;
- corpo;
- anexos;
- links;
- identificação do Model;
- informações de período.

A configuração deve validar destinatários.

## 11. Segredos de distribuição

Credenciais SMTP/API permanecem no backend.

Usuário não recebe segredo salvo.

## 12. Autorização

Automation nunca executa como superusuário implícito.

É necessário definir contexto de autorização.

Direção:

- Automation pertence a uma Instance;
- possui owner/responsável;
- usa permissões adequadas;
- permissões são revalidadas na execução;
- desativação do usuário ou perda de acesso deve afetar Automation conforme política definida.

A política exata será consolidada no documento de permissões.

## 13. Destinatário não é autorização automática

Enviar para um e-mail externo pode expor dados.

Distribuição deve considerar:

- sensibilidade;
- política da Instance;
- lista permitida;
- domínio;
- autorização;
- consentimento/configuração administrativa.

## 14. Execução

Fluxo:

```text
scheduler
→ selecionar automações vencidas
→ validar Automation
→ validar Model
→ validar autorização
→ resolver Parameters
→ criar Execution
→ gerar Outputs
→ distribuir
→ registrar resultado
```

## 15. Estado

Estados candidatos de Automation:

- active;
- paused;
- disabled;
- error.

Estados de uma Execution automatizada:

- queued;
- running;
- succeeded;
- failed;
- partiallySucceeded;
- cancelled.

A nomenclatura final será consolidada.

## 16. Histórico

Usuário autorizado deve conseguir consultar:

- última execução;
- próxima execução;
- status;
- outputs;
- erro sanitizado;
- destinatários;
- duração;
- timestamp.

Retenção será definida depois.

## 17. Falhas

Falha precisa ser classificada.

Exemplos:

- Source indisponível;
- credencial inválida;
- Dataset incompatível;
- Model incompatível;
- Parameter inválido;
- geração falhou;
- e-mail falhou;
- destinatário rejeitado;
- timeout.

Erro técnico não deve expor segredo.

## 18. Falha parcial

Exemplo:

```text
PDF gerado
Apresentação gerada
E-mail A enviado
E-mail B falhou
```

Isso não deve ser registrado simplesmente como sucesso completo.

## 19. Retry

Retries podem ser apropriados para falhas transitórias.

Regras:

- número limitado;
- backoff;
- evitar duplicação;
- idempotência;
- não repetir indiscriminadamente falhas permanentes.

## 20. Idempotência

Execução automática deve possuir identificador único.

Distribuição deve evitar enviar múltiplas vezes o mesmo resultado por repetição acidental de job.

## 21. Concorrência

Duas execuções da mesma Automation podem precisar de política:

- impedir overlap;
- permitir overlap;
- enfileirar;
- cancelar anterior.

Padrão inicial deve ser conservador.

## 22. Pausar

Usuário autorizado deve poder pausar Automation sem apagá-la.

Pausar preserva configuração.

## 23. Desativar por incompatibilidade

Se o Model ficar incompatível, a Automation deve:

- parar de executar com sucesso falso;
- indicar problema;
- evitar envio incorreto;
- exigir correção quando necessário.

## 24. Preview de próxima execução

A UI pode mostrar:

```text
Próxima execução
01/11/2026 às 08:00

Período resolvido
Outubro de 2026
```

Isso reduz erro de configuração.

## 25. Teste manual

Criador deve poder executar uma Automation manualmente em modo de teste quando permitido.

O teste deve deixar claro:

- se enviará distribuição real;
- parâmetros;
- destinatários;
- outputs.

## 26. Segurança de arquivos

Outputs gerados automaticamente:

- ficam em storage privado;
- possuem autorização;
- não usam URL pública previsível;
- podem ter expiração;
- seguem retenção.

## 27. Auditoria

Eventos importantes candidatos:

- criação;
- alteração;
- ativação;
- pausa;
- execução;
- falha;
- distribuição;
- alteração de destinatários.

Auditoria deve ser proporcional ao risco.

## 28. Critérios de aceite

Automações estão alinhadas quando:

1. reutilizam Model publicado;
2. Parameters relativos são resolvidos por Execution;
3. timezone é explícito;
4. autorização é revalidada;
5. Outputs e Distribution são separados;
6. histórico registra resultado;
7. falha parcial é representável;
8. retries são controlados;
9. execução é idempotente;
10. dados não são enviados a destinatários sem política adequada.
