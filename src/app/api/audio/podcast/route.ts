import { getAIClient } from "@/ai";
import { podcastAudioRequestSchema } from "@/app/schema/podcast-mode.schema";
import { slugify_with_underscores } from "@/lib/helpers";
import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);
    const parsedBody = podcastAudioRequestSchema.safeParse(json);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
          details: parsedBody.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { input, instructions, voice, fileName } = parsedBody.data;

    const aiClient = getAIClient();

    const podcastAudioResponse = await aiClient.audio.speech.create({
      model: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts",
      voice,
      input,
      instructions,
      response_format: "mp3",
    });

    const podcastAudioBuffer = Buffer.from(
      await podcastAudioResponse.arrayBuffer(),
    );

    const outputDir = path.join(process.cwd(), "public", "generated");
    await mkdir(outputDir, { recursive: true });

    const baseName = fileName || `podcast-audio-${Date.now()}`;
    const safeFileName = slugify_with_underscores(baseName).slice(0, 120);
    const finalFileName = `${safeFileName}.mp3`;
    const filePath = path.join(outputDir, finalFileName);

    await writeFile(filePath, podcastAudioBuffer);

    const downloadLink = `/generated/${finalFileName}`;

    return NextResponse.json({
      success: true,
      message: "Audio generated successfully",
      data: {
        downloadLink,
        fileName: finalFileName,
      },
    });
  } catch (error) {
    console.error("POST /api/audio/podcast error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Unexpected error occurred while creating new audio",
      },
      { status: 500 },
    );
  }
}
