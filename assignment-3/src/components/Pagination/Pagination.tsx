// TODO: 
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classnames from 'classnames';
import { DOTS, usePagination } from './hooks/usePagination';

interface Props {
  onPageChange: (newCurrentPage: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className: string;
}

const Pagination = (props:Props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (!paginationRange?.length) {
    return null;
  }

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      {/* //TODO: a ơi, lỗi eslint chỗ này thì fix ntn ạ? 
      Visible, non-interactive elements with click handlers must have at least one keyboard listener.eslintjsx-a11y/click-events-have-key-events
      Non-interactive elements should not be assigned mouse or keyboard event listeners.eslintjsx-a11y/no-noninteractive-element-interactions 
      */}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
        onKeyDown={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange?.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots" key={pageNumber + DOTS}>&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(Number(pageNumber))}
            key={pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
