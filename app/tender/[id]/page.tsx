"use client";

import React, { useCallback, useState } from "react";
import Table from "@/components/ui/molecules/table/Table";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/molecules/verticalTable/VerticalTable";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import useFormatHandler from "@/hooks/useFormatHandler";
import ThemeToggle from "@/components/ui/molecules/buttons/ThemeToggle";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton"; // Import your FileUploadButton
import {
  columns,
  tenderVertical,
  data,
  tenderVerticalResult,
} from "@/lib/data";

const TenderDetail: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();
  const { downloadCsv, handleFileUpload } = useExcelFileHandler();

  const [formattedData, setFormattedData] = useState(
    data.map((item) => ({
      ...item,
      센터: formatCenterData(item.센터) || "-",
      공고일: formatDate(item.공고일),
      마감일: formatDate(item.마감일),
      응찰일: formatDate(item.응찰일),
      낙찰기준가: formatCurrency(item.낙찰기준가),
      낙찰금액: formatCurrency(item.낙찰금액),
      누리장터: item.누리장터 || "-",
    }))
  );

  const handleChipClick = (label: string, title: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev };
      const isChecked = !prev[label];

      newCheckedItems[label] = isChecked;

      if (title === "센터명" && label === "전국") {
        if (isChecked) return { 전국: true };
        else return { 전국: false };
      } else if (title === "센터명" && label !== "전국") {
        newCheckedItems["전국"] = false;
      }

      if (isChecked) {
        Object.keys(newCheckedItems).forEach((key) => {
          if (
            (title === "계약종류" &&
              key.startsWith("계약종류") &&
              key !== label) ||
            (title === "입찰종류" &&
              key.startsWith("입찰종류") &&
              key !== label) ||
            (title === "낙찰방법" &&
              key.startsWith("낙찰방법") &&
              key !== label)
          ) {
            newCheckedItems[key] = false;
          }
        });
      }

      return newCheckedItems;
    });
  };

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));
    setSelectedRows(uniqueSelectedRows);
  }, []);

  const handleDownloadAll = () => {
    const allData = formattedData;
    downloadCsv(allData, "all_download.csv");
  };

  const handleDeleteSelected = () => {
    const newFormattedData = formattedData.filter(
      (item) => !selectedRows.includes(item.id)
    );
    confirm("선택한 항목을 정말 삭제하시겠습니까?");
    setFormattedData(newFormattedData);
    setSelectedRows([]);
  };

  const handleFormDownload = () => {
    const formTemplate = [
      "센터",
      "입찰번호",
      "계약종류",
      "입찰명",
      "공고일",
      "마감일",
      "응찰일",
    ];

    const csvContent = `\uFEFF${formTemplate.join(",")}\n`;
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "form_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 업로드 핸들러
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event);
  };

  return (
    <div>
      <ThemeToggle
        customStyle={{
          display: "flex",
          justifyContent: "end",
          marginTop: "24px",
          marginRight: "24px",
        }}
      />
      <PageTitle pageTitle="입찰상세조회" mode="xl" fontWeight="bold" />

      <VerticalTable
        data={tenderVertical}
        onChipClick={handleChipClick}
        checkedItems={checkedItems}
        showHeader={true}
        tableTitle="입찰사항"
      />
      <div className="py-20">
        <div className="flex justify-end mr-6">
          <FileUploadButton
            onFileUpload={handleUpload}
            buttonText="업로드"
            accept=".csv, .xls, .xlsx"
          />
          <TableButton
            showAddButton={false}
            showDelButton={false}
            showFormDownButton={true}
            onDeleteSelected={handleDeleteSelected}
            onDownloadAll={handleDownloadAll}
            onFormDownload={handleFormDownload}
          />
        </div>
        <Table
          data={formattedData}
          columns={columns}
          onRowSelect={handleRowSelect}
          showCheckbox
          showHeader={true}
          tableTitle="입찰내역"
        />
      </div>
      <div className="pb-20">
        <VerticalTable
          data={tenderVerticalResult}
          showHeader={true}
          tableTitle="입찰결과"
        />
      </div>
    </div>
  );
};

export default TenderDetail;
