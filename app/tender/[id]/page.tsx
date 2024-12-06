"use client";

import React, { useCallback, useEffect, useState } from "react";
import Table from "@/components/ui/organism/table/Table";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/organism/verticalTable/VerticalTable";
import useFormatHandler from "@/hooks/useFormatHandler";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
import Toast from "@/components/commons/Toast";
import useFileDownload from "@/hooks/useFileDownload";
import useFileUpload from "@/hooks/useFileUpload";
import useFormDownload from "@/hooks/useFormDownload";
import useChipHandler from "@/hooks/useChipHandler";
import { bidListFieldLabel } from "@/lib/bidDatas";
import { ErpItemsType } from "@/types/bidTypes";
import ThemeToggle from "@/components/layouts/_components/ThemeToggle";
import { formatErpData } from "@/utils/formatErpData";
import { BidMasterWithDetailsType } from "@/types/contractTypes";
import { formatBidResultData } from "@/utils/formatBidResultData";
import { useRouter } from "next/navigation";
import { formatBidDetailData } from "@/lib/formatBidDetailData";

const TenderDetail: React.FC = () => {
  const [erpData, setErpData] = useState<ErpItemsType[]>([]);
  const [bidData, setBidData] = useState<BidMasterWithDetailsType[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { formatCenterData, formatCurrency, formatDate } = useFormatHandler();
  const { downloadFile } = useFileDownload();
  const { handleFileUpload } = useFileUpload();
  const { handleFormDown } = useFormDownload();
  const { checkedItems, handleChipClick } = useChipHandler();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bidResponse, erpResponse] = await Promise.all([
          fetch("/api/bid"),
          fetch("/api/erp"),
        ]);

        if (!bidResponse.ok || !erpResponse.ok) {
          throw new Error("데이터 로딩 실패");
        }

        const [bidResult, erpResult] = await Promise.all([
          bidResponse.json(),
          erpResponse.json(),
        ]);
        console.log("Fetched bid data:", bidResult.data);
        console.log("Fetched erp data:", erpResult.data);
        setBidData(bidResult.data || []);
        setErpData(erpResult.data || []);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setIsLoading(false); // 로딩 상태 해제
      }
    };

    fetchData();
  }, []);

  const formattedErpData = erpData.length
    ? formatErpData(erpData, formatDate, formatCurrency)
    : [];
  const formattedBidResult = bidData.length
    ? formatBidResultData(bidData[0], { formatCurrency, formatDate })
    : [];
  const formattedBidDetail = bidData.length
    ? formatBidDetailData(bidData[0], { formatCurrency, formatDate })
    : [];

  const bidColumns = Object.keys(bidListFieldLabel)
    .filter(field => field !== "id")
    .map(field => ({
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
        body: JSON.stringify({ data: formattedErpData }),
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
      <div className="py-10">
        <ThemeToggle />
      </div>
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
        data={formattedBidDetail.map(item => ({
          ...item,
          contents:
            item.type === "datepicker" &&
            (!item.contents || item.contents === "-")
              ? null
              : item.contents,
        }))}
        onChipClick={handleChipClick}
        checkedItems={checkedItems}
        showHeader={true}
        headerTitle="입찰사항"
      />
      <div className="py-20">
        <div className="mr-6 flex justify-end">
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
          data={formattedErpData}
          columns={bidColumns}
          onRowSelect={handleRowSelect}
          showCheckbox={false}
          showHeader={true}
          headerTitle="입찰내역"
        />
      </div>
      <div className="pb-20">
        <VerticalTable
          data={formattedBidResult}
          showHeader={true}
          headerTitle="입찰결과"
        />
      </div>
    </div>
  );
};

export default TenderDetail;
