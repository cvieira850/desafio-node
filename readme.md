# Desafio Node
[![Author](https://img.shields.io/badge/author-CaioVieira-brightgreen)](https://github.com/cvieira850)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![coverage](https://img.shields.io/badge/coverage-100%25-blue)](https://jestjs.io/)

# 🚧 Instalação
**Para rodar o projeto é necessário ter [Node.js](https://nodejs.org/en/download/) , [Yarn](https://yarnpkg.com/), [Docker](https://docs.docker.com/docker-for-windows/install/) e clonar o projeto**

**Instalação das dependências**

```yarn install```

# Para rodar o projeto

Primeiro rode o comando do docker

``` docker-compose up -b```

Depois que o banco estiver online verificar se o banco está com a extensão uuid-ossp, caso não esteja instalar ela

# Linux
Caso esteja usando linux, após rodar o comando docker-compose up -b utilize esse comando

``` sudo chmod -R 777 .data/postgresql  ```

Depois rode  o comando

``` yarn typeorm migration:run ```

Por último execute o comando

``` yarn dev:server ```

## Para executar testes
* Testes unitários
  
``` yarn test:unit ```

* Testes de integração
    
``` yarn test:integration ```

* Gerar coverage

``` yarn test:ci ```

## Bibliotecas e Ferramentas

* Yarn
* Typescript
* Git
* Docker
* Jest
* Express
* Supertest
* Husky
* Lint Staged
* Eslint
* Standard Javascript Style
* Ts-node
* Pg
* Typeorm
* Moment
* Fast-glob

### Para mais informações veja a pasta ./docs