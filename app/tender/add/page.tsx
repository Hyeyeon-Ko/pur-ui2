"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
import { tenderAddOptions } from "@/lib/optionDatas";
import AddCommonForm from "@/components/ui/templates/AddCommonForm";
import { tenderVertical } from "@/lib/data";


const AddItemPage = () => {
  // const router = useRouter();
  // const { id } = useParams();
  // 체크박스 버튼
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  // const [formData, setFormData] = useState({
  //   name: "",
  //   description: "",
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const newItem = {
  //     id: Math.random().toString(),
  //     ...formData,
  //     checkedItems,
  //   };

  //   fetch("/api/items", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newItem),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("데이터 저장 실패");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("저장 성공:", data);
  //       router.push(`/tender?id=${id}`);
  //     })
  //     .catch((error) => {
  //       console.error("저장 중 오류 발생:", error);
  //     });
  // };

  // 체크박스 버튼 핸들러
  const handleChipClick = (label: string, title: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev };
      const isChecked = !prev[label];

      newCheckedItems[label] = isChecked;

      // if (title === "센터명" && label === "전국") {
      //   if (isChecked) {
      //     Object.keys(newCheckedItems).forEach((key) => {
      //       if (key !== "전국" && key.startsWith("센터명")) {
      //         newCheckedItems[key] = false;
      //       }
      //     });
      //   }
      // } else if (title === "센터명") {
      //   newCheckedItems["전국"] = false;
      // }

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

  const handleSearch = (bidNumber: string) => {
    console.log("입찰번호:", bidNumber);
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
    />
  );
};

export default AddItemPage;
