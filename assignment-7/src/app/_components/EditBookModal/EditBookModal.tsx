/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from '../Modal'
import { Input } from '../Input'
import { Button } from '../Button'
import { Select } from '../Select'
import { BookSchema, BookSchemaType } from '../../_types/book'
import * as topicClient from '../../_generated/topic/topic'
import { SWR_KEY } from '../../_consts/swrKey'
import { Book, Topic, UpdateBookRequest } from '../../_generated/model'

interface Props {
  isOpen: boolean
  selectedBook: Book | null
  onYes: (newBook: UpdateBookRequest) => void
  onNo: () => void
}

const EditBookModal = ({ isOpen, selectedBook, onNo, onYes }: Props) => {
  const { data } = topicClient.useGetTopics({
    swr: { swrKey: SWR_KEY.TOPIC.GET_TOPICS },
  })
  const topics = (data?.data ?? []) as Topic[]
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<BookSchemaType>({
    resolver: zodResolver(BookSchema),
  })

  const onSubmit = handleSubmit(async (formValue) => {
    if (formValue && selectedBook) {
      onYes({
        ...formValue,
        topicId: Number(formValue.topicId),
      })
    }
  })

  useEffect(() => {
    if (!selectedBook || !topics.length) {
      return
    }
    const currentTopic = topics.find(
      (item) => item.id === selectedBook?.topic?.id,
    )
    reset({
      name: selectedBook.name ?? '',
      author: selectedBook.author ?? '',
      topicId: currentTopic?.name?.toString() ?? '',
    } as BookSchemaType)
  }, [reset, selectedBook, topics])

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
          items={topics}
          registration={register('topicId')}
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
