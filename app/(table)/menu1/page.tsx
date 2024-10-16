"use client";

import Button from "@/components/ui/atoms/button/Button";
import DateRangePicker from "@/components/ui/atoms/datepicker/DateRangePicker";
import SelectBox from "@/components/ui/atoms/selectBox/Select";
import Table from "@/components/ui/molecules/table/Table";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import React, { useRef, useState } from "react";
import colors from "@/styles/colors";
import { data, columns } from "@/lib/data";
import VerticalTable from "@/components/ui/molecules/verticalTable/VerticalTable";

const MenuPage = () => {
  const [downloadOption, setDownloadOption] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { handleFileUpload, handleDownloadOptionChange, handleFileDownload } =
    useExcelFileHandler(data, selectedRows);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const handleUploadClick = () => {
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
          // Ensure you return rowData as an array of values
          return rowData ? Object.values(rowData) : null;
        })
        .filter((row) => row !== null);

      if (selectedData.length > 0) {
        handleFileDownload(selectedData); // Pass selectedData directly
      } else {
        alert("선택된 데이터가 없습니다.");
      }
    } else {
      alert("선택된 데이터가 없습니다.");
    }
  };

  const vertical = [
    {
      id: 0,
      title: "제목1",
      contents: "체크박스 여러개",
    },
    {
      id: 1,
      title: "제목1",
      contents: "체크박스 여러개",
    },
    {
      id: 2,
      title: "제목1",
      contents: "체크박스 여러개",
    },
    {
      id: 3,
      title: "제목1",
      contents: "체크박스 여러개",
    },
    {
      id: 4,
      title: "제목1",
      contents: "체크박스 여러개",
    },
    {
      id: 5,
      title: "제목1",
      contents: "체크박스 여러개",
    },
  ];

  return (
    <div className="flex flex-col mb-4">
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
        <SelectBox
          mode="xs"
          placeholder="엑셀다운로드"
          value={downloadOption}
          onChange={(e) => {
            setDownloadOption(e.target.value);
            handleDownloadOptionChange(e);
          }}
          options={[
            { value: "all", label: "전체 다운로드" },
            { value: "selected", label: "선택 다운로드" },
          ]}
          customStyle={{ color: colors.Button_Default }}
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
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        startLabel="시작 날짜"
        endLabel="종료 날짜"
      />
      <VerticalTable data={vertical} />
    </div>
  );
};

export default MenuPage;
