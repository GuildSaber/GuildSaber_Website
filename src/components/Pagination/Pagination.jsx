import React from "react";
import clsx from "clsx";
import { usePagination, DOTS } from "../../hooks/usePagination";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Pagination.scss";
const Pagination = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        hasPreviousPage,
        hasNextPage,
    } = props;

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
        <ul className="pagination-container">
            <li
                className={clsx("pagination-item common-button", {
                    disabled: !hasPreviousPage,
                })}
                onClick={onPrevious}
            >
                <FontAwesomeIcon icon={faChevronLeft} size="sm" />
            </li>
            {paginationRange.map((pageNumber, key) => {
                if (pageNumber === DOTS) {
                    return (
                        <li key={key} className="pagination-item dots">
                            &#8230;
                        </li>
                    );
                }

                return (
                    <li
                        key={key}
                        className={clsx("pagination-item common-button", {
                            selected: pageNumber === currentPage,
                        })}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={clsx("pagination-item common-button", {
                    disabled: !hasNextPage,
                })}
                onClick={onNext}
            >
                <FontAwesomeIcon icon={faChevronRight} size="sm" />
            </li>
        </ul>
    );
};

export default Pagination;
