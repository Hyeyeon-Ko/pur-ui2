import React from "react";
import { CategoryItemListProps } from "@/types/categoryTypes";
import { useDarkMode } from "@/context/DarkModeContext";
import CategoryItemInput from "./CategoryItemInput";

const CategoryItemList: React.FC<CategoryItemListProps> = ({
  items,
  fields,
  onChange,
  onSave,
  onRemove,
  onEdit,
  largeCategories,
}) => {
  const { isDarkMode } = useDarkMode();

  const validItems = Array.isArray(items) ? items : [];

  return (
    <div
      className={`${
        isDarkMode ? "bg-dark-Grey_Darken_5" : "transparent"
      } mx-auto w-[80%] space-y-4 rounded-lg p-4 shadow-lg`}
    >
      {validItems.map((item, index) => (
        <CategoryItemInput
          key={item.id || index}
          item={item}
          fields={fields}
          onChange={onChange}
          onSave={onSave}
          onRemove={onRemove}
          onEdit={onEdit}
          largeCategories={largeCategories} 
        />
      ))}
    </div>
  );
};

export default CategoryItemList;
