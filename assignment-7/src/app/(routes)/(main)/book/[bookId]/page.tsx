'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FadeLoader } from 'react-spinners'
import { PAGE } from '../../../../_consts/page'
import { ButtonLink } from '../../../../_components/ButtonLink'
import DeleteBookModal from '../../../../_components/DeleteBookModal/DeleteBookModal'
import * as bookClient from '../../../../_generated/book/book'
import CustomError from '../../../../CustomError'
import { useGetBook } from '../../../../_generated/book/book'
import { SWR_KEY } from '../../../../_consts/swrKey'
import { Book } from '../../../../_generated/model'

const BookDetail = () => {
  const { bookId } = useParams()
  const router = useRouter()
  const { data, error, isLoading } = useGetBook(Number(bookId), {
    swr: { swrKey: SWR_KEY.BOOK.GET },
  })

  const [currentBook, setCurrentBook] = useState<Book | null>(null)
  const [isDeleteBookModalOpen, setIsDeleteBookModalOpen] =
    useState<boolean>(false)

  const goBackToBookList = () => {
    router.push(PAGE.BookList.getUrl({}))
  }

  const handleToggleDeleteBookModal = () => {
    setIsDeleteBookModalOpen((prev) => !prev)
  }

  const handleDeleteBook = () => {
    if (!currentBook?.id) {
      return
    }
    bookClient.deleteBook(currentBook.id)
    goBackToBookList()
  }

  useEffect(() => {
    const book = data?.data
    if (book) {
      setCurrentBook(book)
    }
  }, [data])

  if (!currentBook) {
    return null
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <FadeLoader color="#D44C61" />
      </div>
    )
  }

  if (error) {
    return <CustomError />
  }

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
          {currentBook?.topic?.name ?? ''}
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
