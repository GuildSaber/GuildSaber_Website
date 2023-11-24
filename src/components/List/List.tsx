import Pagination from "../Pagination/Pagination";

export default function List<C extends React.ReactNode>({
  totalCount,
  pageSize,
  hasPreviousPage,
  hasNextPage,
  currentPage,
  setCurrentPage,
  children,
}: {
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  children: C;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
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
