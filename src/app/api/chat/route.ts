import axios from "axios";
import { NextResponse } from "next/server";

async function fetchChatResponse(message: string, retries = 3) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 429 &&
      retries > 0
    ) {
      console.warn(`Rate limit hit. Retrying... Attempts left: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
      return fetchChatResponse(message, retries - 1);
    }
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const data = await fetchChatResponse(message);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Too many requests, try again later" },
      { status: 429 }
    );
  }
}
