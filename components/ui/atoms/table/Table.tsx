import React, { useState, useEffect } from "react";

interface TableProps {
  data: Array<{ [key: string]: string }>;
  columns: string[];
  showCheckbox?: boolean;
  rowsPerPage?: number;
  pagination?: boolean;
  onRowSelect?: (selectedRows: string[]) => void;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  showCheckbox,
  rowsPerPage = 10,
  pagination = false,
  onRowSelect,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // 페이지에 따른 데이터 계산
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = pagination
    ? data.slice(indexOfFirstRow, indexOfLastRow)
    : data;

  // 전체 선택 처리
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const newSelectedRows = checked
      ? data.map((_, index) => String(index)) // 전체 데이터 기준으로 선택
      : [];

    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // 선택된 행 관리
  const handleRowSelect = (rowId: string) => {
    setSelectedRows((prev) => {
      const newSelectedRows = prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId];

      // 선택된 행이 있을 때만 콜백 호출
      onRowSelect?.(newSelectedRows);
      return newSelectedRows;
    });
  };

  // 선택된 모든 행이 체크된 상태인지 확인
  const isAllSelected = data.every((_, index) =>
    selectedRows.includes(String(index))
  );

  // 선택된 행 출력 (디버깅 용도)
  useEffect(() => {
    console.log("선택된 행:", selectedRows);
  }, [selectedRows]);

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-100">
            <tr>
              {showCheckbox && (
                <th className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-500"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100 cursor-pointer">
                {showCheckbox && (
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(
                        String(indexOfFirstRow + index)
                      )}
                      onChange={() =>
                        handleRowSelect(String(indexOfFirstRow + index))
                      }
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column} className="px-4 py-2">
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {pagination && (
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            &lt;
          </button>

          <div className="flex items-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <div key={page} className="relative flex items-center mx-1">
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentPage === page
                      ? "bg-gray-200 text-blue-500 font-bold"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {page}
                </button>
                {currentPage === page && (
                  <span className="absolute w-4 h-4 bg-blue-500 rounded-full top-1 left-1" />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
