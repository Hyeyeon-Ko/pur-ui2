"use client";

import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/molecules/verticalTable/VerticalTable";
import Button from "@/components/ui/atoms/button/Button";
import ThemeToggle from "@/components/ui/molecules/buttons/ThemeToggle";

const vertical = [
  {
    id: 0,
    title: "센터명",
    type: "chip",
    contents: [
      "전국",
      "재단",
      "본원",
      "광화문",
      "여의도",
      "강남",
      "수원",
      "대구",
      "부산",
      "광주",
      "제주",
    ],
  },
  {
    id: 1,
    title: "입찰번호",
    type: "input",
    contents: "",
  },
  {
    id: 2,
    title: "공고구분",
    type: "input",
    contents: "",
  },
  {
    id: 3,
    title: "계약종류",
    type: "chip",
    contents: ["일반계약", "단가계약", "임대계약", "공사계약", "기타계약"],
  },
  {
    id: 4,
    title: "입찰종류",
    type: "chip",
    contents: ["일반경쟁", "제한경쟁", "지명경쟁"],
  },
  {
    id: 5,
    title: "낙찰방법",
    type: "chip",
    contents: ["최저가격", "2단계경쟁", "협상에의한계약"],
  },
  {
    id: 6,
    title: "계정명",
    type: "chip",
    contents: [
      "의약품",
      "항정신성의약품",
      "장비소모품",
      "인쇄물",
      "시약",
      "백신",
      "의료비품",
      "의료장비",
      "위생용품",
      "피복",
      "사무용품",
      "일반비품",
      "전산용품",
      "기타",
    ],
  },
  {
    id: 7,
    title: "입찰명",
    type: "input",
    contents: "",
  },
  {
    id: 8,
    title: "공고일",
    type: "datepicker",
    contents: "",
  },
  {
    id: 9,
    title: "마감일",
    type: "datepicker",
    contents: "",
  },
  {
    id: 10,
    title: "응찰일",
    type: "datepicker",
    contents: "",
  },
  {
    id: 11,
    title: "낙찰기준가",
    type: "input",
    contents: "",
  },
  {
    id: 12,
    title: "입찰품의번호",
    type: "input",
    contents: "",
  },
  {
    id: 13,
    title: "입찰품의",
    type: "upload",
    contents: null,
  },
  {
    id: 14,
    title: "입찰공고문",
    type: "upload",
    contents: null,
  },
];

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

  return (
    <div className="p-4">
      <ThemeToggle
        customStyle={{
          display: "flex",
          justifyContent: "end",
          marginTop: "24px",
          marginRight: "24px",
        }}
      />
      <PageTitle
        pageTitle="입찰추가"
        mode="xl"
        fontWeight="bold"
        customStyle={{ paddingBottom: "0" }}
      />
      <div className="px-10 flex justify-end">
        <Button mode="sm" content="추가" color="signature" />
      </div>
      <PageTitle
        pageTitle="입찰사항"
        mode="md"
        fontWeight="bold"
        customStyle={{ padding: "0", marginLeft: "20px" }}
      />

      <VerticalTable
        data={vertical}
        onChipClick={handleChipClick} // Chip 클릭 이벤트 핸들러 전달
        checkedItems={checkedItems} // 체크된 아이템 상태 전달
      />
    </div>
  );
};

export default AddItemPage;
