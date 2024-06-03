export const getParticipantOverview = async (data) => {
  // Construct the prompt for ChatGPT
  const prompt = `Generate a Participant Overview based on the following data:
    - Demographic information: ${JSON.stringify(data.demographics)}
    - Self-ratings on 8 capabilities: ${JSON.stringify(data.selfRatings)}
    - Explanations of skills and confidence: ${JSON.stringify(
      data.explanations
    )}
  
    The Participant Overview should:
    1. Provide summarized insights based on the demographic information.
    2. Offer an analyzed and interpreted summary of the self-assessment scores for each capability.
    3. Synthesize insights from the explanations of skills and confidence levels.
    4. Include high-level thoughts on which capabilities the participant should focus on.`;
  return prompt;
};
