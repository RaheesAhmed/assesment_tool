import Joi from "joi";
import fs from "fs";
import path from "path";

const questionsFilePath = path.join(
  process.cwd(),
  "data/level_1_question.json"
);

// Load and parse the questions JSON file
const questions = JSON.parse(fs.readFileSync(questionsFilePath, "utf8"));

// Mapping of responsibility levels to their corresponding Lvl values in the questions JSON
const levelMapping = {
  "Chief Officer": 10,
  "Executive Vice President": 9,
  "Senior Vice President": 8,
  "Senior Director / Vice President": 7,
  Director: 6,
  "Senior Manager / Associate Director": 5,
  Manager: 4,
  Supervisor: 3,
  "Team Lead": 2,
  "Individual Contributor": 1,
};

// Function to fetch questions by responsibility level
export const getQuestionsByLevel = (level) => {
  const lvl = levelMapping[level];
  return questions.find((q) => q.Lvl === lvl) || {};
};

export const inputSchema = Joi.object({
  name: Joi.string().required(),
  industry: Joi.string().required(),
  companySize: Joi.number().integer().required(),
  department: Joi.string().required(),
  jobTitle: Joi.string().required(),
  directReports: Joi.number().integer().required(),
  rolesReportingToYou: Joi.string().required(),
  decisionLevel: Joi.string()
    .valid("Operational", "Tactical", "Strategic")
    .required(),
  typicalProject: Joi.string().required(),
  levelsToCEO: Joi.number().integer().required(),
  managesBudget: Joi.boolean().required(),
  budgetDetails: Joi.string().optional(),
});
