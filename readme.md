# 📕 Shopiy
API de e-commerce modular desenvolvida como projeto de estudo para praticar boas práticas de arquitetura e segurança.

## 🚀 Funcionalidades
### 🔐 Autenticação e Segurança
- Registro e Login de usuários.
- JWT (JSON Web Tokens) para sessões seguras e *stateless*.
- Cookies `httpOnly` para prevenir ataques XSS.
- Senhas protegidas com `bcrypt`.

### 🛡️ Controle de acesso por cargo

| Cargo      | Permissões                     |
| ---------- | ------------------------------ |
| 👤 `member` | 👁️ Visualizar todos os produtos |
| 👑 `owner`  | ✍️ Criar e editar produtos      |

## 🛠️ Tecnologias

| Tecnologia   | Utilidade                               |
| ------------ | --------------------------------------- |
| 🟢 Node.js    | Executar a aplicação backend            |
| 🌐 Express    | Definir rotas e middlewares da API REST |
| 🎲 SQLite     | Persistir publicações e usuários        |
| 🔐 JWT        | Autenticar requisições via token        |
| 🔑 Bcrypt     | Criptografar senhas no banco            |
| 👁‍🗨 dotenv     | Gerenciar variáveis de ambiente         |
| 👩‍💻 TypeScript | Tipar o código-fonte                    |
| 👮‍♀️ Zod        | Validar payloads de requisição          |

## 📦 Instalação e Configuração
## 🚀 Como rodar

### 1. Clone o repositório

```bash
git clone https://github.com/RafaelHenriqu/Shopiy.git
cd Shopiy
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
SERVER_PORT=2000
SECRET_KEY=sua_chave_secreta_aqui
```

### 4. Inicie o servidor

```bash
npm run dev
```

Isso inicia o servidor e cria o banco SQLite automaticamente.

## 📡 Endpoints

### Autenticação

| Método | Endpoint         | Descrição                                  | Auth  |
| ------ | ---------------- | ------------------------------------------ | :---: |
| POST   | `/auth/register` | Cria uma nova conta (sempre como `member`) |   —   |
| POST   | `/auth/login`    | Autentica e retorna o JWT                  |   —   |

### Users

| Método | Endpoint | Descrição                      | Auth  |
| ------ | -------- | ------------------------------ | :---: |
| GET    | `/user`  | Mostra os dados da sua conta   |   ✅   |
| PATCH  | `/user`  | Atualizar informações da conta |   ✅   |
| DELETE | `/user`  | Excluir conta                  |   ✅   |

### Product

| Método | Endpoint       | Descrição                        | Auth  |
| ------ | -------------- | -------------------------------- | :---: |
| GET    | `/product/`    | Lista todos os produtos          |   ✅   |
| GET    | `/product/:id` | Busca um produto pelo ID         |   ✅   |
| POST   | `/product/`    | Cadastra um novo produto         |   ✅   |
| PATCH  | `/product/:id` | Atualiza parcialmente um produto |   ✅   |
| DELETE | `/product/:id` | Remove um produto pelo ID        |   ✅   |


## 📄 Licença

Projeto desenvolvido para fins de portfólio e estudo.
