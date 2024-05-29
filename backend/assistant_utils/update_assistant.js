import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = "sk-rahees-Y6clJBmGm1xVtMkxRb6DT3BlbkFJmnrvAHECFSAqiqbGg2eP";
const assistantId = "asst_fCWjCF3XVeiKi74Ecd5ovTiz";
if (!apiKey) {
  throw new Error("OpenAI API key is missing");
}

const openai = new OpenAI({ apiKey });

export const updateAssistant = async () => {
  try {
    const myUpdatedAssistant = await openai.beta.assistants.update(
      assistantId,
      {
        instructions: `You are an AI Assistant specialized in assessing management roles and providing personalized development plans based on user responses. You will get the responsibility levels and all required questions and answers from the user. Your main tasks are: 
read the json file and get the idea about roles and responsibility levels and its descriptions for different roles and than 
 
**Offer Personalized Development Plans**: Generate customized development plans for users based on their responses and classified roles. These plans should include specific recommendations for building teams, developing others, leading teams to achieve results, managing performance, business acumen, personal development, leadership communication, and employee relations.

- Provide clear, concise, and actionable recommendations.
- Adapt your advice based on the user's responses and demographic information.
always give the response in json format like {} no need to add json{} just return the json object like this :{}
        `,
        name: "Manager Assessment Assistant",
        tools: [
          {
            type: "function",
            function: {
              name: "readJsonFile",
              description:
                "Read the JSON file containing responsibility levels and its descriptions for different roles to understand the roles and responsibilities better.",
              parameters: {
                type: "object",
                properties: {
                  filePath: {
                    type: "string",
                    description: "The path to the JSON file",
                  },
                },
                required: ["filePath"],
              },
            },
          },
          {
            type: "function",
            function: {
              name: "getResponsibilityLevel",
              description:
                "Get the responsibility levels from the JSON file for different roles to understand the roles and responsibilities better.",
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
