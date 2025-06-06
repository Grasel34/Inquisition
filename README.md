# Inquisition

Este repositório contém o código do backend e do frontend da aplicação. A seguir estão as instruções de instalação para cada parte do projeto.

## Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` baseado em `backend/.env.example` e defina as variáveis necessárias. Em seguida execute:

```bash
npm run dev
```

## Frontend

```bash
cd frontend
npm install
```

Crie um arquivo `.env` na pasta `frontend` definindo `VITE_API_URL` com a URL do backend e depois rode:

```bash
npm run dev
```

## Variáveis de Ambiente

- **MONGO_URI**: string de conexão com o MongoDB.
- **JWT_SECRET**: chave utilizada para assinar os tokens JWT no backend.
- **VITE_API_URL**: URL base do backend utilizada pelo frontend.

