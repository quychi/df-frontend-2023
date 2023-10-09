/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { Modal } from '../Modal'
import { Input } from '../Input'
import { Button } from '../Button'
import { Select } from '../Select'
import { BookSchema, BookSchemaType } from '../../_types/book'
import { CreateBookRequest, Topic } from '../../_types/schema'
import { client } from '../../_lib/api'

interface Props {
  isOpen: boolean
  onYes: (newBook: CreateBookRequest) => void
  onNo: () => void
}

const AddBookModal = ({ isOpen, onNo, onYes }: Props) => {
  const { data } = useSWR('fetch-topics', () => client.getTopics())
  const topics = (data?.data ?? []) as Topic[]

  const defaultValues = {
    name: '',
    author: '',
    topicId: topics.at(0)?.id.toString() ?? '0',
  } as BookSchemaType

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
      onYes({ ...formValue, topicId: Number(formValue.topicId) })
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
          items={data?.data ?? []}
          id="topicId"
          registration={register('topicId')}
          error={errors.topicId}
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
