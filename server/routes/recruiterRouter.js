import express from "express";
import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

const router = express.Router();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // replace with your React dev URL
    credentials: true, // if you want cookies/auth headers
  })
);

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.recruiterId = decoded.recruiter_id;
    next();
  });
};

// POST route for recruiter signup
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
    // 1️⃣ Check if email or mobile already exists
    const existing = await pool.query(
      `SELECT recruiter_email, recruiter_mobile FROM recruiters WHERE recruiter_email = $1 OR recruiter_mobile = $2`,
      [recruiter_email, recruiter_mobile]
    );

    if (existing.rows.length > 0) {
      const existingEmail = existing.rows.find(
        (r) => r.recruiter_email === recruiter_email
      );
      const existingMobile = existing.rows.find(
        (r) => r.recruiter_mobile === recruiter_mobile
      );

      if (existingEmail && existingMobile) {
        return res
          .status(400)
          .json({ message: "Email and mobile number are already registered" });
      } else if (existingEmail) {
        return res.status(400).json({ message: "Email is already registered" });
      } else {
        return res
          .status(400)
          .json({ message: "Mobile number is already registered" });
      }
    }

    // 2️⃣ Hash the password before storing
    const hashedPassword = await bcrypt.hash(recruiter_password, 10);

    // 3️⃣ Insert new recruiter
    const newRecruiter = await pool.query(
      `INSERT INTO recruiters
        (recruiter_name, recruiter_email, recruiter_password, recruiter_designation, recruiter_mobile, organisation_name, organisation_city, organisation_type)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        recruiter_name,
        recruiter_email,
        hashedPassword,
        recruiter_designation,
        recruiter_mobile,
        organisation_name,
        organisation_city,
        organisation_type,
      ]
    );

    res.status(201).json({
      message: "Recruiter registered successfully",
      recruiter: newRecruiter.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /signin
router.post("/signin", async (req, res) => {
  const { recruiter_email, recruiter_password } = req.body;

  if (!recruiter_email || !recruiter_password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // 1️⃣ Check if recruiter exists
    const recruiterResult = await pool.query(
      "SELECT * FROM recruiters WHERE recruiter_email = $1",
      [recruiter_email]
    );

    if (recruiterResult.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const recruiter = recruiterResult.rows[0];

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(
      recruiter_password,
      recruiter.recruiter_password
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Optional: Generate JWT token
    const token = jwt.sign(
      {
        recruiter_id: recruiter.recruiter_id,
        recruiter_email: recruiter.recruiter_email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 4️⃣ Send response
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
      token, // optional
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/company", verifyToken, async (req, res) => {
  try {
    const recruiterId = req.recruiterId;

    const result = await pool.query(
      "SELECT organisation_name FROM recruiters WHERE recruiter_id = $1",
      [recruiterId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.json({ company_name: result.rows[0].organisation_name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/jobs", verifyToken, async (req, res) => {
  const recruiter_id = req.recruiterId; // from verifyToken middleware
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
    const result = await pool.query(
      `INSERT INTO jobs (
        recruiter_id, company_name, industry, city, contact_email,
        phone_number, open_positions, hiring_for, immediate_hiring
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        recruiter_id,
        company_name,
        industry,
        city,
        contact_email,
        phone_number,
        open_positions,
        hiring_for,
        immediate_hiring === "yes" ? true : false,
      ]
    );

    res.status(201).json({ success: true, job: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error posting job" });
  }
});


router.get("/jobs", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT jobs.*, recruiters.organisation_name
       FROM jobs
       JOIN recruiters ON jobs.recruiter_id = recruiters.recruiter_id
       ORDER BY jobs.created_at DESC`
    );

    res.status(200).json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching jobs" });
  }
});


router.get("/jobs-with-applicants", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT j.*, COUNT(ja.job_id) AS total_applicants
      FROM jobs j
      LEFT JOIN job_applications ja ON j.job_id = ja.job_id
      GROUP BY j.job_id
      ORDER BY j.created_at DESC;
    `);

    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching jobs" });
  }
});


router.get("/manage-candidates", verifyToken, async (req, res) => {
  const recruiterId = req.recruiterId; // from middleware
  try {
    // Fetch jobs posted by recruiter
    const jobsResult = await pool.query(
      `SELECT j.job_id, j.hiring_for, j.company_name, j.open_positions,
              COUNT(ja.user_id) AS applicants_count
       FROM jobs j
       LEFT JOIN job_applications ja ON j.job_id = ja.job_id
       WHERE j.recruiter_id = $1
       GROUP BY j.job_id
       ORDER BY j.created_at DESC`,
      [recruiterId]
    );

    const jobs = jobsResult.rows;

    // Fetch users for each job including experience, previous_job_role, contact_number
    for (let job of jobs) {
      const usersResult = await pool.query(
        `SELECT u.id, u.name, u.email, u.experience, u.previous_job_role, u.contact_number, ja.applied_at
         FROM job_applications ja
         JOIN users u ON ja.user_id = u.id
         WHERE ja.job_id = $1
         ORDER BY ja.applied_at DESC`,
        [job.job_id]
      );
      job.applicants = usersResult.rows;
    }

    res.json({ success: true, jobs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /recruiter/job-analytics
router.get("/job-analytics", verifyToken, async (req, res) => {
  const recruiterId = req.recruiterId; // from middleware

  try {
    // Total jobs posted by recruiter
    const jobRes = await pool.query(
      "SELECT COUNT(*) AS total_jobs FROM jobs WHERE recruiter_id = $1",
      [recruiterId]
    );

    // Total unique applicants applied for recruiter's jobs
    const applicantRes = await pool.query(
      `SELECT COUNT(DISTINCT ja.user_id) AS total_applicants
       FROM job_applications ja
       JOIN jobs j ON ja.job_id = j.job_id
       WHERE j.recruiter_id = $1`,
      [recruiterId]
    );

    res.json({
      totalJobs: Number(jobRes.rows[0].total_jobs),
      totalApplicants: Number(applicantRes.rows[0].total_applicants),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
