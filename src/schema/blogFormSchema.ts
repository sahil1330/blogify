"use client";

import { z } from "zod";

const blogFormSchema = z.object({
  title: z.string().min(2).max(50),
  content: z.string().min(2).max(500),
  tags: z.array(z.string()).max(5),
  videoFile: z.instanceof(File).refine((file) => file.size < 100000000, {
    message: "File size must be less than 100MB.",
  }),
});

export default blogFormSchema;
