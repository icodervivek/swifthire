import express from "express";
import { supabase } from "../supabaseClient.js"; // Supabase client
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

const router = express.Router();
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN, // React dev URL
    credentials: true,
  })
);

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.recruiterId = decoded.recruiter_id;
    next();
  });
};

// POST /signup
router.post("/signup", async (req, res) => {
  const {
    recruiter_name,
    recruiter_email,
    recruiter_password,
    recruiter_designation,
    recruiter_mobile,
    organisation_name,
    organisation_city,
    organisation_type,
  } = req.body;

  try {
    // 1️⃣ Check if email or mobile exists
    const { data: existing, error: existError } = await supabase
      .from("recruiters")
      .select("recruiter_email, recruiter_mobile")
      .or(
        `recruiter_email.eq.${recruiter_email},recruiter_mobile.eq.${recruiter_mobile}`
      );

    if (existError) throw existError;

    if (existing.length > 0) {
      const existingEmail = existing.find(
        (r) => r.recruiter_email === recruiter_email
      );
      const existingMobile = existing.find(
        (r) => r.recruiter_mobile === recruiter_mobile
      );

      if (existingEmail && existingMobile)
        return res
          .status(400)
          .json({ message: "Email and mobile number are already registered" });
      else if (existingEmail)
        return res.status(400).json({ message: "Email is already registered" });
      else
        return res
          .status(400)
          .json({ message: "Mobile number is already registered" });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(recruiter_password, 10);

    // 3️⃣ Insert new recruiter
    const { data: newRecruiter, error: insertError } = await supabase
      .from("recruiters")
      .insert({
        recruiter_name,
        recruiter_email,
        recruiter_password: hashedPassword,
        recruiter_designation,
        recruiter_mobile,
        organisation_name,
        organisation_city,
        organisation_type,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    res.status(201).json({
      message: "Recruiter registered successfully",
      recruiter: newRecruiter,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /signin
router.post("/signin", async (req, res) => {
  const { recruiter_email, recruiter_password } = req.body;

  if (!recruiter_email || !recruiter_password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    const { data: recruiters, error } = await supabase
      .from("recruiters")
      .select("*")
      .eq("recruiter_email", recruiter_email);

    if (error) throw error;
    if (!recruiters || recruiters.length === 0)
      return res.status(401).json({ message: "Invalid email or password" });

    const recruiter = recruiters[0];

    const isMatch = await bcrypt.compare(
      recruiter_password,
      recruiter.recruiter_password
    );
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      {
        recruiter_id: recruiter.recruiter_id,
        recruiter_email: recruiter.recruiter_email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Signin successful",
      recruiter: {
        recruiter_id: recruiter.recruiter_id,
        recruiter_name: recruiter.recruiter_name,
        recruiter_email: recruiter.recruiter_email,
        recruiter_designation: recruiter.recruiter_designation,
        recruiter_mobile: recruiter.recruiter_mobile,
        organisation_name: recruiter.organisation_name,
        organisation_city: recruiter.organisation_city,
        organisation_type: recruiter.organisation_type,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /company
router.get("/company", verifyToken, async (req, res) => {
  try {
    const { data: recruiter, error } = await supabase
      .from("recruiters")
      .select("organisation_name")
      .eq("recruiter_id", req.recruiterId)
      .single();

    if (error) throw error;
    if (!recruiter)
      return res.status(404).json({ message: "Recruiter not found" });

    res.json({ company_name: recruiter.organisation_name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /jobs
router.post("/jobs", verifyToken, async (req, res) => {
  const recruiter_id = req.recruiterId;
  const {
    company_name,
    industry,
    city,
    contact_email,
    phone_number,
    open_positions,
    hiring_for,
    immediate_hiring,
  } = req.body;

  try {
    const { data: job, error } = await supabase
      .from("jobs")
      .insert({
        recruiter_id,
        company_name,
        industry,
        city,
        contact_email,
        phone_number,
        open_positions,
        hiring_for,
        immediate_hiring: immediate_hiring === "yes",
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error posting job" });
  }
});

// GET /jobs
router.get("/jobs", async (req, res) => {
  try {
    const search = req.query.search?.trim().replace(/\s+/g, " ") || "";
    console.log("🔍 Search term received:", search || "<empty>");

    let query = supabase.from("jobs").select("*");

    if (search) {
      // Search across multiple fields using OR
      const orString = `hiring_for.ilike.%${search}%,company_name.ilike.%${search}%,industry.ilike.%${search}%,city.ilike.%${search}%`;
      console.log("🧠 OR condition:", orString);
      query = query.or(orString);
    }

    // Apply ordering after filtering
    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) throw error;

    console.log("✅ Jobs returned:", data?.length);
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("🔥 Error fetching jobs:", err.message);
    res.status(500).json({ success: false, message: "Error fetching jobs" });
  }
});



router.get("/role", async (req, res) => {
  try {
    const search = req.query.search || "";

    let query = supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (search) {
      // Filter by job role only
      query = query.ilike("hiring_for", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching jobs by role" });
  }
});

// GET /jobs-with-applicants
router.get("/jobs-with-applicants", async (req, res) => {
  try {
    const { data, error } = await supabase.from("jobs").select(`
        *,
        job_applications:job_id (user_id)
      `);

    if (error) throw error;

    const jobsWithCount = data.map((job) => ({
      ...job,
      total_applicants: job.job_applications?.length || 0,
    }));

    res.json({ success: true, data: jobsWithCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching jobs" });
  }
});

// GET /manage-candidates
router.get("/manage-candidates", verifyToken, async (req, res) => {
  try {
    const recruiterId = req.recruiterId;

    // Fetch jobs for recruiter
    const { data: jobs, error: jobsError } = await supabase
      .from("jobs")
      .select("*")
      .eq("recruiter_id", recruiterId)
      .order("created_at", { ascending: false });

    if (jobsError) throw jobsError;

    // Fetch applicants for each job
    for (let job of jobs) {
      const { data: applicants, error: applicantsError } = await supabase
        .from("job_applications")
        .select(
          `
          user_id,
          applied_at,
          users:user_id (id, name, email, experience, previous_job_role, contact_number)
        `
        )
        .eq("job_id", job.job_id)
        .order("applied_at", { ascending: false });

      if (applicantsError) throw applicantsError;
      job.applicants = applicants.map((a) => a.users);
    }

    res.json({ success: true, jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /job-analytics
router.get("/job-analytics", verifyToken, async (req, res) => {
  try {
    const recruiterId = req.recruiterId;

    const { count: totalJobs, error: jobsError } = await supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .eq("recruiter_id", recruiterId);

    if (jobsError) throw jobsError;

    const { count: totalApplicants, error: applicantsError } = await supabase
      .from("job_applications")
      .select("*", { count: "exact", head: true })
      .in(
        "job_id",
        (
          await supabase
            .from("jobs")
            .select("job_id")
            .eq("recruiter_id", recruiterId)
        ).data.map((j) => j.job_id)
      );

    if (applicantsError) throw applicantsError;

    res.json({
      totalJobs: totalJobs || 0,
      totalApplicants: totalApplicants || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
