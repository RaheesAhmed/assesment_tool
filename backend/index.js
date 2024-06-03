import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { inputSchema, getQuestionsByLevel } from "./functions/input_schema.js";
import { analyzeResponses } from "./functions/analyze_responses.js";
import { GenerateAssesment } from "./functions/generate_assesment.js";
import { getParticipantOverview } from "./functions/get_participant_overview.js";
import { getCapabilityAssessment } from "./functions/get_capability_assessment.js";
import { getSuggestedActions } from "./functions/get_suggested_actions.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
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

app.post("/api/participant-overview", async (req, res) => {
  try {
    const data = req.body;
    const overview = await getParticipantOverview(data);

    console.log("overview", overview);

    const response = await GenerateAssesment(overview);
    res.json({ overview: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/capability-assessment", async (req, res) => {
  try {
    const data = req.body; // Data from Zapier
    const assessment = await getCapabilityAssessment(data);

    const response = await GenerateAssesment(assessment);
    res.json({ assessment: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/suggested-actions", async (req, res) => {
  try {
    const data = req.body; // Data from Zapier
    const actions = await getSuggestedActions(data);

    const response = await GenerateAssesment(actions);
    res.json({ actions: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
