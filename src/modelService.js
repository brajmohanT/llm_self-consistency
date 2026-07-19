import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenAI } from "@google/genai";

const DEFAULT_OPENAI_MODEL = "gpt-4o-mini";
const DEFAULT_ANTHROPIC_MODEL = "claude-haiku-4-5";
const DEFAULT_GEMINI_MODEL = "gemini-3.1-flash-lite";

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function createOpenAIClient() {
  return new OpenAI({
    apiKey: requireEnv("OPENAI_API_KEY"),
  });
}

function createAnthropicClient() {
  return new Anthropic({
    apiKey: requireEnv("ANTHROPIC_API_KEY"),
  });
}

function createGeminiClient() {
  return new GoogleGenAI({
    apiKey: requireEnv("GEMINI_API_KEY"),
  });
}

function extractAnthropicText(message) {
  return message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}

export async function callOpenAI(prompt) {
  const client = createOpenAIClient();
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || DEFAULT_OPENAI_MODEL,
    input: prompt,
  });

  return response.output_text;
}

export async function callClaude(prompt) {
  const client = createAnthropicClient();
  const message = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || DEFAULT_ANTHROPIC_MODEL,
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });

  return extractAnthropicText(message);
}

export async function callGemini(prompt) {
  const client = createGeminiClient();
  const response = await client.models.generateContent({
    model: process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL,
    contents: prompt,
  });

  return response.text;
}

export async function callAllModels(prompt) {
  const calls = [
    { provider: "OpenAI", call: callOpenAI },
    { provider: "Claude", call: callClaude },
    { provider: "Gemini", call: callGemini },
  ];

  const results = await Promise.allSettled(
    calls.map(async ({ provider, call }) => ({
      provider,
      answer: await call(prompt),
    }))
  );

  return results.map((result, index) => {
    const provider = calls[index].provider;

    if (result.status === "fulfilled") {
      return {
        provider,
        success: true,
        answer: result.value.answer,
      };
    }

    return {
      provider,
      success: false,
      error: result.reason?.message || String(result.reason),
    };
  });
}
