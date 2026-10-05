import z from "zod";

export const locationSearchSchema = z.object({
  search: z.string().trim().min(2, "Enter at least 2 characters"),
});

export type locationSearchFormValues = z.infer<typeof locationSearchSchema>;
