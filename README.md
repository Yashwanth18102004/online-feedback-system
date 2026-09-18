# Online Feedback System — CodSoft Week 3

A simple full-stack web application where users can submit feedback (name, email, star rating, message) and an admin can view, search, filter, and delete feedback — built with **HTML/CSS/JavaScript**, **Node.js/Express**, and **MongoDB**.

## Tech Stack
- **Frontend:** Plain HTML, CSS, JavaScript (no framework — served directly by the backend)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)

## Project Structure
```
online-feedback-system/
├── server.js                  # Express app entry point (also serves the frontend)
├── models/Feedback.js         # Mongoose schema
├── controllers/feedbackController.js
├── routes/feedbackRoutes.js
├── public/                    # Frontend (served as static files)
│   ├── index.html             # Home page
│   ├── feedback.html          # Feedback submission form + success message
│   ├── admin.html             # Admin dashboard (search, filter, delete)
│   ├── css/style.css
│   └── js/
│       ├── feedback.js        # Form validation + submit logic
│       └── admin.js           # Dashboard fetch/search/filter/delete logic
├── .env.example
└── package.json
```

## Setup

```bash
cp .env.example .env      # edit MONGO_URI if needed
npm install
npm run dev                # starts on http://localhost:5000
```

Requires a running MongoDB instance (local `mongod` or a MongoDB Atlas connection string in `.env`).

Since the frontend is served directly by the same Express server (via `express.static`), there's **no separate frontend server and no CORS setup needed** for local development — just open:
```
http://localhost:5000
```

## Admin Access
The admin dashboard (`/admin.html`) is protected by a simple passcode gate for demo purposes (not real authentication — no server-side session/token). The default passcode is `admin123`, set inside `public/js/admin.js` (`expected` fallback value). For anything beyond a class project, replace this with real server-side authentication.

## Features Implemented
- **Home page** — intro + call-to-action buttons
- **Feedback form** — name, email, interactive star rating, message, with client-side validation (empty name, invalid email, no rating selected, message too short) and matching server-side validation
- **Success message** — shown after a successful submission
- **Admin dashboard** — overview stats (total feedback, average rating, 5-star count), a searchable/filterable/sortable table of all feedback, and delete actions
- **REST API** — full CRUD-style endpoints for feedback

## API Overview
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/feedback | Submit new feedback |
| GET | /api/feedback | List feedback (supports `?search=`, `?rating=`, `?sort=`) |
| GET | /api/feedback/stats | Total count, average rating, 5-star count |
| GET | /api/feedback/:id | Get one feedback entry |
| DELETE | /api/feedback/:id | Delete a feedback entry |

## Notes / Next Steps (Optional Features to extend)
- Edit feedback (currently only create/view/delete are implemented)
- Real admin authentication (JWT-based, hashed passcode stored server-side)
- Pagination for large feedback lists
- Email notifications on new submissions
