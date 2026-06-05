import z from "zod";

export const podcastAudioRequestSchema = z.object({
  input: z
    .string({ error: "input is required" })
    .trim()
    .min(1, "input cannot be empty")
    .max(10_000, "input is too long"),
  instructions: z
    .string()
    .trim()
    .max(2_000, "instructions is too long")
    .optional()
    .default(""),
  voice: z
    .enum([
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
      "verse",
    ])
    .optional()
    .default("alloy"),
  fileName: z
    .string()
    .trim()
    .min(1, "fileName cannot be empty")
    .max(120, "fileName is too long")
    .optional(),
});
