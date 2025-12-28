# 🚀 Sistema de Roteirização

Monorepo contendo **API (NestJS + Prisma)** e **Frontend Web (React)** para gestão e roteirização de operações.

---

## 📂 Estrutura do projeto

sistema-roteirizacao/
│
├── apps/
│ ├── api/ → backend (NestJS + Prisma)
│ └── web/ → frontend (React)
│
├── prisma/ → schema e migrations
└── package.json → scripts principais do monorepo

yaml
Copiar código

---

## 🧰 Tecnologias principais

- Node.js
- NestJS
- Prisma ORM
- React
- TypeScript
- Monorepo (workspaces)
- PostgreSQL (padrão para Prisma)

---

## ⚙️ Pré-requisitos

- Node.js LTS
- npm, yarn ou pnpm
- Banco PostgreSQL (local ou Docker)

---

## 🔐 Variáveis de ambiente

Crie os arquivos:

apps/api/.env
apps/web/.env

yaml
Copiar código

Exemplo API:

DATABASE_URL="postgresql://user:password@localhost:5432/sistema"
PORT=3001

yaml
Copiar código

**Importante:** `.env` já está ignorado no Git.

---

## ▶️ Como rodar o projeto

### 1) Instalar dependências (monorepo inteiro)

npm install

ou
yarn

shell
Copiar código

### 2) Rodar migrations do Prisma

npx prisma migrate dev

shell
Copiar código

### 3) Rodar backend

cd apps/api
npm run start:dev

nginx
Copiar código

API padrão:
http://localhost:3001

shell
Copiar código

### 4) Rodar frontend

cd apps/web
npm start

rust
Copiar código

ou se for Vite:

npm run dev

nginx
Copiar código

Frontend padrão:
http://localhost:3000

yaml
Copiar código

---

## 🛠️ Scripts úteis

npm run lint
npm run format
npm run build

yaml
Copiar código

---

## 🗺️ Roadmap resumido

- [ ] Autenticação
- [ ] Integração mapas/rotas
- [ ] Dashboard operacional
- [ ] Importação de planilhas
- [ ] Otimização de rotas

---

## 🧾 Licença

Projeto privado / uso interno.