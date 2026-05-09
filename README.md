# InterviewFlow – Candidate Evaluation & Hiring Management Platform

A full-stack MERN application where recruiters manage jobs and evaluate candidates, and candidates apply for jobs and track their application status.

---

## Live Demo

Frontend: https://interviewflow-surya.netlify.app

Backend API: https://interviewflow-production-7aa3.up.railway.app
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


---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |

### Jobs
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/jobs | Get all jobs |
| POST | /api/jobs | Create new job |
| PUT | /api/jobs/:id | Update job |
| DELETE | /api/jobs/:id | Delete job |

### Applications
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/applications | Apply for job |
| GET | /api/applications/my | Candidate applications |
| GET | /api/applications | Recruiter applications |
| PUT | /api/applications/:id | Update application status |

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/maragonisurya-hub/InterviewFlow.git
cd InterviewFlow
```

---

### Backend Setup

```bash
cd interviewflow-backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd interviewflow-frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

## Deployment

### Frontend Deployment
- Netlify

### Backend Deployment
- Railway

### Database
- MongoDB Atlas

---

## Future Improvements

- Resume upload system
- AI-based candidate scoring
- Email notifications
- Admin dashboard
- Interview scheduling
- Dark mode support

---

## Author

### Maragoni Surya Prakash

- GitHub: https://github.com/maragonisurya-hub
- LinkedIn: Add your LinkedIn profile link
