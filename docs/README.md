# Documentação canônica — Technolife Data Studio

Esta pasta contém a especificação oficial do produto.

## Regra de autossuficiência

A documentação deve permitir compreender e desenvolver o Data Studio sem consultar outros repositórios, protótipos ou conversas.

Se uma regra necessária não estiver aqui, ela deve ser formalizada antes de virar comportamento permanente.

## Estrutura planejada

| Documento | Assunto | Estado |
|---|---|---|
| `00-VISAO-DO-PRODUTO.md` | propósito, proposta de valor e capacidades | Em consolidação |
| `01-PRINCIPIOS-E-ESCOPO.md` | princípios, fronteiras e não objetivos | Em consolidação |
| `02-USUARIOS-E-JORNADAS.md` | perfis conceituais e experiências principais | Em consolidação |
| `03-ARQUITETURA.md` | arquitetura conceitual e responsabilidades | Em consolidação |
| `04-MODELO-DE-DOMINIO.md` | entidades e relações | Em consolidação |
| `05-FONTES-E-CONECTORES.md` | integrações, descoberta e leitura | Em consolidação |
| `06-DADOS-DATASETS-E-CAMPOS.md` | normalização, tipos e metadados | Em consolidação |
| `07-ANALISES-E-VISOES.md` | filtros, agrupamentos, métricas e análises | Em consolidação |
| `08-RELATORIOS.md` | composição, configuração, preview, PDF e paginação | Em consolidação |
| `09-DASHBOARDS.md` | painéis, interação e indicadores | Em consolidação |
| `10-APRESENTACOES.md` | geração de apresentações | Em consolidação |
| `11-MODELOS-E-PARAMETROS.md` | reutilização e execução parametrizada | Em consolidação |
| `12-AUTOMACOES-E-DISTRIBUICAO.md` | agenda, execução e envio | Em consolidação |
| `13-USUARIOS-PERFIS-E-PERMISSOES.md` | identidade, RBAC e restrições | Em consolidação |
| `14-UX-E-DESIGN-SYSTEM.md` | shell, navegação, componentes e linguagem visual | Em consolidação |
| `15-SEGURANCA.md` | fronteiras de confiança e controles | Em consolidação |
| `16-IMPLANTACAO-E-INSTANCIAS.md` | topologia, configuração e isolamento | Em consolidação |
| `17-TESTES-E-QUALIDADE.md` | estratégia de testes e homologação | Em consolidação |
| `18-ROADMAP.md` | desenvolvimento por fatias verticais | Proposta para homologação |
| `19-LICENCIAMENTO-E-PROTECAO-DO-PRODUTO.md` | Control Plane, ativação, proteção e revogação | Em consolidação |
| `20-MANUAIS-E-DOCUMENTACAO-OPERACIONAL.md` | requisitos dos manuais da V1 | Em consolidação |
| `21-DECISOES-TECNICAS-V1.md` | stack, runtime, API, jobs, PDF, deploy e estrutura do repositório | Base aprovada para scaffold |
| `manuais/` | manuais técnicos e de usuário da release | Planejado para fechamento da V1 |
| `casos-de-uso/` | especificações completas de fluxos reais | Em consolidação |

## Como ler

Para contexto geral:

1. `README.md`;
2. `00-VISAO-DO-PRODUTO.md`;
3. `01-PRINCIPIOS-E-ESCOPO.md`;
4. `02-USUARIOS-E-JORNADAS.md`;
5. `03-ARQUITETURA.md`;
6. `04-MODELO-DE-DOMINIO.md`.

Para implementar uma feature, consultar apenas os documentos diretamente relacionados, além das regras transversais de `AGENTS.md`.

## Status

O projeto está na fase de fundamentação. Documentos marcados como “Em consolidação” podem receber refinamentos antes do início do desenvolvimento funcional.
