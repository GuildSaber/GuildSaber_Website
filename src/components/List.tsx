import Pagination from "@/components/Pagination";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import Loader from "./Loader";

type ListProps = {
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
  setCurrentPage: (page: number, sense: string) => void;
  isLoading?: boolean;
  className?: string;
};

export default function List({
  totalCount,
  pageSize,
  hasPreviousPage,
  hasNextPage,
  currentPage,
  setCurrentPage,
  isLoading,
  children,
  className,
}: PropsWithChildren<ListProps>) {
  return (
    <div className={clsx("relative flex w-full flex-col gap-2", className)}>
      {isLoading && (
        <div className="absolute z-20 flex h-full w-full items-center justify-center">
          <Loader />
        </div>
      )}
      {children}

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        onPageChange={(page) =>
          setCurrentPage(page, currentPage - page > 0 ? "prev" : "next")
        }
      />
    </div>
  );
}
