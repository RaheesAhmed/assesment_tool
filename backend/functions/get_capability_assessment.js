export async function getCapabilityAssessment(data) {
  const prompt = `Generate a Capability Assessment based on the following data:
    - Capability: ${data.capability}
    - Skill rating: ${data.skillRating}
    - Confidence rating: ${data.confidenceRating}
    - Subcategory responses: ${JSON.stringify(data.subcategoryResponses)}
    - Responsibility level: ${data.responsibilityLevel}
  
    The Capability Assessment should:
    1. Provide an interpretation of the skill and confidence ratings as they relate to the responsibilities for the specified responsibility level.
    2. Offer observations based on the participant’s responses to subcategory questions, related to their responsibility level.
    3. Make observations only, without suggesting actions.`;
  return prompt;
}
