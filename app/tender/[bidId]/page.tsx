"use client";

import React, { useCallback, useEffect, useState } from "react";
import Table from "@/components/ui/organism/table/Table";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/organism/verticalTable/VerticalTable";
import useFormatHandler from "@/hooks/useFormatHandler";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
import Toast from "@/components/commons/Toast";
import useFileUpload from "@/hooks/useFileUpload";
import useFormDownload from "@/hooks/useFormDownload";
import useChipHandler from "@/hooks/useChipHandler";
import { bidDetailLabel, bidListFieldLabel } from "@/lib/bidDatas";
import { ErpItemsType } from "@/types/bidTypes";
import ThemeToggle from "@/components/layouts/_components/ThemeToggle";
import { formatErpData } from "@/utils/formatErpData";
import { BidMasterWithDetailsType } from "@/types/contractTypes";
import { formatBidResultData } from "@/utils/formatBidResultData";
import { formatBidDetailData } from "@/lib/formatBidDetailData";
import { useParams } from "next/navigation";
import useDownloadAll from "@/hooks/useDownloadAll";
import { tenderErpMapping } from "@/lib/keyMapping";
import Papa from "papaparse";

const TenderDetail: React.FC = () => {
  const { bidId } = useParams();

  const [erpData, setErpData] = useState<ErpItemsType[]>([]);
  const [bidDetailData, setBidDetailData] = useState<
    BidMasterWithDetailsType[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { formatCurrency, formatDate } = useFormatHandler();
  // const { handleFileUpload } = useFileUpload();
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

  // const formattedBidResult = bidDetailData.length
  //   ? formatBidResultData(bidDetailData[0], { formatCurrency, formatDate })
  //   : [];
  const formattedBidDetail = bidDetailData.length
    ? formatBidDetailData(bidDetailData[0], bidDetailLabel)
    : [];
  const formattedErpData = erpData.length
    ? formatErpData(erpData, formatDate, formatCurrency)
    : [];
  console.log(formattedErpData);
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

  const handleDownloadAll = useDownloadAll(
    formattedErpData,
    tenderErpMapping,
    bidColumns,
  );

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
  // const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const endpoint = "/api/upload";
  //   handleFileUpload(event, endpoint);
  // };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true, // 첫 줄 헤더로 사용
      skipEmptyLines: true, // 빈 값은 넘김
      complete: result => {
        console.log("Raw CSV Data:", result.data);
        const csvData = result.data as Record<string, string>[];

        const formattedCsvData: ErpItemsType[] = csvData.map(item => ({
          inst_cd: item["센터명"] || "",
          erp_cd: item["ERP코드"] || "",
          erp_item_nm: item["ERP품목명"] || "",
          acc_cat: item["계정구분"] || "",
          model_nm: item["모델명"] || "",
          spec: item["규격"] || "",
          mfr: item["제조사"] || "",
          qty: item["수량"] || "",
          ref_price: item["낙찰기준가"] || "",
          std_price: item["낙찰기준단가"] || "-",
        }));

        console.log("formattedCsvData", formattedCsvData);
        setErpData(prev => [...prev, ...formattedCsvData]);
      },
      error: err => {
        console.error("파일 읽기 오류:", err.message);
      },
    });

    event.target.value = "";
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
            onFileUpload={handleFileUpload}
            buttonText="업로드"
            accept=".csv, .xls, .xlsx"
          />
          <TableButton
            showAddButton={false}
            showDelButton={false}
            showFormDownButton={true}
            onDownloadAll={() => handleDownloadAll("입찰내역(전체).csv")}
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
          {/* <VerticalTable
            data={formattedBidResult}
            showHeader={true}
            headerTitle="입찰결과"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default TenderDetail;
