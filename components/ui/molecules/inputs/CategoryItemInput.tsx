import React, { useState, useEffect } from "react";
import Button from "@/components/ui/atoms/button/Button";
import Input from "@/components/ui/atoms/input/Input";
import SelectBox from "../../atoms/selectBox/Select";
import { CategoryItemInputProps } from "@/types/categoryTypes";
import Label from "../../atoms/label/Label";
import { categoryData } from "@/lib/optionDatas";

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

  const selectedLargeCategoryData = categoryData.find(
    (cat) => cat.value === selectedLargeCategory
  );
  const middleCategories = selectedLargeCategoryData
    ? selectedLargeCategoryData.middleCategories
    : [];

  return (
    <div className="flex justify-between items-center space-x-2 px-4">
      {item.isEditing ? (
        <div className="flex flex-grow justify-between">
          <SelectBox
            mode="xs"
            options={categoryData.map((cat) => ({
              value: cat.value,
              label: cat.label,
            }))}
            value={selectedLargeCategory}
            onChange={(e) => handleLargeCategoryChange(e.target.value)}
            placeholder="대분류 선택"
          />
          <SelectBox
            mode="xs"
            options={middleCategories.map((middle) => ({
              value: middle.value,
              label: middle.label,
            }))}
            value={selectedMiddleCategory}
            onChange={(e) => handleMiddleCategoryChange(e.target.value)}
            placeholder="중분류 선택"
          />
          {fields.map((field) => {
            const value = item[field.field as keyof typeof item];

            if (field.type === "input") {
              return (
                <Input
                  key={field.field}
                  mode="xs"
                  color="transparent"
                  type="text"
                  value={String(value)}
                  onChange={(e) =>
                    onChange(item.id, field.field, e.target.value)
                  }
                  placeholder={field.placeholder}
                />
              );
            }
            return null;
          })}
          <div className="flex space-x-2">
            <Button
              color="signature"
              mode="xs"
              content="저장"
              onClick={() => onSave(item.id)}
            />
            <Button
              color="Button_Default"
              mode="xs"
              variant="outline"
              content="삭제"
              onClick={() => onRemove(item.id)}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-grow justify-between items-center">
          <Label mode="xs" content={selectedLargeCategory} />
          <Label mode="xs" content={selectedMiddleCategory} />
          <Label mode="xs" content={item.content} />
          <Label mode="xs" content={item.name} />
          <Label mode="xs" content={item.description} />
          <div className="flex space-x-2">
            <Button
              color="sub"
              mode="xs"
              content="수정"
              onClick={() => onEdit(item.id)}
            />
            <Button
              color="Button_Default"
              mode="xs"
              variant="outline"
              content="삭제"
              onClick={() => onRemove(item.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryItemInput;
