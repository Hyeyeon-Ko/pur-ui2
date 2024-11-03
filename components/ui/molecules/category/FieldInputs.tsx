import React from "react";
import Input from "@/components/ui/atoms/input/Input";
import { CategoryItemInputProps } from "@/types/categoryTypes";

interface FieldInputsProps {
  item: CategoryItemInputProps["item"];
  fields: CategoryItemInputProps["fields"];
  onChange: (id: number, field: string, value: any) => void;
}

const FieldInputs: React.FC<FieldInputsProps> = ({
  item,
  fields,
  onChange,
}) => (
  <>
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
            onChange={(e) => onChange(item.id, field.field, e.target.value)}
            placeholder={field.placeholder}
          />
        );
      }
      return null;
    })}
  </>
);

export default FieldInputs;
