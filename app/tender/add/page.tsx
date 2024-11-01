"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
import { tenderAddOptions } from "@/lib/optionDatas";
import AddCommonForm from "@/components/ui/templates/AddCommonForm";
import { tenderVertical as initialTenderVertical } from "@/lib/data";
import useSaveData from "@/hooks/useSaveData";
import useTenderSearch from "@/hooks/useTenderSearch";

const AddItemPage = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [tenderVertical, setTenderVertical] = useState<any[]>(
    initialTenderVertical
  );
  const { saveData } = useSaveData();
  const { tenderSearch } = useTenderSearch();

  // 체크박스 버튼 핸들러
  const handleChipClick = (label: string, title: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev };
      const isChecked = !prev[label];

      newCheckedItems[label] = isChecked;

      if (title === "센터명" && label === "전국") {
        if (isChecked) return { 전국: true };
        else return { 전국: false };
      } else if (title === "센터명" && label !== "전국") {
        newCheckedItems["전국"] = false;
      }

      if (isChecked) {
        Object.keys(newCheckedItems).forEach((key) => {
          if (
            (title === "계약종류" &&
              key.startsWith("계약종류") &&
              key !== label) ||
            (title === "입찰종류" &&
              key.startsWith("입찰종류") &&
              key !== label) ||
            (title === "낙찰방법" &&
              key.startsWith("낙찰방법") &&
              key !== label)
          ) {
            newCheckedItems[key] = false;
          }
        });
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
      setTenderVertical(data);
      console.log("조회된 데이터:", data);
    }
  };
  /**
   * 저장버튼
   * TODO: 엔드포인트, 등등 매개변수 수정 필요할 수 있음
   */
  const handleSave = async () => {
    const endpoint = "/api/save-vertical-data";
    await saveData(checkedItems, tenderVertical, endpoint);
  };

  return (
    <AddCommonForm
      title="입찰추가"
      options={tenderAddOptions}
      initialSelected="announce"
      searchOptionValue="re-announce"
      verticalData={tenderVertical}
      onSearch={handleSearch}
      onChipClick={handleChipClick}
      onSave={handleSave}
    />
  );
};

export default AddItemPage;
