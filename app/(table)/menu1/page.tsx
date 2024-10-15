"use client";

import Button from "@/components/ui/atoms/button/Button";
import DateRangePicker from "@/components/ui/atoms/datepicker/DateRangePicker";
import Table from "@/components/ui/atoms/table/Table";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import React, { useRef, useState } from "react";

const data = [
  {
    id: "0",
    data1: "The Sliding Mr. Bones",
    data2: "Malcolm Lockyer",
    data3: "1961",
  },
  { id: "1", data1: "Witchy Woman", data2: "The Eagles", data3: "1972" },
  {
    id: "2",
    data1: "Shining Star",
    data2: "Earth, Wind, and Fire",
    data3: "1975",
  },
];

const columns = ["data1", "data2", "data3"];

const MenuPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { handleFileUpload, handleFileDownload } = useExcelFileHandler();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRowSelect = (selectedRowIds: string[]) => {
    setSelectedRows(selectedRowIds);
  };

  const handleDownloadSelected = () => {
    if (selectedRows.length > 0) {
      const selectedData = selectedRows
        .map((rowId) => {
          const rowData = data.find((row) => row.id === rowId);
          return rowData ? [rowData.data1, rowData.data2, rowData.data3] : null;
        })
        .filter((row) => row !== null);

      if (selectedData.length > 0) {
        handleFileDownload(selectedData);
      } else {
        alert("선택된 데이터가 없습니다.");
      }
    } else {
      alert("선택된 데이터가 없습니다.");
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="mb-2">
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <Button
          mode="xs"
          content="엑셀업로드"
          variant="outline"
          color="Button_Default"
          onClick={handleButtonClick}
          disabled={false}
        />
        <Button
          mode="xs"
          content="엑셀다운로드"
          color="Button_Default"
          onClick={handleDownloadSelected}
          disabled={false}
        />
      </div>
      <Table
        data={data}
        columns={columns}
        onRowSelect={handleRowSelect}
        showCheckbox={true}
        pagination={true}
      />
      <div>
        <Table
          data={data}
          columns={columns}
          onRowSelect={handleRowSelect}
          pagination={true}
        />
      </div>
      <div>
        <Table data={data} columns={columns} onRowSelect={handleRowSelect} />
      </div>
      <DateRangePicker />
    </div>
  );
};

export default MenuPage;
