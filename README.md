![N|Solid](logo_ioasys.png)

# Desafio React Native - ioasys

Este documento `README.md` tem como objetivo fornecer as informações necessárias para realização do projeto Empresas.

---

### Objetivo ###

* Desenvolver uma aplicação React Native que consuma a API `Empresas`, cujo Postman esta compartilhado neste repositório (collection).
* Você deve realizar um fork deste repositório e, ao finalizar, enviar o link do seu repositório para a nossa equipe. Lembre-se, **NÃO** é necessário criar um Pull Request para isso.
* Nós iremos realizar a avaliação e te retornar um email com o resultado.


### O que será avaliado?
* A ideia com este teste é ter um melhor entendimento das suas habilidades com Javascript e React Native. Mas de qualquer forma, um layout bonito e com boa usabilidade é **MUITO** bem vindo.
- A qualidade e desempenho do seu código
- Sua capacidade de organizar o código
- Capacidade de tomar decisões


### Escopo do Projeto
* O Login e acesso de Usuário já registrados
	* Para o login usamos padrões OAuth 2.0. Na resposta de sucesso do login a api retornará 3 custom headers:
		* `access-token`;
		* `client`;
		* `uid`;
	* Para ter acesso às demais APIs precisamos enviar esses 3 (três) custom headers para a API autorizar a requisição;
* Endpoints disponíveis:
	* Listagem de Empresas: `/enterprises`
	* Detalhamento de Empresas: `/enterprises/{id}`
	* Filtro de Empresas por nome e tipo: `/enterprises?enterprise_types={type}&name={name}`
* Gostaríamos que todos os três endpoints disponibilizados fossem utilizados.

### Dados para Teste ###
* Servidor: http://empresas.ioasys.com.br
* Versão da API: v1
* Usuário de Teste: testeapple@ioasys.com.br
* Senha de Teste : 12341234

### Informações Importantes
* Integração disponível a partir de uma collection para Postman (https://www.getpostman.com/apps) disponível neste repositório. Para utilizar a collection, vá até o postman e importe a colllection que está disponível neste repositório. Assim você terá acesso às documentação da API.
* É obrigatório utilização do React Native
* A sua aplicação deve possuir mais de uma tela. Entretanto, a disposição do conteúdo entre elas fica ao seu critério.
* O `README.md` deve conter uma pequena justificativa de cada biblioteca adicionada ao projeto como dependência.
* O `README.md` do projeto deve conter instruções de como executar a aplicação
* Independente de onde conseguiu chegar no teste, é importante compartilhar o ponto em que você parou para analisarmos.

### Dicas
* No Postman existem alguns parâmetros no header que devem ser passados em todas requests exceto na de login, eles serão retornados no endpoint de login, nos headers da request.
* Evite utilizar muitas bibliotecas que não sejam diretamente relacionadas ao build da aplicação. O uso das mesmas não esta vetado, mas seria interessante ver como você faz seus componentes :)

### Bônus
* Utilização de Redux / Redux Saga.
* Utilização de linters ou outras ferramentas de análise estática
* Testes unitários, interface, etc.

### 🛠 Como executar o projeto

```bash
# Clone este repositório
$ git clone https://github.com/isaiasmeloo/appioasys.git

# Acesse a pasta do projeto no terminal/cmd
$ cd appioasys

# Instale as dependências
$ npm install || yarn

# Dependências nativas (iOS)
$ cd ios/ && pod install && cd ..

# Execute a aplicação
$ yarn ios || yarn android

* Requer XCode >= 11.6

```

