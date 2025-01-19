import { NextRequest } from "next/server";
import { AssemblyAI } from "assemblyai";
export async function GET(req: NextRequest) {}
// npm install assemblyai



const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
});

const audioUrl = "https://assembly.ai/sports_injuries.mp3";

const config = {
  audio_url: audioUrl,
};

const run = async () => {
  const transcript = await client.transcripts.transcribe(config);
  console.log(transcript.text);
};

run();
