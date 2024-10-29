import Button from "@/components/ui/atoms/button/Button";
import Input from "@/components/ui/atoms/input/Input";
import React from "react";
import SelectBox from "../../atoms/selectBox/Select";
import { CategoryItemInputProps } from "@/types/categoryTypes";
import Label from "../../atoms/label/Label";

const CategoryItemInput: React.FC<CategoryItemInputProps> = ({
  item,
  fields,
  onChange,
  onSave,
  onRemove,
  onEdit,
}) => {
  return (
    <div className="flex justify-between items-center space-x-2 px-4">
      {item.isEditing ? (
        <div className="flex flex-grow justify-between">
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
            } else if (field.type === "select" && field.options) {
              return (
                <SelectBox
                  mode="xs"
                  key={field.field}
                  options={field.options}
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
          {fields.map((field) => {
            if (field.type === "select") {
              const selectedValue = item[field.field as keyof typeof item];
              return (
                <Label
                  key={field.field}
                  mode="xs"
                  content={String(selectedValue)}
                />
              );
            }
            return null;
          })}
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
