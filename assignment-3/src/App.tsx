import './App.css';
import { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MainContent } from './components/MainContent';
import { BooksContext, BookStoreContext } from './stores/bookStore';
import { BookStorage } from './types/bookStorage';

function App() {
  const [bookStore, setBookStore] = useState<BookStorage>({
    booksData: [],
    currentPage: 1
  });

  const bookStoreContextValue = useMemo<BooksContext>(() => ({ 
    bookStore, 
    setBookStore 
  }), [bookStore])

  return (
    <>
      <Header />
      <BookStoreContext.Provider value={bookStoreContextValue}>
        <MainContent />
      </BookStoreContext.Provider>
      <Footer />
    </>
  )
}

export default App
