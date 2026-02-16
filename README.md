# Inventory Application

A simple **Inventory Management Web Application** built with **Node.js**, **Express**, **EJS (templating)**, and **PostgreSQL** — designed to help you track and manage items (add, update, delete, view stock) from a user-friendly interface.

---

## 🧠 What This Project Does

This app provides basic inventory management capabilities, including:

- 📦 Add and manage inventory item records
- 📝 Edit item details
- 🗑️ Remove items
- 📊 View current stock and item lists
- 🔍 Form validation (via `express-validator`)
- 🛠️ Rendering dynamic views with EJS

It uses **Express.js** for server logic, **Express EJS Layouts** for templates, and connects to a **PostgreSQL** database.  
(Environment variables are managed using `dotenv`.)  

---

## 🚀 Features

✔️ Create, Read, Update, Delete inventory items  
✔️ Clean, server-rendered UI  
✔️ Form input validation  
✔️ Structured routes and controllers  
✔️ Easy to extend with authentication, RBAC, APIs, etc.

---

## 🚧 Tech Stack

| Layer | Tools & Libraries |
|-------|------------------|
| Backend | Node.js, Express |
| Views | EJS, Express EJS Layouts |
| Database | PostgreSQL (`pg`) |
| Validation | express-validator |
| Environment | dotenv |

---

## 🛠️ Getting Started

### 1. Clone the repository

```

git clone [https://github.com/Cage4D/Inventory-Application.git](https://github.com/Cage4D/Inventory-Application.git)
cd Inventory-Application

```

### 2. Install dependencies

```

npm install

```

### 3. Setup Environment Variables

Create a `.env` file in the root directory with:

```

PORT=3000
DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<dbname>

```

> Replace `<user>, <password>, etc.` with your PostgreSQL credentials.

### 4. Run the app

```

npm start

```

Open your browser and visit:  
👉 http://localhost:3000

---

## 📂 Project Structure

```

├── controllers/        # Route logic controllers
├── data/               # Database interactions or models
├── public/             # Static assets (CSS/JS/images)
├── routes/             # Application routes
├── views/              # EJS templates
├── app.js              # Main server entry point
└── package.json

```

---

## 👤 Author

**Cage4D**

