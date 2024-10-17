import React, { useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import Checkbox from "../../atoms/checkbox/Checkbox";
import colors from "@/styles/colors";
/**
 * 가로형 테이블 (일반 테이블)
 * 기능1. 체크박스 true/false : showCheckbox ->
 * showCheckbox가 true인 경우 테이블 상단에 선택된 데이터의 개수를 표시하도록 커스텀 함
 * showCheckbox가 true인 경우 다중선택, 개별선택 기능이 가능, 또한 전체선택 다운로드 / 선택항목 다운로드 구현완료
 * 기능2. 페이지네이션 true/false : pagination
 */
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

  // onRowSelect을 useEffect 안에서 처리
  useEffect(() => {
    onRowSelect?.(selectedRows);
  }, [selectedRows]);

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

    // 상태 업데이트
    setSelectedRows(newSelectedRows);
  };

  const handleRowSelect = (rowId: string) => {
    setSelectedRows((prev) => {
      const newSelectedRows = prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId];
      return newSelectedRows; // 상태 업데이트만 수행
    });
  };

  const isAllSelected = data.every((_, index) =>
    selectedRows.includes(String(index))
  );

  const handleRowDoubleClick = (row: { [key: string]: string }) => {
    const url = `path?data=${encodeURIComponent(JSON.stringify(row))}`;
    window.open(url, "_blank", "noopener,noreferrer,width=1000,height=800");
  };

  return (
    <div className="mx-5">
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
