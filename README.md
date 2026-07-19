# Self-Consistency CLI

This project is a CLI-based GenAI app. It takes one prompt from the terminal, sends that prompt to multiple AI providers, and then asks Claude to create one final answer from the successful responses.

## How It Works

0. Demo is included : [demo.mp4](https://github.com/brajmohanT/llm_self-consistency/blob/master/demo.mp4)
1. The user runs the app with `npm start`.
2. The CLI asks for a prompt.
3. The app sends the same prompt to OpenAI, Claude, and Gemini.
4. Each provider returns its own answer.
5. Claude receives the original prompt plus the model answers.
6. Claude compares the responses and writes one synthesized final answer.

## CLI Or UI

This app is CLI-based. It does not include a browser UI or frontend.

## Models And Providers

The app uses these providers:

- OpenAI through the `openai` SDK
- Claude through the `@anthropic-ai/sdk` package
- Gemini through the `@google/genai` package


## Self-Consistency Flow

The self-consistency flow lives across three files:

- `index.js` controls the main app flow.
- `src/modelService.js` initializes SDK clients and calls OpenAI, Claude, and Gemini.
- `src/evaluator.js` sends all successful model responses to Claude for the final answer.

The app uses `Promise.allSettled()` for provider calls. If one provider fails, the app still keeps the successful responses and sends them to the evaluator. If all providers fail, the app prints an error instead of generating a final answer.

## Running The App

Create a `.env` file with:

```text
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=
```

Then run:

```bash
npm start
```
