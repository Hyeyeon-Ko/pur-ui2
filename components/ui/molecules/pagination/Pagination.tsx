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

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-6 py-4 bg-gray-200 disabled:opacity-50"
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
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
