export const analyzeResponses = (data) => {
  const { directReports, decisionLevel, levelsToCEO, managesBudget } = data;
  let responsibilityLevel = "Individual Contributor";

  if (
    directReports > 10 &&
    decisionLevel === "Strategic" &&
    levelsToCEO <= 1 &&
    managesBudget
  ) {
    responsibilityLevel = "Chief Officer";
  } else if (
    directReports > 5 &&
    decisionLevel === "Strategic" &&
    levelsToCEO <= 2
  ) {
    responsibilityLevel = "Executive Vice President";
  } else if (
    directReports > 5 &&
    decisionLevel === "Tactical" &&
    levelsToCEO <= 3
  ) {
    responsibilityLevel = "Senior Vice President";
  } else if (
    directReports > 5 &&
    decisionLevel === "Operational" &&
    levelsToCEO <= 4
  ) {
    responsibilityLevel = "Senior Director / Vice President";
  } else if (
    directReports > 3 &&
    decisionLevel === "Operational" &&
    levelsToCEO <= 5
  ) {
    responsibilityLevel = "Director";
  } else if (
    directReports > 2 &&
    decisionLevel === "Operational" &&
    levelsToCEO <= 6
  ) {
    responsibilityLevel = "Senior Manager / Associate Director";
  } else if (
    directReports > 1 &&
    decisionLevel === "Operational" &&
    levelsToCEO <= 7
  ) {
    responsibilityLevel = "Manager";
  } else if (
    directReports > 0 &&
    decisionLevel === "Operational" &&
    levelsToCEO <= 8
  ) {
    responsibilityLevel = "Supervisor";
  } else if (
    directReports === 0 &&
    decisionLevel === "Operational" &&
    levelsToCEO <= 9
  ) {
    responsibilityLevel = "Team Lead";
  }

  return { responsibilityLevel };
};
