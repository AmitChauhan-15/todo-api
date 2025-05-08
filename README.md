# 🛠️ Node.js Task Management API

A simple and secure **REST API** built with **Node.js**, **Express.js**, and **MongoDB** that supports **user authentication**, **task CRUD operations**, and **global error handling** using **JWT tokens**.

---

## 🚀 Features

- 🔐 **Authentication**

  - `POST /register` — Register a new user
  - `POST /login` — Login with email and password

- ✅ **Task Management**

  - `GET /tasks` — Get all tasks (Authenticated)
  - `POST /tasks` — Create a new task (Authenticated)
  - `PUT /task/:id` — Update a task by ID (Authenticated)
  - `DELETE /task/:id` — Delete a task by ID (Authenticated)

- 🛡️ **Security**
  - JWT-based authentication
  - Global error handler middleware
  - Environment configuration for secrets and DB credentials

---

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AmitChauhan-15/todo-api.git
   cd todo-api
   ```

2. **Install dependencies**

   ```bash
    npm install
   ```

3. **Set up environment variables**

   - Create a config.env file in the root directory and add the following:

   ```bash
    PORT=5000
    JWT_SECRET=your_jwt_secret
    TOKEN_EXPIRE_TIME=7d
    DB_PASSWORD=your_db_password
    DB_CONNECTION=mongodb+srv://user:<PASSWORD>@cluster.mongodb.net/todo?retryWrites=true&w=majority
   ```

4. **Run the server**
   ```bash
    npm run dev
   ```
