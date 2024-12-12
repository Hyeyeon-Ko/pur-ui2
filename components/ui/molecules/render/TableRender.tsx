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
          const bidId = row["bid_id"];
          const newWindow = window.open(
            `/tender/${bidId}`,
            `_tender_${bidId}`,
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
          const bidId = row["bid_id"];
          if (bidId) {
            const newWindow = window.open(
              `/contract/${bidId}`,
              `_contract_${bidId}`,
              "fullscreen",
            );
            if (newWindow) newWindow.opener = null;
          } else {
            console.error("cont_id가 존재하지 않습니다.");
          }
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
