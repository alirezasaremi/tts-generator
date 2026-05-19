import { getAIClient } from "@/ai";
import { NextRequest, NextResponse } from "next/server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { slugify_with_underscores } from "@/lib/helpers";
import { interviewModeBodySchema } from "@/app/schema/interview-mode.schema";



export async function POST(req: NextRequest) {
  try {

    // TODO: get and validate the body with zod and return 400 if invalid
    const body = await req.json();
    

    // get AI client
    const aiClient = getAIClient();

    // TODO: Generate podcast audio
    const podcastAudioResponse = await aiClient.audio.speech.create({
      model: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts",
      voice: "alloy",
      input: "Hello, welcome to the interview. Can you please introduce yourself?",
      instructions: "Use a friendly and professional tone, as if you were hosting a podcast interview.",
      response_format: "mp3",
    });

    const interviewerAudioBuffer = Buffer.from(
      await podcastAudioResponse.arrayBuffer(),
    );



    const outputDir = path.join(process.cwd(), "public", "generated");
    await mkdir(outputDir, { recursive: true });

    // TODO: get the file name from the request body and use it instead of interviewerInput, also validate it with zod and return 400 if invalid
    const baseName = "the-file-name";

    const safeFileName = slugify_with_underscores(baseName).slice(0, 120);
    const finalFileName = `${safeFileName}.mp3`;

    const filePath = path.join(outputDir, finalFileName);

    await writeFile(filePath, interviewerAudioBuffer);

    const downloadLink = `/generated/${finalFileName}`;

    return NextResponse.json({
      success: true,
      message: "Audio generated successfully",
      data: {
        downloadLink,
      },
    });

  } catch (error) {
    console.error("POST /api/audio/interview-mode error:", error);
    return NextResponse.json(
      {
        success: false,
        error: `Unexpected error occurred while creating new audio`,
      },
      { status: 500 },
    );
  }
}
