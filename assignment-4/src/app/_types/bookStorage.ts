import { Book } from './book'

export interface BookStorage {
  booksData: Book[]
  currentPage: number
}
