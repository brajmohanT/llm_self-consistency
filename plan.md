# Self-Consistency CLI Execution Plan

## Summary
Build an ES6 Node.js CLI app that takes one user prompt, sends it to OpenAI, Claude, and Gemini, then sends all successful responses to Claude for final synthesis. Provider SDK usage follows the documentation linked in `info.md`. Do not edit `info.md`.

## File Structure
```text
self-consistency/
  index.js
  plan.md
  package.json
  package-lock.json
  info.md
  .env
  .env.example
  src/
    modelService.js
    cliService.js
    evaluator.js
```

## Implementation Changes
- Use ES6 `import/export` by setting `"type": "module"` in `package.json`.
- Use `dotenv` to load `.env` values.
- Keep SDK initialization and provider model calls together in `src/modelService.js`.
- Keep CLI input and output formatting together in `src/cliService.js`.
- Keep Claude-based synthesis logic in `src/evaluator.js`.
- Keep `index.js` focused on orchestration only.

## Environment
```text
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=

OPENAI_MODEL=gpt-5.5
ANTHROPIC_MODEL=claude-opus-4-6
GEMINI_MODEL=gemini-2.5-flash
EVALUATOR_MODEL=claude-opus-4-6
```

## Test Plan
- Run `npm start` and enter a normal prompt.
- Confirm OpenAI, Claude, and Gemini calls are attempted.
- Confirm one provider failure does not stop the whole app if other responses succeed.
- Confirm empty input exits cleanly.
- Confirm output shows individual model responses and one final synthesized answer.

## Assumptions
- `info.md` remains unchanged.
- Claude is both one candidate model and the final evaluator.
- Provider model names can be overridden with environment variables.
