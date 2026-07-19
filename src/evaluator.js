import Anthropic from "@anthropic-ai/sdk";

const DEFAULT_EVALUATOR_MODEL = "claude-opus-4-6";

function requireAnthropicKey() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("Missing required environment variable: ANTHROPIC_API_KEY");
  }

  return process.env.ANTHROPIC_API_KEY;
}

function extractText(message) {
  return message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}

function buildEvaluatorPrompt(originalPrompt, successfulResponses) {
  const responseText = successfulResponses
    .map(
      (response) => `Provider: ${response.provider}\nAnswer:\n${response.answer}`
    )
    .join("\n\n---\n\n");

  return `You are evaluating multiple AI model answers to the same user prompt.

Original user prompt:
${originalPrompt}

Model responses:
${responseText}

Create the best possible final answer for the user. Do not simply copy one response. Compare the answers, keep the strongest parts, remove weak or incorrect parts, and produce one refined response.`;
}

export async function generateFinalAnswer(originalPrompt, modelResponses) {
  const successfulResponses = modelResponses.filter(
    (response) => response.success && response.answer
  );

  if (successfulResponses.length === 0) {
    throw new Error("No successful model responses available for evaluation.");
  }

  const client = new Anthropic({
    apiKey: requireAnthropicKey(),
  });

  const message = await client.messages.create({
    model: process.env.EVALUATOR_MODEL || DEFAULT_EVALUATOR_MODEL,
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: buildEvaluatorPrompt(originalPrompt, successfulResponses),
      },
    ],
  });

  return extractText(message);
}
