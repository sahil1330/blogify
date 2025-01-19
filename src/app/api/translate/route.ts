import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();
  const { title, content, transcription, lang } = body;

  try {
    const translateText = async (text: string) => {
      const response = await axios.post(
        "https://translation.googleapis.com/language/translate/v2",
        { q: text, target: lang },
        {
          headers: {
            Authorization: `Bearer ${process.env.GOOGLE_TRANSLATE_API_KEY}`,
          },
        }
      );
      return response.data.data.translations[0].translatedText;
    };

    const translatedTitle = await translateText(title);
    const translatedContent = await translateText(content);
    const translatedTranscription = transcription
      ? await translateText(transcription)
      : "";

    return NextResponse.json({
      title: translatedTitle,
      content: translatedContent,
      transcription: translatedTranscription,
    });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
