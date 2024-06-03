import { OpenAI } from "openai";
import dotenv from "dotenv";
import { getResponsibilityLevel } from "../functions/framework.js";
import fs from "fs";
import path from "path";

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

export const GenerateAssesment = async (message) => {
  try {
    const assistant = await openai.beta.assistants.retrieve(assistantId);
    console.log("assistant retrieved");
    // Create a thread using the assistantId
    const thread = await openai.beta.threads.create();

    console.log("thread created");
    // Pass in the user question into the existing thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `${message}`,
    });

    // Create a run
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });
    console.log("run created");
    // Fetch run-status
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    // Handle required actions
    while (runStatus.status !== "completed") {
      if (
        runStatus.status === "requires_action" &&
        runStatus.required_action &&
        runStatus.required_action.submit_tool_outputs
      ) {
        const toolCalls =
          runStatus.required_action.submit_tool_outputs.tool_calls;
        console.log("toolCalls");
        const toolOutputs = await Promise.all(
          toolCalls.map(async (tool) => {
            if (tool.function.name === "getResponsibilityLevel") {
              const output = await getResponsibilityLevel();
              return {
                tool_call_id: tool.id,
                output: JSON.stringify(output),
              };
            }
          })
        );

        console.log("toolOutputs");

        if (toolOutputs.length > 0) {
          runStatus = await openai.beta.threads.runs.submitToolOutputsAndPoll(
            thread.id,
            run.id,
            { tool_outputs: toolOutputs }
          );
          console.log("Tool outputs submitted successfully.");
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      }
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
