# 🚀 Sistema de Roteirização

Monorepo com **API (NestJS + Prisma)** e **Frontend Web (React)** para gestão e otimização de rotas operacionais.

## 📌 Visão geral

Este projeto tem como objetivo:
- gerenciar entidades operacionais (clientes, veículos, rotas, etc.)
- calcular e organizar roteiros
- oferecer interface web para uso diário
- expor API estruturada para integrações futuras

Arquitetura baseada em:
- Node.js + TypeScript
- NestJS no backend
- Prisma ORM
- React no frontend
- Workspace monorepo

## 📂 Estrutura do projeto

sistema-roteirizacao/
├── apps/
│   ├── api/   → Backend (NestJS + Prisma)
│   └── web/   → Frontend (React)
├── prisma/    → schema e migrations do banco

## 🧰 Tecnologias principais

- React
- NestJS
- TypeScript
- Prisma ORM
- Node.js
- PostgreSQL

## ⚙️ Pré-requisitos

- Node.js LTS
- npm, yarn ou pnpm
- PostgreSQL

## 🔐 Variáveis de ambiente

Crie:
- apps/api/.env
- apps/web/.env

Exemplo API:
DATABASE_URL="postgresql://user:password@localhost:5432/sistema"
PORT=3001

## ▶️ Como rodar

1) Instalar dependências:
npm install

2) Migrations Prisma:
npx prisma migrate dev

3) Backend:
cd apps/api
npm run start:dev

4) Frontend:
cd apps/web
npm run dev

## 🧭 Roadmap

- autenticação
- cálculo automático de rotas
- dashboards
- integrações externas

## 🧾 Licença

Uso privado / interno.
