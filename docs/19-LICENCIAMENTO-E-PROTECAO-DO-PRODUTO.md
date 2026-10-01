# 19 — Licenciamento e Proteção do Produto

**Status:** arquitetura de proteção em consolidação

## 1. Objetivo

Definir como o Technolife Data Studio pode ser instalado dentro da hospedagem/cPanel de uma empresa sem transformar a implantação em uma entrega irrestrita do produto e de sua propriedade intelectual.

O objetivo é combinar:

- processamento local dos dados da empresa;
- implantação isolada por cliente;
- compatibilidade com hospedagem administrada por cPanel;
- proteção do backend proprietário;
- ativação controlada;
- possibilidade de suspensão/revogação remota;
- operação previsível mesmo quando o serviço de licenciamento estiver temporariamente indisponível.

## 2. Princípio

A Instance do cliente executa localmente, mas sua licença é controlada por uma infraestrutura externa operada pela Technolife.

```text
TECHNOLIFE
Control Plane de Licenças
        │
        │ ativação / lease / revogação
        ▼
HOSPEDAGEM DO CLIENTE
Data Studio Instance
        │
        ├── Frontend
        ├── Backend protegido
        ├── Banco interno
        ├── Storage privado
        └── Connectors
              ↓
        Sources da empresa
```

## 3. Limite realista de proteção

Nenhum mecanismo puramente local garante proteção absoluta quando outra parte possui controle administrativo completo do servidor.

A meta do produto é:

- não distribuir o código-fonte original do backend como pacote de produção;
- dificultar engenharia reversa;
- impedir que uma simples cópia de arquivos se torne uma nova instalação funcional;
- vincular a operação a uma licença válida;
- tornar suspensão e revogação controláveis pela Technolife;
- combinar proteção técnica com regras contratuais.

Não prometer impossibilidade absoluta de cópia.

## 4. Repositório e código-fonte

O repositório de desenvolvimento é privado e controlado pela Technolife.

Regras:

- não fazer deploy de `.git`;
- não distribuir arquivos de desenvolvimento desnecessários;
- não distribuir secrets;
- não distribuir source maps contendo código sensível quando eles não forem necessários;
- não distribuir código-fonte legível do backend proprietário quando houver proteção compatível com a stack final;
- releases de produção são geradas por processo controlado.

## 5. Pacote de produção

O pacote instalado no cliente deve conter apenas o necessário para execução.

Conceitualmente:

```text
build frontend
+
backend de produção protegido
+
configuração pública necessária
+
migrations/artefatos de implantação controlados
+
assets
```

Não deve conter automaticamente:

- histórico Git;
- tooling de desenvolvimento;
- fixtures internas;
- documentação confidencial de operação da Technolife;
- chaves privadas;
- secrets do Control Plane;
- código-fonte desprotegido quando a estratégia final permitir proteção.

## 6. Proteção do backend

A V1 deve adotar uma tecnologia de proteção compatível com o runtime PHP e com o ambiente cPanel suportado.

A escolha final será validada tecnicamente antes da release.

Requisitos:

- executar em versões de PHP oficialmente suportadas pelo produto;
- possuir loader/runtime disponível no ambiente de hospedagem homologado;
- permitir distribuição sem expor o backend original em texto legível;
- não introduzir dependência operacional impossível de instalar em cPanel;
- permitir atualização controlada.

Tecnologias candidatas podem incluir encoders/loaders PHP comerciais, mas a escolha só se torna canônica após homologação técnica.

## 7. Control Plane

A Technolife deverá manter um serviço proprietário de controle de licenças.

Responsabilidades mínimas:

- emitir Instance ID;
- ativar Instance;
- registrar domínio autorizado;
- registrar estado da licença;
- emitir autorização temporária assinada;
- suspender;
- revogar;
- reativar;
- registrar versão compatível quando necessário;
- manter histórico mínimo de eventos de licenciamento.

O Control Plane não deve receber dados operacionais do cliente apenas para validar licença.

## 8. Instance ID

Cada instalação recebe um identificador único.

Exemplo conceitual:

```text
INST-000123
```

Esse identificador não é segredo, mas participa da identidade da licença.

## 9. Binding da licença

A licença pode ser vinculada a elementos como:

- Instance ID;
- domínio/subdomínio;
- organização;
- ambiente;
- fingerprint de instalação quando tecnicamente adequado;
- edição/plano;
- validade.

Não depender de IP fixo como única identidade, porque hospedagens podem mudar de endereço.

## 10. Assinatura assimétrica

A licença/lease deve ser verificável pela Instance sem permitir que ela emita novas licenças.

Direção:

```text
Control Plane
Private Key
    ↓
assina
    ↓
Lease Token
    ↓
Instance
Public Key
    ↓
valida assinatura
```

A chave privada nunca é distribuída para as Instances.

## 11. Lease

A Instance não precisa consultar o Control Plane em toda requisição.

Ela recebe uma autorização temporária assinada.

Conceitualmente:

```text
licença ativa
→ Control Plane emite lease
→ Instance valida assinatura
→ funcionamento permitido até o prazo do lease
```

O período exato será definido antes da V1.

## 12. Grace period

Deve existir tolerância para indisponibilidade temporária do Control Plane.

Objetivo:

- evitar indisponibilidade do produto por falha momentânea de internet;
- permitir manutenção do Control Plane;
- não transformar validação de licença em single point of failure imediato.

O período exato será documentado antes da release.

## 13. Estados de licença

Estados conceituais:

### ACTIVE

Funcionamento normal.

### GRACE

A Instance não conseguiu renovar, mas ainda está dentro da tolerância.

Funcionamento normal ou com aviso administrativo discreto.

### SUSPENDED

Suspensão administrativa/comercial reversível.

O comportamento funcional deve seguir a política aprovada para V1.

### REVOKED

Licença revogada.

A aplicação não executa funções normais protegidas.

### EXPIRED

Validade encerrada.

A aplicação entra no comportamento definido para licença expirada.

## 14. Desativação remota

A Technolife deve poder suspender ou revogar a licença no Control Plane.

A Instance percebe a alteração na próxima validação/renovação.

A desativação deve ser:

- autenticada;
- auditável;
- reversível quando aplicável;
- não destrutiva;
- previsível.

## 15. O que a desativação não pode fazer

Bloqueio de licença não pode:

- apagar banco do cliente;
- apagar arquivos de origem;
- corromper configuração;
- destruir Outputs;
- alterar dados nas Sources;
- executar ação escondida de sabotagem.

O sistema apenas deixa de fornecer as funcionalidades licenciadas conforme a política definida.

## 16. Tela de licença bloqueada

Quando a licença impedir operação normal, a interface deve apresentar estado claro.

Exemplo:

```text
Data Studio indisponível

A licença desta instalação precisa ser regularizada.
Entre em contato com o suporte responsável.
```

Não exibir informação confidencial do Control Plane.

## 17. Modo administrativo de suporte

A arquitetura pode prever acesso técnico controlado para diagnóstico de licença.

Esse mecanismo:

- não pode criar backdoor universal inseguro;
- deve ser autenticado;
- deve ser auditável;
- deve possuir escopo mínimo;
- não deve permitir leitura desnecessária dos dados do cliente.

A forma final será definida junto da autenticação.

## 18. Telemetria de licenciamento

A validação pode enviar somente metadados necessários, como:

- Instance ID;
- domínio;
- versão;
- identificador técnico de instalação;
- timestamp;
- status de atualização/licença.

Por padrão não enviar:

- registros dos Datasets;
- relatórios;
- dados financeiros;
- dados pessoais de usuários;
- conteúdo das Sources.

Qualquer telemetria adicional precisa estar formalmente documentada.

## 19. Privacidade

O mecanismo de licença precisa ser compatível com a política de privacidade e com os contratos de serviço.

O cliente deve poder saber que a Instance realiza validação de licença.

Não usar mecanismo oculto para coletar dados de negócio.

## 20. Cópia para outro servidor

Uma cópia física dos arquivos não deve ser suficiente para ativar outra Instance.

O novo ambiente deverá:

1. possuir requisitos de runtime;
2. possuir configuração válida;
3. apresentar identidade da Instance;
4. obter licença válida para o ambiente;
5. passar pelo processo de ativação.

Mudança legítima de servidor deve possuir procedimento de migração/reativação.

## 21. Atualizações

O Control Plane pode participar do controle de versões, sem necessariamente hospedar todo o mecanismo de update.

Pode validar:

- licença apta;
- versão autorizada;
- Instance;
- canal de release.

O update não deve expor repositório privado.

## 22. Disponibilidade do Control Plane

O Control Plane é infraestrutura crítica.

Requisitos:

- HTTPS;
- autenticação forte administrativa;
- backup;
- logs;
- rate limiting;
- monitoramento;
- alta disponibilidade proporcional ao produto;
- chave privada protegida;
- rotação planejada de chaves.

## 23. Comprometimento do Control Plane

Deve existir plano para:

- revogar chave;
- introduzir nova chave;
- atualizar public keys confiáveis;
- bloquear token comprometido;
- auditar emissões.

A estratégia detalhada pode evoluir depois da V1.

## 24. Separação de licença e dados

A Technolife controla o direito de execução do software.

A empresa continua sendo responsável por seus próprios dados conforme contrato.

Bloquear licença não transfere propriedade de dados para a Technolife.

## 25. Cancelamento

Cancelamento comercial inicia o processo de offboarding descrito na documentação operacional.

Esse processo deve definir:

- data de encerramento;
- suspensão/revogação;
- janela de exportação quando contratada;
- backup;
- retenção;
- remoção;
- evidência de conclusão.

## 26. Retenção após cancelamento

O prazo padrão ainda deve ser formalmente definido antes da V1 comercial.

A política final precisa especificar:

- quais dados a Technolife mantém;
- quais dados permanecem na hospedagem do cliente;
- prazo;
- finalidade;
- backup;
- exclusão;
- exceções legais/contratuais.

O Manual de Desativação deve trazer o prazo vigente de forma explícita.

## 27. Critérios de aceite

A proteção da V1 está adequada quando:

1. source do backend não é distribuído como código aberto/legível por padrão;
2. cópia simples da instalação não gera nova licença;
3. Instance possui identidade própria;
4. licença é validada com assinatura forte;
5. Control Plane pode suspender/revogar;
6. indisponibilidade temporária do Control Plane não derruba a Instance imediatamente;
7. revogação não apaga dados;
8. chave privada não é distribuída;
9. telemetria não envia dados de negócio sem requisito;
10. processo de instalação e remoção é documentado.
