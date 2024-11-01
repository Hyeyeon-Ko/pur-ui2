"use client";

import React, { useCallback, useState } from "react";
import Table from "@/components/ui/molecules/table/Table";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/molecules/verticalTable/VerticalTable";
import useFormatHandler from "@/hooks/useFormatHandler";
import ThemeToggle from "@/components/ui/molecules/buttons/ThemeToggle";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
import {
  columns,
  tenderVertical,
  data,
  tenderVerticalResult,
} from "@/lib/data";
import Toast from "@/components/commons/Toast";
import useFileDownload from "@/hooks/useFileDownload";
import useFileUpload from "@/hooks/useFileUpload";
import useFormDownload from "@/hooks/useFormDownload";

const TenderDetail: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();
  const { downloadFile } = useFileDownload();
  const { handleFileUpload } = useFileUpload();
  const { handleFormDown } = useFormDownload();

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

      if (title === "센터명" && label === "전국") {
        if (isChecked) return { 전국: true };
        else return { 전국: false };
      } else if (title === "센터명" && label !== "전국") {
        newCheckedItems[label] = !prev[label];
        newCheckedItems["전국"] = false;
      }

      if (
        title === "계약종류" ||
        title === "입찰종류" ||
        title === "낙찰방법"
      ) {
        Object.keys(newCheckedItems).forEach((key) => {
          newCheckedItems[key] = false;
        });
        newCheckedItems[label] = true;
      }

      if (title === "계정명") {
        newCheckedItems[label] = !prev[label];
      }

      return newCheckedItems;
    });
  };

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));
    setSelectedRows(uniqueSelectedRows);
  }, []);

  /** 전체내역 다운로드
   * TODO: endpoint
   */
  const handleDownloadAll = () => {
    downloadFile("/api/endpoint", "입찰내역(전체).csv");
  };

  /** TODO: 저장버튼에 대한 임시 이벤트 추후에 엔드포인트 수정 필요*/
  const handleSave = async () => {
    try {
      const response = await fetch("/api/saveTenderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formattedData }),
      });
      if (!response.ok) throw new Error("Data save failed");
      Toast.successSaveNotify();
    } catch (error) {
      console.error("Save Error:", error);
      Toast.errorSaveNotify();
    }
  };

  /** TODO: 수정버튼에 대한 임시 이벤트 추후에 엔드포인트 수정 필요*/
  const handleModify = async () => {
    try {
      const response = await fetch("/api/modifyTenderData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedRows }),
      });
      if (!response.ok) throw new Error("Modification failed");
      Toast.successModifyNotify();
    } catch (error) {
      console.error("Modify Error:", error);
      Toast.errorModifyNotify();
    }
  };

  /**TODO: 서버에 저장된 파일을 불러올 예정, 엔드포인트 수정 필요 */
  const handleFormDownload = async () => {
    const endpoint = "/api/download-form-template";
    const fileName = "입찰양식.csv";
    handleFormDown(endpoint, fileName);
  };

  /** TODO: 엔드포인트 수정
   *    * 파일업로드 버튼 로직
   */
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const endpoint = "/api/upload";
    handleFileUpload(event, endpoint);
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
      <TableButton
        showSaveButton
        showModifyButton
        showAddButton={false}
        showDelButton={false}
        showAllDownButton={false}
        onSave={handleSave}
        onModify={handleModify}
      />
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
            onDownloadAll={handleDownloadAll}
            onFormDownload={handleFormDownload}
          />
        </div>
        <Table
          data={formattedData}
          columns={columns}
          onRowSelect={handleRowSelect}
          showCheckbox={false}
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
