import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import toast from 'react-hot-toast';

const API_KEY = process.env.GEMINI_API_KEY || "";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required.' },
        { status: 400 }
      );
    }

    if (!API_KEY) {
      console.error("Error: API Key is missing.");
      return NextResponse.json(
        { error: 'API Key is missing.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Generate a Twitter tweet based on this description: ${description}`;
    console.log("Sending prompt to AI model:", prompt);

    const result = await model.generateContent([prompt]);

    if (result?.response) {
      const generatedText = await result.response.text();

      return NextResponse.json({ tweet: generatedText });
    } else {
      toast.error("No response received from AI model.");
      return NextResponse.json(
        { error: 'Failed to generate tweet.' },
        { status: 500 }
      );
    }
  } catch (error) {
    toast.error(error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
