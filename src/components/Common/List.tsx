import clsx from "clsx";
import Pagination from "@/components/Common/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PropsWithChildren } from "react";

type ListProps = {
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  className?: string;
};

export default function List({
  totalCount,
  pageSize,
  hasPreviousPage,
  hasNextPage,
  currentPage,
  setCurrentPage,
  children,
  className,
}: PropsWithChildren<ListProps>) {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const onPageChangeHandler = (page: number) => {
    searchParams.set("page", page.toString());
    navigate({ search: searchParams.toString() }, { replace: true });
    setCurrentPage(page);
  };

  return (
    <div className={clsx("flex w-full flex-col gap-2", className)}>
      {children}

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        onPageChange={(page) => onPageChangeHandler(page)}
      />
    </div>
  );
}
