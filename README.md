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

* ⚡ **AI-Based Job Recommendations:** Intelligent suggestions for job seekers based on skills, experience, and preferences using Google Gemini 2.0 Flash API with **LangChain** integration.
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
| AI       | Job Recommendation Engine using Google Gemini 2.0 Flash API + LangChain |
| API      | RESTful APIs with JWT authentication               |

---

## 🚀 Getting Started

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

### 3. Set up environment variables

Create a `.env` file in the backend:

```env
PORT=3000                      # The port your backend server will run on (e.g., 3000)
SUPABASE_URL=https://xyz.supabase.co  # Your Supabase project URL (found in your Supabase dashboard)
SUPABASE_SERVICE_KEY=your_service_role_key  # Supabase API key with service role or anon key for server-side access
JWT_SECRET=your_secret_key      # Secret key used to sign JWT tokens for authentication
GOOGLE_API_KEY=your_gemini_api_key  # API key for Google Gemini (used for AI-based job recommendations)
FRONTEND_ORIGIN=http://localhost:5173  # URL of your frontend (used for CORS)
```

Create a `.env` file in the client:

```env
VITE_API_URL=http://localhost:3000  # URL where your backend is running (used for API calls from frontend)
```

### 4. Run the application

#### Backend

```bash
cd server
npm run dev
```

#### Frontend

```bash
cd client
npm run dev
```

Open your browser at **[http://localhost:5173](http://localhost:5173)** to see the app.

---

## 📂 Project Structure

```
swifthire/
│
├─ client/           # React frontend
├─ server/           # Node.js + Express backend
├─ README.md
```

---

## ⚡ Usage

* 🔑 **Sign Up / Sign In**: Create an account or login to access profile and hire workers.
* 🧑‍💼 **Job Seekers**: View available jobs, get AI-based recommendations tailored to skills and experience using Google Gemini 2.0 Flash API + LangChain.
* 🏢 **Hiring Companies / Recruiters**: Post job requirements, manage listings, track applications, and maintain organization-specific job data.
* 📩 **Contact Form**: Submit queries or feedback directly from the app.
* 👤 **Profile Page**: View and manage your account details securely.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/icodervivek/swifthire/issues).

---

**SwiftHire** – Making hiring simple, fast, and reliable with AI-powered job recommendations and recruiter management using Google Gemini 2.0 Flash API + LangChain. 💼✨

