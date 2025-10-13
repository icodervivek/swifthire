import express from "express";
import multer from "multer";
import pdf from "pdf-parse-new";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import pool from "../db.js"; // your DB connection file

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Gemini 2.0 setup
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0.3,
  apiKey: process.env.GOOGLE_API_KEY,
});

// ✅ Prompt 1: Extract Skills
const extractSkillsPrompt = new PromptTemplate({
  template: `
You are an expert resume analyzer. From the text below, extract the most relevant **skills and technologies**.
Return ONLY a valid JSON array of strings. No explanation, no markdown.

Example:
["React", "Node.js", "PostgreSQL", "Python"]

Resume Text:
{text}
`,
  inputVariables: ["text"],
});

// ✅ Prompt 2: Job Matching
const jobMatchPrompt = new PromptTemplate({
  template: `
You are an intelligent hiring assistant.
Given:
- Candidate skills: {skills}
- Available jobs: {jobs}

Match the candidate to the most relevant jobs.

Return a **pure JSON array** in this format (no markdown, no text):
[
  {{
    "job_id": <job_id>,
    "job_title": "<job_title>",
    "match_reason": "<why this fits>",
    "confidence": <1-10>
  }}
]
`,
  inputVariables: ["skills", "jobs"],
});

// ✅ LangChain Chains
const extractSkillsChain = new LLMChain({
  llm: model,
  prompt: extractSkillsPrompt,
});
const jobMatchChain = new LLMChain({ llm: model, prompt: jobMatchPrompt });

// ✅ Upload Resume Route
router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Step 1: Extract PDF Text
    const data = await pdf(req.file.buffer);
    const pdfText = data.text;

    // Step 2: Extract Skills
    const skillRes = await extractSkillsChain.call({ text: pdfText });
    let extractedSkills = [];

    try {
      extractedSkills = JSON.parse(skillRes.text.trim());
    } catch {
      extractedSkills = skillRes.text
        .split(/,|\n|;/)
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Step 3: Fetch Jobs from DB
    const { rows: jobs } = await pool.query(
      `SELECT job_id, hiring_for, company_name, city, industry FROM jobs`
    );

    // Step 4: Match Jobs using LLM
    const jobsData = JSON.stringify(
      jobs.map((job) => ({
        job_id: job.job_id,
        job_title: job.hiring_for,
        company: job.company_name,
        city: job.city,
        industry: job.industry,
      }))
    );

    const matchRes = await jobMatchChain.call({
      skills: extractedSkills.join(", "),
      jobs: jobsData,
    });

    // Step 5: Parse Matches
    // Step 5: Parse Matches (robust)
    let matches = [];
    try {
      // Clean unwanted markdown or code fences
      const cleanedText = matchRes.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .replace(/^.*?\[/s, "[") // start from first [
        .replace(/]([^]*?)$/s, "]") // end at last ]
        .trim();

      matches = JSON.parse(cleanedText);

      if (!Array.isArray(matches)) {
        throw new Error("AI response is not a JSON array");
      }
    } catch (err) {
      console.warn("AI match JSON parse failed:", err);
      matches = [
        {
          job_id: null,
          job_title: "Parsing Failed",
          match_reason: matchRes.text.trim().slice(0, 200),
          confidence: 0,
        },
      ];
    }

    // Step 6: Enrich matches with company details
    const matchedJobs = matches
      .map((match) => {
        const job = jobs.find((j) => j.job_id === match.job_id);
        return job
          ? {
              ...job,
              match_reason: match.match_reason,
              confidence: match.confidence,
            }
          : null;
      })
      .filter(Boolean);

    res.json({
      message: matchedJobs.length
        ? "Job recommendations found."
        : "No strong matches found.",
      extractedSkills,
      matchedJobs,
    });
  } catch (err) {
    console.error("Resume processing error:", err);
    res.status(500).json({ error: "Failed to process uploaded resume." });
  }
});

export default router;
