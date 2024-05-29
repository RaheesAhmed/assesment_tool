import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const assistantId = process.env.OPENAI_ASSISTANT_ID;

const openai = new OpenAI({ apiKey });

if (!apiKey) {
  throw new Error("OpenAI API key is missing");
}

if (!assistantId) {
  throw new Error("OpenAI Assistant ID is missing");
}

export const chatWithAssistant = async (message) => {
  try {
    const assistant = await openai.beta.assistants.retrieve(assistantId);
    // Create a thread using the assistantId
    const thread = await openai.beta.threads.create();

    // Pass in the user question into the existing thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `generate the development plan 
       ${message}`,
    });

    // Create a run
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });

    // Fetch run-status
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    // Polling mechanism to see if runStatus is completed
    while (runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    // Get the last assistant message from the messages array
    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessageForRun = messages.data
      .filter(
        (message) => message.run_id === run.id && message.role === "assistant"
      )
      .pop();

    if (lastMessageForRun) {
      const assistantresponse = lastMessageForRun.content[0].text.value;

      console.log({ assistantresponse });

      return assistantresponse;
    } else {
      console.log("No response received from the assistant.");
    }
  } catch (error) {
    throw new Error(`Failed to chat with assistant response: ${error}`);
  }
};
