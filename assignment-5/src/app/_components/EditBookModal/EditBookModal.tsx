/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from '../Modal'
import { Input } from '../Input'
import { Button } from '../Button'
import { Select } from '../Select'
import { Book, BookSchema, BookSchemaType, topicItems } from '../../_types/book'

interface Props {
  isOpen: boolean
  selectedBook: Book | null
  onYes: (newBook: Book) => void
  onNo: () => void
}

const EditBookModal = ({ isOpen, selectedBook, onNo, onYes }: Props) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<BookSchemaType>({
    resolver: zodResolver(BookSchema),
  })

  const onSubmit = handleSubmit(async (formValue) => {
    if (formValue) {
      onYes({ id: selectedBook?.id ?? '', ...formValue })
    }
  })

  useEffect(() => {
    reset({
      name: selectedBook?.name ?? '',
      author: selectedBook?.author ?? '',
      topic: selectedBook?.topic ?? '',
    } as BookSchemaType)
  }, [reset, selectedBook?.author, selectedBook?.name, selectedBook?.topic])

  if (!selectedBook) {
    return null
  }

  return (
    <Modal isOpen={isOpen} onClose={onNo} title="Edit book">
      <form onSubmit={(e) => onSubmit(e)} className="flex flex-col gap-3">
        <label htmlFor="name">Name</label>
        <Input id="name" registration={register('name')} error={errors.name} />
        <label htmlFor="author">Author</label>
        <Input
          id="author"
          registration={register('author')}
          error={errors.author}
        />
        <Select
          label="Topic"
          id="topic"
          items={topicItems}
          registration={register('topic')}
          error={errors.topic}
        />
        <div className="flex justify-end items-center gap-2.5 h-10">
          <Button
            className="bg-red-primary text-white"
            type="submit"
            btnText="Edit"
          />
        </div>
      </form>
    </Modal>
  )
}

export default EditBookModal
