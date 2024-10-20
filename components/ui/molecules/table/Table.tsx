import React, { CSSProperties, useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import Checkbox from "../../atoms/checkbox/Checkbox";
import colors from "@/styles/colors";

interface TableProps {
  customStyle?: CSSProperties;
  data: Array<{ [key: string]: string }>;
  columns: string[];
  showCheckbox?: boolean;
  rowsPerPage?: number;
  pagination?: boolean;
  onRowSelect?: (selectedRows: string[]) => void;
  onRowDoubleClick?: (row: { [key: string]: string }) => void; // 함수로 경로를 전달받음
}

const Table: React.FC<TableProps> = ({
  customStyle,
  data,
  columns,
  showCheckbox,
  rowsPerPage = 10,
  pagination = false,
  onRowSelect,
  onRowDoubleClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    onRowSelect?.(selectedRows);
  }, [selectedRows, onRowSelect]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = pagination
    ? data.slice(indexOfFirstRow, indexOfLastRow)
    : data;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const newSelectedRows = checked
      ? data.map((_, index) => String(index))
      : [];
    setSelectedRows(newSelectedRows);
  };

  const handleRowSelect = (rowId: string) => {
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  const isAllSelected = data.every((_, index) =>
    selectedRows.includes(String(index))
  );

  const handleRowDoubleClick = (row: { [key: string]: string }) => {
    if (onRowDoubleClick) {
      onRowDoubleClick(row); // 외부에서 함수로 전달받은 동작을 수행
    }
  };

  return (
    <div className="mx-5" style={{ ...customStyle }}>
      <div className="pb-2">
        <span
          className="text-sm font-bold ml-2"
          style={{ color: colors.Button_Default }}
        >
          {showCheckbox && `선택된 데이터 ${selectedRows.length} 개 / `}총
          데이터 {data.length} 개
        </span>
      </div>
      <div
        style={{ borderColor: "transparent" }}
        className="mx-auto rounded-lg shadow-lg border w-[100%]"
      >
        <table className="table-auto text-xs text-left text-gray-500 w-[100%]">
          <thead
            style={{
              backgroundColor: colors["Blue_C_Lighten-6"],
              color: colors["Grey_Darken-3"],
            }}
            className="text-xs uppercase text-center"
          >
            <tr>
              {showCheckbox && (
                <th className="px-4 py-3">
                  <Checkbox
                    mode="sm"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th key={column} className="px-1 py-3 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            style={{ borderBottom: `1px solid ${colors["Grey_Lighten-4"]}` }}
            className="divide-y"
          >
            {currentData.map((row, index) => (
              <tr
                onDoubleClick={() => handleRowDoubleClick(row)}
                key={index}
                style={{
                  color: colors["Grey_Darken-4"],
                  borderBottom: `1px solid ${colors["Grey_Lighten-2"]}`,
                }}
                className="text-center transition duration-150 ease-in-out cursor-pointer hover:bg-gray-200 hover:shadow-md"
              >
                {showCheckbox && (
                  <td className="px-4 py-2">
                    <Checkbox
                      mode="sm"
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
                  <td key={column} className="py-2 text-gray-700">
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Table;
