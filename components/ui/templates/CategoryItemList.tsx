import React from "react";
import { CategoryItemListProps } from "@/types/categoryTypes";
import { useDarkMode } from "@/context/DarkModeContext";
import CategoryItemInput from "../organism/category/CategoryItemInput";

const CategoryItemList: React.FC<CategoryItemListProps> = ({
  items,
  fields,
  onChange,
  onSave,
  onRemove,
  onEdit,
}) => {
  const { isDarkMode } = useDarkMode();
  return (
    <>
      <div
        className={`${
          isDarkMode ? "bg-dark-Grey_Darken_5" : "transparent"
        } mx-auto space-y-4 shadow-lg rounded-lg w-[80%] p-4`}
      >
        {items.map((item) => (
          <CategoryItemInput
            key={item.id}
            item={item}
            fields={fields}
            onChange={onChange}
            onSave={onSave}
            onRemove={onRemove}
            onEdit={onEdit}
          />
        ))}
      </div>
    </>
  );
};

export default CategoryItemList;
