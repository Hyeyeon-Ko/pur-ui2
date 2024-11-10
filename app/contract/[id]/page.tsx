"use client";

import Toast from "@/components/commons/Toast";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import ThemeToggle from "@/components/ui/molecules/buttons/ThemeToggle";
import Table from "@/components/ui/molecules/table/Table";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/molecules/verticalTable/VerticalTable";
import useChipHandler from "@/hooks/useChipHandler";
import useFileDownload from "@/hooks/useFileDownload";
import useFileUpload from "@/hooks/useFileUpload";
import useFormatHandler from "@/hooks/useFormatHandler";
import useFormDownload from "@/hooks/useFormDownload";
import {
  contractListColumns,
  contractListData,
  contractVertical,
} from "@/lib/data";
import React, { useCallback, useState } from "react";

interface TenderDetailProps {
  params: {
    id: string;
  };
}

const TenderDetail: React.FC<TenderDetailProps> = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { downloadFile } = useFileDownload();
  const { handleFileUpload } = useFileUpload();
  const { handleFormDown } = useFormDownload();
  const { formatCenterData, formatCurrency } = useFormatHandler();
  const { checkedItems, handleChipClick } = useChipHandler();

  const [formattedData, setFormattedData] = useState(
    contractListData.map((item) => ({
      ...item,
      센터: formatCenterData(item.센터) || "-",
      낙찰기준가: formatCurrency(item.낙찰기준가),
      계약단가: formatCurrency(item.계약단가),
      계약금액: formatCurrency(item.계약금액),
    }))
  );

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));

    setSelectedRows(uniqueSelectedRows);
  }, []);

  /** 전체내역 다운로드
   * TODO: endpoint
   */
  const handleDownloadAll = () => {
    downloadFile("/api/endpoint", "계약내역(전체).csv");
  };

  /** TODO: 저장버튼에 대한 임시 이벤트 추후에 엔드포인트 수정 필요*/
  const handleSave = async () => {
    try {
      const response = await fetch("/api/saveContractData", {
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
      const response = await fetch("/api/modifyContractData", {
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
    const fileName = "계약양식.csv";
    handleFormDown(endpoint, fileName);
  };

  /** TODO: 엔드포인트 수정
   * 파일업로드 버튼 로직
   */
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const endpoint = "/api/upload";
    handleFileUpload(event, endpoint);
  };

  return (
    <div>
      <ThemeToggle />
      <PageTitle pageTitle="계약상세조회" mode="xl" fontWeight="bold" />
      <TableButton
        showSaveButton
        showModifyButton
        showAddButton={false}
        showDelButton={false}
        showAllDownButton={false}
        onDownloadAll={handleDownloadAll}
        onSave={handleSave}
        onModify={handleModify}
      />
      <VerticalTable
        data={contractVertical}
        onChipClick={handleChipClick}
        checkedItems={checkedItems}
        showHeader={true}
        headerTitle="계약사항"
      />
      <div className="py-20">
        <div className="flex justify-end mr-2">
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
          columns={contractListColumns}
          onRowSelect={handleRowSelect}
          showCheckbox={false}
          showHeader={true}
          headerTitle="계약내역"
        />
      </div>
    </div>
  );
};

export default TenderDetail;
