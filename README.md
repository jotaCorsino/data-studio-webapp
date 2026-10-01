# Technolife Data Studio

> Nome de trabalho do produto. A marca comercial poderá mudar sem alterar a identidade funcional definida neste repositório.

## Visão

O **Technolife Data Studio** é uma plataforma de inteligência gerencial e apoio à tomada de decisão.

O sistema conecta-se às fontes de dados utilizadas por uma empresa e transforma os registros existentes nesses sistemas em informações úteis para gestão. A proposta é permitir que gestores, diretores e diferentes áreas da organização obtenham rapidamente as informações necessárias para compreender o funcionamento da empresa, acompanhar indicadores, identificar problemas, oportunidades, desperdícios e tendências e apoiar decisões que possam melhorar produtividade, eficiência, custos e resultados.

A frase-guia do produto é:

> **Transformar os dados que a empresa já possui em informação útil para decidir melhor.**

## O que o produto faz

A partir dos dados disponíveis nas fontes conectadas, usuários autorizados poderão:

- organizar e relacionar informações;
- aplicar filtros, agrupamentos, métricas e cálculos;
- criar análises reutilizáveis;
- gerar tabelas, gráficos e indicadores;
- montar dashboards customizáveis;
- gerar relatórios em PDF;
- gerar apresentações;
- salvar modelos parametrizáveis;
- executar análises sob demanda;
- programar execuções recorrentes;
- distribuir resultados automaticamente, inclusive por e-mail;
- controlar acesso a dados, análises e recursos conforme perfil e permissão.

O potencial de cada implantação depende das fontes disponíveis. O mesmo produto poderá apoiar áreas como financeiro, RH, comercial, atendimento, suporte, operações, produção ou administração sem transformar o Data Studio em ERP, CRM, help desk ou sistema de RH.

## Princípio de produto

O sistema pode ser tecnicamente sofisticado por dentro, mas deve permanecer simples de usar.

A complexidade de conexão, modelagem, filtros, agregações, segurança e composição deve ficar concentrada nas ferramentas administrativas e de construção. O usuário que apenas precisa consultar uma informação, abrir um dashboard ou gerar um relatório deve executar essas ações com poucos passos.

Conceitualmente:

```text
fontes de dados
      ↓
conectores
      ↓
dados normalizados
      ↓
análises reutilizáveis
      ↓
┌───────────────┬──────────────┬───────────────┐
│ relatórios    │ dashboards   │ apresentações │
└───────────────┴──────────────┴───────────────┘
      ↓
execução sob demanda ou automática
      ↓
informação para gestão e tomada de decisão
```

## Experiências do produto

A interface deverá separar claramente dois tipos de uso:

### Operação

Voltada ao usuário que consome informações já preparadas.

Exemplos:

- abrir um dashboard;
- escolher um período;
- escolher um cliente, unidade ou departamento;
- gerar um relatório;
- baixar um PDF;
- visualizar uma apresentação;
- consultar resultados anteriores.

### Studio e Administração

Voltada a usuários autorizados a preparar e governar o sistema.

Exemplos:

- configurar fontes e conectores;
- publicar conjuntos de dados;
- definir campos e metadados;
- criar análises e visões;
- montar relatórios e dashboards;
- definir parâmetros;
- programar automações;
- administrar usuários e permissões;
- configurar a identidade da instância.

A existência dessas duas experiências não obriga a criação de dois aplicativos separados. O requisito é que a complexidade administrativa não seja despejada sobre o usuário operacional.

## Fontes e neutralidade de domínio

O Data Studio deve ser orientado a conectores. Uma fonte pode ser, por exemplo:

- API HTTP;
- banco de dados relacional em modo somente leitura;
- sistema corporativo com API própria;
- arquivo CSV;
- arquivo XLSX;
- arquivo SpreadsheetML/XML;
- outras integrações futuras.

Depois que os dados entram na camada normalizada do produto, relatórios, dashboards e análises não devem depender do formato ou tecnologia de origem.

## Automação

Uma análise ou modelo poderá ser executado de forma programada.

Exemplo conceitual:

```text
Análise financeira mensal
→ executar no primeiro dia de cada mês
→ usar o mês anterior como período
→ gerar PDF
→ gerar apresentação
→ enviar aos destinatários configurados
```

Automação é parte do produto, não um complemento isolado do módulo de relatórios.

## Implantação

A arquitetura de implantação ainda será consolidada na documentação técnica. A direção atual favorece um único produto e código-base, configurável, com possibilidade de instâncias isoladas por empresa.

Customizações de cliente devem ser resolvidas preferencialmente por configuração, modelos e conectores. Forks do produto não são o mecanismo normal de customização.

## Fonte da verdade

Este repositório deve ser autossuficiente.

Toda decisão necessária para compreender, implementar, testar e manter o produto deverá estar documentada aqui. Repositórios anteriores, protótipos, conversas e implementações externas não constituem especificação do Data Studio.

Quando uma ideia externa for adotada, ela deverá ser formalizada neste repositório como requisito próprio antes de orientar qualquer implementação.

## Estado atual

O projeto está na fase de **fundamentação e especificação**.

Antes do desenvolvimento funcional, serão consolidados:

1. visão e escopo do produto;
2. usuários e jornadas;
3. arquitetura;
4. modelo de domínio;
5. fontes e conectores;
6. modelo de dados normalizado;
7. análises e visões;
8. relatórios, dashboards e apresentações;
9. modelos, parâmetros e automações;
10. usuários, perfis e permissões;
11. UX e design system;
12. segurança;
13. implantação;
14. testes e qualidade;
15. roadmap de desenvolvimento.

O desenvolvimento deverá avançar por **fatias verticais**, validando fluxos reais de ponta a ponta antes de expandir horizontalmente toda a plataforma.

## Implantação comercial e licenciamento

A direção inicial de implantação é uma **Instance dedicada instalada na hospedagem da organização, com compatibilidade prioritária com ambientes administrados por cPanel**.

A Instance mantém localmente:

- banco interno do Data Studio;
- configurações;
- usuários e permissões;
- Connectors;
- credenciais de Sources;
- processamento;
- Outputs e storage privado conforme política.

O produto também possuirá um **Control Plane de licenciamento operado pela Technolife**, separado dos dados de negócio da empresa.

Esse mecanismo deverá permitir:

- ativação da Instance;
- vínculo com domínio/organização;
- licença/lease assinado;
- tolerância temporária a indisponibilidade do Control Plane;
- suspensão;
- revogação;
- reativação;
- controle de cópias não autorizadas.

O bloqueio de licença é **não destrutivo**: não apaga dados, não altera Sources e não executa sabotagem. Cancelamento e remoção seguem um processo explícito de offboarding.

A proteção do produto está especificada em:

- `docs/19-LICENCIAMENTO-E-PROTECAO-DO-PRODUTO.md`;
- `docs/16-IMPLANTACAO-E-INSTANCIAS.md`;
- `docs/15-SEGURANCA.md`.

## Manuais obrigatórios da V1

A primeira versão comercial deverá ser acompanhada por:

- Manual de Implantação e Ativação;
- Manual de Desativação, Offboarding e Remoção;
- Manual do Usuário.

Os manuais completos serão finalizados **ao final da V1**, quando os fluxos reais estiverem estabilizados, e deverão ser testados contra uma instalação/remoção reais e a interface da versão entregue.

Os requisitos estão em `docs/20-MANUAIS-E-DOCUMENTACAO-OPERACIONAL.md`.


## Base técnica da V1

A primeira versão foi definida para ser compatível com implantação dedicada em cPanel:

```text
Frontend
React + TypeScript + Vite
(build antes do deploy)

Backend
Symfony 7.4 LTS
PHP 8.3 mínimo
PHP 8.4 recomendado

Banco interno
MariaDB / MySQL

API
JSON same-origin
/api/v1

Autenticação
sessão server-side

Jobs
fila persistida no banco
+
cPanel Cron one-shot

PDF inicial
Dompdf
```

Node e Composer não são requisitos de runtime para o cliente. O pacote oficial de produção levará frontend compilado e dependências PHP já resolvidas.

A especificação completa está em `docs/21-DECISOES-TECNICAS-V1.md`.
