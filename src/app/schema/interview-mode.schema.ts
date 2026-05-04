import { Voice } from "@/types/voice";
import z from "zod";

const voiceSchema = z.enum([
  "alloy",
  "ash",
  "ballad",
  "coral",
  "echo",
  "fable",
  "nova",
  "onyx",
  "sage",
  "shimmer",
] satisfies Voice[]);

export const interviewModeBodySchema = z.object({
  interviewerVoice: voiceSchema.default("nova"),
  intervieweeVoice: voiceSchema.default("ballad"),
  interviewerInput: z.string().trim().min(1, "Interviewer input is required"),
  intervieweeInput: z.string().trim().min(1, "Interviewee input is required"),
  fileName: z
    .string()
    .trim()
    .max(120, "File name must be at most 120 characters")
    .optional(),
  interviewerInstruction: z
    .string()
    .trim()
    .min(1, "Interviewer instruction is required")
    .default(`You are the interviewer in a realistic interview-style podcast.

Voice direction:
- Calm, professional, slightly curious
- Ask the question naturally
- Keep the delivery clear and moderate
- Do not sound robotic
- Add a slight pause at the end of the question`),
  intervieweeInstruction: z
    .string()
    .trim()
    .min(1, "Interviewee instruction is required")
    .default(`You are the founder in a realistic interview-style podcast.

Voice direction:
- Confident, clear, thoughtful
- Answer in a structured but conversational way
- Keep the pacing moderate
- Do not rush
- Add slight pauses between key ideas
- Sound natural, not robotic`),
});