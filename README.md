# Inquisition

Este projeto reúne o backend e o frontend de uma aplicação web para gerenciamento de pedidos e fila digital. O objetivo é prover autenticação de usuários, cadastro de pedidos e acompanhamento de fila de forma simples.

## Estrutura do projeto

```
backend/   # API em Node.js/Express
frontend/  # Aplicação React + Vite
```

O diretório `backend` expõe a API REST utilizada pelo frontend. Em `frontend` ficam os componentes React que consomem essas rotas.

### Como backend e frontend interagem

O frontend faz requisições HTTP para a API no backend utilizando a variável `VITE_API_URL`. Todos os endpoints da API estão sob o caminho `/api`. É necessário que as duas aplicações estejam usando a mesma configuração de origem (`CORS_ORIGIN`) para que o navegador permita as chamadas.

## Executando em modo de desenvolvimento

Clone o repositório e instale as dependências de cada parte:

```bash
cd backend && npm install
cd ../frontend && npm install
```

Crie o arquivo `.env` no backend com base no `.env.example` e defina as variáveis abaixo. No frontend, crie um `.env` contendo `VITE_API_URL` com o endereço do backend.

Para iniciar o ambiente de desenvolvimento abra dois terminais:

```bash
# terminal 1 - backend
cd backend
npm run dev

# terminal 2 - frontend
cd frontend
npm run dev
```

## Executando em produção

No backend, utilize `npm start` após configurar as variáveis de ambiente. Para o frontend, gere os arquivos estáticos com `npm run build` e sirva o conteúdo da pasta `dist` em qualquer servidor estático ou usando `npm run preview` para um teste local.

## Variáveis de ambiente

| Variável       | Descrição                                                             | Padrão       |
| -------------- | --------------------------------------------------------------------- | ------------ |
| `MONGO_URI`    | String de conexão com o MongoDB                                       | —            |
| `JWT_SECRET`   | Chave para assinar os tokens JWT no backend                           | —            |
| `PORT`         | Porta onde o backend será executado                                   | `3000`       |
| `CORS_ORIGIN`  | Origem aceita pelo CORS (ex.: `http://localhost:5173`)                | —            |
| `VITE_API_URL` | URL base do backend utilizada pelo frontend (ex.: `http://localhost:3000/api`) | — |

Defina todas essas variáveis no `.env` do backend ou do frontend conforme necessário.

## Contribuindo

1. Faça um fork do projeto e crie uma branch para sua feature.
2. Siga o padrão de commits existente no histórico.
3. Envie um pull request descrevendo suas mudanças.
4. Assim que testes automatizados forem adicionados, eles poderão ser executados com `npm test` em cada parte do projeto.

Fique à vontade para abrir issues com dúvidas ou sugestões.

