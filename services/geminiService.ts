import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const MODEL_NAME = "gemini-2.5-flash";

export const generateTests = async (code: string, framework: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `
    You are an expert Software Test Engineer Agent.
    Task: Generate comprehensive unit tests for the following code using ${framework}.
    
    Requirements:
    1. Cover happy paths and edge cases.
    2. Mock external dependencies if apparent.
    3. Use best practices for the chosen framework.
    4. Provide a brief explanation of the test strategy at the beginning.

    Code:
    \`\`\`
    ${code}
    \`\`\`
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
  });

  return response.text || "No response generated.";
};

export const debugCode = async (code: string, errorLog: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `
    You are an expert Debugging Agent.
    Task: Analyze the provided code and error log to identify the bug.
    
    Requirements:
    1. Explain the root cause of the error.
    2. Provide the corrected code snippet.
    3. Explain why the fix works.

    Code:
    \`\`\`
    ${code}
    \`\`\`

    Error Log / Context:
    \`\`\`
    ${errorLog}
    \`\`\`
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
  });

  return response.text || "No response generated.";
};

export const reviewCode = async (code: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `
    You are a Senior Code Review Agent.
    Task: Perform a strict code review on the following snippet.
    
    Focus Areas:
    1. Security Vulnerabilities
    2. Performance Optimization
    3. Code Style & Best Practices (Clean Code)
    4. Maintainability

    Format the output as a structured Markdown report with headers for each section.

    Code:
    \`\`\`
    ${code}
    \`\`\`
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
  });

  return response.text || "No response generated.";
};

export const analyzeLogs = async (logs: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `
    You are an Incident Response & Log Analysis Agent.
    Task: Analyze the following raw log data.

    Requirements:
    1. Categorize the incidents (e.g., Database Connection, Auth Failure, Timeout).
    2. Identify the severity of each issue.
    3. Suggest immediate remediation steps for critical errors.

    Logs:
    \`\`\`
    ${logs}
    \`\`\`
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
  });

  return response.text || "No response generated.";
};

export const refactorCode = async (code: string): Promise<string> => {
  const ai = getAIClient();
  const prompt = `
    You are a Refactoring Specialist Agent.
    Task: Refactor the following code to improve quality without changing behavior.

    Goals:
    1. Improve readability.
    2. Reduce complexity (Cyclomatic complexity).
    3. Improve variable naming and modularity.
    4. Optimize for modern language features.

    Provide the refactored code and a summary of changes.

    Code:
    \`\`\`
    ${code}
    \`\`\`
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
  });

  return response.text || "No response generated.";
};