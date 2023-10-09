import { z } from 'zod'

export const BookSchema = z
  .object({
    name: z.string().min(5, { message: 'Minimum of 5 characters' }),
    author: z.string().regex(/^[A-Za-z\s]+$/, {
      message: 'Only letters and spaces',
    }),
    topicId: z.string(),
  })
  .required({
    author: true,
  })

export type BookSchemaType = z.infer<typeof BookSchema>
