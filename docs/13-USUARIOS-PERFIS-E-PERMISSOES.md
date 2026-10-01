# 13 — Usuários, Perfis e Permissões

**Status:** em consolidação

## 1. Objetivo

Definir autenticação conceitual, perfis de uso e autorização do Technolife Data Studio.

A experiência deve ser simples para administrar, mas a autorização efetiva precisa ser granular e aplicada no backend.

## 2. Princípio

```text
perfil simples para configurar
+
permissões reais no backend
```

Ocultar uma opção na interface melhora UX, mas não substitui autorização.

## 3. User

User representa uma identidade autenticável da Instance.

Propriedades conceituais:

- id;
- name;
- email/login;
- status;
- role/profile;
- permissions adicionais;
- preferências;
- timestamps;
- lastLogin quando necessário.

Usuários de Sources externas não são automaticamente Users do Data Studio.

## 4. Estado do usuário

Estados candidatos:

- invited;
- active;
- disabled;
- locked quando aplicável.

Desativar deve impedir novas sessões e afetar automações conforme política definida.

## 5. Role/Profile

Role é um preset de capacidades.

Nomes finais ainda serão definidos, mas a UX deve permitir algo equivalente a:

- Consumidor;
- Criador;
- Administrador.

Esses nomes representam responsabilidade conceitual, não obrigatoriamente os nomes finais de produto.

## 6. Perfil não é segurança suficiente

Role simplifica configuração, mas a autorização real pode ser composta por Permissions.

Exemplo:

```text
Perfil: Criador
+
pode editar Reports
+
pode publicar Dashboards
-
não pode administrar Sources
```

## 7. Permission

Permission deve representar ações sobre recursos.

Exemplos:

- source.view;
- source.manage;
- dataset.view;
- dataset.manage;
- analysis.view;
- analysis.edit;
- report.view;
- report.edit;
- report.publish;
- dashboard.view;
- dashboard.edit;
- model.execute;
- automation.manage;
- user.manage.

A nomenclatura técnica será fechada na implementação.

## 8. Scope

Permissão pode ter escopo.

Exemplos:

- Instance;
- Source;
- Dataset;
- Field;
- Analysis;
- Model;
- Dashboard;
- Report;
- Automation.

O sistema não precisa expor toda granularidade na primeira UX, mas a arquitetura deve comportá-la.

## 9. Field-level access

Alguns Fields podem ser restritos.

Exemplo:

```text
Dataset: Funcionários
- Nome: permitido
- Departamento: permitido
- Salário: restrito
```

Uma Analysis publicada não pode contornar isso.

## 10. Row-level restrictions

Podem limitar registros.

Exemplo:

```text
usuário regional
→ region_id = região autorizada
```

Essa restrição deve ser aplicada pelo backend antes de devolver dados.

Não confiar no filtro da interface.

## 11. Presets e personalização

UX administrativa preferida:

```text
Perfil
[ Criador ]

[ Personalizar permissões ]
```

A maioria dos usuários usa presets.

Configuração granular aparece somente quando necessário.

## 12. Delegação

Um usuário não deve poder conceder privilégios acima dos próprios limites sem autorização específica.

Exemplo:

- Criador não transforma outro usuário em Administrador;
- gestor limitado a uma área não concede acesso global.

## 13. Publicação

Editar e publicar podem ser permissões diferentes.

Isso permite fluxo:

```text
Criador edita
→ responsável revisa
→ publica
```

A primeira versão pode simplificar, mas o domínio não deve impedir essa evolução.

## 14. Execução

Para executar Model, o backend valida:

- User ativo;
- acesso ao Model;
- acesso às Analyses;
- acesso ao Dataset;
- acesso aos Fields;
- row restrictions;
- Parameters permitidos.

## 15. Dashboard

Permissão para abrir Dashboard não implica acesso irrestrito a todos os dados da Source.

Cada consulta continua submetida à autorização.

## 16. Automations

Automation exige contexto de autorização explícito.

Quando o owner perde acesso:

- Automation deve ser reavaliada;
- não continuar usando privilégios antigos silenciosamente;
- pode ser pausada ou transferida por administrador conforme política futura.

## 17. Sessão

Direção arquitetural:

- sessão segura;
- cookies protegidos;
- expiração;
- rotação quando necessário;
- logout;
- invalidação após desativação;
- proteção CSRF conforme stack.

## 18. Convite e criação

Fluxo candidato:

```text
Administrador
→ Novo usuário
→ nome/e-mail
→ perfil
→ permissões opcionais
→ convite/ativação
```

A forma final depende da autenticação escolhida.

## 19. Recuperação de acesso

Se login local for utilizado, recuperação de senha deve existir.

Não armazenar senha reversível.

## 20. SSO

SSO pode ser evolução futura.

A arquitetura não deve depender dele na primeira versão.

## 21. Auditoria

Eventos candidatos:

- login;
- falha de login relevante;
- usuário criado;
- perfil alterado;
- permissão alterada;
- usuário desativado;
- Source alterada;
- segredo substituído;
- Model publicado;
- Automation alterada.

## 22. Interface administrativa

Usuários devem ser administrados em interface simples:

- busca;
- estado;
- perfil;
- última atividade quando útil;
- ações contextuais;
- painel lateral para edição curta;
- permissões avançadas sob demanda.

## 23. Critérios de aceite

A camada está alinhada quando:

1. autorização ocorre no backend;
2. Role simplifica administração;
3. Permissions podem restringir casos especiais;
4. Field e linha podem ser protegidos;
5. publicação pode ser controlada;
6. usuário desativado perde acesso;
7. Automation não mantém privilégio fantasma;
8. UI não apresenta ações impossíveis;
9. delegação respeita limites;
10. auditoria cobre alterações sensíveis.
