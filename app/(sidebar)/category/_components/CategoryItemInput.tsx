import React, { useState, useEffect } from "react";
import { CategoryItemInputProps } from "@/types/categoryTypes";
import { useCategoryVisibility } from "@/context/CategoryVisibilityContext";
import CategorySelect from "@/app/(sidebar)/category/_components/CategorySelect";
import FieldInputs from "@/app/(sidebar)/category/_components/FieldInputs";
import ActionButtons from "@/app/(sidebar)/category/_components/ActionButtons";
import Label from "@/components/ui/atoms/label/Label";

const CategoryItemInput: React.FC<CategoryItemInputProps> = ({
  item,
  fields,
  onChange,
  onSave,
  onRemove,
  onEdit,
  largeCategories = [], // 대분류 데이터 전달
}) => {
  const [selectedLargeCategory, setSelectedLargeCategory] = useState("");
  const [selectedMiddleCategory, setSelectedMiddleCategory] = useState("");
  const { majorCategory, middleCategory } = useCategoryVisibility();

  // 선택된 대분류 이름 찾기
  const selectedLargeCategoryName =
    Array.isArray(largeCategories) &&
    largeCategories.find(
      (category: { classCd: string; classNm: string }) =>
        category.classCd === selectedLargeCategory,
    )?.classNm;

  // 초기값 설정
  useEffect(() => {
    if (item) {
      console.log("Item 데이터:", item);
      console.log("Large Categories 데이터:", largeCategories);

      setSelectedLargeCategory(item.largeCategory || "");
      setSelectedMiddleCategory(item.middleCategory || "");
    }
  }, [item, largeCategories]);

  const handleLargeCategoryChange = (value: string) => {
    setSelectedLargeCategory(value);
    setSelectedMiddleCategory(""); // 중분류 초기화
    onChange(item.id, "largeCategory", value);
  };

  const handleMiddleCategoryChange = (value: string) => {
    setSelectedMiddleCategory(value);
    onChange(item.id, "middleCategory", value);
  };

  return (
    <div className="flex items-center justify-between space-x-2 px-4">
      {item.isEditing ? (
        <div className="flex flex-grow justify-between">
          <CategorySelect
            majorCategory={majorCategory}
            middleCategory={middleCategory}
            selectedLargeCategory={selectedLargeCategory}
            selectedMiddleCategory={selectedMiddleCategory}
            onLargeCategoryChange={handleLargeCategoryChange}
            onMiddleCategoryChange={handleMiddleCategoryChange}
            endpoint="/api/category-group" // API 엔드포인트
          />
          <FieldInputs item={item} fields={fields} onChange={onChange} />
          <ActionButtons
            isEditing={true}
            onSave={() => onSave(item.id)}
            onRemove={() => onRemove(item.id)}
            onEdit={() => {}}
          />
        </div>
      ) : (
        <div className="flex flex-grow items-center justify-between">
          {majorCategory && (
            <Label
              mode="xs"
              content={selectedLargeCategoryName || "대분류 없음"}
            />
          )}
          {middleCategory && (
            <Label
              mode="xs"
              content={selectedMiddleCategory || "중분류 없음"}
            />
          )}
          {fields.map(field => (
            <Label
              key={field.field}
              mode="xs"
              content={String(item[field.field as keyof typeof item] || "")}
            />
          ))}
          <ActionButtons
            isEditing={false}
            onSave={() => {}}
            onRemove={() => onRemove(item.id)}
            onEdit={() => onEdit(item.id)}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryItemInput;
