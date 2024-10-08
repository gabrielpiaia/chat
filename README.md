# Chat Application

Este é um projeto de uma aplicação de chat em tempo real, utilizando WebSockets para comunicação entre clientes e um servidor backend. O sistema permite que usuários se conectem, enviem mensagens e vejam quando outros usuários entram e saem do chat.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Express**: Framework web para Node.js que simplifica o desenvolvimento de aplicações e APIs.
- **WebSocket**: Protocolo de comunicação que permite a troca de dados em tempo real entre o servidor e os clientes.
- **dotenv**: Biblioteca que carrega variáveis de ambiente a partir de um arquivo `.env`.
- **HTML/CSS**: Linguagens de marcação e estilo usadas para estruturar e estilizar o frontend da aplicação.
- **JavaScript**: Linguagem de programação utilizada para implementar a lógica do cliente e do servidor.

## Estrutura do Projeto

- **backend/**: Contém o servidor WebSocket e a lógica do backend.
  - `server.js`: Arquivo principal do servidor que gerencia as conexões WebSocket.
- **frontend/**: Contém o cliente da aplicação de chat.
  - `index.html`: Arquivo HTML que serve como interface do usuário.
  - `app.js`: Lógica do cliente, incluindo gerenciamento de WebSocket e manipulação de mensagens.

