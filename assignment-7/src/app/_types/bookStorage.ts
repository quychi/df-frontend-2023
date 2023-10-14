import { Book } from './schema'

export interface BookStorage {
  booksData: Book[]
  currentPage: number
}
