"use client";

import Toast from "@/components/commons/Toast";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import Table from "@/components/ui/organism/table/Table";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/organism/verticalTable/VerticalTable";
import useChipHandler from "@/hooks/useChipHandler";
import useFormatHandler from "@/hooks/useFormatHandler";
import useFormDownload from "@/hooks/useFormDownload";
import React, { useCallback, useEffect, useState } from "react";
import { contractDetailLabel, contractListLabels } from "@/lib/contractDatas";
import ThemeToggle from "@/components/layouts/_components/ThemeToggle";
import { ContractMasterWithDetailsType } from "@/types/contractTypes";
import { useParams } from "next/navigation";
import { formatErpData } from "@/utils/formatErpData";
import { ErpItemsType } from "@/types/bidTypes";
import { formatContractVerticalData } from "@/utils/formatContractVerticalData";
import useDownloadAll from "@/hooks/useDownloadAll";
import { contractErpMapping } from "@/lib/keyMapping";
import Papa from "papaparse";

const ContractDetail = () => {
  /** 파라미터 값으로 데이터 받아오고 있음: bid_id 값 */
  const { bidId } = useParams();

  /** 상태 업데이트 */
  const [erpData, setErpData] = useState<ErpItemsType[]>([]);
  const [contractData, setContractData] =
    useState<ContractMasterWithDetailsType | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  /* hooks 임포트 */
  const { handleFormDown } = useFormDownload();
  const { formatDate, formatCurrency } = useFormatHandler();
  const { checkedItems, handleChipClick } = useChipHandler();

  /** 데이터 요청 1. contract-detail, erp-detail */
  useEffect(() => {
    const fetchData = async () => {
      if (!bidId) {
        console.error("bid_id가 없습니다.");
        return;
      }

      try {
        const [contractResponse, erpResponse] = await Promise.all([
          fetch(`/api/contract-detail?bid_id=${bidId}`),
          fetch(`/api/erp-detail?bid_id=${bidId}`),
        ]);

        if (!contractResponse.ok) {
          throw new Error("계약 데이터를 불러오는데 실패했습니다.");
        }
        if (!erpResponse.ok) {
          throw new Error("ERP 데이터를 불러오는데 실패했습니다.");
        }

        const [contractResult, erpResult] = await Promise.all([
          contractResponse.json(),
          erpResponse.json(),
        ]);

        console.log("contractResult", contractResult);
        if (contractResult.data && contractResult.data.length > 0) {
          setContractData(contractResult.data[0]);
        } else {
          console.error("계약 데이터가 없습니다.");
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

  /** 데이터 response값 포맷  */
  const formattedErpData = erpData.length
    ? formatErpData(erpData, formatDate, formatCurrency)
    : [];

  const formattedVerticalData = formatContractVerticalData(
    contractData,
    contractDetailLabel,
  );

  const contractColumns = Object.keys(contractListLabels).map(field => ({
    title: contractListLabels[field],
    dataIndex: field,
    key: field,
  }));

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));
    setSelectedRows(uniqueSelectedRows);
  }, []);

  const handleDownloadAll = useDownloadAll(
    formattedErpData,
    contractErpMapping,
    contractColumns,
  );

  const handleSave = async () => {
    try {
      const response = await fetch("/api/saveContractData", {
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

  // const handleModify = async () => {
  //   try {
  //     const response = await fetch("/api/modifyContractData", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ ids: selectedRows }),
  //     });
  //     if (!response.ok) throw new Error("Modification failed");
  //     Toast.successModifyNotify();
  //   } catch (error) {
  //     console.error("Modify Error:", error);
  //     Toast.errorModifyNotify();
  //   }
  // };

  const handleFormDownload = async () => {
    const endpoint = "/templates/erp_contract_template.xlsx";
    const fileName = "계약내역양식.csv";
    handleFormDown(endpoint, fileName);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true, // 첫 줄 헤더로 사용
      skipEmptyLines: true, // 빈 값은 넘김
      complete: result => {
        const csvData = result.data as Record<string, string>[];

        const formattedCsvData: ErpItemsType[] = csvData.map(item => ({
          inst_cd: item["센터명"] || "",
          erp_cd: item["ERP코드"] || "",
          erp_item_nm: item["ERP품목명"] || "",
          bid_no: item["입찰번호"] || "",
          cont_no: item["계약번호"] || "",
          cont_type: item["계약종류"] || "",
          acc_cat: item["계정구분"] || "",
          model_nm: item["모델명"] || "",
          spec: item["규격"] || "",
          mfr: item["제조사"] || "",
          supplier: item["공급사"] || "",
          qty: item["수량"] || "",
          ref_price: item["낙찰기준가"] || "",
          std_price: item["낙찰기준단가"] || "-",
          cont_unit_price: item["계약단가"] || "-",
          cont_price: item["계약금액"] || "-",
        }));

        setErpData(prev => [...prev, ...formattedCsvData]);
      },
      error: err => {
        console.error("파일 읽기 오류:", err.message);
      },
    });

    event.target.value = "";
  };

  return (
    <div className="pb-20">
      <div className="py-10">
        <ThemeToggle />
      </div>
      <PageTitle pageTitle="계약상세조회" mode="xl" fontWeight="bold" />
      <TableButton
        showSaveButton
        showAddButton={false}
        showDelButton={false}
        showAllDownButton={false}
        onSave={handleSave}
      />
      <VerticalTable
        data={formattedVerticalData}
        onChipClick={handleChipClick}
        checkedItems={checkedItems}
        showHeader={true}
        headerTitle="계약사항"
      />
      <div className="py-20">
        <div className="mr-2 flex justify-end">
          <FileUploadButton
            onFileUpload={handleFileUpload}
            buttonText="업로드"
            accept=".csv, .xls, .xlsx"
          />
          <TableButton
            showAddButton={false}
            showDelButton={false}
            showFormDownButton={true}
            onDownloadAll={() => handleDownloadAll("계약내역(전체).csv")}
            onFormDownload={handleFormDownload}
          />
        </div>
        <Table
          data={formattedErpData}
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

export default ContractDetail;
