import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "./db.js";

import resumeRouter from "./routes/resumeRouter.js";
import recruiterRouter from "./routes/recruiterRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true, // allow cookies or auth headers
  })
);

app.use("/resume", resumeRouter);
app.use("/recruiter", recruiterRouter);

app.post("/signup", async (req, res) => {
  const {
    name,
    email,
    password,
    experience,
    previous_job_role,
    contact_number,
  } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (name, email, password, experience, previous_job_role, contact_number)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        name,
        email,
        hashed,
        experience || 0,
        previous_job_role || null,
        contact_number || null,
      ]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0)
      return res.status(400).json({ message: "User not found" });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Sign In Successful !", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT id, name, email, experience, previous_job_role, contact_number 
       FROM users WHERE id = $1`,
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: user.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(403).json({ message: "No token provided" });

  const token = header.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
}

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );

    res.json({
      message: "Message sent successfully!",
      contact: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/job-seekers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM job_seekers ORDER BY id ASC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching job seekers:", err);
    res.status(500).json({ message: "Error fetching job seekers" });
  }
});

app.get("/companies", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM companies ORDER BY created_at DESC"
    );
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Error fetching companies:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching companies",
    });
  }
});

app.get("/user/applied-jobs", verifyToken, async (req, res) => {
  const userId = req.user.id; // from JWT token

  try {
    const result = await pool.query(
      `
      SELECT 
        j.job_id,
        j.company_name,
        j.hiring_for,
        j.city,
        j.industry,
        ja.applied_at
      FROM job_applications ja
      JOIN jobs j ON ja.job_id = j.job_id
      WHERE ja.user_id = $1
      ORDER BY ja.applied_at DESC
    `,
      [userId]
    );

    res.json({ success: true, appliedJobs: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/apply/:jobId", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { jobId } = req.params;

  try {
    // Check if job exists
    const job = await pool.query("SELECT * FROM jobs WHERE job_id = $1", [
      jobId,
    ]);
    if (job.rows.length === 0)
      return res.status(404).json({ success: false, message: "Job not found" });

    // Check if user already applied
    const existing = await pool.query(
      "SELECT * FROM job_applications WHERE job_id = $1 AND user_id = $2",
      [jobId, userId]
    );
    if (existing.rows.length > 0)
      return res
        .status(400)
        .json({ success: false, message: "Already applied!" });

    // Insert application
    await pool.query(
      "INSERT INTO job_applications (job_id, user_id) VALUES ($1, $2)",
      [jobId, userId]
    );

    res.json({
      success: true,
      message: "Job Applied Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
