import { z } from "zod";

export const WorkspaceSchema = z.object({
  name: z.string().min(5, { message: "Must be at least 5 characters long" }),
  link: z
    .string()
    .min(1, { message: "The link must be at least 3 characters long" })
    .trim()
    .regex(
      /^[a-z0-9-]+$/,
      "The custom URL must only contain lowercase letters, numbers, and hyphens",
    )
    .transform((str) => str.toLowerCase().replace(/\s+/g, "-")),

  timeZone: z.string(),
  scheduleID: z.string().optional(),
  workspaceDescription: z.string().optional(),
  location: z.string().optional(),
  locationDescription: z.string().optional(),
  workspaceLogoURL: z.string().optional(),
});

export const initialState: z.infer<typeof WorkspaceSchema> = {
  name: "",
  link: "",
  timeZone: "",
};
