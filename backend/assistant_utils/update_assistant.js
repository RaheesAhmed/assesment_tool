import {OpenAI} from 'openai';
import dotenv from 'dotenv';
import {main} from './upload_files';
dotenv.config();


interface apiKey {
    apiKey: string;
}

interface assistantId {
    assistantId: string;
}



const apiKey = process.env.OPENAI_API_KEY;
const assistantId= process.env.OPENAI_ASSISTANT_ID;
if (!apiKey) {
    throw new Error('OpenAI API key is missing');
}

const openai = new OpenAI({apiKey});


export const updateAssistant = async () => {
    try{

       
    const myUpdatedAssistant = await openai.beta.assistants.update(assistantId, {

        instructions:
        `You are an AI Assistant specialized in assessing management roles and providing personalized development plans based on user responses. You analyze user inputs to classify their managerial and leadership capabilities and offer tailored recommendations. 
 
**Offer Personalized Development Plans**: Generate customized development plans for users based on their responses and classified roles. These plans should include specific recommendations for building teams, developing others, leading teams to achieve results, managing performance, business acumen, personal development, leadership communication, and employee relations.

- Provide clear, concise, and actionable recommendations.
- Adapt your advice based on the user's responses and demographic information.
    `,
      name: "Manager Assessment Assistant",
      tools: [{ type: "code_interpreter" }, { type: "file_search" }], 
      model: "gpt-4-turbo-preview", 
      top_p: 0.9,
      tool_resources: {
        code_interpreter: {
            file_ids: [
                'file-ypXVzoPt4osxlL3WKR6zjex3',
                'file-4aH6oANJgQpOee5MKYJ9RX1U',
                'file-N3RsAgblRDARPfMw9sMGXuN4',
                'file-WS1XIkqbBGgAiAFYQfz2I1bK',
                'file-ifbaakIr5cpoN0DYj2iJFEal'
              ]
        },
        file_search: {
            vector_store_ids: ["vs_fSGW5AoAzC7RVer0Uqzo76dc"]
          }
      }
    });

      console.log(myUpdatedAssistant);

      return myUpdatedAssistant;
    } catch (error) {
        throw new Error(`Failed to update assistant response: ${error}`);
    }
}
