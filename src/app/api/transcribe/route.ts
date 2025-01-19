import { NextRequest, NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";
export async function POST(req: NextRequest) {
  const client = new AssemblyAI({
    apiKey:
      process.env.ASSEMBLYAI_API_KEY ||
      (() => {
        throw new Error("ASSEMBLYAI_API_KEY is not defined");
      })(),
  });
  const { audioUrl } = await req.json();
  const config = {
    audio_url: audioUrl,
  };

  const transcript = await client.transcripts.transcribe(config);
  console.log(transcript.text);
  return NextResponse.json(transcript.text);
}
