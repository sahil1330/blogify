// Creates a client

import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Translate } = require("@google-cloud/translate").v2;

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const text = 'The text to translate, e.g. Hello, world!';
// const target = 'The target language, e.g. ru';

export async function POST(req: NextRequest) {
  const translate = new Translate();
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  const { text, target } = await req.json();
  let [translations] = await translate.translate(text, target);
  translations = Array.isArray(translations) ? translations : [translations];
  console.log("Translations:");
  translations.forEach((translation: string, i: number) => {
    console.log(`${(text as string[])[i]} => (${target}) ${translation}`);
  });

  return NextResponse.json(translations);
}
