"use client";

import Toast from "@/components/commons/Toast";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import Table from "@/components/ui/organism/table/Table";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/organism/verticalTable/VerticalTable";
import useChipHandler from "@/hooks/useChipHandler";
import useFileDownload from "@/hooks/useFileDownload";
import useFileUpload from "@/hooks/useFileUpload";
import useFormatHandler from "@/hooks/useFormatHandler";
import useFormDownload from "@/hooks/useFormDownload";
import React, { useCallback, useState } from "react";
import {
  contractDetailData,
  contractListData,
  contractListLabels,
} from "@/lib/contractDatas";
import ThemeToggle from "@/components/layouts/_components/ThemeToggle";

const TenderDetail = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { downloadFile } = useFileDownload();
  const { handleFileUpload } = useFileUpload();
  const { handleFormDown } = useFormDownload();
  const { formatCenterData, formatCurrency } = useFormatHandler();
  const { checkedItems, handleChipClick } = useChipHandler();

  const formattedData: { [key: string]: string }[] = contractListData.map(
    item => ({
      센터: formatCenterData(item.centerName || []) || "-",
      낙찰기준가: formatCurrency(item.baseBidPrice || ""),
      계약단가: formatCurrency(item.contractUnitPrice || ""),
      계약금액: formatCurrency(item.contractAmount || ""),
      ERP코드: item.erpCode || "-",
      ERP품목: item.erpItem || "-",
      입찰번호: item.bidNumber || "-",
      계약번호: item.contractNumber || "-",
      계약종류: item.contractType || "-",
      계정구분: item.accountCategory || "-",
      모델명: item.modelName || "-",
      규격: item.standard || "-",
      제조사: item.manufacturer || "-",
      공급사: item.supplier || "-",
      수량: item.quantity || "-",
    }),
  );

  const contractColumns = Object.keys(contractListLabels)
    .filter(field => field !== "id")
    .map(field => ({
      title: contractListLabels[field as keyof typeof contractListLabels],
      dataIndex: field,
      key: field,
    }));

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));
    setSelectedRows(uniqueSelectedRows);
  }, []);

  const handleDownloadAll = () => {
    downloadFile("/api/endpoint", "계약내역(전체).csv");
  };

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

  const handleFormDownload = async () => {
    const endpoint = "/api/download-form-template";
    const fileName = "계약양식.csv";
    handleFormDown(endpoint, fileName);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const endpoint = "/api/upload";
    handleFileUpload(event, endpoint);
  };

  return (
    <div>
      <div className="py-10">
        <ThemeToggle />
      </div>
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
        data={contractDetailData}
        onChipClick={handleChipClick}
        checkedItems={checkedItems}
        showHeader={true}
        headerTitle="계약사항"
      />
      <div className="py-20">
        <div className="mr-2 flex justify-end">
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
          columns={contractColumns}
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
