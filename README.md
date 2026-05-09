# InterviewFlow – Candidate Evaluation & Hiring Management Platform

A full-stack MERN application where recruiters manage jobs and evaluate candidates, and candidates apply for jobs and track their application status.

---

## Live Demo

Frontend: https://your-frontend-link.netlify.app

Backend API: https://your-backend-link.onrender.com

---

## Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

## Features

### Authentication & Security
- JWT-based authentication
- Password hashing using bcryptjs
- Protected routes
- Role-based access control

### Recruiter Features
- Recruiter dashboard with analytics
- Create, edit, and delete job postings
- View candidate applications
- Evaluate candidates using:
  - Technical Skills
  - Communication
  - Problem Solving
- Add recruiter feedback
- Update candidate application status

### Candidate Features
- Candidate dashboard
- Browse available jobs
- Apply for jobs with cover letter
- Track application history
- View recruiter feedback and evaluation scores

### Dashboard & Analytics
- Pie chart visualization using Recharts
- Application statistics cards
- Status-based analytics
- Candidate performance overview

### UI/UX
- Responsive design
- Professional dashboard layout
- Loading states
- Empty states
- Clean cards and status badges

---

## Project Structure

```bash
interviewflow/
├── interviewflow-backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   ├── server.js
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
└── interviewflow-frontend/
    ├── public/
    │   └── _redirects
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── App.jsx
    ├── .env.example
    ├── package.json
    └── package-lock.json
