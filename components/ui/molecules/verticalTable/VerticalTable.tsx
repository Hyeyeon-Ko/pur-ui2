import React, { useState } from "react";
import colors from "@/styles/colors";
import { useDarkMode } from "@/context/DarkModeContext";
import VerticalRender from "../render/VerticalRender";
import TableHeader from "../header/TableHeader";

interface VerticalTableProps {
  data: Array<{
    id: number;
    title: string;
    type?: string;
    contents?: string | string[] | null;
    options?: Array<{ value: string; label: string }>;
    component?: React.ReactNode;
  }>;
  onChipClick?: (label: string, title: string) => void;
  checkedItems?: { [key: string]: boolean };
  showHeader?: boolean;
  tableTitle?: string;
}

const VerticalTable: React.FC<VerticalTableProps> = ({
  data,
  onChipClick,
  checkedItems,
  showHeader = false,
  tableTitle,
}) => {
  const { isDarkMode } = useDarkMode();
  const [tableData, setTableData] = useState(data);
  const [announcementDate, setAnnouncementDate] = useState<Date | null>(null);
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);

  const handleInputChange = (id: number, value: string) => {
    setTableData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, contents: value } : row))
    );
  };

  const handleDateChange = (date: Date | null, id: number) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id
          ? { ...row, contents: date ? date.toISOString() : null }
          : row
      )
    );
    if (id === 8) {
      setAnnouncementDate(date); // 공고일
    } else if (id === 9) {
      setDeadlineDate(date); // 마감일
    }
  };

  return (
    <div className="mx-5 rounded-lg shadow-lg">
      {showHeader && <TableHeader tableTitle={tableTitle} />}

      <table className="table-auto w-full">
        <tbody className="divide-x">
          {tableData.map((row) => (
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
                className="text-xs uppercase text-center"
              >
                {row.title}
              </th>
              <td className="w-[92%] px-4 py-2 text-xs">
                <VerticalRender
                  row={row}
                  onChipClick={onChipClick}
                  checkedItems={checkedItems}
                  onInputChange={handleInputChange}
                  onDateChange={(date) => handleDateChange(date, row.id)}
                  announcementDate={announcementDate} // 공고일
                  deadlineDate={deadlineDate} // 마감일
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerticalTable;
