'use client'

import { notFound, useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PAGE } from '../../../_consts/page'
import { ButtonLink } from '../../../_components/ButtonLink'
import { useBookStoreContext } from '../../../_stores/bookStore'
import { Book } from '../../../_types/book'
import DeleteBookModal from '../../../_components/DeleteBookModal/DeleteBookModal'

const BookDetail = () => {
  const { bookId } = useParams()
  const router = useRouter()
  const { bookStore, setBookStore } = useBookStoreContext()
  const [currentBook, setCurrentBook] = useState<Book | null>(null)
  const [isDeleteBookModalOpen, setIsDeleteBookModalOpen] =
    useState<boolean>(false)

  const goBackToBookList = () => {
    router.push(PAGE.BookList.getUrl({}))
  }

  const handleToggleDeleteBookModal = () => {
    setIsDeleteBookModalOpen(!isDeleteBookModalOpen)
  }

  const handleDeleteBook = () => {
    if (bookId) {
      setBookStore((prev) => ({
        ...prev,
        booksData: [...prev.booksData.filter((item) => item.id !== bookId)],
      }))
    }
    goBackToBookList()
    handleToggleDeleteBookModal()
  }

  useEffect(() => {
    const book = bookStore.booksData.find((item) => item.id === bookId)
    if (book) {
      setCurrentBook(book)
    } else {
      notFound()
    }
  }, [bookId, bookStore.booksData])

  return (
    <>
      <div className="flex flex-col space-y-3 items-start">
        <ButtonLink btnText="&lt; Back" onClick={goBackToBookList} />
        <p className="font-bold text-lg">{currentBook?.name ?? ''}</p>
        <p>
          <strong>Author: </strong>
          {currentBook?.author ?? ''}
        </p>
        <p>
          <strong>Topic: </strong>
          {currentBook?.topic ?? ''}
        </p>
        <ButtonLink btnText="Delete" onClick={handleToggleDeleteBookModal} />
      </div>

      <DeleteBookModal
        isOpen={isDeleteBookModalOpen}
        deleteBookId={currentBook?.id ?? ''}
        onYes={handleDeleteBook}
        onNo={handleToggleDeleteBookModal}
      />
    </>
  )
}

export default BookDetail
