import { calculatePageNumbers } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface Props {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
  setCurrentPage: (page: number) => void;
  className?: string;
}

function CommentPagination({
  totalPages,
  currentPage,
  pageNeighbors = 2,
  setCurrentPage,
  className,
}: Props) {
  const pageNumbers = calculatePageNumbers({
    totalPages,
    currentPage,
    pageNeighbors,
  });

  const handleClick = (page: number | string) => {
    if (typeof page === 'number' && page > 0 && page <= totalPages)
      setCurrentPage(page);
  };

  return (
    <div className={cn(className, 'flex items-center justify-center gap-2')}>
      {/* pervious page button */}
      {currentPage !== 1 && (
        <button
          onClick={() => handleClick(currentPage - 1)}
          className={cn('rounded-md bg-slate-200 p-2')}
        >
          <ChevronLeftIcon className="w-4" />
        </button>
      )}

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => handleClick(page)}
          disabled={page === '...'}
          className={cn('px-3 py-1 rounded-md transition hover:text-sky-600', {
            'bg-slate-200': currentPage !== page && page !== '...',
            'bg-blue-500 text-white': currentPage === page,
            'cursor-not-allowed': page === '...',
          })}
        >
          {page === '...' ? '...' : <span>{page}</span>}
        </button>
      ))}

      {/* next page button */}
      {currentPage !== totalPages && (
        <button
          onClick={() => handleClick(currentPage + 1)}
          className="rounded-md bg-slate-200 p-2"
        >
          <ChevronRightIcon className="w-4" />
        </button>
      )}
    </div>
  );
}

export default CommentPagination;
