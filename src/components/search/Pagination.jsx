import React from "react";

const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage, onPageClick }) => {
  // Tombol sebelumnya
  const renderPreviousButton = () => (
    <button onClick={onPrevPage} className="bg-violet-900 hover:bg-violet-700 text-white px-4 py-2 rounded" disabled={currentPage === 1}>
      Previous
    </button>
  );

  // Tombol untuk nomor halaman
  const renderPageButton = (page) => (
    <button key={page} onClick={() => onPageClick(page)} className={`px-4 py-2 rounded ${page === currentPage ? "bg-violet-900 text-white hover:bg-violet-700" : "bg-gray-200 hover:bg-gray-300 text-violet-900"}`} disabled={page === "..."}>
      {page}
    </button>
  );

  // Tombol selanjutnya
  const renderNextButton = () => (
    <button onClick={onNextPage} className="bg-violet-900 hover:bg-violet-700 text-white px-4 py-2 rounded" disabled={currentPage === totalPages}>
      Next
    </button>
  );

  // Membuat daftar nomor halaman
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4;

    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage > totalPages - Math.floor(maxVisiblePages / 2)) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxVisiblePages / 2);
      endPage = startPage + maxVisiblePages - 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 1) {
      if (startPage > 2) pageNumbers.unshift("...");
      pageNumbers.unshift(1);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-2 pt-5">
      {renderPreviousButton()}
      {getPageNumbers().map((page) => renderPageButton(page))}
      {renderNextButton()}
    </div>
  );
};

export default Pagination;
