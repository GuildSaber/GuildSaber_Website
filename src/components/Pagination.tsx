import { DOTS, usePagination } from "@/hooks/usePagination";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

type PaginationProps = {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 0,
  currentPage,
  pageSize,
  hasPreviousPage,
  hasNextPage,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className="sticky bottom-2 flex justify-center">
      <ul className="flex-center flex select-none gap-2 rounded-lg bg-gray-900 p-2">
        <li
          className={clsx(
            "btn bg-gray-700/50 px-4 py-1.5 hover:bg-gray-700/30 hover:opacity-80",
            {
              "!bg-transparant pointer-events-none opacity-20":
                !hasPreviousPage,
            },
          )}
          onClick={onPrevious}
        >
          <span>
            <FontAwesomeIcon icon={faChevronLeft} size="sm" />
          </span>
        </li>
        {paginationRange.map((pageNumber, key) => {
          if (pageNumber === DOTS) {
            return (
              <li key={key} className="flex-center px-1">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={key}
              className={clsx(
                "flex-center btn bg-gray-700/50 px-4 py-1.5 hover:opacity-80",
                {
                  "!bg-primary": pageNumber === currentPage,
                  "hover:bg-gray-700/30": pageNumber !== currentPage,
                },
              )}
              onClick={() => onPageChange(+pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={clsx(
            "btn bg-gray-700/50 px-4 py-1.5 hover:bg-gray-700/30 hover:opacity-80",
            {
              "!bg-transparant pointer-events-none opacity-20": !hasNextPage,
            },
          )}
          onClick={onNext}
        >
          <span>
            <FontAwesomeIcon icon={faChevronRight} size="sm" />
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
