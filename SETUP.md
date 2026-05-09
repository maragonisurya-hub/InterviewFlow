# InterviewFlow – Quick Start Guide

## Step 1: Setup Backend

```bash
cd interviewflow-backend
npm install
```

Edit `.env` — replace MONGO_URI with your MongoDB Atlas connection string:
```
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster.mongodb.net/interviewflow
JWT_SECRET=interviewflow_jwt_secret_key_2024
```

Start backend:
```bash
npm run dev
```
Backend runs at: http://localhost:5000

---

## Step 2: Setup Frontend

Open a new terminal:

```bash
cd interviewflow-frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:5173

---

## Step 3: Open the App

Go to http://localhost:5173 in your browser.

- Register as **Recruiter** to post jobs and evaluate candidates
- Register as **Candidate** to browse jobs and apply

---

## MongoDB Atlas Setup (Free)

1. Go to https://mongodb.com/atlas and create a free account
2. Create a free M0 cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string and paste it as MONGO_URI in backend .env
5. Replace `<password>` with your actual DB password

---

## Deployment

### Backend → Render.com
- Build command: `npm install`
- Start command: `node server.js`
- Add env vars: MONGO_URI, JWT_SECRET, NODE_ENV=production

### Frontend → Netlify.com
- Build command: `npm run build`
- Publish directory: `dist`
- Add env var: VITE_API_URL=https://your-backend.onrender.com/api
