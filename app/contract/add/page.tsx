"use client";

import React, { useCallback, useState } from "react";
import { contractAddOptions } from "@/lib/optionDatas";
import AddCommonForm from "@/app/contract/add/_components/AddCommonForm";
import useSaveData from "@/hooks/useSaveData";
import useTenderSearch from "@/hooks/useTenderSearch";
import {
  contractListLabels,
  contractDetailData as initialContractDetailData,
} from "@/lib/contractDatas";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import Table from "@/components/ui/organism/table/Table";
import useFormDownload from "@/hooks/useFormDownload";
import useCsvParser from "@/hooks/useCsvParser";

const ContractAddPage = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [contractDetailData, setContractDetailData] = useState<any[]>(
    initialContractDetailData,
  );
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { saveData } = useSaveData();
  const { tenderSearch } = useTenderSearch();
  const { handleFormDown } = useFormDownload();
  const { parsedData, parseCsvFile } = useCsvParser();

  /**
   * 입찰번호 조회 버튼
   * TODO: 엔드포인트, 등등 매개변수 수정 필요할 수 있음
   */

  const handleSearch = async (bidNumber: string) => {
    const endpoint = "/api/search-bid";
    const data = await tenderSearch(bidNumber, endpoint);

    if (data) {
      setContractDetailData(data);
    }
  };

  /**
   * 저장버튼
   * TODO: 엔드포인트, 등등 매개변수 수정 필요할 수 있음
   */
  const handleSave = async () => {
    const endpoint = "/api/save-vertical-data";
    await saveData(checkedItems, contractDetailData, endpoint);
  };

  /**
   * 내역 칼럼값
   */
  const contractColumns = Object.keys(contractListLabels)
    .filter(field => field !== "id")
    .map(field => ({
      title: contractListLabels[field as keyof typeof contractListLabels],
      dataIndex: field,
      key: field,
    }));

  /**
   * 업로드 버튼 로직
   */
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }
    parseCsvFile(file, error => {
      alert(`파일 처리 중 오류 발생: ${error.message}`);
    });
  };

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));
    setSelectedRows(uniqueSelectedRows);
  }, []);

  const handleFormDownload = async () => {
    const endpoint = "/templates/erp_contract_template.xlsx";
    const fileName = "계약내역양식.csv";
    handleFormDown(endpoint, fileName);
  };

  return (
    <>
      <AddCommonForm
        title="계약추가"
        options={contractAddOptions}
        initialSelected="sole"
        searchOptionValue="contract"
        verticalData={contractDetailData}
        onSearch={handleSearch}
        onSave={handleSave}
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
            showAllDownButton={false}
            onFormDownload={handleFormDownload}
          />
        </div>
        <Table
          data={parsedData}
          columns={contractColumns}
          onRowSelect={handleRowSelect}
          showCheckbox={false}
          showHeader={true}
          headerTitle="계약내역"
        />
      </div>
    </>
  );
};

export default ContractAddPage;
