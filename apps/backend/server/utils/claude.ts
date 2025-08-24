import axios from "axios";

export default async function generateWithClaude(prompt: string): Promise<string> {
  try {
    const res = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-sonnet-20240229", 
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
      },
      {
        headers: {
          "x-api-key": process.env.CLAUDE_API_KEY!,
          "anthropic-version": "2023-06-01", 
        },
      }
    );

    return res.data?.content?.[0]?.text || "Claude response unavailable";
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Claude API AxiosError:", err.response?.data || err.message);
    } else if (err instanceof Error) {
      console.error("Claude API Error:", err.message);
    } else {
      console.error("Claude API Unknown error", err);
    }
    return "Claude API call failed";
  }
}
