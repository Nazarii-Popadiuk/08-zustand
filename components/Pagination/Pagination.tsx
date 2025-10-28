import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css'

interface PaginationProps {
    pageCount: number;
    currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

type SelectedPage = { selected:number }

export default function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
    if (pageCount <= 1) return null;
    return (
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(selected: SelectedPage) => onPageChange(selected.selected + 1)}
            pageRangeDisplayed={5}
            forcePage={currentPage - 1}
            marginPagesDisplayed={12}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName={styles.pagination}
            activeClassName={styles.active}
      />
    )
}
