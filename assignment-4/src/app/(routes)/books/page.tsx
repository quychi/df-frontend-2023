'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Pagination from '../../_components/Pagination/Pagination'
import { Book } from '../../_types/book'
import { Input } from '../../_components/Input'
import { useBookStoreContext } from '../../_stores/bookStore'
import { PAGE } from '../../_consts/page'
import { Button } from '../../_components/Button'
import { ButtonLink } from '../../_components/ButtonLink'
import DeleteBookModal from '../../_components/DeleteBookModal/DeleteBookModal'
import AddBookModal from '../../_components/AddBookModal/AddBookModal'

const PageSize = 5

interface BookItemProps {
  book: Book
  goToBookDetail: (bookId: string) => void
  handleToggleDeleteBookModal: (bookId: string) => void
}

const BookItem = ({
  book,
  goToBookDetail,
  handleToggleDeleteBookModal,
}: BookItemProps) => (
  <tr>
    <td>{book.name}</td>
    <td>{book.author}</td>
    <td>{book.topic}</td>
    <td className="space-x-2 text-center">
      <ButtonLink
        btnText="View"
        type="button"
        onClick={() => goToBookDetail(book.id)}
      />
      <ButtonLink
        btnText="Delete"
        type="button"
        onClick={() => handleToggleDeleteBookModal(book.id)}
      />
    </td>
  </tr>
)

const BookList = () => {
  const { bookStore, setBookStore } = useBookStoreContext()
  const [booksData, setBooksData] = useState<Book[]>([])
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState<boolean>(false)
  const [isDeleteBookModalOpen, setIsDeleteBookModalOpen] =
    useState<boolean>(false)
  const deleteBookId = useRef<string | null>(null)
  const currentSearch = useRef<string>('')
  const router = useRouter()

  const currentTableData = useMemo(() => {
    const firstPageIndex = (bookStore.currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return booksData.slice(firstPageIndex, lastPageIndex)
  }, [bookStore.currentPage, booksData])

  if (!currentTableData.length && bookStore.currentPage > 1) {
    setBookStore((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))
  }

  const handleAddBook = (event, newBook: Book) => {
    event.preventDefault()
    const searchInputEle = document.getElementById('search-input')
    setBookStore((prev) => ({
      ...prev,
      booksData: [...prev.booksData, newBook],
    }))
    currentSearch.current = ''
    // TODO: a ơi, có vẻ như do e "as" nên eslint + prettier thêm dấu ";" đằng trước, chỗ này e nên xử lý ntn ạ?
    ;(searchInputEle as HTMLInputElement).value = ''
    handleToggleAddBookModal()
  }

  const handleDeleteBook = (deleteBookId: string | null) => {
    if (!deleteBookId) {
      setBookStore((prev) => ({
        ...prev,
        booksData: [
          ...prev.booksData.filter((item) => item.id !== deleteBookId),
        ],
      }))
    }
    handleToggleDeleteBookModal()
  }

  const handleSearch = (event) => {
    currentSearch.current = event.target.value.toLowerCase()
    const searchedBooks = bookStore.booksData.filter((item) =>
      item.name.toLowerCase().includes(currentSearch.current),
    )
    setBooksData(searchedBooks)
  }

  const handleToggleAddBookModal = () => {
    // }
    setIsAddBookModalOpen(!isAddBookModalOpen)
  }

  const handleToggleDeleteBookModal = (selectedBookId?: string) => {
    if (selectedBookId) {
      deleteBookId.current = selectedBookId
    }

    setIsDeleteBookModalOpen(!isDeleteBookModalOpen)
  }

  const goToBookDetail = (bookId: string) => {
    router.push(PAGE.BookDetail.getUrl({ bookId }))
  }

  useEffect(() => {
    const saveData = JSON.stringify(bookStore.booksData)
    localStorage.setItem('booksData', saveData)
  }, [bookStore.booksData])

  useEffect(() => {
    setBooksData(bookStore.booksData)
  }, [bookStore.booksData])

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
            {currentTableData.map((book) => (
              <BookItem
                key={book.id}
                book={book}
                goToBookDetail={goToBookDetail}
                handleToggleDeleteBookModal={handleToggleDeleteBookModal}
              />
            ))}
          </tbody>
        </table>
      </section>

      <Pagination
        currentPage={bookStore.currentPage}
        totalCount={booksData.length}
        pageSize={PageSize}
        onPageChange={(page) =>
          setBookStore((prev) => ({ ...prev, currentPage: page }))
        }
      />

      <AddBookModal
        isOpen={isAddBookModalOpen}
        onYes={handleAddBook}
        onNo={handleToggleAddBookModal}
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
