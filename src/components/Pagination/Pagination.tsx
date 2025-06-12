import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (selected: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={(set) => onPageChange(set.selected + 1)}
      forcePage={page - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}
