import React from "react";
import DownButton from "../../templates/DownButton";
import { fileOptions, reasonOptions } from "@/lib/optionDatas";
import { useDarkMode } from "@/context/DarkModeContext";

interface TableRenderProps {
  row: { [key: string]: any };
  column: string;
}

const TableRender: React.FC<TableRenderProps> = ({ row, column }) => {
  const { isDarkMode } = useDarkMode();

  if (column === "입찰번호" && row["계약번호"]) {
    return (
      <span
        className={`cursor-pointer border-b ${
          isDarkMode
            ? "border-blue-500 text-blue hover:text-white"
            : "border-blue-500 hover:text-blue-600 text-blue"
        }`}
        onClick={() => {
          const newWindow = window.open(
            `/tender/${row[column]}`,
            `_tender_${row[column]}`,
            "fullscreen",
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
        className={`cursor-pointer border-b ${
          isDarkMode
            ? "border-blue-500 text-blue hover:text-white"
            : "border-blue-500 hover:text-blue-600 text-blue"
        }`}
        onClick={() => {
          const newWindow = window.open(
            `/contract/${row[column]}`,
            `_contract_${row[column]}`,
            "fullscreen",
          );
          if (newWindow) newWindow.opener = null;
        }}
      >
        {row[column]}
      </span>
    );
  }

  if (column === "열람" && row[column]) {
    return (
      <div>
        <DownButton fileOptions={fileOptions} reasonOptions={reasonOptions} />
      </div>
    );
  }

  return <span>{row[column]}</span>;
};

export default TableRender;
