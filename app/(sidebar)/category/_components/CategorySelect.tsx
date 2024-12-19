import React, { useEffect, useState } from "react";
import { useDarkMode } from "@/context/DarkModeContext";
import colors from "@/styles/colors";
import SelectBox from "@/components/ui/atoms/selectBox/Select";

interface CategorySelectProps {
  majorCategory: boolean;
  middleCategory: boolean;
  selectedLargeCategory: string;
  selectedMiddleCategory: string;
  onLargeCategoryChange: (value: string) => void;
  onMiddleCategoryChange: (value: string) => void;
  endpoint: string;
}

interface CategoryItem {
  classCd: string;
  classNm: string;
  groupCd: string;
  groupNm: string;
}

interface ApiResponse {
  data: CategoryItem[];
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  majorCategory,
  middleCategory,
  selectedLargeCategory,
  selectedMiddleCategory,
  onLargeCategoryChange,
  onMiddleCategoryChange,
  endpoint,
}) => {
  const { isDarkMode } = useDarkMode();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [largeCategories, setLargeCategories] = useState<CategoryItem[]>([]);
  const [middleCategories, setMiddleCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("대분류 데이터를 불러오지 못했습니다.");

        const jsonResponse: ApiResponse = await res.json();
        setCategories(jsonResponse.data || []);

        // 대분류 중복 제거 및 저장
        const uniqueLargeCategories = Array.from(
          new Map(jsonResponse.data.map(cat => [cat.classCd, cat])).values(),
        );
        setLargeCategories(uniqueLargeCategories);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, [endpoint]);

  // 대분류 중복 제거
  const uniqueCategories = Array.from(
    new Map(categories.map(cat => [cat.classCd, cat])).values(),
  );

  // 대분류 선택 시 중분류 필터링
  useEffect(() => {
    if (selectedLargeCategory) {
      const filtered = categories.filter(
        cat => cat.classCd === selectedLargeCategory,
      );
      setMiddleCategories(filtered);
    } else {
      setMiddleCategories([]);
    }
  }, [selectedLargeCategory, categories]);

  return (
    <>
      {majorCategory && (
        <SelectBox
          mode="xs"
          options={uniqueCategories.map(cat => ({
            value: cat.classCd,
            label: cat.classNm,
          }))}
          value={selectedLargeCategory}
          onChange={e => onLargeCategoryChange(e.target.value)}
          placeholder="대분류 선택"
          customStyle={{
            backgroundColor: isDarkMode
              ? colors["Grey_Darken-5"]
              : "transparent",
          }}
        />
      )}
      {middleCategory && (
        <SelectBox
          mode="xs"
          options={middleCategories.map(middle => ({
            value: middle.groupCd,
            label: middle.groupNm,
          }))}
          value={selectedMiddleCategory}
          onChange={e => onMiddleCategoryChange(e.target.value)}
          placeholder="중분류 선택"
          customStyle={{
            backgroundColor: isDarkMode
              ? colors["Grey_Darken-5"]
              : "transparent",
          }}
        />
      )}
    </>
  );
};

export default CategorySelect;
