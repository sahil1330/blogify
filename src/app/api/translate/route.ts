/* eslint-disable @typescript-eslint/no-require-imports */
import { NextResponse } from "next/server";
const { Translate } = require("@google-cloud/translate").v2;

export async function POST(req: Request) {
  const translate = new Translate({
    projectId: "your-google-cloud-project-id",
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  try {
    const body = await req.json();
    const { title, content, transcription, lang } = body;

    // Validate input
    if (!title || !content || !lang) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supportedLanguages = ["en", "hi", "kn", "or", "es", "fr", "de"];
    if (!supportedLanguages.includes(lang)) {
      return NextResponse.json({ error: `Unsupported language: ${lang}` }, { status: 400 });
    }

    // Perform translation
    const [translatedTitle] = await translate.translate(title, lang);
    const [translatedContent] = await translate.translate(content, lang);
    const [translatedTranscription] = transcription
      ? await translate.translate(transcription, lang)
      : [""];

    return NextResponse.json({
      title: translatedTitle,
      content: translatedContent,
      transcription: translatedTranscription,
    });
  } catch (error) {
    console.error("Translation error:", (error as Error).message);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
