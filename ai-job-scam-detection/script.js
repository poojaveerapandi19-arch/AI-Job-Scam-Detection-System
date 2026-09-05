const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const JobAnalysis = require("./models/JobAnalysis");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected Successfully"))
.catch((err) => console.log("MongoDB Error:", err.message));

app.post("/analyze", async (req, res) => {
try {
const { jobTitle, companyName, description, salary, email } = req.body;

const suspiciousKeywords = [
  "registration fee",
  "processing fee",
  "security deposit",
  "pay money",
  "pay first",
  "urgent hiring",
  "earn money fast",
  "immediate joining",
  "no experience required",
  "limited vacancies",
  "whatsapp only",
  "send money"
];

const text = `
  ${jobTitle || ""}
  ${companyName || ""}
  ${description || ""}
`.toLowerCase();

let riskScore = 0;
let reasons = [];

suspiciousKeywords.forEach((keyword) => {
  if (text.includes(keyword)) {
    riskScore += 12;
    reasons.push(`Suspicious keyword detected: "${keyword}"`);
  }
});

// Gmail or Yahoo email check
if (
  email &&
  (email.includes("@gmail.com") ||
    email.includes("@yahoo.com"))
) {
  riskScore += 10;
  reasons.push(
    "Free email domain detected. Verify the company independently."
  );
}

// High salary check
if (salary && Number(salary) > 200000) {
  riskScore += 15;
  reasons.push(
    "Very high salary detected. Please verify the job offer."
  );
}

riskScore = Math.min(riskScore, 100);

let prediction;

if (riskScore >= 60) {
  prediction = "HIGH RISK - POTENTIAL SCAM";
} else if (riskScore >= 30) {
  prediction = "SUSPICIOUS JOB";
} else {
  prediction = "LOW RISK - APPEARS SAFE";
}

if (reasons.length === 0) {
  reasons.push(
    "No major scam indicators were detected from the provided information."
  );
}

const analysis = await JobAnalysis.create({
  jobTitle,
  companyName,
  description,
  salary,
  email,
  prediction,
  riskScore,
  reasons
});

res.json({
  success: true,
  prediction,
  riskScore,
  reasons,
  analysisId: analysis._id
});

} catch (error) {
console.error(error);

res.status(500).json({
  success: false,
  message: "Analysis failed"
});


}
});

app.get("/history", async (req, res) => {
try {
const history = await JobAnalysis.find()
.sort({ createdAt: -1 })
.limit(20);

res.json(history);

} catch (error) {
res.status(500).json({
message: "Unable to fetch history"
});
}
});

app.listen(5000, () => {
console.log("Server running at http://localhost:5000");
});
