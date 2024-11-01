"use client";

import { contractVertical as initialContractVertical } from "@/lib/data";
import React, { useState } from "react";
import { contractAddOptions } from "@/lib/optionDatas";
import AddCommonForm from "@/components/ui/templates/AddCommonForm";
import useSaveData from "@/hooks/useSaveData";
import useTenderSearch from "@/hooks/useTenderSearch";

interface TenderDetailProps {
  params: {
    id: string;
  };
}

const ContractAddPage: React.FC<TenderDetailProps> = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [contractVertical, setContractVertical] = useState<any[]>(
    initialContractVertical
  );
  const { saveData } = useSaveData();
  const { tenderSearch } = useTenderSearch();

  const handleChipClick = (label: string, title: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev };
      newCheckedItems[label] = !prev[label];

      if (title === "센터명" && label === "전국") {
        if (newCheckedItems[label]) {
          Object.keys(newCheckedItems).forEach((key) => {
            if (key !== "전국" && key.startsWith("센터명")) {
              newCheckedItems[key] = false;
            }
          });
        }
      } else if (title === "센터명") {
        newCheckedItems["전국"] = false;
      }

      return newCheckedItems;
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
      setContractVertical(data);
      console.log("조회된 데이터:", data);
    }
  };

  /**
   * 저장버튼
   * TODO: 엔드포인트, 등등 매개변수 수정 필요할 수 있음
   */
  const handleSave = async () => {
    const endpoint = "/api/save-vertical-data";
    await saveData(checkedItems, contractVertical, endpoint);
  };

  return (
    <AddCommonForm
      title="계약추가"
      options={contractAddOptions}
      initialSelected="sole"
      searchOptionValue="contract"
      verticalData={contractVertical}
      onSearch={handleSearch}
      onChipClick={handleChipClick}
      onSave={handleSave}
    />
  );
};

export default ContractAddPage;
