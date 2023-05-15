# Boas-vindas ao repositório do projeto Talker Manager! 🚀


# O que foi desenvolvido? 👩‍🎓

  Desenvolvi uma aplicação de cadastro de talkers (palestrantes) em que é possível cadastrar, visualizar, pesquisar, editar e excluir informações. Para isso:
  1. Criei uma API com Node e Express de um `CRUD` (**C**reate, **R**ead, **U**pdate e **D**elete) de palestrantes (talkers);
  2. Desenvolvi alguns endpoints que irão ler e escrever em um arquivo utilizando o módulo `fs`.
 

# Tecnologias utilizadas <a name="tecnologias"></a>
- [**Node JS**](https://nodejs.org/en/)
- [**Express**](https://expressjs.com/pt-br/)
- [**Https Status Code**](https://www.npmjs.com/package/http-status-codes)
- [**Thunder Cliente**](https://www.thunderclient.com/)
- [**Nodemon**](https://www.npmjs.com/package/nodemon)
- [**Linter**](https://eslint.org/docs/latest/)

<details>
  <summary><strong>Para Clonar e testar a aplicação</strong></summary>

1. Clone o repositório

```
git clone git@github.com:georgia-rocha/talker-manager.git
```

2. Entre na pasta do repositório que você acabou de clonar:

```
cd talker-manager
```

<details>
  <summary><strong>:whale: Rodando Projeto no Docker vs Localmente</strong></summary><br />
  
  ## Com Docker
 
  > Rode o serviço `node` com o comando `docker-compose up -d`.
  - Esse serviço irá inicializar um container chamado `talker_manager`.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it talker_manager bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`

  > Execute a aplicação com `npm start` ou `npm run dev`

  ---
  
  ## Sem Docker
  
  > Instale as dependências [**Caso existam**] com `npm install`
</details>


3. Para rodar a aplicação:

```
npm start
```

Em ambiente de desenvolvimento:
```
npm run dev
```
</details>


## Requisitos Obrigatórios 100%

- [x] 1 - Criei o endpoint GET `/talker`;
- [x] 2 - Criei o endpoint GET `/talker/:id`;
- [x] 3 - Criei o endpoint POST `/login`;
- [x] 4 - Adicionei as validações para o endpoint `/login`;
- [x] 5 - Criei o endpoint POST `/talker`;
- [x] 6 - Criei o endpoint PUT `/talker/:id`;
- [x] 7 - Criei o endpoint DELETE `/talker/:id`;
- [x] 8 - Criei o endpoint GET `/talker/search` e o parâmetro de consulta `q=searchTerm`;

## Requisitos Bônus 100%

- [x] 9 - Criei no endpoint GET `/talker/search` o parâmetro de consulta `rate=rateNumber`;
- [x] 10 - Criei no endpoint GET `/talker/search` o parâmetro de consulta `date=watchedDate`;
- [x] 11 - Criei o endpoint PATCH `/talker/rate/:id`;
- [x] 12 - Criei o endpoint GET `/talker/db`;
