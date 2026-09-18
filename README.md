# 💬 Online Feedback System — CodSoft Week 3

A simple full-stack web application where users can submit feedback (name, email, star rating, message) and an admin can view, search, filter, and manage it — built with **HTML/CSS/JavaScript**, **Node.js/Express**, and **MongoDB** as part of the CodSoft Full-Stack Web Development internship (Week 3).

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat&logo=render&logoColor=white)

---

## 🚀 Live Demo

| | |
|---|---|
| 🌐 **Live App** | [online-feedback-system-md4k.onrender.com](https://online-feedback-system-md4k.onrender.com) |
| 💻 **GitHub Repository** | [github.com/Yashwanth18102004/feedback-system](https://github.com/Yashwanth18102004/feedback-system) |

> ⏳ This service runs on Render's free tier, so it may "sleep" after 15 minutes of inactivity. The first request afterward can take 20–30 seconds to wake up — this is normal.

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started (Local Setup)](#-getting-started-local-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Admin Access](#-admin-access)
- [Roadmap / Optional Features](#-roadmap--optional-features)
- [Author](#-author)

---

## ✨ Features

**For Users**
- ✅ Submit feedback with name, email, an interactive star rating, and a message
- ✅ Client-side validation (empty name, invalid email, no rating, message too short) with matching server-side validation
- ✅ Clear success confirmation after submitting

**For Admin**
- ✅ Passcode-protected dashboard
- ✅ Overview stats: total feedback, average rating, 5-star review count
- ✅ Search feedback by name, email, or message
- ✅ Filter by star rating
- ✅ Sort by newest or oldest
- ✅ Delete feedback entries

**General**
- 📱 Fully responsive design
- 🌍 Single deployable service — frontend and backend share one origin (no CORS setup needed)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Plain HTML, CSS, JavaScript (no framework — served directly by the backend) |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM), hosted on MongoDB Atlas |
| Deployment | Render (single Web Service) |

---

## 📁 Project Structure

```
feedback-system/
├── server.js                  # Express app entry point (also serves the frontend)
├── models/
│   └── Feedback.js            # Mongoose schema
├── controllers/
│   └── feedbackController.js  # Business logic (create, list, stats, delete)
├── routes/
│   └── feedbackRoutes.js      # API route definitions
├── public/                    # Frontend (served as static files)
│   ├── index.html             # Home page
│   ├── feedback.html          # Feedback form + success message
│   ├── admin.html             # Admin dashboard
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── feedback.js        # Form validation + submit logic
│       └── admin.js           # Dashboard fetch/search/filter/delete logic
├── .env.example
└── package.json
```

---

## 🏁 Getting Started (Local Setup)

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS version)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account (or a local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/Yashwanth18102004/feedback-system.git
cd feedback-system
```

### 2. Set up environment variables
```bash
cp .env.example .env      # fill in MONGO_URI
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the server
```bash
npm run dev                # starts on http://localhost:5000
```

### 5. Open the app
Visit **http://localhost:5000** in your browser.

> Since the frontend is served directly by the same Express server, there's no separate frontend process and no CORS configuration needed for local development.

---

## 🔑 Environment Variables

**.env**
```env
PORT=5000
MONGO_URI=<your MongoDB Atlas connection string>
CLIENT_URL=http://localhost:5000
ADMIN_PASSCODE=admin123
```

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/feedback` | Submit new feedback |
| GET | `/api/feedback` | List feedback (supports `?search=`, `?rating=`, `?sort=`) |
| GET | `/api/feedback/stats` | Total count, average rating, 5-star count |
| GET | `/api/feedback/:id` | Get one feedback entry |
| DELETE | `/api/feedback/:id` | Delete a feedback entry |

---

## ☁️ Deployment

Deployed on **[Render](https://render.com)** as a single Web Service:

| Field | Value |
|---|---|
| Root Directory | *(repo root)* |
| Build Command | `npm install` |
| Start Command | `node server.js` |

**Environment variables set on Render:** `PORT`, `MONGO_URI`, `ADMIN_PASSCODE`

Database is hosted on **MongoDB Atlas** (cloud, always-on), sharing the same cluster as other CodSoft projects but using a dedicated `feedback_system` database — fully isolated from any other project's data.

To redeploy after pushing new commits: go to the Render dashboard → select the service → **Manual Deploy → Deploy latest commit**.

---

## 🔐 Admin Access

The admin dashboard (`/admin.html`) is protected by a simple passcode gate for demo purposes — this is **not** real server-side authentication (no session/token issued). The passcode is compared against a fallback value hardcoded in `public/js/admin.js`.

To change it, edit the `'admin123'` fallback value directly in that file. For anything beyond a class project, replace this with real server-side authentication (e.g., a hashed passcode verified via an API call, issuing a signed JWT).

---

## 🗺 Roadmap / Optional Features

- [ ] Edit feedback (currently only create/view/delete are implemented)
- [ ] Real admin authentication (JWT-based, hashed passcode stored server-side)
- [ ] Pagination for large feedback lists
- [ ] Email notifications on new submissions
- [ ] Feedback statistics charts/visualizations

---

## 👤 Author

**Yashwanth G S**
MCA Student, Dr. Ambedkar Institute of Technology
Built as part of the **CodSoft Full-Stack Web Development Internship**

---

<p align="center">Made with ❤️ during the CodSoft internship</p>
