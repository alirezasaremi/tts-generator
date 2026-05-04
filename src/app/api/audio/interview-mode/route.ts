import { getAIClient } from "@/ai";
import { Voice } from "@/types/voice";
import { NextRequest, NextResponse } from "next/server";

const interviewerVoice: Voice = "nova";
const intervieweeVoice: Voice = "ballad";
const interviewerInput = "Why the Netherlands?";
const intervieweeInput = `We chose the Netherlands...
because it has a strong combination of demand,
structure,
and fragmentation.`;
const instruction = `This is a realistic interview-style podcast.

There are two speakers:
- A female interviewer (calm, professional, slightly curious tone)
- A male founder (confident, clear, thoughtful tone)

Style:
- Natural conversation, not robotic
- Add slight pauses between sentences
- Emphasize clarity and key ideas
- Keep pacing moderate, like a real interview

Important:
- The interviewer asks the question naturally
- The founder answers in a structured but conversational way
- Do NOT rush
- Slight pauses between ideas`;

export async function POST(req: NextRequest) {
  try {
    // get AI client
    const aiClient = getAIClient();

    // Generate interviewer audio
    const audioResponse = await aiClient.audio.speech.create({
      model: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts",
      voice: interviewerVoice,
      input: intervieweeInput,
      instructions: instruction,
    });


    const interviewerAudioBuffer = Buffer.from(await audioResponse.arrayBuffer());

    // TODO: Generate interviewee audio

    // TODO: Merge voices as a single mp3 to download

    // TODO: return download link in response
    const downloadLink = "";

    return NextResponse.json({
      success: true,
      message: 'Audio generated successfully',
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
