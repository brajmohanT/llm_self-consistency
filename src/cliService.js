import chalk from "chalk";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const providerStyles = {
  OpenAI: chalk.green,
  Claude: chalk.magenta,
  Gemini: chalk.cyan,
};

function divider(label, color = chalk.cyan) {
  const line = "=".repeat(18);
  console.log(color.bold(`\n${line} ${label} ${line}\n`));
}

function getProviderStyle(provider) {
  return providerStyles[provider] || chalk.white;
}

export async function askUserPrompt() {
  const rl = readline.createInterface({ input, output });

  try {
    const prompt = await rl.question(chalk.bold.blue("Enter your prompt: "));
    return prompt.trim();
  } finally {
    rl.close();
  }
}

export function printLoading(message) {
  console.log(chalk.blue(`\n${message}`));
}

export function printModelResponses(modelResponses) {
  divider("MODEL RESPONSES", chalk.cyan);

  for (const response of modelResponses) {
    const providerStyle = getProviderStyle(response.provider);
    const status = response.success
      ? chalk.bgGreen.black(" SUCCESS ")
      : chalk.bgRed.white(" FAILED ");

    console.log(`${providerStyle.bold(response.provider)} ${status}`);

    if (response.success) {
      console.log(chalk.white(response.answer || "[Empty response]"));
    } else {
      console.log(chalk.red(response.error));
    }

    console.log(chalk.gray("-".repeat(56)));
  }
}

export function printFinalAnswer(finalAnswer) {
  divider("FINAL SYNTHESIZED ANSWER", chalk.yellow);
  console.log(chalk.whiteBright(finalAnswer));
}

export function printError(error) {
  console.error(chalk.red.bold(`\nError: ${error.message || error}`));
}
