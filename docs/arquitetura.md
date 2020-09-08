### Scripts do package.json

| Comando          | Descrição                                        |
| ---------------- | ------------------------------------------------ |
| dev:server       | inicia o ts-node-dev                             |
| test             | roda os testes em modo silent                    |
| test:verbose     | roda os testes mas mostrando os erros            |
| test:unit        | roda os testes unitários com watch               |
| test:integration | roda os testes de integração com watch           |
| test:staged      | roda os testes somente nos arquivos relacionados |
| typeorm          | adaptação para usar a cli do typeorm             |
| test:ci          | roda os testes gerando a pasta coverage          |

### Sistema de pastas

* Src: source da api
  * infra
  * domain
  * data
  * main
  * presentation
  * utils


### Premissas e Responsábilidades
* Infra:
  * Responsável por lidar com as bibliotecas usadas no sistema
  * Local onde utilizamos os métodos vindos das bibliotecas
* Domain:
  * Local onde ficam nossos casos de uso
  * Local onde definimos o protocolo a ser usado pelo nosso Data Layer
* Data:
  * Local onde implementamos o protocolo definido no Domain Layer
  * Local onde capturamos o resultado obtido no Infra Layer
* Main:
  * Local onde instanciamos as classes para poder trabalhar com abstrações nos outros layers
  * Local onde fazemos a composição dos nossos objetos
  * Local onde definimos nossos middlewares
  * Local onde definimos nossas rotas
* Presentation:
  * Local onde definimos nosso controller, ponto de entrada da rota
* Utils:
  * Layer responsável pelo conjunto de ferramentas que podem auxiliar outros layers


### Pontos a serem observados
* Para o desenvolvimento da api foi utilizado TDD
* A estrutura utilizada tem como objetivo deixar mais desacoplado possível o projeto a fim de deixar o código mais claro e fácil de dar manutenção
* Tratamento de erros são feitos no controller nesse projeto, então erros que possam vir a ocorrer serão repassados ao controller.
* Foram utilizados testes de integração e unitários
* Testes de inserção no banco são feitos no banco desafio_tests
 