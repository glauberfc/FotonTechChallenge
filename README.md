# Foton Challenge
 > Desafios separaram desistentes de persistentes
 
 ## Instalação
 Instale o MongoDB executando o seginte comando no terminal: 
 `brew install mongodb`
 
Após a instalação abra o terminal e digite o seguinte comando para utilizar o shell do MongoDB:
`mongo`

Crie o banco de dados utilizando o shell do MongoDB:
`use FotonTechChallengeDB`

Abra o terminal na pasta *server* que está dentro do projeto instale as depências executando:
`yarn` ou `npm install`

Ainda na pasta *server* inicie a conexão com o MongoDB:
`yarn mongod`

Abra uma nova aba no terminal e execute o seguinte comando para iniciar o servidor:
`yarn start`

Após iniciar o servidor abra uma nova aba do terminal na pasta *frotend* que está dentro do projeto e instale as dependências executando:
`yarn` ou `npm install`

Após instalar as dependências execute o seguinte comando para iniciar a aplicação:
`react-native run-ios`

Caso a aplicação já tenha sido instalada uma vez no dispositivo ou simulador pode-se executar apenas `yarn start` ao invés do comando a cima
