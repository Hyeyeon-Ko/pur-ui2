import React, { useState } from "react";
import Button from "../button/Button";

interface TableProps {
  data: Array<{ [key: string]: string }>;
  columns: string[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [rowsPerPage] = useState(10);

  // 페이지 계산
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // 페이지 변경
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 선택된 행 관리
  const handleRowSelect = (rowId: string) => {
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  const downloadCSV = () => {
    console.log("csv다운로드");
  };

  return (
    <div className="container mx-auto">
      <div className="mt-4">
        <Button
          mode="sm"
          color="Button_Default"
          content="엑셀 다운로드"
          onClick={downloadCSV}
        />
      </div>
      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedRows(
                      e.target.checked
                        ? data.map((_, index) => String(index))
                        : []
                    )
                  }
                />
              </th>
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
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          &lt;
        </button>

        <div className="flex items-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`flex items-center justify-center w-8 h-8 mx-1 rounded-full ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {currentPage === page ? (
                <span className="w-4 h-4 bg-blue-500 rounded-full" />
              ) : (
                page
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Table;
