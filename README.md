# 🐾 BuscarPatas - Sistema de Adoção de Pets

Um sistema completo para gerenciar adoções de animais de estimação, conectando pets que precisam de um lar com famílias amorosas.

## 📋 Sobre o Projeto

O **BuscarPatas** é uma aplicação web desenvolvida para facilitar o processo de adoção de pets. O sistema permite cadastrar animais disponíveis, gerenciar adotantes e processar adoções de forma segura e organizada.

### ✨ Funcionalidades

- 🐕 **Gestão de Pets**: Cadastro, listagem e atualização de animais disponíveis para adoção
- 👥 **Gestão de Adotantes**: Registro e gerenciamento de pessoas interessadas em adotar
- 🤝 **Processo de Adoção**: Sistema transacional que garante a integridade das adoções
- 📊 **Status de Pets**: Controle automático do status (Disponível/Adotado)
- 🔍 **Listagem Filtrada**: Visualização apenas de pets disponíveis para adoção

## 🏗️ Arquitetura do Projeto

```
BuscarPatas/
├── backend/                 # API REST em Node.js
│   ├── src/
│   │   ├── controllers/     # Lógica de negócio
│   │   │   ├── petController.js
│   │   │   ├── adotanteController.js
│   │   │   └── adocaoController.js
│   │   ├── routes/          # Definição das rotas da API
│   │   │   ├── petRoutes.js
│   │   │   ├── adotanteRoutes.js
│   │   │   └── adocaoRoutes.js
│   │   ├── app.js           # Configuração do Express
│   │   └── server.js        # Inicialização do servidor
│   ├── prisma/
│   │   ├── schema.prisma    # Modelo do banco de dados
│   │   └── migrations/      # Migrações do banco
│   └── package.json
├── frontend/                # Interface do usuário (em desenvolvimento)
│   └── assets/
└── README.md
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **Prisma** - ORM moderno para JavaScript/TypeScript
- **PostgreSQL** - Banco de dados relacional
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📊 Modelo de Dados

O sistema utiliza três entidades principais:

### Pet
```javascript
{
  id: int (auto-increment)
  nome: string
  especie: string
  data_nascimento: Date (opcional)
  descricao: string (opcional)
  status: enum ['DISPONIVEL', 'ADOTADO']
}
```

### Adotante
```javascript
{
  id: int (auto-increment)
  nome: string
  email: string (único)
  telefone: string
  endereco: string
}
```

### Adoção
```javascript
{
  id: int (auto-increment)
  data_adocao: Date (padrão: hoje)
  pet_id: int (único - um pet por adoção)
  adotante_id: int
}
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL
- npm ou yarn

### Configuração do Backend

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/danieleksantos/BuscarPatas-sistema-de-adocao-de-pets.git
   cd BuscarPatas-sistema-de-adocao-de-pets
   ```

2. **Instale as dependências:**
   ```bash
   cd backend
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   ```bash
   # Crie um arquivo .env na pasta backend
   touch .env
   ```
   
   Adicione as seguintes variáveis no arquivo `.env`:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/buscarpatas"
   PORT=3000
   ```

4. **Configure o banco de dados:**
   ```bash
   # Execute as migrações
   npx prisma migrate dev
   
   # Gere o cliente Prisma
   npx prisma generate
   ```

5. **Inicie o servidor:**
   ```bash
   npm start
   ```

O servidor estará disponível em `http://localhost:3000`



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