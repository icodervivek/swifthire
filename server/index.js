import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "./supabaseClient.js";
import multer from "multer";

import resumeRouter from "./routes/resumeRouter.js";
import recruiterRouter from "./routes/recruiterRouter.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
  })
);

// Routes
app.use("/resume", resumeRouter);
app.use("/recruiter", recruiterRouter);

// -----------------------
// Auth: Signup
// -----------------------
app.post("/signup", async (req, res) => {
  const { name, email, password, experience, previous_job_role, contact_number } =
    req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const { data: existingUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    const { data, error: insertError } = await supabase.from("users").insert([
      {
        name,
        email,
        password: hashed,
        experience: experience || 0,
        previous_job_role: previous_job_role || null,
        contact_number: contact_number || null,
      },
    ]);

    if (insertError) throw insertError;

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// -----------------------
// Auth: Signin
// -----------------------
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Sign In Successful!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// -----------------------
// Profile
// -----------------------
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("id, name, email, experience, previous_job_role, contact_number")
      .eq("id", req.user.id)
      .single();

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------
// Contact form
// -----------------------
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ message: "All fields required!" });

  try {
    const { data, error } = await supabase
      .from("contacts")
      .insert([{ name, email, message }])
      .select();

    if (error) throw error;

    res.json({ message: "Message sent successfully!", contact: data[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------
// Get all companies
// -----------------------
app.get("/companies", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error while fetching companies" });
  }
});

// -----------------------
// Job seekers
// -----------------------
app.get("/job-seekers", async (req, res) => {
  try {
    const { data, error } = await supabase.from("job_seekers").select("*").order("id");
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching job seekers:", err);
    res.status(500).json({ message: "Error fetching job seekers" });
  }
});

// -----------------------
// Applied Jobs
// -----------------------
app.get("/user/applied-jobs", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const { data, error } = await supabase
      .from("job_applications")
      .select(`
        job_id,
        jobs (company_name, hiring_for, city, industry),
        applied_at
      `)
      .eq("user_id", userId)
      .order("applied_at", { ascending: false });

    if (error) throw error;

    const appliedJobs = data.map((item) => ({
      job_id: item.job_id,
      company_name: item.jobs.company_name,
      hiring_for: item.jobs.hiring_for,
      city: item.jobs.city,
      industry: item.jobs.industry,
      applied_at: item.applied_at,
    }));

    res.json({ success: true, appliedJobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -----------------------
// Apply for Job
// -----------------------
app.post("/apply/:jobId", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { jobId } = req.params;

  try {
    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("*")
      .eq("job_id", jobId)
      .single();

    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    const { data: existing, error: existError } = await supabase
      .from("job_applications")
      .select("*")
      .eq("job_id", jobId)
      .eq("user_id", userId);

    if (existing.length > 0)
      return res.status(400).json({ success: false, message: "Already applied!" });

    const { data: applied, error: applyError } = await supabase
      .from("job_applications")
      .insert([{ job_id: jobId, user_id: userId }]);

    if (applyError) throw applyError;

    res.json({ success: true, message: "Job Applied Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// PUT /user/update-profile
// -----------------------
// Update user profile
// -----------------------
app.put("/user/update-profile", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { experience, previous_job_role, contact_number, resume } = req.body;

  // Mandatory fields check
  if (!experience || !previous_job_role || !contact_number)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const updateData = { experience, previous_job_role, contact_number };

    // Only update resume if provided
    if (resume) updateData.resume = resume;

    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, user: data, message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// -----------------------
// JWT middleware
// -----------------------
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

// -----------------------
app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
