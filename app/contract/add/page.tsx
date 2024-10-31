"use client";

import { contractVertical } from "@/lib/data";
import React, { useState } from "react";
import { contractAddOptions } from "@/lib/optionDatas";
import AddCommonForm from "@/components/ui/templates/AddCommonForm";

interface TenderDetailProps {
  params: {
    id: string; // 동적 파라미터 ID의 타입 정의
  };
}

const ContractAddPage: React.FC<TenderDetailProps> = () => {
  // 체크박스 버튼
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  // 체크박스 버튼 핸들러
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

  const handleSearch = (bidNumber: string) => {
    console.log("입찰번호:", bidNumber);
  };

  return (
    <AddCommonForm
      title="입찰추가"
      options={contractAddOptions}
      initialSelected="sole"
      searchOptionValue="contract"
      verticalData={contractVertical}
      onSearch={handleSearch}
      onChipClick={handleChipClick}
    />
  );
};

export default ContractAddPage;
