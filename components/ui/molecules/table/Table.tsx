import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import Pagination from "../pagination/Pagination";
import Checkbox from "../../atoms/checkbox/Checkbox";
import colors from "@/styles/colors";
import { useDarkMode } from "@/context/DarkModeContext";
import useModal from "@/hooks/useModal";
import TableRender from "../render/TableRender";
import Loading from "@/components/commons/Loading";
import ManagementHeader from "../header/ManagementHeader";

interface Sorter {
  field: string;
  order: "ascend" | "descend" | undefined;
}

interface TableProps {
  customStyle?: CSSProperties;
  data: Array<{ [key: string]: string }>;
  columns: Array<{ title: string; subColumns?: string[] }>;
  showCheckbox?: boolean;
  rowsPerPage?: number;
  pagination?: boolean;
  onRowSelect?: (selectedRows: string[]) => void;
  onRowDoubleClick?: (row: { [key: string]: string }) => void;
  sorter?: Sorter | null;
  setSorter?: React.Dispatch<React.SetStateAction<Sorter | null>>;
  showHeader?: boolean;
  headerTitle?: string;
  loading?: boolean;
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
  sorter = null,
  setSorter,
  showHeader = false,
  headerTitle,
  loading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { isOpen } = useModal();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    onRowSelect?.(selectedRows);
  }, [selectedRows, onRowSelect]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const isDate = (value: string) => {
    if (!value) return false;
    const datePattern = /^\d{2}\.\d{2}\.\d{2}$/;
    return datePattern.test(value.trim());
  };

  const sortedData = useMemo(() => {
    const sorted = [...data];
    if (sorter) {
      sorted.sort((a, b) => {
        const aValue = a[sorter.field];
        const bValue = b[sorter.field];
        if (sorter.order === "ascend") {
          return aValue > bValue ? 1 : -1;
        } else if (sorter.order === "descend") {
          return aValue < bValue ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [data, sorter]);

  const currentData = pagination
    ? sortedData.slice(indexOfFirstRow, indexOfLastRow)
    : sortedData;

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
    if (isOpen) return;
    if (onRowDoubleClick) {
      onRowDoubleClick(row);
    }
  };

  return (
    <div className="mx-5" style={{ ...customStyle }}>
      <div className="pb-2">
        <span
          className="text-sm font-bold ml-2"
          style={{
            color: isDarkMode ? colors["Grey_Lighten-1"] : colors.signature,
          }}
        >
          {showCheckbox && `선택된 데이터 ${selectedRows.length} 개 / `}총
          데이터 {data.length} 개
        </span>
      </div>
      {showHeader && (
        <ManagementHeader
          headerTitle={headerTitle}
          showButton={false}
          isFullWidth
        />
      )}

      <div
        style={{ borderColor: "transparent" }}
        className="mx-auto rounded-lg shadow-lg border w-full"
      >
        <table className="table-auto text-xs text-left text-gray-500 w-full">
          <thead
            className="p-2 text-sm"
            style={{
              backgroundColor: isDarkMode
                ? colors["Grey_Darken-4"]
                : colors.Table_header,
            }}
          >
            {/* 메인 header */}
            <tr>
              {showCheckbox && (
                <th rowSpan={3} className="px-4 py-3">
                  <Checkbox
                    mode="sm"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th key={column.title} className="text-center py-4">
                  {column.title}
                  {setSorter && (
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        if (sorter?.field === column.title) {
                          const newOrder =
                            sorter.order === "ascend" ? "descend" : "ascend";
                          setSorter({ field: column.title, order: newOrder });
                        } else {
                          setSorter({ field: column.title, order: "ascend" });
                        }
                      }}
                    >
                      {isDate(data[0][column.title])
                        ? sorter?.field === column.title &&
                          sorter.order === "ascend"
                          ? " ▲"
                          : sorter?.field === column.title &&
                            sorter.order === "descend"
                          ? " ▼"
                          : " ▲"
                        : null}
                    </span>
                  )}
                </th>
              ))}
            </tr>

            {/* 하위 header: 서브컬럼 위에 메인 컬럼 표시 */}
            <tr>
              {columns.map((column) => {
                if (!column.subColumns) {
                  return <th key={column.title}></th>; // 빈 <th> 추가
                }
                return (
                  <th
                    colSpan={column.subColumns.length}
                    key={column.title}
                    className="text-center py-2"
                  >
                    {column.title} {/* 메인 컬럼 이름 */}
                  </th>
                );
              })}
            </tr>
            <tr>
              {columns.map((column) => {
                return column.subColumns ? (
                  column.subColumns.map((subColumn, subIndex) => (
                    <th
                      key={`${column.title}-${subIndex}`}
                      className="text-center py-2"
                    >
                      {subColumn}
                    </th>
                  ))
                ) : (
                  <th key={column.title}></th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (showCheckbox ? 1 : 0)}
                  className="text-center py-4"
                >
                  <Loading />
                </td>
              </tr>
            ) : (
              currentData.map((row, index) => (
                <tr
                  onDoubleClick={() => handleRowDoubleClick(row)}
                  key={index}
                  style={{
                    color: isDarkMode
                      ? colors["Grey_Default"]
                      : colors["Grey_Darken-4"],
                    borderBottom: `1px solid ${colors["Grey_Lighten-2"]}`,
                  }}
                  className="text-center transition duration-150 ease-in-out hover:bg-gray-200 hover:shadow-md"
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
                    <td key={column.title} className="py-2 text-gray-700">
                      {column.subColumns ? (
                        column.subColumns.map((subColumn, subIndex) => (
                          <div key={`${subColumn}-${subIndex}`}>
                            <TableRender row={row} column={subColumn} />
                          </div>
                        ))
                      ) : (
                        <TableRender row={row} column={column.title} />
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
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
