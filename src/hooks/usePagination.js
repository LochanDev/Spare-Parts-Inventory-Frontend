import { useState } from 'react';
import { PAGINATION } from '../utils/constants';

export const usePagination = (defaultPageSize = PAGINATION.DEFAULT_PAGE_SIZE) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const goToPage = (pageNumber) => {
    setPage(Math.max(0, pageNumber));
  };

  const nextPage = () => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const changePageSize = (newSize) => {
    setPageSize(newSize);
    setPage(0); // Reset to first page
  };

  const updatePaginationFromResponse = (response) => {
    if (response.totalPages !== undefined) {
      setTotalPages(response.totalPages);
    }
    if (response.totalElements !== undefined) {
      setTotalElements(response.totalElements);
    }
  };

  return {
    page,
    pageSize,
    totalElements,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    changePageSize,
    updatePaginationFromResponse,
  };
};
