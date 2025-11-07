import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DB_FILE = "./submissions.json";

// POST → Receive Form Submission
app.post("/api/enroll", (req, res) => {
  const newEntry = req.body;

  // load existing data
  let data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  data.push({ ...newEntry, submittedAt: new Date().toISOString() });

  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

  res.json({ success: true, message: "Form submitted successfully!" });
});

// GET → View All Submissions (optional)
app.get("/api/enroll", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
