"use client";

import Button from "@/components/ui/atoms/button/Button";
import SelectBox from "@/components/ui/atoms/selectBox/Select";
import Table from "@/components/ui/molecules/table/Table";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import React, { useState, useCallback } from "react";
import colors from "@/styles/colors";
import { contractData, contractColumns } from "@/lib/data";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
import useFormatHandler from "@/hooks/useFormatHandler";
import SearchFilter from "@/components/ui/organism/filter/SearchFilter";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";

const MenuPage = () => {
  const [downloadOption, setDownloadOption] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { handleFileUpload, downloadCsv } = useExcelFileHandler();

  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();

  const formattedData = contractData.map((item) => ({
    ...item,
    센터: formatCenterData(item.센터) || "-",
    계약일자: formatDate(item.계약일자),
    계약시작일: formatDate(item.계약시작일),
    계약완료일: formatDate(item.계약완료일),
    낙찰기준가: formatCurrency(item.낙찰기준가),
    계약금액: formatCurrency(item.계약금액),
    입찰번호: item.입찰번호,
    계약번호: item.계약번호,
    열람: item.열람,
  }));

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));

    setSelectedRows(uniqueSelectedRows);
  }, []);

  const handleDownloadSelected = () => {
    if (selectedRows.length > 0) {
      const selectedData = selectedRows
        .map((rowId) => {
          const row = contractData.find((item) => item.id === rowId);
          return row
            ? {
                ...row,
                센터: formatCenterData(row.센터) || "-",
                계약일자: formatDate(row.계약일자) || "-",
                계약시작일: formatDate(row.계약시작일) || "-",
                계약완료일: formatDate(row.계약완료일) || "-",
                낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
                계약금액: formatCurrency(row.계약금액) || "-",
                열람: row.열람 || "-",
              }
            : null;
        })
        .filter(Boolean);

      downloadCsv(selectedData, "download.csv");
    } else {
      alert("선택된 데이터가 없습니다.");
    }
  };

  const handleDownloadOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const option = e.target.value;

    if (option === "selected") {
      const selectedData = selectedRows
        .map((rowId) => {
          const row = contractData.find((item) => item.id === rowId);
          return row
            ? {
                ...row,
                센터: formatCenterData(row.센터) || "-",
                계약일자: formatDate(row.계약일자) || "-",
                계약시작일: formatDate(row.계약시작일) || "-",
                계약완료일: formatDate(row.계약완료일) || "-",
                낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
                계약금액: formatCurrency(row.계약금액) || "-",
                열람: row.열람 || "-",
              }
            : null;
        })
        .filter(Boolean);

      if (selectedData.length > 0) {
        downloadCsv(selectedData, "selected_download.csv");
      } else {
        alert("선택된 데이터가 없습니다.");
      }
    } else if (option === "all") {
      const allData = contractData.map((row) => ({
        ...row,
        센터: formatCenterData(row.센터) || "-",
        계약일자: formatDate(row.계약일자) || "-",
        계약시작일: formatDate(row.계약시작일) || "-",
        계약완료일: formatDate(row.계약완료일) || "-",
        낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
        계약금액: formatCurrency(row.계약금액) || "-",
        열람: row.열람 || "-",
      }));

      downloadCsv(allData, "all_download.csv");
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <PageTitle pageTitle="계약조회" mode="xl" fontWeight="bold" />

      <div>
        <SearchFilter />
      </div>
      <div className="flex justify-end mr-6">
        <FileUploadButton
          onFileUpload={handleFileUpload}
          buttonText="엑셀업로드"
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
        data={formattedData}
        columns={contractColumns}
        onRowSelect={handleRowSelect}
        onRowDoubleClick={() => {}}
        showCheckbox={true}
        pagination={true}
      />
    </div>
  );
};

export default MenuPage;
