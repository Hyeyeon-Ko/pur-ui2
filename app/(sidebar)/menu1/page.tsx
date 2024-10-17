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
import SingleDatePicker from "@/components/ui/atoms/datepicker/DatePicker";

const MenuPage = () => {
  const [downloadOption, setDownloadOption] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { handleFileUpload, handleDownloadOptionChange, handleFileDownload } =
    useExcelFileHandler(data, selectedRows);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

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
      title: "센터명",
      contents: [
        "전국",
        "재단",
        "본원",
        "광화문",
        "여의도",
        "강남",
        "수원",
        "대구",
        "부산",
        "광주",
        "제주",
      ],
    },
    {
      id: 1,
      title: "입찰번호",
      contents: "",
    },
    {
      id: 2,
      title: "공고구분",
      contents: "",
    },
    {
      id: 3,
      title: "계약종류",
      contents: [
        "일반계약",
        "단가계약",
        "임대계약",
        "공사계약",
        "일반계약",
        "기타계약",
      ],
    },
    {
      id: 4,
      title: "입찰종류",
      contents: ["일반경쟁", "제한경쟁", "지명경쟁"],
    },
    {
      id: 5,
      title: "낙찰방법",
      contents: ["최저가격", "2단계경쟁", "협상에의한계약"],
    },
    {
      id: 6,
      title: "계정명",
      contents: [
        "의약품",
        "항정신성의약품",
        "장비소모품",
        "인쇄물",
        "시약",
        "백신",
        "의료비품",
        "의료장비",
        "위생용품",
        "피복",
        "사무용품",
        "일반비품",
        "전산용품",
        "기타",
      ],
    },
    {
      id: 7,
      title: "입찰명",
      contents: "",
    },
    {
      id: 8,
      title: "공고일",
      contents: (
        <SingleDatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      ),
    },
    {
      id: 9,
      title: "마감일",
      contents: (
        <SingleDatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      ),
    },
    {
      id: 10,
      title: "응찰일",
      contents: (
        <SingleDatePicker
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      ),
    },
    {
      id: 11,
      title: "낙찰기준가",
      contents: "",
    },
    {
      id: 12,
      title: "입찰품의번호",
      contents: "",
    },
    {
      id: 13,
      title: "입찰품의",
      contents: (
        <>
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileUpload}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <Button
            mode="xs"
            content="파일업로드"
            color="Button_Default"
            onClick={handleUploadClick}
          />
        </>
      ),
    },
    {
      id: 14,
      title: "입찰공고문",
      contents: (
        <>
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileUpload}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <Button
            mode="xs"
            content="파일업로드"
            color="Button_Default"
            onClick={handleUploadClick}
          />
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col mb-4">
      <VerticalTable data={vertical} />

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
      <SingleDatePicker
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        label="날짜선택"
      />
    </div>
  );
};

export default MenuPage;
