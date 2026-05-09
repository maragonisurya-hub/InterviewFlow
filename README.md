# InterviewFlow – Candidate Evaluation & Hiring Management Platform

A full-stack MERN application where recruiters manage jobs and evaluate candidates, and candidates apply and track their status.

---

## Tech Stack

**Frontend:** React + Vite, Tailwind CSS, React Router, Axios, Recharts  
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcryptjs

---

## Project Structure

```
interviewflow/
├── interviewflow-backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── interviewflow-frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── components/
    │   ├── context/AuthContext.jsx
    │   ├── pages/
    │   └── App.jsx
    ├── .env.example
    └── package.json
```

---

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd interviewflow
```

### 2. Backend Setup

```bash
cd interviewflow-backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/interviewflow
JWT_SECRET=your_jwt_secret_here
```

Run the backend:

```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd interviewflow-frontend
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## API Endpoints

### Auth
| Method | Route | Access |
|--------|-------|--------|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/me | Protected |

### Jobs
| Method | Route | Access |
|--------|-------|--------|
| GET | /api/jobs | Public |
| GET | /api/jobs/my | Recruiter |
| GET | /api/jobs/:id | Public |
| POST | /api/jobs | Recruiter |
| PUT | /api/jobs/:id | Recruiter |
| DELETE | /api/jobs/:id | Recruiter |

### Applications
| Method | Route | Access |
|--------|-------|--------|
| POST | /api/applications | Candidate |
| GET | /api/applications/my | Candidate |
| GET | /api/applications | Recruiter |
| PUT | /api/applications/:id | Recruiter |

---

## User Roles

### Recruiter
- Post, edit, delete job listings
- View all applications
- Evaluate candidates (scores + feedback)
- Change application status

### Candidate
- Browse all active jobs
- Apply with a cover letter
- View application history
- View evaluation scores and feedback

---

## Deployment

### Backend (Render / Railway)

1. Push backend to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Set **Build Command:** `npm install`
4. Set **Start Command:** `node server.js`
5. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

### Frontend (Netlify / Vercel)

1. Push frontend to GitHub
2. Import project on [Netlify](https://netlify.com) or [Vercel](https://vercel.com)
3. Set **Build Command:** `npm run build`
4. Set **Publish Directory:** `dist`
5. Add environment variable:
   - `VITE_API_URL=https://your-backend-url.onrender.com/api`

> ⚠️ For Netlify, add a `_redirects` file in the `public` folder:
> ```
> /* /index.html 200
> ```

---

## MongoDB Schema Overview

### User
- name, email, password (hashed), role (recruiter/candidate)

### Job
- title, company, location, type, description, requirements, salary
- postedBy → ref: User

### Application
- job → ref: Job
- candidate → ref: User
- status (Applied / Under Review / Shortlisted / Rejected / Selected)
- coverLetter
- evaluation { technicalSkills, communication, problemSolving, feedback }

---

## Build for Production

```bash
# Frontend
cd interviewflow-frontend
npm run build
# Output in /dist folder

# Backend
cd interviewflow-backend
npm start
```
