/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { DOTS, usePagination } from './hooks/usePagination'

interface Props {
  onPageChange: (newCurrentPage: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
  className?: string
}

const Pagination = (props: Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className = '',
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage: string | number = ''
  if (paginationRange?.length) {
    lastPage = paginationRange[paginationRange.length - 1]
  }

  if (
    !paginationRange?.length ||
    currentPage === 0 ||
    paginationRange.length < 2
  ) {
    return null
  }

  return (
    <ul className={`flex list-none justify-end ${className}`}>
      <li
        className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={onPrevious}
        onKeyDown={onPrevious}
      >
        <p>&lt;</p>
      </li>
      {paginationRange?.map((pageNumber, index) => {
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
              pageNumber === currentPage ? 'selected' : ''
            }`}
            onClick={() => onPageChange(Number(pageNumber))}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={`pagination-item ${
          currentPage === lastPage ? 'disabled' : ''
        }`}
        onClick={onNext}
      >
        <p>&gt;</p>
      </li>
    </ul>
  )
}

export default Pagination
