/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Modal } from '../Modal'
import { Input } from '../Input'
import { Button } from '../Button'
import { Select } from '../Select'
import { Book, BookSchema, BookSchemaType, topicItems } from '../../_types/book'

interface Props {
  isOpen: boolean
  onYes: (newBook: Book) => void
  onNo: () => void
}

const defaultValues = {
  name: '',
  author: '',
  topic: topicItems[0],
} as BookSchemaType

const AddBookModal = ({ isOpen, onNo, onYes }: Props) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<BookSchemaType>({
    defaultValues,
    resolver: zodResolver(BookSchema),
  })

  const onSubmit = handleSubmit(async (formValue) => {
    if (formValue) {
      onYes({ id: Math.random().toString(36).slice(2), ...formValue })
      reset(defaultValues)
    }
  })

  return (
    <Modal isOpen={isOpen} onClose={onNo} title="Add book">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
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
          items={topicItems}
          id="topic"
          registration={register('topic')}
          error={errors.topic}
        />
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
