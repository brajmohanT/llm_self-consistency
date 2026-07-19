import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export async function askUserPrompt() {
  const rl = readline.createInterface({ input, output });

  try {
    const prompt = await rl.question("Enter your prompt: ");
    return prompt.trim();
  } finally {
    rl.close();
  }
}

export function printLoading(message) {
  console.log(`\n${message}`);
}

export function printModelResponses(modelResponses) {
  console.log("\n================ MODEL RESPONSES ================\n");

  for (const response of modelResponses) {
    console.log(`--- ${response.provider} ---`);

    if (response.success) {
      console.log(response.answer || "[Empty response]");
    } else {
      console.log(`Failed: ${response.error}`);
    }

    console.log("");
  }
}

export function printFinalAnswer(finalAnswer) {
  console.log("================ FINAL SYNTHESIZED ANSWER ================\n");
  console.log(finalAnswer);
}

export function printError(error) {
  console.error(`\nError: ${error.message || error}`);
}
