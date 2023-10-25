import { PageNumber } from './PageNumber'
import { usePagination } from '../../_hooks/usePagination'

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
      <button
        className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={onPrevious}
        onKeyDown={onPrevious}
      >
        <p>&lt;</p>
      </button>

      {paginationRange?.map((pageNumber, idx) => (
        <PageNumber
          currentPage={currentPage}
          pageNumber={pageNumber}
          index={idx}
          onPageChange={onPageChange}
          key={idx.toString() + pageNumber}
        />
      ))}

      <button
        className={`pagination-item ${
          currentPage === lastPage ? 'disabled' : ''
        }`}
        onClick={onNext}
      >
        <p>&gt;</p>
      </button>
    </ul>
  )
}

export default Pagination
