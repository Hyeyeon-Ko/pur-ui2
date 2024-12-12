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
import { formatBidDetailData } from "@/lib/formatBidDetailData";
import { useParams } from "next/navigation";

const TenderDetail: React.FC = () => {
  const { bidId } = useParams();

  const [erpData, setErpData] = useState<ErpItemsType[]>([]);
  const [bidDetailData, setBidDetailData] = useState<
    BidMasterWithDetailsType[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { formatCurrency, formatDate } = useFormatHandler();
  const { handleFileUpload } = useFileUpload();
  const { handleFormDown } = useFormDownload();
  const { checkedItems, handleChipClick } = useChipHandler();

  useEffect(() => {
    const fetchData = async () => {
      if (!bidId) {
        console.error("bidId가 없습니다.");
        return;
      }

      try {
        const [bidDetailResponse, erpResponse] = await Promise.all([
          fetch(`/api/bid-detail?bid_id=${bidId}`),
          fetch(`/api/erp-detail?bid_id=${bidId}`),
        ]);

        if (!bidDetailResponse.ok) {
          throw new Error("입찰 상세 데이터를 불러오는데 실패했습니다.");
        }

        if (!erpResponse.ok) {
          throw new Error("ERP 데이터를 불러오는데 실패했습니다.");
        }

        const [bidDetailResult, erpResult] = await Promise.all([
          bidDetailResponse.json(),
          erpResponse.json(),
        ]);

        if (bidDetailResult.data) {
          setBidDetailData(bidDetailResult.data);
        } else {
          console.error("입찰 상세 데이터가 없습니다.");
        }

        if (erpResult.data) {
          setErpData(erpResult.data);
        } else {
          console.error("ERP 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };

    fetchData();
  }, [bidId]);

  const formattedBidResult = bidDetailData.length
    ? formatBidResultData(bidDetailData[0], { formatCurrency, formatDate })
    : [];
  const formattedBidDetail = bidDetailData.length
    ? formatBidDetailData(bidDetailData[0], { formatCurrency, formatDate })
    : [];
  const formattedErpData = erpData.length
    ? formatErpData(erpData, formatDate, formatCurrency)
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

  const handleDownloadAll = () => {
    if (!formattedErpData || formattedErpData.length === 0) {
      console.error("다운로드할 데이터가 없습니다.");
      return;
    }

    const keyMapping = {
      centerName: "센터명",
      erpCode: "ERP코드",
      erpItemName: "ERP품목명",
      accountType: "계정구분",
      modelName: "모델명",
      standard: "규격",
      manufacturer: "제조사",
      quantity: "수량",
      bidBaseUnitPrice: "낙찰기준단가",
      bidBasePrice: "낙찰기준가격",
    };

    const headers = bidColumns.map(col => col.title);
    const dataKeys = bidColumns.map(
      col => keyMapping[col.dataIndex as keyof typeof keyMapping],
    );

    const rows = formattedErpData.map(data =>
      dataKeys.map(key => `"${data[key as keyof typeof data] || "-"}"`),
    );

    const csvContent = [headers.map(header => `"${header}"`).join(",")]
      .concat(rows.map(row => row.join(",")))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "입찰내역(전체).csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  /** TODO: 저장버튼에 대한 임시 이벤트 추후에 엔드포인트 수정 필요*/
  const handleSave = async () => {
    try {
      const response = await fetch("/api/saveTenderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formattedBidDetail }),
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

  // /**TODO: 서버에 저장된 파일을 불러올 예정, 엔드포인트 수정 필요 */
  const handleFormDownload = async () => {
    const endpoint = "/templates/erp_contract_template.xlsx";
    const fileName = "입찰양식.csv";
    handleFormDown(endpoint, fileName);
  };

  /** TODO: 엔드포인트 수정
   *    파일업로드 버튼 로직
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
        showAddButton={false}
        showDelButton={false}
        showAllDownButton={false}
        onSave={handleSave}
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
        <div className="pb-20 pt-20">
          <VerticalTable
            data={formattedBidResult}
            showHeader={true}
            headerTitle="입찰결과"
          />
        </div>
      </div>
    </div>
  );
};

export default TenderDetail;
