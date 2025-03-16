import { z } from "zod";

export const PostRequest = z.object({
    title: z.string(),
    content: z.string().optional(),
    published: z.boolean().optional(),
    authorId: z.number().optional(),
});