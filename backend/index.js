import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { inputSchema, getQuestionsByLevel } from "./functions/input_schema.js";
import { analyzeResponses } from "./functions/analyze_responses.js";
import { GenerateAssesment } from "./functions/generate_assesment.js";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/api/classify", (req, res) => {
  return res.json({ message: "Welcome to Assesment API" });
});

app.post("/api/classify", (req, res) => {
  const { error, value } = inputSchema.validate(req.body);
  console.log("value", value);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const classification = analyzeResponses(value);
  console.log("classification", classification);
  res.json({ classification: classification });
});

app.post("/api/assessment", (req, res) => {
  const { error, value } = inputSchema.validate(req.body);
  console.log("value", value);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const classification = analyzeResponses(value);
  console.log("value", classification);
  const questions = getQuestionsByLevel(classification.responsibilityLevel);

  res.json({ classification, questions });
});

app.post("/api/generate", async (req, res) => {
  const { error, value } = req.body;
  console.log("value", value);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const formattedData = JSON.stringify(value);

  const generateAssesment = await GenerateAssesment(formattedData);
  console.log("ASSESMENT: ", generateAssesment);

  res.json({ assesment: generateAssesment });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
