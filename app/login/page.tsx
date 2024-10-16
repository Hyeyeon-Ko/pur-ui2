"use client";

import Button from "@/components/ui/atoms/button/Button";
import Table from "@/components/ui/molecules/table/Table";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import { columns, data } from "@/lib/data";
import React, { useRef, useState } from "react";

const LoginPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { handleFileUpload, handleFileDownload } = useExcelFileHandler(
    data,
    selectedRows
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleRowSelect = (selectedRowIds: string[]) => {
    setSelectedRows(selectedRowIds);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDownloadSelected = () => {
    if (selectedRows.length > 0) {
      const selectedData = selectedRows
        .map((rowId) => {
          const rowData = data.find((row) => row.id === rowId);
          // 각각 포함된 rowData의 값
          return rowData ? Object.values(rowData) : null;
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
    <>
      <div className="flex justify-end mr-6 mt-10">
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
          color="Button_Default"
          onClick={handleUploadClick}
        />
        <Button
          mode="xs"
          content="엑셀다운로드"
          variant="outline"
          color="Button_Default"
          onClick={handleDownloadSelected}
        />
      </div>
      <Table
        data={data}
        columns={columns}
        onRowSelect={handleRowSelect}
        showCheckbox={true}
        pagination={true}
      />
    </>
  );
};

export default LoginPage;
