"use client";

import React, { useState } from "react";
import { tenderAddOptions } from "@/lib/optionDatas";
import AddCommonForm from "@/app/contract/add/_components/AddCommonForm";
import useSaveData from "@/hooks/useSaveData";
import useTenderSearch from "@/hooks/useTenderSearch";
import { bidDetailData as initialBidDetailData } from "@/lib/bidDatas";

const AddItemPage = () => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [bidDetailData, setBidDetailData] =
    useState<any[]>(initialBidDetailData);
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

  return (
    <AddCommonForm
      title="입찰추가"
      options={tenderAddOptions}
      initialSelected="announce"
      searchOptionValue="re-announce"
      verticalData={bidDetailData}
      onSearch={handleSearch}
      onSave={handleSave}
    />
  );
};

export default AddItemPage;
