import { Book } from '../_generated/model/book'

export interface BookStorage {
  booksData: Book[]
  currentPage: number
}
