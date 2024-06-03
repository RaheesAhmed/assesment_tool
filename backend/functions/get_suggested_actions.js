export async function getSuggestedActions(data) {
  const prompt = `Generate Suggested Actions for developing the following capability based on the participant’s role and responses:
    - Capability: ${data.capability}
    - Subcategory: ${data.subcategory}
    - Participant’s Role: ${data.role}
    - Participant’s Responsibilities: ${data.responsibilities}
    - Participant’s Specific Responses: ${JSON.stringify(
      data.specificResponses
    )}
  
    The Suggested Actions should:
    1. Provide specific suggestions for development activities.
    2. Include a range of activities such as training, mentoring, podcasts, reading materials, and other relevant activities.
    3. Tailor the suggestions to the participant’s unique situation and role.`;
  return prompt;
}
