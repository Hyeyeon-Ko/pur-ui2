"use client";

import Button from "@/components/ui/atoms/button/Button";
import ThemeToggle from "@/components/ui/molecules/buttons/ThemeToggle";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/molecules/verticalTable/VerticalTable";
import { contractVertical } from "@/lib/data";
import React, { useState } from "react";

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

  return (
    <div className="my-4 mb-20">
      <ThemeToggle />
      <PageTitle pageTitle="계약추가" mode="xl" fontWeight="bold" />
      <div className="p-4 flex justify-end">
        <Button mode="sm" content="추가" color="Button_Default" />
      </div>
      <VerticalTable
        data={contractVertical}
        onChipClick={handleChipClick}
        checkedItems={checkedItems}
        showHeader={true}
        tableTitle="계약사항"
      />
    </div>
  );
};

export default ContractAddPage;
