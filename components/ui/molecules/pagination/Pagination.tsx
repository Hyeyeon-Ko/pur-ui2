import React from "react";
import colors from "@/styles/colors";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="flex items-center gap-2">
        <button
          onClick={handleFirstPage}
          disabled={currentPage === 1}
          className={`py-1 bg-gray-200 rounded ${
            currentPage === 1 ? "disabled:opacity-50" : ""
          }`}
        >
          {"<<"}
        </button>

        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-1 bg-gray-200 rounded ${
            currentPage === 1 ? "disabled:opacity-50" : ""
          }`}
        >
          &lt;
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              style={{
                backgroundColor:
                  currentPage === page ? colors.Button_Default : "transparent",
                color: currentPage === page ? "white" : "gray",
                borderRadius: currentPage === page ? "12px" : "none",
              }}
              className={`px-3 py-1 transition-colors duration-200 ${
                currentPage === page ? "font-bold" : "hover:opacity-90"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-1 bg-gray-200 rounded ${
            currentPage === totalPages ? "disabled:opacity-50" : ""
          }`}
        >
          &gt;
        </button>

        <button
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          className={`py-1 bg-gray-200 rounded ${
            currentPage === totalPages ? "disabled:opacity-50" : ""
          }`}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
