# 📦 Backend API - Company & Product Management System

This is the backend service for a full-stack Company & Product Management application.

Built with Node.js, Express, Prisma ORM, PostgreSQL, and JWT authentication.

It handles authentication, company management, and product management with full CRUD operations.

---

# ⚙️ Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication

---

# 📁 Project Structure

backend/
  prisma/
    schema.prisma
    seed.js

  src/
    controllers/
    routes/
    middlewares/
    utils/
    app.js
    server.js

  tests/

  package.json
  .env

---

# 📥 Installation

## Install dependencies

npm install

---

## Create environment variables

Create a .env file in backend root (values below are arbitrary):

PORT=3000  
DATABASE_URL="your_postgres_connection_string"  
JWT_SECRET="your_secret_key"  
CLIENT_URL="http://localhost:5173"

---

# 🧱 Database Setup (Prisma)

## Generate Prisma Client

This creates the Prisma Client based on your schema.prisma

npx prisma generate

---

## Push database schema

This creates tables in PostgreSQL.

npx prisma db push

---

## (Optional) Seed database

Generates fake data for testing.

node prisma/seed.js 100 20

- 100 → number of companies
- 20 → number of products per company

---

# 🚀 Running the Server

Start development server:

npm run dev

Server runs at:
http://localhost:3000 (now you should be seeing something like that)

---

# 🔐 Authentication Flow

1. User registers or logs in  
2. Server validates credentials  
3. JWT token is created  
4. Token stored in httpOnly cookie  
5. Middleware protects private routes  

---

# 📡 API Endpoints

## Auth:
- POST /auth/register
- POST /auth/login
- POST /auth/logout
- GET /auth/me

## Company:
- GET /company
- POST /company
- PUT /company/:id
- DELETE /company/:id

## Product:
- GET /product
- POST /product
- PUT /product/:id
- DELETE /product/:id

---

# 🧠 Architecture

- Controllers → business logic
- Routes → API endpoints
- Middleware → authentication checks
- Prisma → database ORM
- PostgreSQL → database

(Simple layered architecture for clarity and scalability)

---

# 🧪 Tests

This project includes basic integration tests using Jest / Supertest.

Tests cover:
- Authentication flow (register, login, logout)
- Company CRUD operations
- Product CRUD operations
- JWT cookie-based authentication flow

---

## ▶️ Run tests

npm test

---

## ⚠️ Test Notes

- Tests use dynamically generated usernames to avoid conflicts (Date.now() based usernames)
- Authentication is handled via HTTP-only cookies
- Company/Product routes require valid authentication
- Each test runs independently and avoids shared state issues

---

# 🧠 Notes

- Ensure PostgreSQL or Neon DB is running
- Run prisma generate after schema changes
- Use db push for quick sync
- JWT_SECRET must be set in env

---

# ✅ Status

✔ Auth system  
✔ Company CRUD  
✔ Product CRUD  
✔ Prisma integration  
✔ Database seeding  
✔ Protected routes  
✔ Test coverage (basic integration tests)