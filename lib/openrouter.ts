import OpenAI from 'openai';

export const openrouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

export const FREE_MODEL = 'meta-llama/llama-3.1-8b-instruct';
// Other free models available:
// - google/gemma-2-9b-it
// - mistralai/mistral-7b-instruct
// - anthropic/claude-3-haiku

export async function chat(prompt: string, systemPrompt?: string) {
  return openrouter.chat.completions.create({
    model: FREE_MODEL,
    messages: [
      ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
      { role: 'user' as const, content: prompt },
    ],
  });
}

export async function chatJSON(prompt: string, systemPrompt: string) {
  const completion = await chat(prompt, systemPrompt);
  const content = completion.choices[0].message.content;
  try {
    return JSON.parse(content!);
  } catch {
    throw new Error(`Invalid JSON response: ${content}`);
  }
}