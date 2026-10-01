# 14 — UX e Design System

**Status:** em consolidação

## 1. Objetivo

Definir os princípios de experiência e a linguagem visual do Technolife Data Studio.

A interface deve acomodar grande capacidade técnica sem parecer complexa para quem executa tarefas rotineiras.

## 2. Princípio central

> Mostrar somente o que ajuda na ação atual.

Fluxo de complexidade:

```text
visão rápida
→ ação principal
→ detalhes quando solicitados
→ opções avançadas quando necessárias
```

## 3. Simples antes de completo

Não exibir todas as capacidades apenas porque existem.

A interface deve priorizar:

- tarefa atual;
- contexto atual;
- próxima ação;
- informação necessária.

## 4. Navegação global

A navegação principal representa grandes áreas de trabalho.

Não representa cada entidade interna.

Direção para operação:

```text
Início
Relatórios
Dashboards
```

Direção para usuários autorizados:

```text
Studio
Dados
Automações
Administração
```

A lista final poderá ser refinada conforme implementação.

## 5. Regra de navegação

```text
sidebar = domínios principais
conteúdo = visões e ações daquele domínio
```

Não criar item global para:

- Dataset;
- Field;
- Parameter;
- Resource;
- qualquer entidade técnica;

somente porque ela existe no domínio.

## 6. Separação operação × construção

Consumidor deve ver uma aplicação orientada a resultados.

Criador/Admin pode acessar áreas mais densas.

A navegação deve respeitar permissões.

## 7. Shell

O shell deve fornecer:

- sidebar;
- área principal;
- identidade;
- navegação;
- usuário;
- feedback global;
- responsividade.

O shell não deve ser recriado a cada rota.

## 8. Sidebar

Características:

- compacta;
- hierarquia clara;
- item ativo;
- separação visual entre trabalho e administração;
- perfil do usuário na base;
- colapso/responsividade quando necessário.

## 9. Cabeçalho de página

Padrão preferido:

- título;
- contexto curto;
- busca/filtro quando necessário;
- uma ação principal.

Evitar barras cheias de ações equivalentes.

## 10. Navegação secundária

Usar para subdivisões do mesmo domínio.

Exemplo:

```text
Dados
[ Fontes ] [ Datasets ]
```

ou outra composição que se mostre mais simples.

Não promover automaticamente essas visões à sidebar.

## 11. Ação principal

Cada contexto deve ter uma ação predominante clara.

Exemplos:

- Gerar relatório;
- Novo dashboard;
- Nova fonte;
- Publicar;
- Salvar.

Ações secundárias devem ter peso visual menor.

## 12. Menus contextuais

Ações raras podem ficar em menu de contexto `⋯`.

Exemplos:

- duplicar;
- arquivar;
- excluir;
- histórico;
- ações administrativas raras.

## 13. Painel lateral

Adequado para:

- edição curta;
- propriedades;
- detalhe contextual;
- criação simples;
- configuração que não exige abandonar a lista.

Requisitos:

- foco;
- fechamento por Escape quando seguro;
- aviso de alteração não salva;
- retorno de foco;
- acessibilidade.

## 14. Página dedicada

Usar quando o fluxo exige:

- muitos passos;
- composição visual;
- builder;
- dashboard;
- relatório;
- modelagem;
- grande contexto.

Não tentar encaixar tudo em modal.

## 15. Divulgação progressiva

Exemplo:

```text
Período
[ Mês anterior ]

[ Mais opções ]
  Unidade
  Categoria
  Responsável
```

Opções raras não devem competir com o caso comum.

## 16. Contexto preenche contexto

Se o sistema já sabe um valor, não pedir novamente sem necessidade.

Exemplos:

- período padrão;
- organização atual;
- Dataset selecionado;
- contexto vindo de um dashboard;
- usuário atual.

## 17. Formulários

Regras:

- labels claros;
- ajuda curta;
- defaults úteis;
- validação próxima ao campo;
- não pedir informação que pode ser inferida com segurança;
- agrupar por finalidade;
- separar configurações avançadas;
- evitar texto excessivo.

## 18. Autosave

Pode ser usado para alterações:

- simples;
- reversíveis;
- de baixo risco.

Exemplos:

- visibilidade;
- pequena preferência visual;
- alias.

Mostrar feedback.

Mudanças críticas podem exigir confirmação explícita.

## 19. Preview vivo

Builders devem refletir alterações rapidamente quando custo e segurança permitirem.

Objetivo:

```text
configurar
→ ver resultado
→ ajustar
```

sem ciclos desnecessários.

## 20. Tabelas

Tabelas devem priorizar leitura.

Regras:

- cabeçalho claro;
- alinhamento por tipo;
- truncamento somente com acesso ao conteúdo;
- paginação;
- estados vazios;
- ordenação quando disponível;
- densidade controlada;
- ações por linha discretas.

## 21. Dashboards

Devem favorecer:

- hierarquia;
- leitura rápida;
- comparação;
- investigação;
- drill-through.

Evitar “mosaico de gráficos” sem propósito.

## 22. Builders

Builders devem ter separação entre:

- biblioteca/configuração;
- área de composição;
- propriedades;
- preview.

A estrutura final dependerá de testes de uso.

## 23. Linguagem visual

Direção inicial:

- canvas claro;
- superfícies brancas;
- sidebar forte;
- azul como base institucional/produto;
- acento complementar para estado/ação;
- bordas suaves;
- sombras discretas;
- tipografia legível;
- densidade operacional moderada;
- poucos efeitos decorativos.

Valores exatos serão definidos em tokens quando o frontend começar.

## 24. Design tokens

O sistema deverá centralizar:

- cores;
- tipografia;
- spacing;
- radius;
- shadows;
- z-index;
- breakpoints;
- motion;
- tamanhos de controle.

Não espalhar valores visuais arbitrários em componentes.

## 25. Ícones

Ícones complementam texto.

Não usar ícone ambíguo sem label/tooltip adequado.

## 26. Cor

Cor nunca é o único sinal de estado.

Exemplo:

- erro = cor + ícone + texto;
- sucesso = cor + ícone/texto;
- gráfico deve preservar distinção além de cor quando possível.

## 27. Estados

Componentes devem prever:

- loading;
- empty;
- error;
- success;
- disabled;
- no permission;
- unavailable.

## 28. Feedback

Ações devem produzir feedback proporcional.

Exemplos:

- salvo;
- publicado;
- falhou;
- automação pausada;
- relatório gerado.

Não usar notificações invasivas para tudo.

## 29. Confirmação

Confirmar ações destrutivas ou de alto impacto.

Evitar confirmação para ações facilmente reversíveis.

## 30. Responsividade

Desktop é cenário importante para análise e construção.

Ainda assim:

- navegação deve funcionar em telas menores;
- leitura de dashboards deve adaptar;
- operação simples deve ser possível em mobile quando aplicável.

Builders complexos podem declarar experiência desktop prioritária.

## 31. Acessibilidade

Requisitos:

- navegação por teclado;
- foco visível;
- labels;
- semântica;
- contraste;
- aria quando necessário;
- diálogos acessíveis;
- conteúdo não dependente só de cor;
- zoom sem quebra relevante.

## 32. Tom de texto

Interface em pt-BR.

Preferir linguagem:

- clara;
- curta;
- funcional;
- sem jargão técnico quando não necessário.

Exemplo:

Preferir:
`Separar tabelas por`

em vez de:
`Field de groupBy`

## 33. Critérios de aceite

UX está alinhada quando:

1. operação comum é curta;
2. sidebar permanece enxuta;
3. áreas técnicas ficam escondidas de quem não precisa;
4. opções avançadas aparecem sob demanda;
5. preview reduz tentativa e erro;
6. ações principais são claras;
7. estados são previsíveis;
8. interface é acessível;
9. design usa tokens;
10. crescimento funcional não implica crescimento indiscriminado da navegação.
