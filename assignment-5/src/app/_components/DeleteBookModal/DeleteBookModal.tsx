import React from 'react'
import { Modal } from '../Modal'
import { useBookStoreContext } from '../../_stores/bookStore'
import { Button } from '../Button'

interface Props {
  isOpen: boolean
  deleteBookId: string | null
  onYes: (deleteBookId: string | null) => void
  onNo: () => void
}

const DeleteBookModal = ({ isOpen, deleteBookId, onNo, onYes }: Props) => {
  const { bookStore } = useBookStoreContext()

  const getDeleteBookName = () => {
    if (!bookStore.booksData.length || !deleteBookId) {
      return
    }
    const selectedBook = bookStore.booksData.find(
      (item) => item.id === deleteBookId,
    )
    return selectedBook?.name
  }

  if (!isOpen) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={onNo} title="Delete book">
      <div className="flex flex-col justify-center items-center text-center h-[100px] w-full">
        <p>Do you want to delete </p>
        <span>
          <strong>{getDeleteBookName()}</strong> book?
        </span>
      </div>
      <div className="flex justify-center items-center gap-2.5 h-10">
        <Button
          className="bg-gray-light text-black"
          type="button"
          onClick={() => onYes(deleteBookId)}
          btnText="Delete"
        />
        <Button
          className="bg-red-primary text-white"
          type="button"
          onClick={onNo}
          btnText="Cancel"
        />
      </div>
    </Modal>
  )
}

export default DeleteBookModal
