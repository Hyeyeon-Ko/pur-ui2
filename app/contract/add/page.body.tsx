"use client";

import React, { useState } from "react";
import { contractAddOptions } from "@/lib/optionDatas";
import AddCommonForm from "@/components/ui/templates/AddCommonForm";
import useSaveData from "@/hooks/useSaveData";
import useTenderSearch from "@/hooks/useTenderSearch";
import { contractDetailData as initialContractDetailData } from "@/lib/contractDatas";

interface TenderDetailProps {
  params: {
    id: string;
  };
}

const ContractAddBody: React.FC<TenderDetailProps> = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [contractDetailData, setContractDetailData] = useState<any[]>(
    initialContractDetailData
  );
  const { saveData } = useSaveData();
  const { tenderSearch } = useTenderSearch();

  /**
   * 입찰번호 조회 버튼
   * TODO: 엔드포인트, 등등 매개변수 수정 필요할 수 있음
   */

  const handleSearch = async (bidNumber: string) => {
    const endpoint = "/api/search-bid";
    const data = await tenderSearch(bidNumber, endpoint);

    if (data) {
      setContractDetailData(data);
      console.log("조회된 데이터:", data);
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

  return (
    <AddCommonForm
      title="계약추가"
      options={contractAddOptions}
      initialSelected="sole"
      searchOptionValue="contract"
      verticalData={contractDetailData}
      onSearch={handleSearch}
      onSave={handleSave}
    />
  );
};

export default ContractAddBody;
