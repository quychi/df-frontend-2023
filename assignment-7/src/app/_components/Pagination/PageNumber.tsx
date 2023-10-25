import React from 'react'
import { DOTS } from '../../_hooks/usePagination'

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
    <button
      className={`pagination-item ${
        pageNumber === currentPage
          ? 'border boder-solid border-gray-300 bg-slate-300'
          : ''
      }`}
      onClick={() => onPageChange(Number(pageNumber))}
      key={pageNumber}
    >
      {pageNumber}
    </button>
  )
}
