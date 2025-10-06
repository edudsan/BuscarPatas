# 🐾 Buscar Patas - Sistema de Adoção de Pets

Bem-vindo ao Buscar Patas, uma aplicação web completa para gerenciamento de abrigos de animais. Este projeto foi desenvolvido como parte do curso **Desenvolvimento Full Stack Básico (DFS-2025.3)**.

O objetivo principal é modernizar o processo de adoção, substituindo controles manuais por um sistema eficiente que facilita o cadastro de pets e a conexão entre eles e seus futuros lares.

## ✨ Funcionalidades Principais

-   **🐕 Gestão de Pets:** CRUD completo para cadastrar, visualizar, atualizar e deletar pets.
-   **👥 Gestão de Adotantes:** CRUD para gerenciar os dados de potenciais adotantes.
-   **🤝 Processo de Adoção:** Sistema para registrar adoções, atualizando automaticamente o status dos pets.
-   **🔍 Filtragem Avançada:** Busque pets por espécie, status, tamanho e personalidade.
-   **📊 Autenticação e Segurança:** Sistema de autenticação baseado em JWT com papéis (roles) de `USER` e `ADMIN` para proteger rotas sensíveis.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

-   **Backend:**
    -   Node.js
    -   Express.js
    -   Prisma ORM
    -   PostgreSQL
    -   JSON Web Tokens (JWT)
    -   Bcrypt.js
-   **Frontend:**
    -   ReactJS
-   **Ferramentas de Desenvolvimento:**
    -   Nodemon
    -   Insomnia (para testes de API)

## 🚀 Começando

Siga os passos abaixo para configurar e executar o ambiente de desenvolvimento do backend.

### Pré-requisitos

-   Node.js (versão 18.18 ou superior)
-   NPM
-   PostgreSQL instalado e rodando na sua máquina.

### Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/danieleksantos/BuscarPatas-sistema-de-adocao-de-pets.git
    cd BuscarPatas-sistema-de-adocao-de-pets
    ```

2.  **Navegue até a pasta do backend:**
    ```bash
    cd backend
    ```

3.  **Crie o arquivo de ambiente:**
    Crie um arquivo chamado `.env` na pasta `backend` e adicione a sua string de conexão com o banco de dados.
    
    *Exemplo de `.env`:*
    ```env
    DATABASE_URL="postgresql://SEU_USER:SUA_SENHA@localhost:5432/buscar_patas_db?schema=public"
    JWT_SECRET="seu_segredo_super_secreto_pode_ser_qualquer_coisa"
    ```

4.  **Instale as dependências:**
    ```bash
    npm install
    ```

5.  **Aplique as migrações do banco de dados:**
    Este comando irá criar todas as tabelas necessárias no seu banco de dados.
    ```bash
    npx prisma migrate dev
    ```

### ▶️ Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento (com reinício automático), use:
```bash
npm start
```
O servidor estará disponível em `http://localhost:3000`

## 🏗️ Arquitetura do Projeto

```
BuscarPatas-sistema-de-adocao-de-pets/
│
├── backend/
│   │   .env               # Variáveis de ambiente (senhas, chaves de API, etc.)
│   │   .gitignore         # Arquivos e pastas ignorados pelo Git
│   │   package.json       # Dependências e scripts do projeto backend
│   │
│   ├── prisma/
│   │   │   schema.prisma    # Definição do esquema do banco de dados (tabelas e colunas)
│   │
│   └── src/
│       │   app.js             # Configuração principal do Express 
│       │   server.js          # Arquivo que inicia o servidor
│       │
│       ├── controllers/
│       │   │   adocaoController.js
│       │   │   adotanteController.js
│       │   │   petController.js
│       │
│       └── routes/
│           │   adocaoRoutes.js
│           │   adotanteRoutes.js
│           │   petRoutes.js
│
├── frontend/
│   └── assets/
│       │   DER.png            # Diagrama Entidade-Relacionamento
│       │   logo.png           # Logo do projeto
│
└── README.md                  # Documentação principal do projeto
```

## 📚 Documentação da API

Abaixo estão os principais endpoints disponíveis na API.

*(Rotas marcadas como `ADMIN` exigem um Bearer Token de um usuário com `role: 'ADMIN'`)*

| Endpoint | Método | Descrição | Protegida? |
| :--- | :--- | :--- | :--- |
| `/auth/register` | `POST` | Registra um novo adotante (role `USER`). |  Pública |
| `/auth/login` | `POST` | Autentica um usuário e retorna um token JWT. | Pública |
| `/pets` | `GET` | Lista todos os pets com filtros (`?tamanho=...`). | Pública |
| `/pets/disponiveis` | `GET` | Lista todos os pets com status `DISPONIVEL`. | Pública |
| `/pets/adotados` | `GET` | Lista todos os pets com status `ADOTADO`. | Pública |
| `/pets` | `POST` | Cadastra um novo pet. | `ADMIN` |
| `/pets/bulk` | `POST` | Cadastra múltiplos pets de uma vez. | `ADMIN` |
| `/pets/:id` | `PATCH` | Atualiza parcialmente os dados de um pet. | `ADMIN` |
| `/pets/:id` | `DELETE` | Deleta um pet. | `ADMIN` |
| `/adotantes` | `GET` | Lista todos os adotantes. | `ADMIN` |
| `/adotantes` | `POST` | Cadastra um novo adotante. | `ADMIN` |
| `/adotantes/:id` | `PATCH` | Atualiza parcialmente um adotante. | `ADMIN` |
| `/adotantes/:id` | `DELETE` | Deleta um adotante. | `ADMIN` |
| `/adocoes` | `GET` | Lista todos os registros de adoção. | `ADMIN` |
| `/adocoes` | `POST` | Cria um novo registro de adoção. | `ADMIN` |
| `/adocoes/:id` | `PATCH` | Atualiza um registro de adoção. | `ADMIN` |
| `/adocoes/:id` | `DELETE` | Deleta um registro de adoção. | `ADMIN` |

## 🗺️ Modelo do Banco de Dados (DER)

Abaixo está o Diagrama de Entidade-Relacionamento que representa a estrutura do nosso banco de dados.

![Diagrama de Entidade-Relacionamento](./frontend/assets/DER.png)

## 👨‍💻 Autores

**Alicia Estefany** - [user-git](https://github.com/user-git)

**Daniele Santos** - [danieleksantos](https://github.com/danieleksantos)

**Edilton Junior** - [ediltonx](https://github.com/ediltonx)

**Eduardo Schuindt** - [edudsan](https://github.com/edudsan)

**J. Garreto** - [user-git](https://github.com/user-git)

**Vivian Maria** - [user-git](https://github.com/user-git)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!

🐾 **Ajude um pet a encontrar um lar!**

## 📅 Cronograma e Entregas do Projeto

Esta seção documenta o progresso das entregas das principais frentes de desenvolvimento do sistema BuscarPatas.

### ✅ Entrega 1: Backend
**Prazo Final:** 05/10/2025

| Funcionalidade / Tarefa | Responsável | Status |
| :---------------------- | :---------- | :------- |
|Elaboração do plano de construção|Daniele|✅|
|Gerenciamento de membros e atividades|Daniele|✅|
|Execução de testes e correções de BUGs|Daniele|✅|
| Definição do Schema do Banco de Dados (`schema.prisma`) | Eduardo e Daniele | ✅ |
| Criação do Modelo de Dados `Pet` | Eduardo | ✅ |
| Criação do Modelo de Dados `Adotante` | Eduardo | ✅ |
| Criação do Modelo de Dados `Adocao` para registrar o histórico | Eduardo | ✅ |
| Implementação dos `enums` para Status, Tamanho e Personalidade | Eduardo e Daniele | ✅ |
| Estruturação das rotas da API (Pets, Adotantes, Adoção, Auth) | Eduardo | ✅ |
|Elaboração do README|Edilton|✅|

<br>

### ⏳ Entrega 2: Frontend
**Prazo Final:** 25/10/2025

| Funcionalidade / Tarefa | Responsável | Status |
| :---------------------- | :---------- | :------- |
|A definir|A definir|A definir|