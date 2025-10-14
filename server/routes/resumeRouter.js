import express from "express";
import multer from "multer";
import pdf from "pdf-parse-new";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import { supabase } from "../supabaseClient.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Gemini model setup
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0.3,
  apiKey: process.env.GOOGLE_API_KEY,
});

// Step 1: Extract skills prompt
const extractSkillsPrompt = new PromptTemplate({
  template: `You are an expert career assistant.
Given the following resume text, extract a clean list of **technical skills, frameworks, programming languages, and tools** mentioned.

Rules:
- Output ONLY a JSON array of skills (like ["React", "Node.js", "Python", "SQL"])
- No extra text, no markdown formatting.

Resume text:
{text}`,
  inputVariables: ["text"],
});

// Step 2: Job matching prompt
const jobMatchPrompt = new PromptTemplate({
  template: `You are an intelligent job recommender.
Given the candidate's skills and the list of available jobs, select the **most relevant job positions** that best match the skills.

Rules:
- Return ONLY a JSON array.
- Each object should include job_id, job_title, company, and reason_for_match (1-2 lines explaining why it matches).
- If there are no matching jobs, return an empty array [].

Candidate Skills:
{skills}

Available Jobs:
{jobs}`,
  inputVariables: ["skills", "jobs"],
});

// LangChain chains
const extractSkillsChain = new LLMChain({
  llm: model,
  prompt: extractSkillsPrompt,
});

const jobMatchChain = new LLMChain({
  llm: model,
  prompt: jobMatchPrompt,
});

// 🧠 API Route — POST /upload
router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No file uploaded. Please upload a valid PDF resume." });
    }

    // Convert to buffer & extract text
    const buffer = req.file.buffer;
    const data = await pdf(buffer);
    const resumeText = data.text.trim();

    if (!resumeText) {
      return res
        .status(400)
        .json({ error: "Uploaded PDF is blank or unreadable." });
    }

    // Step 1: Extract skills from resume
    const skillsResponse = await extractSkillsChain.call({ text: resumeText });
    const cleanSkills = skillsResponse.text
      .replace(/```json|```/g, "")
      .trim();

    let skillsJson = [];
    try {
      skillsJson = JSON.parse(cleanSkills);
      if (!Array.isArray(skillsJson)) throw new Error("Not an array");
    } catch (err) {
      console.warn("Failed to parse skills JSON. Raw text used.");
      skillsJson = [];
    }

    if (skillsJson.length === 0) {
      return res.status(200).json({
        message: "No identifiable technical skills found in the resume.",
        jobs: [],
      });
    }

    // Step 2: Fetch jobs from Supabase
    const { data: jobs, error } = await supabase
      .from("jobs")
      .select(
        "job_id, hiring_for, company_name, city, industry, open_positions, contact_email"
      );

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Failed to fetch jobs." });
    }

    const jobsData = jobs.map((job) => ({
      job_id: job.job_id,
      job_title: job.hiring_for,
      company: job.company_name,
      city: job.city,
      industry: job.industry,
      open_positions: job.open_positions,
      contact_email: job.contact_email,
    }));

    // Step 3: Use Gemini to find best job matches
    const matchResponse = await jobMatchChain.call({
      skills: JSON.stringify(skillsJson),
      jobs: JSON.stringify(jobsData),
    });

    const cleanedMatch = matchResponse.text
      .replace(/```json|```/g, "")
      .trim();

    let matchedJobs = [];
    try {
      matchedJobs = JSON.parse(cleanedMatch);
      if (!Array.isArray(matchedJobs)) throw new Error("Not an array");
    } catch (err) {
      console.warn("Match JSON parse failed.");
      matchedJobs = [];
    }

    // Step 4: Return result
    if (matchedJobs.length === 0) {
      return res.status(200).json({
        message: "No job positions available matching your resume skills.",
        jobs: [],
      });
    }

    return res.status(200).json({
      message: "Matching job positions found.",
      skills: skillsJson,
      jobs: matchedJobs,
    });
  } catch (err) {
    console.error("Processing error:", err);
    res
      .status(500)
      .json({ error: "Failed to process the resume. Please try again." });
  }
});

export default router;
