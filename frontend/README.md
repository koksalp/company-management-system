# 📦 Frontend - Company & Product Management App

This is the frontend of a full-stack application built with **React (Vite)**.  
It connects to a Node.js + Express backend and provides UI for authentication, companies, and products management.

---

# ⚙️ Tech Stack

- React (Vite)
- React Router
- Context API
- Axios API
- CSS Modules

---

# 📥 Installation

## Install dependencies

npm install

---

## Environment Setup

Create a `.env` file in the frontend root:

VITE_BASE_URL=http://localhost:3000 (backend api url)

---

# 🚀 Running the App

Start development server:

npm run dev

Frontend runs at:

http://localhost:5173 (now you should be seeing something like that)

---

# 🔐 Features 

- User Login / Register
- JWT authentication (httpOnly cookie based)
- Protected routes
- Company CRUD (create, update, delete, list)
- Product CRUD (create, update, delete, list)
- Dashboard with dynamic stats

---

# 🧱 Architecture Overview

- Pages: UI screens (Login, Register, Dashboard, Company, Product)
- Components: Reusable UI elements
- Context: Global state management (Auth, Toast, Data)
- Routes: Protected routing logic
- Services: API calls to backend

---

# ⚠️ Notes

- Backend must be running before starting frontend
- Ensure backend URL is correctly set in `.env`
- Cookies must be enabled for authentication to work 