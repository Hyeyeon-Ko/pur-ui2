import React from "react";
import SelectBox from "../../atoms/selectBox/Select";
import Input from "../../atoms/input/Input";
import SingleDatePicker from "../../atoms/datepicker/SingleDatePicker";
import Label from "../../atoms/label/Label";
import { useDarkMode } from "@/context/DarkModeContext";
import colors from "@/styles/colors";

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
  onDateChange: (name: string, date: Date | undefined) => void;
  customStyles?: {
    select?: React.CSSProperties;
    input?: React.CSSProperties;
    datePicker?: React.CSSProperties;
  };
}

const SearchRender: React.FC<SearchRenderProps> = ({
  field,
  value,
  onChange,
  onDateChange,
  customStyles,
}) => {
  const { isDarkMode } = useDarkMode();

  const renderSelect = () => (
    <SelectBox
      name={field.name}
      value={value as string}
      onChange={onChange}
      options={field.options || []}
      mode="sm"
      customStyle={{
        width: "100%",
        margin: "0",
        height: "40px",
        backgroundColor: isDarkMode ? colors["Grey_Darken-5"] : "transparent",
        ...customStyles?.select,
      }}
      aria-label={field.label} 
    />
  );

  const renderInput = () => (
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
        ...customStyles?.input,
      }}
      aria-label={field.label} 
    />
  );

  const renderDatePicker = () => (
    <div
      className="flex flex-col justify-around items-start"
      style={customStyles?.datePicker}
    >
      <Label
        customStyle={{ marginLeft: "4px" }}
        content={field.label}
        mode="xs"
      />
      <SingleDatePicker
        selectedDate={value as Date | undefined}
        onDateChange={(date) => onDateChange(field.name, date ?? undefined)} 
      />
    </div>
  );

  switch (field.type) {
    case "select":
      return renderSelect();
    case "input":
      return renderInput();
    case "date":
      return renderDatePicker();
    default:
      return null;
  }
};

export default SearchRender;
