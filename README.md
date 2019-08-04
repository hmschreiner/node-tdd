# node-tdd
Exemplo de desenvolvimento de API em Node.js usando TDD

## Instalar dependências
```
npm install
```

## Criar container para o banco MongoDB com Docker
Execute o arquivo para gerar o container:

```
./runDocker.sh
```
*Obs.: O Docker precisa estar instalado. Instruções de como instalar o Docker em Windows, Mac e Linux, veja [este post](https://blog.umbler.com/br/containers-102-primeiros-passos-para-realizar-a-instalacao?a=7e8480pk).*

## Executando os testes
Para executar os testes unitários, use o comando:
```
mpm run test:unit
```

Para executar os testes de integração, use o comando:
```
mpm run test:integration
```

## Bônus - Ganhe até R$100 pra testar a hospedagem da Umbler!
Está procurando uma hospedagem bacana pra testar e até mesmo publicar tuas aplicações, sites e afins em alguns segundos? É só acessar [este link](http://bit.ly/CreditosNaUmbler) e ganhe até R$100 pra testar o serviço. 

## Referências
[Documentação do Express](https://expressjs.com)

[Documentação do Sinon.js](https://sinonjs.org) - módulo para uso de *stubs*, *mock* e *spy*

[Documentação do Mocha](https://mochajs.org) - módulo de execução de suites de teste

[Documentação do Chai](https://www.chaijs.com) - módulo para fazer asserções

[Documentação do SuperTest](https://github.com/visionmedia/supertest) - módulo que emula e abstrai requisições HTTP

## Observações
Este código faz parte do curso **_Desenvolvimento Back-end com Node.js_** na [Digital Inovation One](https://digitalinnovation.one).
