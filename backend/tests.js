import { analyzeResponses } from "./functions/analyze_responses.js";
import Joi from "joi";
import { getQuestionsByLevel, inputSchema } from "./functions/input_schema.js";
import { GenerateAssesment } from "./functions/generate_assesment.js";

import { OpenAI } from "openai";

describe("analyzeResponses", () => {
  it("should return Chief Officer", () => {
    const data = {
      directReports: 11,
      decisionLevel: "Strategic",
      levelsToCEO: 1,
      managesBudget: true,
    };
    expect(analyzeResponses(data)).toEqual({
      responsibilityLevel: "Chief Officer",
    });
  });

  it("should return Executive Vice President", () => {
    const data = {
      directReports: 6,
      decisionLevel: "Strategic",
      levelsToCEO: 2,
      managesBudget: false,
    };
    expect(analyzeResponses(data)).toEqual({
      responsibilityLevel: "Executive Vice President",
    });
  });

  it("should return Individual Contributor", () => {
    const data = {
      directReports: 0,
      decisionLevel: "Operational",
      levelsToCEO: 10,
      managesBudget: false,
    };
    expect(analyzeResponses(data)).toEqual({
      responsibilityLevel: "Individual Contributor",
    });
  });
});

describe("getQuestionsByLevel", () => {
  it("should return questions for a given level", () => {
    const level = "Chief Officer";
    const questions = getQuestionsByLevel(level);
    expect(questions).toBeDefined();
    expect(questions.Lvl).toEqual(10);
  });

  it("should return an empty object for an invalid level", () => {
    const level = "Invalid Level";
    const questions = getQuestionsByLevel(level);
    expect(questions).toEqual({});
  });
});

describe("inputSchema", () => {
  it("should validate a valid input", () => {
    const input = {
      name: "John Doe",
      industry: "Software",
      companySize: 500,
      department: "Engineering",
      jobTitle: "Software Engineer",
      directReports: 0,
      rolesReportingToYou: "None",
      decisionLevel: "Operational",
      typicalProject: "Web Development",
      levelsToCEO: 5,
      managesBudget: false,
      budgetDetails: "None",
    };
    const { error } = inputSchema.validate(input);
    expect(error).toBeUndefined();
  });

  it("should invalidate an invalid input", () => {
    const input = {
      name: "John Doe",
      industry: "Software",
      companySize: "Large", // Invalid, should be a number
      department: "Engineering",
      jobTitle: "Software Engineer",
      directReports: 0,
      rolesReportingToYou: "None",
      decisionLevel: "Operational",
      typicalProject: "Web Development",
      levelsToCEO: 5,
      managesBudget: false,
      budgetDetails: "None",
    };
    const { error } = inputSchema.validate(input);
    expect(error).toBeDefined();
  });
});

jest.mock("openai", () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => {
      return {
        beta: {
          assistants: {
            retrieve: jest.fn().mockResolvedValue({ id: "assistantId" }),
          },
          threads: {
            create: jest.fn().mockResolvedValue({ id: "threadId" }),
            messages: {
              create: jest.fn(),
              list: jest.fn().mockResolvedValue({
                data: [
                  {
                    run_id: "runId",
                    role: "assistant",
                    content: [{ text: { value: "assistant response" } }],
                  },
                ],
              }),
            },
            runs: {
              create: jest.fn().mockResolvedValue({ id: "runId" }),
              retrieve: jest.fn().mockResolvedValue({ status: "completed" }),
            },
          },
        },
      };
    }),
  };
});

describe("GenerateAssesment", () => {
  it("should return assistant response", async () => {
    const message = "test message";
    const response = await GenerateAssesment(message);
    expect(response).toEqual("assistant response");
  });

  it("should throw an error if the assistant fails", async () => {
    OpenAI.mockImplementationOnce(() => {
      throw new Error("Failed to chat with assistant");
    });

    const message = "test message";
    await expect(GenerateAssesment(message)).rejects.toThrow(
      "Failed to chat with assistant"
    );
  });
});
