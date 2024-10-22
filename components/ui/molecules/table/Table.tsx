import React, { CSSProperties, useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import Checkbox from "../../atoms/checkbox/Checkbox";
import colors from "@/styles/colors";
import SelectBox from "../../atoms/selectBox/Select";

/**
 * 가로형 테이블 (일반 테이블)
 * 기능1. 체크박스 true/false : showCheckbox ->
 * showCheckbox가 true인 경우 테이블 상단에 선택된 데이터의 개수를 표시하도록 커스텀 함
 * showCheckbox가 true인 경우 다중선택, 개별선택 기능이 가능, 또한 전체선택 다운로드 / 선택항목 다운로드 구현완료
 * 기능2. 페이지네이션 true/false : pagination
 */
type TableType = "default" | "download";

interface Sorter {
  field: string;
  order: "ascend" | "descend" | undefined;
}

interface TableProps {
  customStyle?: CSSProperties;
  data: Array<{ [key: string]: string }>;
  columns: string[];
  showCheckbox?: boolean;
  rowsPerPage?: number;
  pagination?: boolean;
  onRowSelect?: (selectedRows: string[]) => void;
  onRowDoubleClick?: (row: { [key: string]: string }) => void;
  type?: TableType;
  sorter?: Sorter | null;
  setSorter?: React.Dispatch<React.SetStateAction<Sorter | null>>;
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
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [downloadOption, setDownloadOption] = useState<string>("");

  const isDate = (value: string) => {
    const datePattern = /^\d{2}\.\d{2}\.\d{2}$/;
    return datePattern.test(value.trim());
  };

  useEffect(() => {
    onRowSelect?.(selectedRows);
  }, [selectedRows, onRowSelect]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // 정렬된 데이터
  const sortedData = React.useMemo(() => {
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
    if (onRowDoubleClick) {
      onRowDoubleClick(row);
    }
  };

  const renderContent = (row: { [key: string]: any }, column: string) => {
    if (column === "입찰번호" && row["계약번호"]) {
      return (
        <span
          className="text-blue cursor-pointer border-b"
          onClick={() => {
            const newWindow = window.open(
              `/tender/${row[column]}`,
              "newwindow",
              "fullscreen"
            );
            if (newWindow) newWindow.opener = null;
          }}
        >
          {row[column]}
        </span>
      );
    }

    if (column === "계약번호") {
      return (
        <span
          className="text-blue cursor-pointer border-b"
          onClick={() => {
            const newWindow = window.open(
              `/contract/${row[column]}`,
              "newwindow",
              "fullscreen"
            );
            if (newWindow) newWindow.opener = null;
          }}
        >
          {row[column]}
        </span>
      );
    }

    if (column === "열람" && row[column] === "저장") {
      return (
        <SelectBox
          mode="xs"
          placeholder="다운로드"
          value={downloadOption}
          onChange={(e) => {
            setDownloadOption(e.target.value);
          }}
          options={[
            { value: "contract", label: "계약서 다운로드" },
            { value: "approve", label: "품의서 다운로드" },
          ]}
          color="signature"
          customStyle={{ color: colors.signature }}
        />
      );
    }

    return row[column];
  };

  return (
    <div className="mx-5" style={{ ...customStyle }}>
      <div className="pb-2">
        <span
          className="text-sm font-bold ml-2"
          style={{ color: colors.signature }}
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
          <thead>
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
                <th key={column} className="text-center">
                  {column}
                  {setSorter && (
                    <span
                      className="cursor-pointer"
                      onClick={() => {
                        if (sorter?.field === column) {
                          const newOrder =
                            sorter.order === "ascend" ? "descend" : "ascend";
                          setSorter({ field: column, order: newOrder });
                        } else {
                          setSorter({ field: column, order: "ascend" });
                        }
                      }}
                    >
                      {isDate(data[0][column])
                        ? sorter?.field === column && sorter.order === "ascend"
                          ? " ▲"
                          : sorter?.field === column &&
                            sorter.order === "descend"
                          ? " ▼"
                          : " ▲"
                        : null}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.map((row, index) => (
              <tr
                onDoubleClick={() => handleRowDoubleClick(row)}
                key={index}
                style={{
                  color: colors["Grey_Darken-4"],
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
                  <td key={column} className="py-2 text-gray-700">
                    {renderContent(row, column)}
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
