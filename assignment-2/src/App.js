import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MainContent } from './components/MainContent';
import { useState } from 'react';
import { BookStore } from './stores/bookStore';


function App() {
  const [bookStore, setBookStore] = useState({
    booksData: [],
    currentPage: 1
  })

  return (
    <>
      <Header />
      <BookStore.Provider value={{ bookStore, setBookStore }}>
        <MainContent />
      </BookStore.Provider>
      <Footer />
    </>
  );
}

export default App;
