// src/components/ui/inputs/CategoryItemInput.tsx
import React, { useState, useEffect } from "react";
import { CategoryItemInputProps } from "@/types/categoryTypes";
import { useCategoryVisibility } from "@/context/CategoryVisibilityContext";
import CategorySelect from "../../../../app/(sidebar)/category/_components/CategorySelect";
import FieldInputs from "../../../../app/(sidebar)/category/_components/FieldInputs";
import ActionButtons from "../../../../app/(sidebar)/category/_components/ActionButtons";
import Label from "@/components/ui/atoms/label/Label";

const CategoryItemInput: React.FC<CategoryItemInputProps> = ({
  item,
  fields,
  onChange,
  onSave,
  onRemove,
  onEdit,
}) => {
  const [selectedLargeCategory, setSelectedLargeCategory] = useState("");
  const [selectedMiddleCategory, setSelectedMiddleCategory] = useState("");
  const { majorCategory, middleCategory } = useCategoryVisibility();

  useEffect(() => {
    if (item) {
      setSelectedLargeCategory(item.largeCategory || "");
      setSelectedMiddleCategory(item.middleCategory || "");
    }
  }, [item]);

  const handleLargeCategoryChange = (value: string) => {
    setSelectedLargeCategory(value);
    setSelectedMiddleCategory("");
    onChange(item.id, "largeCategory", value);
  };

  const handleMiddleCategoryChange = (value: string) => {
    setSelectedMiddleCategory(value);
    onChange(item.id, "middleCategory", value);
  };

  return (
    <div className="flex justify-between items-center space-x-2 px-4">
      {item.isEditing ? (
        <div className="flex flex-grow justify-between">
          <CategorySelect
            majorCategory={majorCategory}
            middleCategory={middleCategory}
            selectedLargeCategory={selectedLargeCategory}
            selectedMiddleCategory={selectedMiddleCategory}
            onLargeCategoryChange={handleLargeCategoryChange}
            onMiddleCategoryChange={handleMiddleCategoryChange}
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
        <div className="flex flex-grow justify-between items-center">
          {majorCategory && <Label mode="xs" content={selectedLargeCategory} />}
          {middleCategory && (
            <Label mode="xs" content={selectedMiddleCategory} />
          )}
          {fields.map((field) => (
            <Label
              key={field.field}
              mode="xs"
              content={String(item[field.field as keyof typeof item])}
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
