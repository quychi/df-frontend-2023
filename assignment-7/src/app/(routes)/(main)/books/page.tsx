'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import useSWR, { mutate } from 'swr'
import Pagination from '../../../_components/Pagination/Pagination'
import { Input } from '../../../_components/Input'
import { useBookStoreContext } from '../../../_context/bookStore'
import { PAGE } from '../../../_consts/page'
import { Button } from '../../../_components/Button'
import { ButtonLink } from '../../../_components/ButtonLink'
import DeleteBookModal from '../../../_components/DeleteBookModal/DeleteBookModal'
import AddBookModal from '../../../_components/AddBookModal/AddBookModal'
import EditBookModal from '../../../_components/EditBookModal/EditBookModal'
import * as bookClient from '../../../_generated/book/book'
import CustomError from '../../../CustomError'
import { getBooks } from '../../../_generated/book/book'
import {
  Book,
  CreateBookRequest,
  UpdateBookRequest,
} from '../../../_generated/model'
import { SWR_KEY } from '../../../_consts/swrKey'
import Loading from '../../../_components/Loading/Loading'
import { toast } from '../../../_components/Toast'
import {
  ACTION_FAILED,
  ACTION_SUCCESS,
  ADD_BOOK_FAILED,
  ADD_BOOK_SUCCESS,
  DELETE_BOOK_FAILED,
  DELETE_BOOK_SUCCESS,
  EDIT_BOOK_FAILED,
  EDIT_BOOK_SUCCESS,
} from '../../../_consts/messages'

interface BookItemProps {
  book: Book
  goToBookDetail: (bookId: number) => void
  handleToggleEditBookModal: (book: Book) => void
  handleToggleDeleteBookModal: (bookId: number) => void
}

const BookItem = ({
  book,
  goToBookDetail,
  handleToggleEditBookModal,
  handleToggleDeleteBookModal,
}: BookItemProps) => (
  <tr>
    <td>{book.name}</td>
    <td>{book.author}</td>
    <td>{book.topic?.name ?? ''}</td>
    <td className="space-x-2 text-center">
      <ButtonLink
        btnText="Edit"
        type="button"
        onClick={() => handleToggleEditBookModal(book)}
        className="pr-3 border-r border-solid border-red-primary"
      />
      <ButtonLink
        btnText="Delete"
        type="button"
        onClick={() => handleToggleDeleteBookModal(book.id)}
        className="pr-3 border-r border-solid border-red-primary"
      />
      <ButtonLink
        btnText="View"
        type="button"
        onClick={() => goToBookDetail(book.id)}
      />
    </td>
  </tr>
)

const BookList = () => {
  const { bookStore, setBookStore } = useBookStoreContext()
  const [booksData, setBooksData] = useState<Book[]>([])
  const [isMutateBook, setIsMutateBook] = useState(false)
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState<boolean>(false)
  const [isEditBookModalOpen, setIsEditBookModalOpen] = useState<boolean>(false)
  const [isDeleteBookModalOpen, setIsDeleteBookModalOpen] =
    useState<boolean>(false)
  const selectedBook = useRef<Book | null>(null)
  const deleteBookId = useRef<number | null>(null)
  const currentSearch = useRef<string>('')
  const router = useRouter()

  const { data, error, isLoading } = useSWR(
    SWR_KEY.BOOK.GET_BOOKS,
    () => getBooks(),
    {
      revalidateOnFocus: false,
    },
  )
  const bookList = useMemo(() => (data?.data ?? []) as Book[], [data?.data])

  const handleEditBook = async (newBook: UpdateBookRequest) => {
    const selectedBookId = selectedBook.current?.id
    if (selectedBookId) {
      try {
        setIsMutateBook(true)
        await bookClient.updateBook(selectedBookId, newBook)
        mutate(SWR_KEY.BOOK.GET_BOOKS)
        toast.success({
          title: ACTION_SUCCESS,
          message: EDIT_BOOK_SUCCESS,
        })
      } catch (error) {
        toast.error({
          title: ACTION_FAILED,
          message: EDIT_BOOK_FAILED,
        })
      } finally {
        handleToggleEditBookModal()
        setIsMutateBook(false)
      }
    }
  }

  const handleAddBook = async (newBook: CreateBookRequest) => {
    try {
      setIsMutateBook(true)
      const searchInputEle = document.getElementById('search-input')
      await bookClient.createBook(newBook)
      mutate(SWR_KEY.BOOK.GET_BOOKS)
      currentSearch.current = ''
      // TODO: a ơi, có vẻ như do e "as" nên eslint + prettier thêm dấu ";" đằng trước, chỗ này e nên xử lý ntn ạ?
      ;(searchInputEle as HTMLInputElement).value = ''
      toast.success({
        title: ACTION_SUCCESS,
        message: ADD_BOOK_SUCCESS,
      })
    } catch (error) {
      toast.error({
        title: ACTION_FAILED,
        message: ADD_BOOK_FAILED,
      })
    } finally {
      handleToggleAddBookModal()
      setIsMutateBook(false)
    }
  }

  const handleDeleteBook = async (deleteBookId: number | null) => {
    if (deleteBookId) {
      try {
        setIsMutateBook(true)
        await bookClient.deleteBook(deleteBookId)
        mutate(SWR_KEY.BOOK.GET_BOOKS)
        toast.success({
          title: ACTION_SUCCESS,
          message: DELETE_BOOK_SUCCESS,
        })
      } catch (error) {
        toast.error({
          title: ACTION_FAILED,
          message: DELETE_BOOK_FAILED,
        })
      } finally {
        handleToggleDeleteBookModal()
        setIsMutateBook(false)
      }
    }
  }

  const handleSearch = (event: { target: { value: string } }) => {
    currentSearch.current = event.target.value.toLowerCase()
    const searchedBooks = booksData.filter((item) =>
      item.name.toLowerCase().includes(currentSearch.current),
    )
    setBooksData(searchedBooks)
  }

  const handleToggleAddBookModal = () => {
    setIsAddBookModalOpen(!isAddBookModalOpen)
  }

  const handleToggleEditBookModal = (book?: Book) => {
    if (book) {
      selectedBook.current = book
    }
    setIsEditBookModalOpen(!isEditBookModalOpen)
  }

  const handleToggleDeleteBookModal = (selectedBookId?: number) => {
    if (selectedBookId) {
      deleteBookId.current = selectedBookId
    }

    setIsDeleteBookModalOpen(!isDeleteBookModalOpen)
  }

  const goToBookDetail = (bookId: number) => {
    router.push(PAGE.BookDetail.getUrl({ bookId: bookId.toString() }))
  }

  useEffect(() => {
    setBooksData(bookList)
  }, [bookList])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <CustomError />
  }

  return (
    <>
      <section className="flex justify-end items-center gap-2.5 mb-5">
        <div className="w-[200px]">
          <Input
            id="search-input"
            placeholder="Search books"
            onChange={(event) => handleSearch(event)}
          />
        </div>
        <Button
          className="bg-red-primary text-white"
          type="button"
          onClick={handleToggleAddBookModal}
          btnText="Add book"
          isLoading={isMutateBook}
        />
      </section>
      <section className="w-full">
        <table className="border-collapse border-spacing-0 w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Topic</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                goToBookDetail={goToBookDetail}
                handleToggleEditBookModal={handleToggleEditBookModal}
                handleToggleDeleteBookModal={handleToggleDeleteBookModal}
              />
            ))}
          </tbody>
        </table>
      </section>

      <Pagination
        currentPage={bookStore.currentPage}
        totalCount={data?.metadata?.totalRecords ?? 0}
        pageSize={data?.metadata?.pageSize ?? 0}
        onPageChange={(page) =>
          setBookStore((prev) => ({ ...prev, currentPage: page }))
        }
      />

      <AddBookModal
        isOpen={isAddBookModalOpen}
        onYes={handleAddBook}
        onNo={handleToggleAddBookModal}
      />

      <EditBookModal
        isOpen={isEditBookModalOpen}
        selectedBook={selectedBook.current}
        onYes={handleEditBook}
        onNo={handleToggleEditBookModal}
      />

      <DeleteBookModal
        isOpen={isDeleteBookModalOpen}
        deleteBookId={deleteBookId.current}
        onYes={handleDeleteBook}
        onNo={handleToggleDeleteBookModal}
      />
    </>
  )
}

export default BookList
