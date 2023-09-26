import { createContext } from 'react';

export const BookStore = createContext({
  booksData: [],
  currentPage: 1,
}); 