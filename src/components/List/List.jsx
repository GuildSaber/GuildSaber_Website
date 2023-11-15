import Pagination from "../../components/Pagination/Pagination";
import "./List.scss";

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
        <div className="list">
            {children}

            <Pagination
                className="pagination-bar"
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
