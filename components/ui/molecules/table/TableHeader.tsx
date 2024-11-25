import React from "react";
import colors from "@/styles/colors";
import { Sorter } from "../../organism/table/Table";
import CheckBoxHeader from "../../atoms/table/CheckBoxHeader";

interface TableHeaderProps {
  columns: Array<{ title: string; subColumns?: string[] }>;
  showCheckbox: boolean;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  sorter: Sorter | null;
  setSorter?: React.Dispatch<React.SetStateAction<Sorter | null>>;
  isDarkMode: boolean;
  data: Array<{ [key: string]: string }>;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  showCheckbox,
  isAllSelected,
  onSelectAll,
  sorter,
  setSorter,
  isDarkMode,
  data,
}) => {
  const isDate = (value: string) => {
    const datePattern = /^\d{2}\.\d{2}\.\d{2}$/;
    return value ? datePattern.test(value.trim()) : false;
  };

  const handleSortToggle = (columnTitle: string) => {
    if (setSorter) {
      const newOrder =
        sorter?.field === columnTitle && sorter.order === "ascend"
          ? "descend"
          : "ascend";
      setSorter({ field: columnTitle, order: newOrder });
    }
  };

  return (
    <thead
      className="p-2 text-sm"
      style={{
        backgroundColor: isDarkMode
          ? colors["Grey_Darken-4"]
          : colors.Table_header,
      }}
    >
      <tr>
        <CheckBoxHeader
          showCheckbox={showCheckbox}
          isAllSelected={isAllSelected}
          onSelectAll={onSelectAll}
        />
        {columns.map(column => (
          <th key={column.title} className="py-4 text-center">
            {column.title}
            {setSorter && (
              <span
                className="cursor-pointer"
                onClick={() => handleSortToggle(column.title)}
              >
                {isDate(data[0][column.title]) && (
                  <>
                    {sorter?.field === column.title && sorter.order === "ascend"
                      ? " ▲"
                      : sorter?.field === column.title &&
                          sorter.order === "descend"
                        ? " ▼"
                        : " ▲"}
                  </>
                )}
              </span>
            )}
          </th>
        ))}
      </tr>
      {columns.some(column => column.subColumns) && (
        <>
          <tr>
            {columns.map(column => (
              <th
                key={column.title}
                colSpan={column.subColumns?.length || 1}
                className="py-2 text-center"
              >
                {column.title}
              </th>
            ))}
          </tr>
          <tr>
            {columns.map(column =>
              column.subColumns ? (
                column.subColumns.map((subColumn, subIndex) => (
                  <th
                    key={`${column.title}-${subIndex}`}
                    className="py-2 text-center"
                  >
                    {subColumn}
                  </th>
                ))
              ) : (
                <th key={column.title}></th>
              ),
            )}
          </tr>
        </>
      )}
    </thead>
  );
};

export default TableHeader;
