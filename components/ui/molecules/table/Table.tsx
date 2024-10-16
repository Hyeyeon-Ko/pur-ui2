import React, { useState } from "react";
import Pagination from "../pagination/Pagination";
import Checkbox from "../../atoms/checkbox/Checkbox";
import colors from "@/styles/colors";

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
    onRowSelect?.(newSelectedRows);
  };

  const handleRowSelect = (rowId: string) => {
    setSelectedRows((prev) => {
      const newSelectedRows = prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId];

      onRowSelect?.(newSelectedRows);
      return newSelectedRows;
    });
  };

  const isAllSelected = data.every((_, index) =>
    selectedRows.includes(String(index))
  );

  const handleRowDoubleClick = (row: { [key: string]: string }) => {
    const url = `path?data=${encodeURIComponent(JSON.stringify(row))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="m-2">
        <span
          className="p-2 text-sm font-bold"
          style={{ color: colors.Button_Default }}
        >
          {showCheckbox && `선택된 데이터 ${selectedRows.length} 개 / `}총
          데이터 {data.length} 개
        </span>
      </div>
      <div
        style={{ borderColor: "transparent" }}
        className="overflow-x-auto rounded-lg shadow-lg border"
      >
        <table className="w-full text-sm text-left text-gray-500">
          <thead
            style={{
              backgroundColor: colors["Blue_C_Lighten-6"],
              color: colors["Grey_Darken-3"],
            }}
            className="text-xs uppercase"
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
                <th key={column} className="px-4 py-3 font-semibold">
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
                className="transition duration-150 ease-in-out cursor-pointer hover:bg-gray-200 hover:shadow-md"
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
                  <td key={column} className="px-4 py-2 text-gray-700">
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
