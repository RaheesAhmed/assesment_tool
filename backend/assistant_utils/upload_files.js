import OpenAI from "openai";
import fs from "fs";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function createVectorStore(name) {
    const vectorStore = await openai.beta.vectorStores.create({
        name: name
    });
    console.log("Vector Store Created:", vectorStore);
    return vectorStore;
}

async function uploadFile(filePath, purpose) {
    const fileStream = fs.createReadStream(filePath);
    const file = await openai.files.create({
        file: fileStream,
        purpose: purpose
    });
    console.log(`File Uploaded: ${file.filename}, ID: ${file.id}`);
    return file;
}

async function addFilesToVectorStore(vectorStoreId, fileIds) {
    const batch = await openai.beta.vectorStores.fileBatches.create(vectorStoreId, {
        file_ids: fileIds
    });
    console.log("Files added to Vector Store in batch:", batch);
    return batch;
}



export async function main() {
    try {
        // Create a Vector Store
        const vectorStore = await createVectorStore("Manager Assessment Json Data");

        // Upload files and get file IDs
        const files = [
                   "D:/Tools/assessment_tool/app/data/cell_defination.json",
            "D:/Tools/assessment_tool/app/data/cell_explnation.json",
            
            "D:/Tools/assessment_tool/app/data/level_1_question.json",
            "D:/Tools/assessment_tool/app/data/level_2_questions.json",
            "D:/Tools/assessment_tool/app/data/Responsibility_Level.json"
        ];
        const fileIds = [];
        for (const file of files) {
            const uploadedFile = await uploadFile(file, "assistants");
            fileIds.push(uploadedFile.id);
        }

        // Add files to Vector Store
        await addFilesToVectorStore(vectorStore.id, fileIds);

        console.log(fileIds)
        return fileIds;

       

    } catch (error) {
        console.error("An error occurred:", error);
    }
}


