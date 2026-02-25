export const callGemini = async (prompt: string, schema = null) => {
  const apikey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY ?? "";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apikey}`;

  const payload: any = { contents: [{ parts: [{ text: prompt }] }] };

  // Use structured JSON schema if provided
  if (schema) {
    payload.generationConfig = {
      responseMimeType: "application/json",
      responseSchema: schema,
    };
  }

  // Exponential backoff retry logic
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      //   console.log(res);

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      if (attempt === 4) throw error;
      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
    }
  }
};
