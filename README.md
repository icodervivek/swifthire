# SwiftHire 🚀

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express-black?logo=express)
![Database](https://img.shields.io/badge/Database-Supabase-blue?logo=supabase)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)

**SwiftHire makes hiring easy!**
Whether you're a recruiter looking to fill positions quickly or a job seeker searching for the perfect opportunity, SwiftHire makes the entire hiring process intelligent, fast, and seamless. With AI-driven job recommendations and recruiter-centric management tools, you can find the right match — every time.

---

## 🛠 Features

* ⚡ **AI-Based Job Recommendations:** Intelligent suggestions for job seekers based on skills, experience, and preferences using Groq (GPT-OSS 120B) with **LangChain** integration.
* 💼 **Recruiter Management:** Recruiters can post job requirements, manage listings, and track applications for their organization.
* 🏢 **Company Hiring Dashboard:** View recent job postings, open positions, and applicants in a single dashboard.
* 📱 **Responsive UI:** Clean, modern design for seamless experience on all devices.
* 🔐 **Authentication:** Secure signup/login system using JWT.
* 💬 **Contact Form:** Reach out directly to the team for queries or support.

---

## 💻 Tech Stack

| Layer    | Technology                                         |
| -------- | -------------------------------------------------- |
| Frontend | React, Tailwind CSS                                |
| Backend  | Node.js, Express.js                                |
| Database | Supabase (PostgreSQL)                              |
| AI       | Job Recommendation Engine using Groq (GPT-OSS 120B) API + LangChain |
| API      | RESTful APIs with JWT authentication               |

---

## 🚀 Getting Started (Manual Setup)

### 1. Clone the repository

```bash
git clone https://github.com/icodervivek/swifthire.git
cd swifthire
```

### 2. Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

### 3. Set up the database

Create a project at [supabase.com](https://supabase.com), then open its **SQL Editor** and run [`server/schema.sql`](server/schema.sql) to create the `users`, `recruiters`, `jobs`, `job_applications`, `contacts`, `companies`, and `job_seekers` tables (with Row Level Security enabled — the backend's service-role key bypasses it, so no policies are needed).

You'll need two keys from **Project Settings → API Keys** for the next step:
* the **Project URL**
* the **secret** key (starts with `sb_secret_...` — not the `publishable` key; the backend needs privileged access to bypass RLS)

### 4. Set up environment variables

Create a `.env` file in the backend:

```env
PORT=3000                      # The port your backend server will run on (e.g., 3000)
SUPABASE_URL=https://xyz.supabase.co  # Your Supabase project URL (found in your Supabase dashboard)
SUPABASE_SERVICE_KEY=your_service_role_key  # Supabase secret key (sb_secret_...) — NOT the publishable/anon key
JWT_SECRET=your_secret_key      # Secret key used to sign JWT tokens for authentication
GROQ_API_KEY=your_groq_api_key      # API key for Groq (used for AI-based job recommendations)
FRONTEND_ORIGIN=http://localhost:5173  # URL of your frontend (used for CORS)
```

Create a `.env` file in the client:

```env
VITE_API_URL=http://localhost:3000  # URL where your backend is running (used for API calls from frontend)
```

### 5. Run the application

#### Backend

```bash
cd server
npm run dev
```

`npm run dev` uses `nodemon`, so it auto-restarts on file changes and on crashes.

#### Frontend

```bash
cd client
npm run dev
```

Open your browser at **[http://localhost:5173](http://localhost:5173)** to see the app.

> **Windows users:** run `npm run dev` from **PowerShell**, not Git Bash/MINGW64. Git Bash's job control doesn't keep long-running Node processes properly attached, so the dev server can silently die shortly after starting — PowerShell doesn't have this problem.

---

## 🐳 Running Locally with Docker

You can run the entire project (frontend + backend) using Docker Compose for an easier local setup.

### 1️⃣ Clone the repository
```bash
git clone https://github.com/icodervivek/swifthire.git
cd swifthire
```

### 2️⃣ Set up the database and create environment files

Create your Supabase project and run [`server/schema.sql`](server/schema.sql) in its SQL Editor (see [Set up the database](#3-set-up-the-database) above), then create `.env` files **inside both** `server/` and `client/` folders before building.

#### `server/.env`
```env
PORT=3000
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
FRONTEND_ORIGIN=http://localhost:5173
```

#### `client/.env`
```env
VITE_API_URL=http://localhost:3000
```

### 3️⃣ Build and start containers
```bash
docker-compose up --build
```

This command:
- Builds the Docker images for backend and frontend.
- Starts both containers automatically.
- Loads your `.env` variables securely (not exposed publicly).

### 4️⃣ Access the app
Once the containers are running:
- Frontend → **http://localhost:5173**
- Backend → **http://localhost:3000**

### 5️⃣ Run in background (optional)
```bash
docker-compose up -d
```

To stop everything:
```bash
docker-compose down
```

---

## 📂 Project Structure

```
swifthire/
│
├─ client/           # React frontend
├─ server/           # Node.js + Express backend
│  └─ schema.sql     # Supabase table definitions
├─ docker-compose.yml
├─ README.md
```

---

## ⚡ Usage

* 🔑 **Sign Up / Sign In**: Create an account or login to access profile and hire workers.
* 🧑‍💼 **Job Seekers**: View available jobs, get AI-based recommendations tailored to skills and experience using Groq (GPT-OSS 120B) + LangChain.
* 🏢 **Hiring Companies / Recruiters**: Post job requirements, manage listings, track applications, and maintain organization-specific job data.
* 📩 **Contact Form**: Submit queries or feedback directly from the app.
* 👤 **Profile Page**: View and manage your account details securely.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/icodervivek/swifthire/issues).

---

**SwiftHire** – Making hiring simple, fast, and reliable with AI-powered job recommendations and recruiter management using Groq (GPT-OSS 120B) + LangChain. 💼✨
