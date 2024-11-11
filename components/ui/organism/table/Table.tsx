import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import Pagination from "../../molecules/pagination/Pagination";
import colors from "@/styles/colors";
import { useDarkMode } from "@/context/DarkModeContext";
import useModal from "@/hooks/useModal";
import ManagementHeader from "../../molecules/header/ManagementHeader";
import TableBody from "../../molecules/table/TableBody";
import TableHeader from "../../molecules/table/TableHeader";

export interface Sorter {
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
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { isOpen } = useModal();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    onRowSelect?.(selectedRows);
  }, [selectedRows, onRowSelect]);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfFirstRow = (currentPage - 1) * rowsPerPage;

  const sortedData = useMemo(() => {
    if (!sorter) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sorter.field];
      const bValue = b[sorter.field];
      return sorter.order === "ascend"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });
  }, [data, sorter]);

  const currentData = pagination
    ? sortedData.slice(indexOfFirstRow, indexOfFirstRow + rowsPerPage)
    : sortedData;

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? data.map((_, index) => String(index)) : []);
  };

  const handleRowSelect = (rowId: string) => {
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  const isAllSelected =
    data.length > 0 &&
    data.every((_, index) => selectedRows.includes(String(index)));

  const handleRowDoubleClick = (row: { [key: string]: string }) => {
    if (!isOpen && onRowDoubleClick) {
      onRowDoubleClick(row);
    }
  };

  return (
    <div className="mx-5" style={customStyle}>
      <div className="pb-2">
        <span
          className={`text-sm font-bold ml-2 ${
            isDarkMode ? "text-grey-lighten-1" : "text-signature"
          }`}
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

      <div className="mx-auto rounded-lg shadow-lg w-full">
        <table className="table-auto text-xs text-left text-gray-500 w-full">
          <TableHeader
            columns={columns}
            showCheckbox={showCheckbox}
            isAllSelected={isAllSelected}
            onSelectAll={handleSelectAll}
            sorter={sorter}
            setSorter={setSorter}
            isDarkMode={isDarkMode}
            data={data}
          />
          <TableBody
            loading={loading}
            currentData={currentData}
            columns={columns}
            showCheckbox={showCheckbox}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onRowDoubleClick={handleRowDoubleClick}
            isDarkMode={isDarkMode}
          />
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
