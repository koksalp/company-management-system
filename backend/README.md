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

```bash
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.js
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── tests/
│
├── package.json
├── .env (this needs to be created manually)
```

---

# 📥 Installation

Install dependencies:

```bash id="install-deps"
npm install
```

---

Create environment variables (values below are just arbitrary):

```env id="env-file"
PORT=3000
DATABASE_URL="your_postgres_connection_string"
JWT_SECRET="your_secret_key"
CLIENT_URL="http://localhost:5173"
```

---

# 🧱 Database Setup (Prisma)

Generate Prisma Client:

```bash id="prisma-generate"
npx prisma generate
```

Push database schema:

```bash id="prisma-push"
npx prisma db push
```

(Optional) Seed database:

```bash id="prisma-seed"
node prisma/seed.js 100 20
```

100 → number of companies  
20 → number of products per company

---

# 🚀 Running the Server

```bash id="run-server"
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

# 🔐 Authentication Flow

1. User registers or logs in  
2. Server validates credentials  
3. JWT token is created  
4. Token stored in httpOnly cookie  
5. Middleware protects private routes  

---

# 📡 API Endpoints

Auth:

```bash id="auth-routes"
POST /auth/register
POST /auth/login
POST /auth/logout
GET /auth/me
```

Company:

```bash id="company-routes"
GET /company
POST /company
PUT /company/:id
DELETE /company/:id
```

Product:

```bash id="product-routes"
GET /product
POST /product
PUT /product/:id
DELETE /product/:id
```

---

# 🧠 Architecture

Controllers → Business logic  
Routes → API endpoints  
Middleware → Authentication  
Prisma → ORM  
PostgreSQL → Database  

(Simple layered architecture for clarity and scalability)

---

# 🧪 Tests

This project includes basic integration tests using Jest / Supertest.

Tests cover:

- Authentication flow (register, login, logout)
- Company CRUD operations
- Product CRUD operations
- JWT cookie authentication flow

---

Run tests:

```bash id="test-run"
npm test
```

---

# ⚠️ Test Notes

- Uses dynamic usernames (Date.now()) to avoid conflicts
- Authentication is handled via HTTP-only cookies
- Company/Product routes require authentication
- Each test runs independently

---

# 🧠 Notes

- Ensure PostgreSQL is running
- Run `npx prisma generate` after schema changes
- Use `npx prisma db push` for quick sync
- JWT_SECRET must be set in .env

---

# ✅ Status

✔ Auth system  
✔ Company CRUD  
✔ Product CRUD  
✔ Prisma integration  
✔ Database seeding  
✔ Protected routes  
✔ Basic integration tests 