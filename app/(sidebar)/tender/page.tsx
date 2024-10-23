"use client";

import Button from "@/components/ui/atoms/button/Button";
import SelectBox from "@/components/ui/atoms/selectBox/Select";
import Table from "@/components/ui/molecules/table/Table";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import React, { useState, useCallback } from "react";
import colors from "@/styles/colors";
import {
  data,
  columns,
  centerOptions,
  bidOptions,
  accountOptions,
  bidResultOptions,
} from "@/lib/data";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
import useFormatHandler from "@/hooks/useFormatHandler";
import SearchFilter, {
  FieldConfig,
} from "@/components/ui/organism/filter/SearchFilter";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import Link from "next/link";

const fieldsConfig: FieldConfig[] = [
  { name: "center", type: "select", options: centerOptions },
  { name: "bidType", type: "select", options: bidOptions },
  { name: "accountName", type: "select", options: accountOptions },
  { name: "bidResult", type: "select", options: bidResultOptions },
  { name: "winner", type: "input", label: "낙찰자" },
  { name: "bidName", type: "input", label: "입찰명" },
  { name: "announcementDate", type: "date", label: "공고일" },
  { name: "dueDate", type: "date", label: "마감일" },
];

const MenuPage = () => {
  const [downloadOption, setDownloadOption] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sorter, setSorter] = useState<{
    field: string;
    order: "ascend" | "descend" | undefined;
  } | null>(null);

  const { handleFileUpload, downloadCsv } = useExcelFileHandler();
  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();

  const formattedData = data.map((item) => ({
    ...item,
    센터: formatCenterData(item.센터) || "-",
    공고일: formatDate(item.공고일),
    마감일: formatDate(item.마감일),
    응찰일: formatDate(item.응찰일),
    낙찰기준가: formatCurrency(item.낙찰기준가),
    낙찰금액: formatCurrency(item.낙찰금액),
    누리장터: item.누리장터 || "-",
  }));

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));
    setSelectedRows(uniqueSelectedRows);
  }, []);

  const handleDownloadSelected = () => {
    if (selectedRows.length > 0) {
      const selectedData = selectedRows
        .map((rowId) => {
          const row = data.find((item) => item.id === rowId);
          return row
            ? {
                ...row,
                센터: formatCenterData(row.센터) || "-",
                공고일: formatDate(row.공고일) || "-",
                마감일: formatDate(row.마감일) || "-",
                응찰일: formatDate(row.응찰일) || "-",
                낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
                낙찰금액: formatCurrency(row.낙찰금액) || "-",
                열람: row.열람 || "-",
                누리장터: row.누리장터 || "-",
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
          const row = data.find((item) => item.id === rowId);
          return row
            ? {
                ...row,
                센터: formatCenterData(row.센터) || "-",
                공고일: formatDate(row.공고일) || "-",
                마감일: formatDate(row.마감일) || "-",
                응찰일: formatDate(row.응찰일) || "-",
                낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
                낙찰금액: formatCurrency(row.낙찰금액) || "-",
                열람: row.열람 || "-",
                누리장터: row.누리장터 || "-",
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
      const allData = data.map((row) => ({
        ...row,
        센터: formatCenterData(row.센터) || "-",
        공고일: formatDate(row.공고일) || "-",
        마감일: formatDate(row.마감일) || "-",
        응찰일: formatDate(row.응찰일) || "-",
        낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
        낙찰금액: formatCurrency(row.낙찰금액) || "-",
        열람: row.열람 || "-",
        누리장터: row.누리장터 || "-",
      }));

      downloadCsv(allData, "all_download.csv");
    }
  };

  const handleOpenAddPage = () => {
    window.open("/tender/add", "_blank", "noopener,noreferrer,fullscreen");
  };

  return (
    <div className="flex flex-col mb-4">
      <PageTitle pageTitle="입찰조회" mode="xl" fontWeight="bold" />

      <div>
        <SearchFilter fieldsConfig={fieldsConfig} />
      </div>
      <div className="flex justify-end mr-6">
        <Button mode="xs" content="추가" onClick={handleOpenAddPage} />

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
        columns={columns}
        onRowSelect={handleRowSelect}
        onRowDoubleClick={(row) => {
          const id = row.id;
          const url = `/tender/${id}`;
          window.open(
            url,
            "_blank",
            "noopener,noreferrer,width=1920,height=1080"
          );
        }}
        showCheckbox={true}
        pagination={true}
        sorter={sorter}
        setSorter={setSorter}
      />
    </div>
  );
};

export default MenuPage;
