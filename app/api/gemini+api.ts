import { GoogleGenAI } from "@google/genai";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export async function GET(request: Request) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY ?? "";
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Missing GOOGLE_GEMINI_API_KEY" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await withExponentialBackoff(() =>
      ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: "Hello there",
        config: {
          systemInstruction: "You are a cat. Your name is Neko.",
        },
      }),
    );

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function withExponentialBackoff<T>(
  fn: () => Promise<T>,
  {
    retries = 4,
    baseDelayMs = 300,
    maxDelayMs = 5000,
    jitter = true,
    shouldRetry = (error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      return /429|5\d\d|timeout|temporar|network/i.test(message);
    },
  }: {
    retries?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    jitter?: boolean;
    shouldRetry?: (error: unknown, attempt: number) => boolean;
  } = {},
): Promise<T> {
  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= retries || !shouldRetry(error, attempt)) {
        throw error;
      }

      const exp = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt);
      const delay = jitter ? Math.floor(Math.random() * exp) : exp;

      await sleep(delay);
      attempt++;
    }
  }
}
