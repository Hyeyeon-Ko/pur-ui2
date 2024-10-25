import React from "react";
import SelectBox from "../../atoms/selectBox/Select";
import Input from "../../atoms/input/Input";
import SingleDatePicker from "../../atoms/datepicker/SingleDatePicker";
import Label from "../../atoms/label/Label";

interface SearchRenderProps {
  field: {
    name: string;
    label?: string;
    type: "select" | "input" | "date";
    options?: { value: string; label: string }[];
  };
  value: string | Date | undefined;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  onDateChange: (name: string, date: Date | null) => void;
}

const SearchRender: React.FC<SearchRenderProps> = ({
  field,
  value,
  onChange,
  onDateChange,
}) => {
  switch (field.type) {
    case "select":
      return (
        <SelectBox
          name={field.name}
          value={value as string}
          onChange={onChange}
          options={field.options || []}
          mode="sm"
          color="transparent"
          customStyle={{
            width: "100%",
            margin: "0",
            height: "40px",
          }}
        />
      );
    case "input":
      return (
        <Input
          mode="sm"
          name={field.name}
          value={value as string}
          onChange={onChange}
          placeholder={field.label}
          color="transparent"
          customStyle={{
            width: "100%",
            margin: "0",
            border: "none",
            height: "40px",
          }}
        />
      );
    case "date":
      return (
        <div className="flex flex-col justify-around items-start">
          <Label
            customStyle={{ marginLeft: "4px" }}
            content={field.label}
            mode="xs"
          />
          <SingleDatePicker
            selectedDate={value as Date | undefined}
            onDateChange={(date) => onDateChange(field.name, date)}
          />
        </div>
      );
    default:
      return null;
  }
};

export default SearchRender;
