import React from "react";
import colors from "@/styles/colors";
import CheckBoxCell from "../../atoms/table/CheckBoxCell";
import TableRender from "../render/TableRender";

interface TableRowProps {
  row: { [key: string]: string };
  columns: Array<{ title: string; subColumns?: string[] }>;
  showCheckbox: boolean;
  isChecked: boolean;
  onRowSelect: () => void;
  onRowDoubleClick: () => void;
  isDarkMode: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  row,
  columns,
  showCheckbox,
  isChecked,
  onRowSelect,
  onRowDoubleClick,
  isDarkMode,
}) => {
  return (
    <tr
      onDoubleClick={onRowDoubleClick}
      style={{
        color: isDarkMode ? colors["Grey_Default"] : colors["Grey_Darken-4"],
        borderBottom: `1px solid ${colors["Grey_Lighten-2"]}`,
      }}
      className="text-center transition duration-150 ease-in-out hover:bg-gray-200 hover:shadow-md"
    >
      {showCheckbox && (
        <CheckBoxCell isChecked={isChecked} onChange={onRowSelect} />
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
  );
};

export default TableRow;
