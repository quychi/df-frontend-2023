/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { Modal } from '../Modal'
import { Input } from '../Input'
import { Button } from '../Button'
import { Select } from '../Select'
import { Book } from '../../_types/book'

interface Props {
  isOpen: boolean
  onYes: (event, newBook: Book) => void
  onNo: () => void
}

const topicItems = ['Programming', 'Database', 'DevOps']

const AddBookModal = ({ isOpen, onNo, onYes }: Props) => {
  const generateNewBook = () => {
    const nameInputEle = document.getElementById('name')
    const authorInputEle = document.getElementById('author')
    const topicSelectEle = document.getElementById('topic')

    if (!nameInputEle || !authorInputEle || !topicSelectEle) {
      return
    }
    const newBook = {
      id: Math.random().toString(36).slice(2),
      name: (nameInputEle as HTMLInputElement).value,
      author: (authorInputEle as HTMLInputElement).value,
      topic: (topicSelectEle as HTMLSelectElement).value,
    }
    return newBook
  }

  const onSubmit = (event) => {
    const newBook = generateNewBook()
    if (newBook) {
      onYes(event, newBook)
    }
  }

  return (
    <Modal isOpen={isOpen} onCLose={onNo} title="Add book">
      <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-3">
        <label htmlFor="name">Name</label>
        <Input id="name" />
        <label htmlFor="author">Author</label>
        <Input id="author" />
        <Select label="Topic" items={topicItems} id="topic" />
        <div className="flex justify-end items-center gap-2.5 h-10">
          <Button
            className="bg-red-primary text-white"
            type="submit"
            btnText="Create"
          />
        </div>
      </form>
    </Modal>
  )
}

export default AddBookModal
