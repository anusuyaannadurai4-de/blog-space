# BlogSpace – Full-Stack Blogging Platform

**BlogSpace** is a complete, production-style blogging platform where people can
register, log in, write and publish posts, edit or delete their own posts, and
join the conversation through comments.

> **Share your ideas. Inspire others.**

This project is designed to be **beginner-friendly**: plain JavaScript (no
TypeScript), regular CSS (no Tailwind), clear folder separation between frontend
and backend, and small, well-commented files.

---

## Table of Contents

1. [Project Introduction](#1-project-introduction)
2. [Features](#2-features)
3. [Technology Stack](#3-technology-stack)
4. [Folder Structure](#4-folder-structure)
5. [MongoDB Setup](#5-mongodb-setup)
6. [Environment Setup](#6-environment-setup)
7. [Backend Installation](#7-backend-installation)
8. [Frontend Installation](#8-frontend-installation)
9. [How to Run the Backend](#9-how-to-run-the-backend)
10. [How to Run the Frontend](#10-how-to-run-the-frontend)
11. [Windows Setup (Step by Step)](#11-windows-setup-step-by-step)
12. [API Documentation](#12-api-documentation)
13. [Authentication Explanation](#13-authentication-explanation)
14. [Database Explanation](#14-database-explanation)
15. [Screenshots](#15-screenshots)
16. [Future Enhancements](#16-future-enhancements)

---

## 1. Project Introduction

BlogSpace is a full-stack web application with a REST API backend and a React
single-page frontend. Users can create an account, stay logged in with a JWT,
write blog posts, manage the posts they own, and comment on any post. The UI is
modern, responsive, and works on desktop, tablet, and mobile.

---

## 2. Features

- Register an account and log in
- Stay authenticated with JWT (persists across page refreshes via `localStorage`)
- Logout
- Create blog posts
- View all posts (newest first)
- View a single post with full content
- Edit your own posts
- Delete your own posts (and all their comments)
- Add comments to posts
- Delete your own comments
- See author names and post/update dates
- Protected routes that redirect to the login page
- Friendly validation, error, empty, and loading states
- Confirmation dialogs before destructive actions
- Responsive, modern UI

---

## 3. Technology Stack

**Frontend**

- React.js
- Vite
- React Router DOM
- JavaScript (no TypeScript)
- Plain CSS
- Fetch API

**Backend**

- Node.js
- Express.js
- JavaScript
- RESTful APIs

**Database**

- MongoDB
- Mongoose

**Authentication**

- JSON Web Tokens (JWT)
- bcryptjs

---

## 4. Folder Structure

```
blog-platform/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── commentRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── commentController.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── Comment.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── EditPost.jsx
│   │   │   └── PostDetails.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
└── README.md
```

---

## 5. MongoDB Setup

You need a running MongoDB server. Choose **one** option.

### Option A – Local MongoDB (recommended for beginners)

1. Download MongoDB Community Server: <https://www.mongodb.com/try/download/community>
2. Install it and make sure **"Install MongoDB as a Service"** is checked.
3. The default connection string is:

   ```
   mongodb://127.0.0.1:27017/blog_platform
   ```

4. Verify it runs (Windows PowerShell):

   ```powershell
   mongosh
   ```

   If `mongosh` connects, you are ready.

### Option B – MongoDB Atlas (cloud, free tier)

1. Create a free account at <https://www.mongodb.com/atlas>.
2. Create a free cluster.
3. Create a database user (username + password).
4. Under **Network Access**, allow your current IP (or `0.0.0.0/0` for testing).
5. Copy your connection string, which looks like:

   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/blog_platform?retryWrites=true&w=majority
   ```

6. Put it in `backend/.env` as `MONGO_URI`.

---

## 6. Environment Setup

Inside the `backend` folder, copy `.env.example` to `.env`:

**Windows (PowerShell):**

```powershell
cd backend
Copy-Item .env.example .env
```

**macOS / Linux:**

```bash
cd backend
cp .env.example .env
```

Then edit `backend/.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blog_platform
JWT_SECRET=your_super_secret_key
```

> `JWT_SECRET` should be a long, random string. Never commit the real `.env`
> file — it is already ignored by `.gitignore`.

---

## 7. Backend Installation

```bash
cd backend
npm install
```

---

## 8. Frontend Installation

Open a **second** terminal:

```bash
cd frontend
npm install
```

---

## 9. How to Run the Backend

```bash
cd backend
npm run dev
```

The API runs at **http://localhost:5000**
Health check: <http://localhost:5000> returns `{ "message": "BlogSpace API is running" }`.

For production you can use `npm start` instead of `npm run dev`.

---

## 10. How to Run the Frontend

```bash
cd frontend
npm run dev
```

The app runs at **http://localhost:5173**.

Open that URL in your browser. Make sure MongoDB and the backend are running
first.

---

## 11. Windows Setup (Step by Step)

1. Install **Node.js** (LTS) from <https://nodejs.org>.
2. Install **MongoDB Community Server** and start it (or use Atlas).
3. Open the project folder in **VS Code**.
4. Open the VS Code terminal (`Ctrl` + `` ` ``).

**Terminal 1 – Backend:**

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

**Terminal 2 – Frontend** (click the `+` in the terminal panel to open a new one):

```powershell
cd frontend
npm install
npm run dev
```

Then visit:

- Frontend: <http://localhost:5173>
- Backend: <http://localhost:5000>

---

## 12. API Documentation

Base URL: `http://localhost:5000/api`

Protected routes require the header:

```
Authorization: Bearer <token>
```

### Auth

| Method | Endpoint             | Access  | Description                          |
| ------ | -------------------- | ------- | ------------------------------------ |
| POST   | `/auth/register`     | Public  | Register a new user, returns token   |
| POST   | `/auth/login`        | Public  | Log in, returns token                |
| GET    | `/auth/me`           | Private | Get the current authenticated user   |

**POST `/auth/register`**

```json
{
  "name": "Anusuya",
  "email": "anusuya@example.com",
  "password": "123456"
}
```

Response (`201`):

```json
{
  "token": "eyJhbGciOi...",
  "user": {
    "id": "...",
    "name": "Anusuya",
    "email": "anusuya@example.com"
  }
}
```

**POST `/auth/login`**

```json
{
  "email": "anusuya@example.com",
  "password": "123456"
}
```

### Posts

| Method | Endpoint      | Access  | Description                              |
| ------ | ------------- | ------- | ---------------------------------------- |
| GET    | `/posts`      | Public  | All posts, newest first, author populated |
| GET    | `/posts/:id`  | Public  | One post plus its comments               |
| POST   | `/posts`      | Private | Create a post (author = logged-in user)  |
| PUT    | `/posts/:id`  | Private | Update a post (owner only)               |
| DELETE | `/posts/:id`  | Private | Delete a post and its comments (owner only) |

**POST `/posts`**

```json
{
  "title": "My First Blog",
  "content": "This is my first blog post."
}
```

### Comments

| Method | Endpoint               | Access  | Description                          |
| ------ | ---------------------- | ------- | ------------------------------------ |
| GET    | `/comments/:postId`    | Public  | All comments for a post, newest first |
| POST   | `/comments/:postId`    | Private | Add a comment (author = logged-in user) |
| DELETE | `/comments/:id`        | Private | Delete a comment (owner only)        |

**POST `/comments/:postId`**

```json
{
  "text": "Great post!"
}
```

### Status Codes

| Code | Meaning                                    |
| ---- | ------------------------------------------ |
| 200  | Success                                    |
| 201  | Created                                    |
| 400  | Bad request / validation error             |
| 401  | Not authenticated / invalid credentials    |
| 403  | Authenticated but not authorized (not owner) |
| 404  | Resource not found                         |
| 500  | Server error                               |

---

## 13. Authentication Explanation

1. **Register / Login** — The backend hashes the password with **bcryptjs**
   (never stored in plain text) and returns a **JWT** signed with `JWT_SECRET`.
2. **JWT payload** — contains the user's id: `{ id: "<userId>" }`, expiring in 30 days.
3. **Storage** — The frontend saves the token in `localStorage` under the key
   `blog_token` and updates React auth state through `AuthContext`.
4. **Sending the token** — The `api.js` helper automatically adds
   `Authorization: Bearer <token>` to every request.
5. **Protecting routes** — The `protect` middleware verifies the token, loads the
   user, and attaches them to `req.user`. Invalid or expired tokens get a `401`.
6. **Persistence** — On page load, `AuthContext` calls `GET /api/auth/me`. If the
   token is valid, the user stays logged in; otherwise the token is cleared.
7. **Authorization** — Controllers check ownership before allowing edits or
   deletes, returning `403` when the user is not the owner.

---

## 14. Database Explanation

Three Mongoose models are used, all with automatic `createdAt` / `updatedAt`
timestamps.

**User**

- `name` (required)
- `email` (required, unique, lowercase)
- `password` (required, min 6, hashed with bcryptjs, `select: false` so it is
  never returned unless explicitly requested)
- timestamps

**Post**

- `title` (required)
- `content` (required)
- `author` (ObjectId → User, required)
- timestamps

**Comment**

- `text` (required)
- `post` (ObjectId → Post, required)
- `author` (ObjectId → User, required)
- timestamps

Relationships: a Post belongs to one User; a Comment belongs to one Post and one
User. Posts populate author `name`/`email`; comments populate author
`name`/`email`. Deleting a post cascades by deleting all of its comments.

---

## 15. Screenshots

> Add your screenshots here.

| Page          | Preview                     |
| ------------- | --------------------------- |
| Home          | `docs/screenshots/home.png` |
| Post Details  | `docs/screenshots/post.png` |
| Login         | `docs/screenshots/login.png` |
| Create Post   | `docs/screenshots/create.png` |

---

## 16. Future Enhancements

- Post images / cover photos
- Rich text or Markdown editor
- Likes and reactions
- Search and filter by author or tag
- User profile pages
- Pagination or infinite scroll
- Comment editing and replies
- Social login (Google / GitHub)
- Refresh tokens and token blacklisting
- Automated tests (Jest / Vitest)

---

## Test Accounts (Example)

Register these yourself at `/register` (passwords are hashed on the backend):

| Name        | Email                 | Password |
| ----------- | --------------------- | -------- |
| Anusuya     | anusuya@example.com   | 123456   |
| Test User B | userb@example.com     | 123456   |

---

## License

MIT — feel free to learn from and extend this project.
