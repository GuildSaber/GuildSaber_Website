import Pagination from "../../components/Pagination/Pagination";

export default function List(props) {
  const {
    totalCount,
    pageSize,
    hasPreviousPage,
    hasNextPage,
    currentPage,
    setCurrentPage,
    children,
  } = props;

  return (
    <div className="flex gap-2 flex-col">
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
