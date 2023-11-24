import clsx from "clsx";
import Pagination from "../Pagination/Pagination";

export default function List<C extends React.ReactNode>({
  totalCount,
  pageSize,
  hasPreviousPage,
  hasNextPage,
  currentPage,
  setCurrentPage,
  children,
  className,
}: {
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  children: C;
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {children}

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
