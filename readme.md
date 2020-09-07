# Desafio Node
[![Author](https://img.shields.io/badge/author-CaioVieira-brightgreen)](https://github.com/cvieira850)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
# 🚧 Instalação
**Para rodar o projeto é necessário ter [Node.js](https://nodejs.org/en/download/) , [Yarn](https://yarnpkg.com/), [Docker](https://docs.docker.com/docker-for-windows/install/) e clonar o projeto**

**Instalação das dependências**

```yarn install```

# Para rodar o projeto

Primeiro rode o comando do docker

``` docker-compose up ```

Depois execute o comando

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
