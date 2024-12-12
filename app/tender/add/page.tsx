"use client";

import React, { useCallback, useState } from "react";
import { tenderAddOptions } from "@/lib/optionDatas";
import AddCommonForm from "@/app/contract/add/_components/AddCommonForm";
import useSaveData from "@/hooks/useSaveData";
import useTenderSearch from "@/hooks/useTenderSearch";
import { bidDetailData as initialBidDetailData } from "@/lib/bidDatas";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
import Table from "@/components/ui/organism/table/Table";
import useFileDownload from "@/hooks/useFileDownload";
import useFormDownload from "@/hooks/useFormDownload";
import { bidListFieldLabel } from "@/lib/bidDatas";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import useCsvParser from "@/hooks/useCsvParser";

const AddItemPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [bidDetailData, setBidDetailData] =
    useState<any[]>(initialBidDetailData);
  const { saveData } = useSaveData();
  const { tenderSearch } = useTenderSearch();
  const { downloadFile } = useFileDownload();
  const { handleFormDown } = useFormDownload();
  const { parsedData, parseCsvFile } = useCsvParser();

  const bidColumns = Object.keys(bidListFieldLabel)
    .filter(field => field !== "id") // ID는 제외
    .map(field => ({
      title: bidListFieldLabel[field as keyof typeof bidListFieldLabel],
      dataIndex: field,
      key: field,
    }));

  /**
   *     파일업로드 버튼 로직
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

  /**
   * 입찰번호 조회 버튼
   * TODO: 엔드포인트, 등등 매개변수 수정 필요할 수 있음
   */
  const handleSearch = async (bidNumber: string) => {
    const endpoint = "/api/search-bid";
    const data = await tenderSearch(bidNumber, endpoint);

    if (data) {
      setBidDetailData(data);
    }
  };
  /**
   * 저장버튼
   * TODO: 엔드포인트, 등등 매개변수 수정 필요할 수 있음
   */
  const handleSave = async () => {
    const endpoint = "/api/save-vertical-data";
    await saveData(checkedItems, bidDetailData, endpoint);
  };

  /** 전체내역 다운로드
   * TODO: endpoint
   */
  // const handleDownloadAll = () => {
  //   downloadFile("/api/endpoint", "입찰내역(전체).csv");
  // };

  // /**TODO: 서버에 저장된 파일을 불러올 예정, 엔드포인트 수정 필요 */
  const handleFormDownload = async () => {
    const endpoint = "/templates/erp_contract_template.xlsx";
    const fileName = "입찰양식.csv";
    handleFormDown(endpoint, fileName);
  };

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));
    setSelectedRows(uniqueSelectedRows);
  }, []);

  return (
    <>
      <AddCommonForm
        title="입찰추가"
        options={tenderAddOptions}
        initialSelected="announce"
        searchOptionValue="re-announce"
        verticalData={bidDetailData}
        onSearch={handleSearch}
        onSave={handleSave}
      />
      <div className="py-20">
        <div className="mr-6 flex justify-end">
          <FileUploadButton
            onFileUpload={handleUpload}
            buttonText="업로드"
            accept=".csv"
          />
          <TableButton
            showAddButton={false}
            showDelButton={false}
            showFormDownButton={false}
            // onDownloadAll={handleDownloadAll}
            onFormDownload={handleFormDownload}
          />
        </div>
        <Table
          data={parsedData}
          columns={bidColumns}
          onRowSelect={handleRowSelect}
          showCheckbox={false}
          showHeader={true}
          headerTitle="입찰내역"
        />
      </div>
    </>
  );
};

export default AddItemPage;
