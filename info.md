## What We are building: 

In this project, We will build a GenAI application (CLI Based) that uses the self-consistency technique to generate a better final answer for the user.


The user will enter a question or prompt. our app should send the same prompt to multiple AI models (OpenAI, Cluade, Gemini). 

Each model will return its own answer. After collecting all responses, our system should pass those answers to a final evaluator model (Claude), and ask it to compare the outputs, identify the strongest parts, and generate the best possible final response.

The final answer shown to the user should not simply copy one model’s response. It should be a refined output created after analyzing all model responses.

Application should include:

User input prompt
Responses from different AI models
Final synthesized answer
Proper orchestration of API calls
Loading and error handling
Clear output formatting

We are expected to code the complete flow, orchestrate multiple model calls properly.


Execution


Documentation:

OpenAI: https://developers.openai.com/api/docs/libraries
Cluade: https://platform.claude.com/docs/en/cli-sdks-libraries/sdks/typescript
Gemini:https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/sdks/overview#googlegenaisdk_quickstart-nodejs_genai_sdk



