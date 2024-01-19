import clsx from "clsx";
import Pagination from "@/components/Common/Pagination/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const onPageChangeHandler = (page: number) => {
    searchParams.set("page", page.toString());
    navigate({ search: searchParams.toString() }, { replace: true });
    setCurrentPage(page);
  };

  /*useEffect(() => {
    const getPageParam = searchParams.get("page");

    if (getPageParam) {
      setCurrentPage(parseInt(getPageParam));
    }
  }, []);*/

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
