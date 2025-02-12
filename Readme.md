# Projeto API de gerenciamento de tarefas - Corebiz

Este projeto implementa uma API usando Node.js 20 com MySQL como banco de dados. Ele foi projetado para gerenciar tarefas de usuários.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Funcionalidades](#funcionalidades)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Documentação](#documentação)
- [Build](#instruções-de-build)
- [Desenvolvimento Local](#desenvolvimento-local)
- [Banco de dados](#banco-de-dados)
- [Testes](#instruções-de-testes)
- [Considerações Finais](#considerações-finais)
- [Próximos Passos](#próximos-passos)

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados e configurados:

- Node.js 20 (se for rodar localmente)
- MySQL 8.0 (se for rodar localmente)
- Docker

## Funcionalidades
  Registro de usuário
  Login de usuário
  Criação, edição e exclusão de tarefas
  Atribuição de tarefas a um usuário
  Conclusão de tarefas
  Exclusão de tarefas
  Listagem de tarefas com filtro (status, data, usuário)
  Documentação com Swagger

## Arquitetura do Projeto
  Foi utilizado o sequelize como ORM, dessa forma os models são mapeados para as tabelas do banco de dados.
  Validações de entrada de dados no model utilizando o sequelize-validator.
  Foi utilizado o Jest para testes.
  Foi utilizado o Swagger para documentação da API.

## Documentação

São tres documentações disponiveis:

- Documentação com Swagger (http://localhost:3000/api-docs)
- Documentação com Postman `arquivo: ./docs/collection.json`
- Arquivo api.http para testar as rotas `arquivo: ./api.http` (Necessario ter o plugin Rest Client instalado no VSCode)

## Instruções de Build

Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente.

Rode o comando:
```bash
npm install
```
**Importante:** No meu caso que estou utilizando o windows tive que setar o NODE_ENV=production ou para o ambiente que voce esta usando: (development, test, production)
```bash
export NODE_ENV=production
```
### Build

Para subir a aplicação usando docker, execute o seguinte comando no terminal:

```bash
docker-compose up -d
```


## Desenvolvimento Local
Configuração da aplicação Local
Inicie o app local: (Necessario ter o node instalado)
```bash
npm run dev
```
No .env voce devera configurar DB_HOST com o valor localhost e também as credenciais do banco de dados.

## Banco de dados

A seguir serão listados os comandos para criar o banco de dados e as tabelas.
Se atente a rodar os comandos no diretorio raiz do projeto.
Caso esteja usando o docker, rode de dentro do container.

export NODE_ENV=production

**Importante:** Aqui também é necessario setar o NODE_ENV para o ambiente que voce esta usando: (development, test, production)

A aplicação já sincroniza as tabelas automaticamente, mas caso seja necessario recriar as tabelas, rode o seguinte comando:
```bash
npm run migrate
```

Para gerar o seed, rode o seguinte comando:
```bash
npm run seed
```

Este passo é necessario para criar o usuario padrao. É com ele que voce vai criar outros usuarios, pois todas as rotas precisam de autenticação.
Caso esteja com dificuldade de rodar o seed, existe um script sql dentro de docs que voce pode rodar no seu banco de dados.


### Testes

Para rodar os testes, você pode usar o comando:

```bash
npm run test
```

Isso irá executar o `jest` para rodar os testes localmente, conforme configurado no seu projeto.

Existem alguns testes que envolvem o banco de dados, por isso foi configurado o SQlite para o teste.

## Considerações Finais

Ao subir a aplicação localmente veja se o arquivo .env esta configurado corretamente, bem como o banco sqlite com o nome de database.sqlite.
Ainda é ncessario mudar manualmente o arquivo src\database\config\config.json o valor de `host` para `localhost` ou `db` 	quando for usar o sequelize-cli para criar as tabelas e rodar os seeds para caso voce esteja usando `production`.


## Próximos Passos

- Padronização de mensagens de erro
- Maior cobertura de testes
- Não consegui resolver o problema de rodar a suite inteira dos testes. Por enquanto rodar separetamente instalando o jest globalmente.
```bash
npm install -g jest
```
```bash
npx jest src/tests/auth.test.ts 
```
```bash
npx jest src/tests/task.test.ts 
```

