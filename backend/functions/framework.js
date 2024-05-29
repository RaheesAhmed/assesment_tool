// Import required modules
import fs from "fs";
import path from "path";

// Define the path to the JSON file
const filePath = path.join(process.cwd(), "../data/Responsibility_Level.json");

// Function to read the JSON file
export const readJsonFile = (filePath) => {
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
    const data = await readJsonFile(filePath);
    console.log(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
};
