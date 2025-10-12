import express from "express";
import multer from "multer";
import pdf from "pdf-parse-new";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import pool from "../db.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Gemini AI setup
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0.3,
  apiKey: process.env.GOOGLE_API_KEY,
});

// Prompt to extract technical skills from resume
const skillsPrompt = new PromptTemplate({
  template: `
You are a highly precise career assistant.

From the following resume text, extract **all relevant skills and proficiencies** of the candidate. 
This includes:
- **Technical skills**: programming languages, frameworks, libraries, tools, software, cloud technologies, DevOps skills, AI/ML skills.
- **Non-technical skills**: HR, recruitment, sales, marketing, content creation, communication, project management, customer support, leadership, or business skills.

Do NOT extract job titles, roles, company names, degrees, certifications, or personal details.

Return the output as a **comma-separated list of lowercase keywords**, without any extra text.
Each skill should be short and clean (e.g., "react, node.js, python, sql, recruitment, customer support, content writing").

If a skill is mentioned multiple times, include it only once.

Resume Text:
{text}
  `,
  inputVariables: ["text"],
});


const skillsChain = new LLMChain({ llm: model, prompt: skillsPrompt });

// Map technical skills to corresponding job roles
const skillRoleMap = {
  react: [
    "Front-end Web Developer",
    "React.js Developer",
    "Full Stack Web Developer",
  ],
  "react.js": [
    "Front-end Web Developer",
    "React.js Developer",
    "Full Stack Web Developer",
  ],
  "node.js": [
    "Backend Web Developer",
    "Full Stack Developer",
    "Full Stack Web Developer",
  ],
  javascript: [
    "Front-end Web Developer",
    "React.js Developer",
    "Full Stack Web Developer",
  ],
  python: [
    "Python Full Stack Developer",
    "Data Scientist",
    "AI Research Scientist",
  ],
  java: ["Java Full Stack Developer", "Spring Boot Developer"],
  sql: ["Data Analyst", "Backend Web Developer", "Full Stack Developer"],
  docker: ["DevOps Engineer", "Backend Web Developer"],
  aws: ["DevOps Engineer", "Backend Web Developer", "AI Research Scientist"],
  "spring boot": ["Spring Boot Developer", "Java Full Stack Developer"],
  django: ["Python Full Stack Developer", "Backend Web Developer"],
  flask: ["Python Full Stack Developer", "Backend Web Developer"],
  "c++": ["Embedded Systems Engineer", "Python Full Stack Developer"],
  "machine learning": ["Data Scientist", "AI Research Scientist"],
  "react native": ["Mobile Developer", "Full Stack Developer"],
  html: ["Front-end Web Developer", "Full Stack Web Developer"],
  css: ["Front-end Web Developer", "Full Stack Web Developer"],
  typescript: ["Front-end Web Developer", "Full Stack Web Developer"],
  kubernetes: ["DevOps Engineer", "Backend Web Developer"],
  // Add more skills as needed
  hr: ["HR", "HR Manager", "HR Executive"],
  "human resources": ["HR", "HR Manager", "HR Executive"],
  recruitment: ["HR", "HR Manager", "HR Executive"],
  "customer support": [
    "Customer Support",
    "Client Support Executive",
    "Helpdesk Executive",
  ],
  "customer service": [
    "Customer Support",
    "Client Support Executive",
    "Helpdesk Executive",
  ],
  sales: [
    "Sales Executive",
    "Account Executive",
    "Business Development Executive",
  ],
  marketing: ["Marketing Executive", "Content Strategist", "Brand Manager"],
  "content writing": ["Content Strategist", "Copywriter", "Content Manager"],
  copywriting: ["Content Strategist", "Copywriter", "Content Manager"],
  "social media": [
    "Social Media Manager",
    "Content Strategist",
    "Marketing Executive",
  ],
  "project management": [
    "Project Manager",
    "Production Manager",
    "Program Manager",
  ],
  ai: ["GenAI Developer", "AI Research Scientist", "Data Scientist"],
  genai: ["GenAI Developer", "AI Research Scientist"],
};

// --------------------------
// Upload PDF & match jobs
// --------------------------
router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    // Step 1: Extract PDF text
    const data = await pdf(req.file.buffer);
    const pdfText = data.text;

    // Step 2: Extract skills from resume
    const skillResponse = await skillsChain.call({ text: pdfText });
    const extractedSkills = skillResponse.text
      .replace(/\n/g, "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    console.log("Extracted Skills:", extractedSkills);

    // Step 3: Fetch jobs from DB
    const { rows: jobs } = await pool.query(`
      SELECT id, company_name, industry, city, contact_email, phone_number, open_positions, hiring_for, immediate_hiring
      FROM companies;
    `);

    // Step 4: Match jobs based on skill-role map
    const matchedJobs = jobs
      .map((job) => {
        const jobTitle = job.hiring_for ? job.hiring_for.trim() : "";
        let matchCount = 0;

        extractedSkills.forEach((skill) => {
          const mappedRoles = skillRoleMap[skill] || [];
          if (mappedRoles.includes(jobTitle)) {
            matchCount++;
          }
        });

        return { ...job, matchCount };
      })
      .filter((job) => job.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);

    return res.json({
      message: matchedJobs.length
        ? "Job recommendations found."
        : "No matching jobs.",
      skills: extractedSkills,
      matchedJobs,
    });
  } catch (err) {
    console.error("Resume processing error:", err);
    res.status(500).json({ error: "Failed to process uploaded PDF." });
  }
});

export default router;
