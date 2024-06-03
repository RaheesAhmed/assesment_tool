import fs from "fs";

// Function to get role information
async function getRoleInformation(filePath, roleName) {
  // Read and parse the JSON file
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Find the role in the data
  const roleInfo = data.find((role) => role[" Role Name"] === roleName);

  if (roleInfo) {
    return {
      description: roleInfo.Description,
      buildingTeam: roleInfo[" Building a Team"],
      developingOthers: roleInfo[" Developing Others"],
      leadingTeam: roleInfo[" Leading a Team to Get Results"],
      managingPerformance: roleInfo[" Managing Performance"],
      managingBusiness: roleInfo[" Managing the Business (Business Acumen)"],
      personalDevelopment: roleInfo[" Personal Development"],
      communicatingAsLeader: roleInfo["Communicating as a Leader"],
      creatingEnvironment:
        roleInfo[" Creating the Environment (Employee Relations)"],
    };
  } else {
    return null;
  }
}
const role = "Manager";
// Example usage
const roleName = ` ${role}`;
const filePath = "./roles_explnation.json";
const roleInformation = await getRoleInformation(filePath, roleName);

if (roleInformation) {
  console.log("Role Information:", roleInformation);
} else {
  console.log("Role not found");
}
