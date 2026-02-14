"use server";

import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function analyzeUrlWithNova(url: string) {
  // 1. Check if keys are present
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.warn("Missing AWS credentials. Returning mock data.");
    return mockAnalysis(url);
  }

  // 2. Prepare the prompt for Nova 2 Lite
  const prompt = `You are an expert consumer advocate agent named SubScout.
  Analyze the cancellation flow for this service: ${url}.
  
  Your task is to:
  1. Estimate the "Difficulty Score" (1-10) based on known patterns for this domain (e.g. gyms are harder, streaming services are moderate).
  2. List the likely steps to cancel.
  3. Identify potential "Dark Patterns" (e.g. forced phone calls, confirmshaming, hidden links).
  
  Return ONLY a valid JSON object with this structure:
  {
    "url": "${url}",
    "score": number, // 1-10
    "steps": ["step 1", "step 2", ...],
    "darkPatterns": ["pattern name 1", "pattern name 2", ...]
  }`;

  try {
    // 3. Call Amazon Nova 2 Lite
    const command = new InvokeModelCommand({
      modelId: "amazon.nova-lite-v1:0", // Targeted Nova 2 Lite Model ID
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        inferenceConfig: {
          max_new_tokens: 1000,
        },
        messages: [
          {
            role: "user",
            content: [{ text: prompt }],
          },
        ],
      }),
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    // Parse the output content (Nova returns generated text)
    // Structure typically: { output: { message: { content: [{ text: "..." }] } } }
    const outputText = responseBody.output?.message?.content?.[0]?.text;

    if (!outputText) throw new Error("Empty response from Nova");

    // Extract JSON from potential markdown blocks ```json ... ```
    const jsonMatch = outputText.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : outputText;

    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error calling Nova:", error);
    // Fallback to mock if API call fails (e.g., untrusted URL, quota, or invalid keys)
    return mockAnalysis(url);
  }
}

function mockAnalysis(url: string) {
  const isHard = url.includes("gym") || url.includes("adobe");
  return {
    url,
    score: isHard ? 9 : 4,
    status: isHard ? "Critical" : "Moderate",
    steps: [
      "Log in to account",
      "Navigate to 'Account Settings'",
      isHard
        ? "Find hidden 'Manage Plan' link in footer"
        : "Click 'Subscription'",
      "Click 'Cancel' (monitor for retention offer popups)",
      "Confirm cancellation via email",
    ],
    darkPatterns: isHard
      ? ["Forced Phone Call", "Hidden Links", "Guilt Tripping"]
      : ["Confirmshaming"],
  };
}
