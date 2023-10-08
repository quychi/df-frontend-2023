/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { DOTS } from './hooks/usePagination'

interface Props {
  pageNumber: string | number
  index: number
  currentPage: number
  onPageChange: (newCurrentPage: number) => void
}

export const PageNumber = ({
  pageNumber,
  index,
  currentPage,
  onPageChange,
}: Props) => {
  if (pageNumber === DOTS) {
    return (
      <li className="pagination-item dots" key={index + DOTS}>
        &#8230;
      </li>
    )
  }

  return (
    <li
      className={`pagination-item ${
        pageNumber === currentPage
          ? 'border boder-solid border-gray-300 bg-slate-300'
          : ''
      }`}
      onClick={() => onPageChange(Number(pageNumber))}
      key={pageNumber}
    >
      {pageNumber}
    </li>
  )
}
