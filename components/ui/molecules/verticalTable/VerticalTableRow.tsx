import React from "react";
import colors from "@/styles/colors";
import VerticalRender from "../render/VerticalRender";

interface VerticalTableRowProps {
  row: {
    id: number;
    title: string;
    contents?: string | string[] | null;
  };
  isDarkMode: boolean;
  onChipClick?: (label: string, title: string) => void;
  checkedItems?: { [key: string]: boolean };
  onInputChange: (id: number, value: string) => void;
  onDateChange: (date: Date | null, id: number) => void;
  announcementDate: Date | null;
  deadlineDate: Date | null;
}

const VerticalTableRow: React.FC<VerticalTableRowProps> = ({
  row,
  isDarkMode,
  onChipClick,
  checkedItems,
  onInputChange,
  onDateChange,
  announcementDate,
  deadlineDate,
}) => {
  return (
    <tr
      key={row.id}
      style={{
        borderBottom: isDarkMode
          ? `1px solid ${colors["Grey_Darken-4"]}`
          : `1px solid ${colors["Grey_Lighten-4"]}`,
      }}
    >
      <th
        style={{
          backgroundColor: isDarkMode
            ? colors["Grey_Darken-4"]
            : colors.Table_header,
          color: isDarkMode ? "white" : colors["Grey_Darken-3"],
          borderBottom: isDarkMode
            ? `1px solid ${colors["Grey_Darken-4"]}`
            : `1px solid ${colors["Grey_Lighten-4"]}`,
          borderLeft: "1px solid transparent",
        }}
        className="text-sm uppercase text-center"
      >
        {row.title}
      </th>
      <td className="w-[92%] px-4 py-2 text-xs">
        <VerticalRender
          row={row}
          onChipClick={onChipClick}
          checkedItems={checkedItems}
          onInputChange={onInputChange}
          onDateChange={(date) => onDateChange(date, row.id)}
          announcementDate={announcementDate}
          deadlineDate={deadlineDate}
        />
      </td>
    </tr>
  );
};

export default VerticalTableRow;
