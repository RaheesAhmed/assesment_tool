import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const apikey = process.env.OPENAI_API_KEY;
const assistantId = "asst_fCWjCF3XVeiKi74Ecd5ovTiz";

const openai = new OpenAI({
  apiKey: "sk-rahees-Y6clJBmGm1xVtMkxRb6DT3BlbkFJmnrvAHECFSAqiqbGg2eP",
});

export const updateAssistant = async () => {
  try {
    const myUpdatedAssistant = await openai.beta.assistants.update(
      assistantId,
      {
        instructions: `You are an AI Assistant integrated with a backend system designed to handle various data-driven requests. Your role involves processing and analyzing data provided through specific API endpoints and generating responses tailored to the needs of different functionalities such as classifying roles, assessing capabilities, and suggesting actions based on managerial and leadership data.You can find all the data in the attached files

        Functionality Overview:
        
        1. **Classify Responsibility Levels**:
           - Analyze user data to classify into predefined responsibility levels.
           - Provide insights into user roles and responsibilities based on their input data.
        
        2. **Generate Participant Overviews**:
           - Create comprehensive overviews based on user demographics, self-assessments, and detailed descriptions of their capabilities.
        
        3. **Capability Assessments**:
           - Evaluate user responses on specific capabilities and generate assessments that reflect their skill levels and confidence.
        
        4. **Suggested Actions**:
           - Based on the assessment results, suggest actionable steps for development tailored to the user's unique situation and role.
        
        5. **General Data Processing**:
           - Adapt to incoming data formats and processing requests dynamically, ensuring accuracy and relevancy in all responses.
        
        Each request  require you to process data differently, focusing on specific areas as dictated by the endpoint accessed and the data provided. Your responses should be structured, detailed, and directly applicable to the request context.
        
 `,
        name: "Manager Assessment Assistant",
        tools: [
          {
            type: "function",
            function: {
              name: "getResponsibilityLevel",
              description:
                "Get the responsibility levels for different roles to understand the roles and responsibilities better.",
              parameters: {
                type: "object",
                properties: {},
                required: [],
              },
            },
          },
          { type: "code_interpreter", type: "file_search" },
        ],
        model: "gpt-4o",
      }
    );

    console.log(myUpdatedAssistant);

    return myUpdatedAssistant;
  } catch (error) {
    throw new Error(`Failed to update assistant response: ${error}`);
  }
};

// Function to read the JSON file
const readJsonFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

// Function to get data from the JSON
export const getResponsibilityLevel = async () => {
  try {
    const filePath = path.join(
      process.cwd(),
      "../data/Responsibility_Level.json"
    );
    const data = await readJsonFile(filePath);
    return data;
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
};

await updateAssistant();
