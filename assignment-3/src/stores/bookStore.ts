
import { Dispatch, SetStateAction, createContext } from "react";
import { BookStorage } from "../types/bookStorage";

export type BooksContext = {
  bookStore: BookStorage;
  setBookStore: Dispatch<SetStateAction<BookStorage>>
}

export const BookStoreContext = createContext<BooksContext>({
  bookStore:  {
    booksData: [],
    currentPage: 1,
  },
  setBookStore:() => {},
}); 