import clsx from "clsx";
import { usePagination, DOTS } from "../../hooks/usePagination";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  hasPreviousPage,
  hasNextPage,
}: {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}) => {
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
    <ul className="flex-center select-none gap-2 p-0">
      <li
        className={clsx("btn mr-auto bg-gray-800 hover:opacity-80", {
          "pointer-events-none bg-gray-900": !hasPreviousPage,
        })}
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
            className={clsx("flex-center btn bg-gray-800 hover:opacity-80", {
              "bg-primary": pageNumber === currentPage,
            })}
            onClick={() => onPageChange(+pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={clsx("btn ml-auto bg-gray-800 hover:opacity-80", {
          "pointer-events-none bg-gray-900": !hasNextPage,
        })}
        onClick={onNext}
      >
        <span>
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </span>
      </li>
    </ul>
  );
};

export default Pagination;
