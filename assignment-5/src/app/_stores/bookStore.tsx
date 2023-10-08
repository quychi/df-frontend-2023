// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-expressions

'use client'

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'
import { BookStorage } from '../_types/bookStorage'

type BooksContextProps = {
  bookStore: BookStorage
  setBookStore: Dispatch<SetStateAction<BookStorage>>
}

const BookStoreContext = createContext<BooksContextProps>({
  bookStore: {
    booksData: [],
    currentPage: 1,
  },
  setBookStore: () => {},
})

export const BookStoreProvider = ({ children }) => {
  const [bookStore, setBookStore] = useState<BookStorage>({
    booksData: [],
    currentPage: 1,
  })

  const bookStoreContextValue = useMemo<BooksContextProps>(
    () => ({
      bookStore,
      setBookStore,
    }),
    [bookStore],
  )

  return (
    <BookStoreContext.Provider value={bookStoreContextValue}>
      {children}
    </BookStoreContext.Provider>
  )
}

export const useBookStoreContext = () => useContext(BookStoreContext)
