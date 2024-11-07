import React from "react";
import SelectBox from "../../atoms/selectBox/Select";
import { categoryData } from "@/lib/optionDatas";
import { useDarkMode } from "@/context/DarkModeContext";
import colors from "@/styles/colors";

interface CategorySelectProps {
  majorCategory: boolean;
  middleCategory: boolean;
  selectedLargeCategory: string;
  selectedMiddleCategory: string;
  onLargeCategoryChange: (value: string) => void;
  onMiddleCategoryChange: (value: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  majorCategory,
  middleCategory,
  selectedLargeCategory,
  selectedMiddleCategory,
  onLargeCategoryChange,
  onMiddleCategoryChange,
}) => {
  const { isDarkMode } = useDarkMode();
  const selectedLargeCategoryData = categoryData.find(
    (cat) => cat.value === selectedLargeCategory
  );
  const middleCategories = selectedLargeCategoryData
    ? selectedLargeCategoryData.middleCategories
    : [];

  return (
    <>
      {majorCategory && (
        <SelectBox
          mode="xs"
          options={categoryData.map((cat) => ({
            value: cat.value,
            label: cat.label,
          }))}
          value={selectedLargeCategory}
          onChange={(e) => onLargeCategoryChange(e.target.value)}
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
          options={middleCategories.map((middle) => ({
            value: middle.value,
            label: middle.label,
          }))}
          value={selectedMiddleCategory}
          onChange={(e) => onMiddleCategoryChange(e.target.value)}
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
