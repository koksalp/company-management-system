# 📦 Full-Stack Company & Product Management App

This is a full-stack web application built using **React (Vite), Node.js, Express, Prisma ORM, and PostgreSQL**.

The app provides a simple system for managing companies and products with authentication and CRUD operations.

Users can:
- Register and login
- Manage companies (create, update, delete)
- Manage products (create, update, delete)
- View a dashboard with basic statistics

---

# 📁 Project Structure

This project is split into two main parts:

- frontend/ → React (Vite) application (UI layer)
- backend/ → Express API server (business logic + database)

Each part has its own detailed README with setup and usage instructions.

---

# 📌 Important Notes

- Authentication is handled using JWT
- Backend uses Prisma ORM with PostgreSQL database
- Frontend communicates with backend via REST API
- Cookies are used for session handling
- Both frontend and backend must be running for full functionality

---

# 📖 Setup Instructions

Please refer to the individual READMEs for full setup instructions:

- frontend/README.md → Frontend setup and usage
- backend/README.md → Backend setup, Prisma, and API details

---

# 🚀 Quick Overview

To run locally:

1. Start backend server
2. Start frontend server
3. Ensure environment variables are configured in both projects

---

# 🧠 Architecture

- Frontend: React (Vite) with component-based structure
- Backend: Express REST API with controller-based architecture
- Database: PostgreSQL managed via Prisma ORM
- Auth: JWT-based authentication system

---

# ✅ Status

✔ Authentication system  
✔ Company CRUD  
✔ Product CRUD  
✔ Dashboard  
✔ Full-stack integration  
