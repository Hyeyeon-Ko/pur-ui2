import React, { useState, useEffect } from "react";
import { CategoryItemInputProps } from "@/types/categoryTypes";
import { useCategoryVisibility } from "@/context/CategoryVisibilityContext";
import CategorySelect from "@/app/(sidebar)/category/_components/CategorySelect";
import FieldInputs from "@/app/(sidebar)/category/_components/FieldInputs";
import ActionButtons from "@/app/(sidebar)/category/_components/ActionButtons";
import Label from "@/components/ui/atoms/label/Label";
import useCategoryItems from "@/hooks/useCategoryItems";

const CategoryItemInput: React.FC<CategoryItemInputProps> = ({
  item,
  fields,
  onChange,
  onSave,
  onRemove,
  onEdit,
  largeCategories = [],
}) => {
  const [selectedLargeCategory, setSelectedLargeCategory] = useState("");
  const [selectedMiddleCategory, setSelectedMiddleCategory] = useState("");
  const { majorCategory, middleCategory } = useCategoryVisibility();
  const { handleEdit } = useCategoryItems();

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
    <div className="flex items-center space-x-2 px-4">
      {item.isEditing ? (
        <div className="flex flex-grow justify-between">
          <CategorySelect
            majorCategory={majorCategory}
            middleCategory={middleCategory}
            selectedLargeCategory={selectedLargeCategory}
            selectedMiddleCategory={selectedMiddleCategory}
            onLargeCategoryChange={handleLargeCategoryChange}
            onMiddleCategoryChange={handleMiddleCategoryChange}
            endpoint="/api/category-group"
          />
          <FieldInputs item={item} fields={fields} onChange={onChange} />
          <ActionButtons
            isEditing={item.isEditing}
            onSave={() => onSave(item.id)}
            onRemove={() => onRemove(item.id)}
            onEdit={() => handleEdit(item.id)}
          />
        </div>
      ) : (
        <div className="flex w-full items-center">
          {/* 대분류 */}
          {majorCategory && (
            <div className="flex-1 text-center">
              <Label
                mode="xs"
                customStyle={{ textAlign: "center" }}
                content={selectedLargeCategoryName || "대분류 없음"}
              />
            </div>
          )}

          {/* 중분류 */}
          {middleCategory && (
            <div className="flex-1 text-center">
              <Label
                mode="xs"
                customStyle={{ justifyContent: "center", textAlign: "center" }}
                content={selectedMiddleCategory || "중분류 없음"}
              />
            </div>
          )}

          {/* 필드 렌더링 */}
          {fields.map(field => (
            <div key={field.field} className="flex-1 text-center">
              <Label
                mode="xs"
                customStyle={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                content={String(item[field.field as keyof typeof item] || "")}
              />
            </div>
          ))}

          {/* ActionButtons */}
          <div className="flex-1 text-center">
            <ActionButtons
              isEditing={false}
              onSave={() => {}}
              onRemove={() => onRemove(item.id)}
              onEdit={() => onEdit(item.id)}
            />

            {/* <ActionButtons
              isEditing={item.isEditing}
              onSave={() => onSave(item.id)}
              onRemove={() => onRemove(item.id)}
              onEdit={() => handleEdit(item.id)}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryItemInput;
