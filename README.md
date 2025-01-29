# Gerenciador de Biblioteca

Este projeto consiste em uma API REST para gerenciamento de bibliotecas, utilizando padrões de projeto para garantir modularidade, reutilização e manutenção eficiente do código.

## Pré-requisitos:
- Node.js
- Banco de dados Sqlite
- Ferramenta de testes de API (Postman/Insomnia)
- npm ou yarn

## Instalação

1. Clone o repositório utilizando o git bash:

```bash
git clone https://github.com/seu-usuario/gerenciador-biblioteca.git
```

2. Assim que clonar o repositório, abra-o em uma IDE e rode o seguinte comando no terminal para instalar as dependências: 

```bash
  npm install
```
    
## Executando a aplicação

1. Inicie o servidor com o comando abaixo:

```bash
  npm run dev
```

2. A API estará disponível no endereço:

```http
http://localhost:3000
```

## Documentação da API

### Endpoints

A API segue o padrão REST, organizando os recursos de forma clara e escalável. Os principais endpoints são:

- **Usuários** (`/api/users`): Gerencia o cadastro e autenticação de usuários.
- **Livros** (`/api/books`): Manipula informações sobre os livros disponíveis na biblioteca.
- **Empréstimos** (`/api/loans`): Gerencia os empréstimos e devoluções de livros.
- **Administração** (`/api/admin`): Funcionalidades específicas para administradores.

### Usuários

#### Cadastrar Usuário

Cadastra um novo usuário no sistema.

```http
  POST /api/users
```

* Request: 
```JSON
{
  "nome": "Nome do Usuário",
  "email": "usuario@email.com",
  "senha": "senha123",
  "admin": true
}
```

#### Verificar se o Usuário é Admin

Para verificar se um usuário tem privilégios administrativos, o sistema realiza uma validação antes de enviar e-mails automáticos.

```js
function verificarAdmin(usuario) {
  if (!usuario.admin) {
    throw new Error("Usuário não autorizado");
  }
}
```

### Livros

#### Listar Livros

Retorna a lista de todos os livros cadastrados no sistema.

```http
  GET /api/books
```

* Response: 
```JSON
[
  {
    "id": 1,
    "titulo": "Nome do Livro",
    "autor": "Nome do Autor",
    "genero": "Gênero do Livro",
    "ano_publicacao": 2023,
    "disponivel": true
  }
]
```

#### Buscar um livro

Retorna as informações de um livro específico.

```http
  GET /api/books/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `:id` | `number` | **Obrigatório**. ID do livro a ser buscado |

#### Cadastrar um novo livro

Cria um novo livro no sistema.

```http
  POST /api/books
```

* Request: 
```JSON
{
  "titulo": "Nome do Livro",
  "autor": "Nome do Autor",
  "genero": "Gênero do Livro",
  "ano_publicacao": 2023
}
```

#### Atualizar um livro

Atualiza as informações de um livro já existente.

```http
  PUT /api/books/:id
```

#### Excluir um livro

Remove um livro do sistema.

```http
  DELETE /api/books/:id
```

## Envio de E-mails

O sistema utiliza a biblioteca `nodemailer` para enviar e-mails automáticos aos administradores sobre eventos importantes, como novas reservas, devoluções atrasadas e novas aquisições de livros.

### Configuração do Nodemailer

Para configurar o envio de e-mails, adicione suas credenciais no arquivo de configuração:

```js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seu-email@gmail.com',
    pass: 'sua-senha'
  }
});

module.exports = transporter;
```

### Envio de E-mail Apenas para Administradores

Antes de enviar um e-mail, o sistema verifica se o usuário é um administrador:

```js
function enviarEmailAdmin(usuario, mensagem) {
  verificarAdmin(usuario);
  transporter.sendMail({
    from: 'seu-email@gmail.com',
    to: 'admin@email.com',
    subject: 'Notificação do Sistema',
    text: mensagem,
  });
}
```

## Padrões de Projeto

O projeto utiliza diversos padrões de projeto para garantir qualidade e escalabilidade:

- **MVC (Model-View-Controller)**: Separação clara entre lógica de negócio, manipulação de dados e controle das rotas.
- **Repository Pattern**: Facilita a interação com o banco de dados, tornando a persistência mais flexível.
- **Singleton**: Aplicado no serviço de e-mails para garantir uma única instância do transporte de envio.
- **Dependency Injection**: Facilita a substituição de componentes, tornando o código mais testável e modular.

## Stack utilizada

**Back-end:** Node.js, Express, TypeScript, TypeORM

**Database:** Sqlite

**Autenticação:** JsonWebToken

**Email Service:** Nodemailer

## Licença

Este projeto está licenciado sob a licença [MIT](https://choosealicense.com/licenses/mit/).

