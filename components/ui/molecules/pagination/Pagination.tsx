import React from "react";
import colors from "@/styles/colors";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  buttonStyle?: string;
  disabledOpacity?: string;
  firstLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  lastLabel?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  buttonStyle = "bg-gray-200",
  disabledOpacity = "disabled:opacity-50",
  firstLabel = "<<",
  previousLabel = "<",
  nextLabel = ">",
  lastLabel = ">>",
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="mt-6 flex items-center justify-center py-10">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className={`py-1 ${buttonStyle} rounded ${
            currentPage === 1 ? disabledOpacity : ""
          }`}
        >
          {firstLabel}
        </button>

        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-1 ${buttonStyle} rounded ${
            currentPage === 1 ? disabledOpacity : ""
          }`}
        >
          {previousLabel}
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                backgroundColor:
                  currentPage === page ? colors.signature : "transparent",
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
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-1 ${buttonStyle} rounded ${
            currentPage === totalPages ? disabledOpacity : ""
          }`}
        >
          {nextLabel}
        </button>

        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`py-1 ${buttonStyle} rounded ${
            currentPage === totalPages ? disabledOpacity : ""
          }`}
        >
          {lastLabel}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
