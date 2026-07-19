import "dotenv/config";

import { askUserPrompt, printError, printFinalAnswer, printLoading, printModelResponses } from "./src/cliService.js";
import { generateFinalAnswer } from "./src/evaluator.js";
import { callAllModels } from "./src/modelService.js";

async function main() {
  try {
    const prompt = await askUserPrompt();

    if (!prompt) {
      console.log("No prompt entered. Exiting.");
      return;
    }

    printLoading("Calling OpenAI, Claude, and Gemini...");
    const modelResponses = await callAllModels(prompt);

    printModelResponses(modelResponses);

    printLoading("Synthesizing final answer with Claude...");
    const finalAnswer = await generateFinalAnswer(prompt, modelResponses);

    printFinalAnswer(finalAnswer);
  } catch (error) {
    printError(error);
    process.exitCode = 1;
  }
}

main();
