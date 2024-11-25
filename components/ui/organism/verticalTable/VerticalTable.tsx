import React, { useState } from "react";
import { useDarkMode } from "@/context/DarkModeContext";
import VerticalTableRow from "../../molecules/verticalTable/VerticalTableRow";
import VerticalTableHeader from "../../molecules/verticalTable/VerticalTableHeader";

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
  headerTitle?: string;
}

const VerticalTable: React.FC<VerticalTableProps> = ({
  data,
  onChipClick,
  checkedItems,
  showHeader = false,
  headerTitle,
}) => {
  const { isDarkMode } = useDarkMode();
  const [tableData, setTableData] = useState(data);
  const [announcementDate, setAnnouncementDate] = useState<Date | null>(null);
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);

  const handleInputChange = (id: number, value: string) => {
    setTableData(prevData =>
      prevData.map(row => (row.id === id ? { ...row, contents: value } : row)),
    );
  };

  const handleDateChange = (date: Date | null, id: number) => {
    setTableData(prevData =>
      prevData.map(row =>
        row.id === id
          ? { ...row, contents: date ? date.toISOString() : null }
          : row,
      ),
    );
    if (id === 8) {
      setAnnouncementDate(date); // 공고일
    } else if (id === 9) {
      setDeadlineDate(date); // 마감일
    }
  };

  return (
    <div className="mx-5 my-2 rounded-lg shadow-lg">
      <VerticalTableHeader showHeader={showHeader} headerTitle={headerTitle} />
      <table className="w-full table-auto">
        <tbody className="divide-x">
          {tableData.map(row => (
            <VerticalTableRow
              key={row.id}
              row={row}
              isDarkMode={isDarkMode}
              onChipClick={onChipClick}
              checkedItems={checkedItems}
              onInputChange={handleInputChange}
              onDateChange={handleDateChange}
              announcementDate={announcementDate}
              deadlineDate={deadlineDate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerticalTable;
