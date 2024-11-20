import React from "react";
import SingleDatePicker from "@/components/ui/atoms/datepicker/SingleDatePicker";
import Input from "@/components/ui/atoms/input/Input";
import SelectBox from "@/components/ui/atoms/selectBox/Select";
import colors from "@/styles/colors";
import { useDarkMode } from "@/context/DarkModeContext";
import { equipTypeOption, fieldLabel, fieldType } from "@/lib/equipDatas";
import { RepairRow } from "@/types/equipTypes";

interface EditableRenderProps {
  row: RepairRow;
  field: keyof RepairRow;
  index: number;
  isEditing: boolean;
  handleInputChange: <K extends keyof RepairRow>(
    index: number,
    field: K,
    value: RepairRow[K]
  ) => void;
}

const EditableRender: React.FC<EditableRenderProps> = ({
  row,
  field,
  index,
  isEditing,
  handleInputChange,
}) => {
  const { isDarkMode } = useDarkMode();
  const inputType = fieldType[field];

  if (inputType === "select") {
    return (
      <SelectBox
        mode="xs"
        placeholder="선택"
        value={row[field] as string}
        onChange={(e) => handleInputChange(index, field, e.target.value)}
        options={equipTypeOption}
        customStyle={{
          border: "none",
          padding: "10px",
          backgroundColor: isDarkMode ? colors["Grey_Darken-5"] : "transparent",
          color: isDarkMode
            ? colors["Grey_Lighten-1"]
            : colors["Grey_Darken-5"],
        }}
        disabled={!isEditing}
      />
    );
  } else if (inputType === "datepicker") {
    return (
      <SingleDatePicker
        selectedDate={row.repairDate ? new Date(row.repairDate) : undefined} // null 대신 undefined 사용
        onDateChange={(date) =>
          handleInputChange(index, field, date ? date.toISOString() : null)
        }
        minDate={new Date("2000-01-01")}
      />
    );
  } else {
    return (
      <Input
        mode="xs"
        value={
          typeof row[field] === "boolean"
            ? String(row[field])
            : field === "repairDate" && row[field]
            ? new Date(row[field] as string).toLocaleDateString()
            : row[field] ?? ""  // null 또는 undefined일 경우 빈 문자열로 처리
        }
        onChange={(e) => handleInputChange(index, field, e.target.value)}
        customStyle={{
          textAlign: "center",
          border: "none",
          outline: "none",
          boxShadow: "none",
          width: "100%",
        }}
        placeholder={fieldLabel[field as keyof RepairRow]}
      />
    );
  }
};

export default EditableRender;
