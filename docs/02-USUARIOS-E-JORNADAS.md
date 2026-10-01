# 02 — Usuários e Jornadas

**Status:** em consolidação

## 1. Objetivo

Definir quem utiliza o Data Studio e como a experiência deve mudar conforme responsabilidade e autorização.

Os perfis descritos aqui são conceituais. Os nomes finais de papéis de acesso serão definidos no documento específico de permissões.

## 2. Tipos de uso

O produto possui três responsabilidades principais de uso, que podem coexistir na mesma pessoa.

### Consumidor

Pessoa que consulta informação preparada.

Exemplos:

- diretor;
- gestor;
- responsável financeiro;
- coordenador;
- analista que apenas consome determinado dashboard.

### Criador

Pessoa que prepara análises e formas de apresentação.

Exemplos:

- analista de dados;
- profissional de TI;
- responsável por controladoria;
- usuário avançado autorizado.

### Administrador

Pessoa responsável pela configuração e governança da instância.

Exemplos:

- equipe de TI;
- suporte técnico;
- administrador do produto.

Uma conta pode acumular responsabilidades conforme permissão.

## 3. Consumidor

### Objetivo

Obter informação com pouca fricção.

### Não precisa conhecer

- fonte;
- conector;
- dataset;
- schema;
- chave técnica;
- query;
- estrutura interna do modelo.

### Ações comuns

- abrir o sistema;
- localizar uma análise, relatório ou dashboard;
- informar parâmetros;
- gerar;
- visualizar;
- filtrar dentro dos limites publicados;
- exportar;
- consultar resultados anteriores quando permitido.

### Experiência esperada

```text
Relatório financeiro mensal

Período
[ Mês anterior ]

Unidade
[ Todas ]

[ Gerar relatório ]
```

A interface não deve mostrar configurações que foram definidas previamente pelo Criador.

## 4. Criador

### Objetivo

Transformar dados disponíveis em análises reutilizáveis.

### Responsabilidades possíveis

- selecionar dataset;
- selecionar campos;
- definir labels;
- configurar filtros;
- definir parâmetros;
- criar agrupamentos;
- criar métricas;
- criar cálculos suportados;
- escolher tabelas;
- inserir indicadores;
- inserir gráficos;
- montar relatório;
- montar dashboard;
- montar apresentação;
- testar com dados;
- publicar para consumidores autorizados.

### Experiência

O Studio pode ser mais denso que a operação, porém deve continuar orientado a tarefas.

Evitar transformar o criador em programador quando uma configuração visual ou estruturada for suficiente.

## 5. Administrador

### Objetivo

Manter a instância segura, funcional e governada.

### Responsabilidades possíveis

- identidade da organização;
- usuários;
- perfis;
- permissões;
- fontes;
- credenciais;
- conectores;
- publicação de datasets;
- restrições;
- automações;
- configuração de distribuição;
- políticas da instância;
- diagnóstico permitido;
- auditoria.

### Regra

Administração não deve dominar a navegação de quem não possui essas responsabilidades.

## 6. Jornada — abrir dashboard

```text
login
→ Início
→ Dashboards disponíveis
→ selecionar
→ informar parâmetro quando necessário
→ visualizar
→ interagir dentro das capacidades publicadas
```

O dashboard deve possuir título, contexto e estado de atualização claros.

## 7. Jornada — gerar relatório

```text
login
→ Relatórios
→ selecionar relatório
→ informar parâmetros
→ gerar prévia
→ revisar
→ exportar PDF
```

Quando um parâmetro puder ter padrão inteligente, o sistema deve utilizá-lo.

Exemplo:

```text
Período
[ Mês anterior ]
```

é preferível a obrigar duas datas em toda execução.

## 8. Jornada — gerar apresentação

Direção:

```text
login
→ apresentação/modelo disponível
→ parâmetros
→ gerar
→ prévia/resultado
→ exportar
```

A experiência detalhada será consolidada no documento de apresentações.

## 9. Jornada — criar análise

Direção conceitual:

```text
Studio
→ Nova análise
→ escolher Dataset
→ selecionar campos
→ definir filtros e parâmetros
→ definir agrupamentos/métricas
→ validar resultados
→ salvar
```

A análise deve existir independentemente do relatório visual quando fizer sentido, permitindo reutilização.

## 10. Jornada — criar relatório

```text
Studio
→ novo relatório
→ escolher análise ou fonte de dados publicada
→ adicionar blocos
→ configurar apresentação
→ definir parâmetros expostos
→ pré-visualizar
→ salvar
→ publicar
```

Os detalhes do builder serão definidos no documento de relatórios.

## 11. Jornada — criar dashboard

```text
Studio
→ novo dashboard
→ adicionar indicadores/gráficos/tabelas
→ associar análises
→ configurar interações permitidas
→ revisar
→ publicar
```

Não exigir que o Criador reconstrua a mesma regra de dados para cada bloco quando uma análise reutilizável puder ser compartilhada.

## 12. Jornada — configurar fonte

```text
Administração
→ Fontes
→ Nova fonte
→ escolher tipo de conector
→ informar configuração
→ armazenar credencial de forma segura
→ testar conexão
→ descobrir/mapear recursos
→ publicar Dataset
```

O navegador nunca deve recuperar o segredo armazenado em texto reutilizável após a configuração.

## 13. Jornada — automatizar

```text
modelo publicado
→ Criar automação
→ parâmetros
→ agenda
→ formato de saída
→ destinatários
→ revisar
→ ativar
```

A automação deve mostrar:

- próxima execução;
- estado;
- última execução;
- falha quando houver;
- ação de pausar/desativar;
- histórico proporcional ao escopo definido.

## 14. Navegação

A navegação global deve representar áreas de trabalho, não entidades técnicas.

Direção inicial de operação:

```text
Início
Relatórios
Dashboards
```

A lista final dependerá da definição das jornadas.

Direção de Studio/Administração:

```text
Studio
Dados
Automações
Usuários
Configurações
```

Essa estrutura ainda será refinada no documento de UX. O princípio já é obrigatório: manter poucos destinos globais e colocar subdivisões dentro do contexto.

## 15. Contexto conhecido

O sistema deve reutilizar contexto já conhecido.

Exemplos:

- se a execução foi iniciada dentro de um cliente, não pedir o cliente novamente sem necessidade;
- se um dashboard abriu uma lista filtrada, preservar o filtro;
- se o relatório já possui período padrão, inicializá-lo;
- se o usuário não possui acesso a uma opção, não apresentar escolha impossível.

## 16. Divulgação progressiva

Padrão:

```text
ação comum
→ detalhes
→ opções avançadas
```

Exemplo:

```text
Período
[ Mês anterior ]

[ Mais opções ]

[ Gerar ]
```

“Mais opções” pode revelar parâmetros raros sem sobrecarregar o fluxo comum.

## 17. Estados de interface

Toda jornada importante deve prever:

- loading;
- vazio;
- sucesso;
- erro recuperável;
- erro de permissão;
- indisponibilidade da fonte;
- execução em andamento quando aplicável.

Evitar mensagens técnicas para consumidor final.

## 18. Critério de sucesso

Uma jornada está adequada quando:

1. o usuário entende o próximo passo;
2. conceitos internos não aparecem sem necessidade;
3. a ação principal é fácil de localizar;
4. contexto conhecido reduz preenchimento manual;
5. permissões removem caminhos inválidos;
6. falhas possuem orientação funcional;
7. voltar ou navegar preserva contexto útil;
8. configurações avançadas não atrapalham o caso comum.
