import React from "react";
import Loading from "@/components/commons/Loading";
import TableRow from "./TableRow";

interface TableBodyProps {
  loading: boolean;
  currentData: Array<{ [key: string]: string }>;
  columns: Array<{ title: string; subColumns?: string[] }>;
  showCheckbox: boolean;
  selectedRows: string[];
  onRowSelect: (rowId: string) => void;
  onRowDoubleClick: (row: { [key: string]: string }) => void;
  isDarkMode: boolean;
}

const TableBody: React.FC<TableBodyProps> = ({
  loading,
  currentData,
  columns,
  showCheckbox,
  selectedRows,
  onRowSelect,
  onRowDoubleClick,
  isDarkMode,
}) => {
  return (
    <tbody>
      {loading ? (
        <tr>
          <td
            colSpan={columns.length + (showCheckbox ? 1 : 0)}
            className="py-4 text-center"
          >
            <Loading />
          </td>
        </tr>
      ) : (
        currentData.map((row, index) => (
          <TableRow
            key={index}
            row={row}
            columns={columns}
            showCheckbox={showCheckbox}
            isChecked={selectedRows.includes(String(index))}
            onRowSelect={() => onRowSelect(String(index))}
            onRowDoubleClick={() => onRowDoubleClick(row)}
            isDarkMode={isDarkMode}
          />
        ))
      )}
    </tbody>
  );
};

export default TableBody;
