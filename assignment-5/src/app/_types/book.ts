import { z } from 'zod'

export interface Book {
  id: string
  name: string
  author: string
  topic: string
}

export const topicItems = ['Programming', 'Database', 'DevOps']

export const BookSchema = z
  .object({
    name: z.string().min(5, { message: 'Minimum of 5 characters' }),
    author: z.string().regex(/^[A-Za-z\s]+$/, {
      message: 'Only letters and spaces',
    }),
    topic: z.string().refine((value) => topicItems.includes(value), {
      message: 'Invalid topic',
    }),
  })
  .required({
    author: true,
    topic: true,
  })

export type BookSchemaType = z.infer<typeof BookSchema>
