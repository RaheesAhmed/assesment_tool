import {OpenAI} from 'openai';
import dotenv from 'dotenv';

dotenv.config();


interface apiKey {
    apiKey: string;
}



const apiKey = process.env.OPENAI_API_KEY;
const assistantId= process.env.OPENAI_ASSISTANT_ID;


if (!apiKey) {
    throw new Error('OpenAI API key is missing');
}

if (!assistantId) {
    throw new Error('OpenAI Assistant ID is missing');
}



const openai = new OpenAI({apiKey});

export const retrieveAssistant = async () => {
    try {
        const myAssistant = await openai.beta.assistants.retrieve(assistantId);

        console.log('Assistant retrieved successfully');

        return myAssistant;
    } catch (error) {
        throw new Error(`Failed to retrieve assistant response: ${error}`);
    }
}
