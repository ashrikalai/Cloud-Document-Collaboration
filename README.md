# Cloud-Document-Collaboration

This project is the backend server for a **Cloud Document Collaboration System** that allows users to register, login, create documents, edit and rename them securely. It includes JWT-based authentication and user-specific document handling.

---

## 🚀 Features

- ✅ User Registration & Login (with JWT auth)
- ✅ Create, Retrieve, Update, and Rename Documents
- ✅ Access control: only owners can modify their documents
- ✅ MongoDB for persistent storage
- ✅ Express middleware for route protection

---

## 🛠️ Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Backend framework
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB
- **JWT** – JSON Web Token for secure authentication
- **bcrypt** – For password hashing
- **dotenv** – Environment configuration

---
## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/ashrikalai/Cloud-Document-Collaboration.git
cd Cloud-Document-Collaboration
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root directory and fill it like below:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
PORT=5000
```

> 💡 You can use [MongoDB Compass](https://www.mongodb.com/products/compass) to host your database.

---

## ▶️ Running the Server

```bash
npm start
```

Server runs at: `http://localhost:5000`

---

## 🧪 API Endpoints

### 🔐 Auth

- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – Login and receive JWT
- `GET /api/auth/users` – Get all registered users (for testing)

### 📄 Documents

- `POST /api/documents/create` – Create new document
- `GET /api/documents/mine` – List your documents
- `GET /api/documents/:id` – Get specific document by ID
- `PUT /api/documents/:id` – Update title/content
- `PATCH /api/documents/:id/rename` – Rename document
- `GET /api/documents/` – List all documents (title + ID)

> 🔒 Auth token required for all protected routes.

---

## 📁 Project Structure

```
Cloud-Document-Collaboration/
│
├── models/
│   ├── User.js
│   └── Document.js
│
├── routes/
│   ├── auth.js
│   └── documents.js
│
├── middleware/
│   └── auth.js
│
├── .env
├── index.js
└── package.json
```

---

## 👤 Author
**Name**: Ashritha G 
**GitHub**: [ashrikalai](https://github.com/ashrikalai)

---
