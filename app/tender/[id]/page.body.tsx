"use client";

import React, { useCallback, useState } from "react";
import Table from "@/components/ui/organism/table/Table";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/organism/verticalTable/VerticalTable";
import useFormatHandler from "@/hooks/useFormatHandler";
import ThemeToggle from "@/components/ui/molecules/buttons/ThemeToggle";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
// import { tenderVerticalResult } from "@/lib/data";
import Toast from "@/components/commons/Toast";
import useFileDownload from "@/hooks/useFileDownload";
import useFileUpload from "@/hooks/useFileUpload";
import useFormDownload from "@/hooks/useFormDownload";
import useChipHandler from "@/hooks/useChipHandler";
import {
  bidDetailData,
  bidListData,
  bidListFieldLabel,
  bidResultData,
} from "@/lib/bidDatas";
import { bidListDataType } from "@/types/bidTypes";

const TenderDetailBody: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { formatCenterData, formatCurrency } = useFormatHandler();
  const { downloadFile } = useFileDownload();
  const { handleFileUpload } = useFileUpload();
  const { handleFormDown } = useFormDownload();
  const { checkedItems, handleChipClick } = useChipHandler();

  const formattedData: bidListDataType[] = bidListData.map((item) => ({
    ...item,
    센터명: formatCenterData(item.centerName) || "-",
    낙찰기준단가: formatCurrency(item.bidBaseUnitPrice),
    낙찰기준가격: formatCurrency(item.bidBasePrice),
    ERP코드: item.erpCode,
    ERP품목명: item.erpItemName,
    계정구분: item.accountType,
    모델명: item.modelName,
    규격: item.standard,
    제조사: item.manufacturer,
    수량: item.quantity,
  }));

  const bidColumns = Object.keys(bidListFieldLabel)
    .filter((field) => field !== "id") // "id"를 제외
    .map((field) => ({
      title: bidListFieldLabel[field as keyof typeof bidListFieldLabel],
      dataIndex: field,
      key: field,
    }));

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
        data={bidDetailData}
        onChipClick={handleChipClick}
        checkedItems={checkedItems}
        showHeader={true}
        headerTitle="입찰사항"
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
          columns={bidColumns}
          onRowSelect={handleRowSelect}
          showCheckbox={false}
          showHeader={true}
          headerTitle="입찰내역"
        />
      </div>
      <div className="pb-20">
        <VerticalTable
          data={bidResultData}
          showHeader={true}
          headerTitle="입찰결과"
        />
      </div>
    </div>
  );
};

export default TenderDetailBody;
