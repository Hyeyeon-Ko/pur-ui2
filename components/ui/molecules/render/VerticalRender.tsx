import React from "react";
import Input from "../../atoms/input/Input";
import SelectBox from "../../atoms/selectBox/Select";
import Chip from "../../atoms/chip/Chip";
import SingleDatePicker from "../../atoms/datepicker/SingleDatePicker";
import FileUploadButton from "../buttons/FileUploadButton";

interface VerticalRenderProps {
  row: {
    id: number; // id 추가
    title: string;
    type?: string;
    contents?: string | string[] | null;
    options?: Array<{ value: string; label: string }>;
    component?: React.ReactNode;
  };
  onChipClick?: (label: string, title: string) => void;
  checkedItems?: { [key: string]: boolean };
  onInputChange?: (id: number, value: string) => void;
  onDateChange?: (id: number, date: Date | null) => void;
}

const VerticalRender: React.FC<VerticalRenderProps> = ({
  row,
  onChipClick,
  checkedItems,
  onInputChange,
  onDateChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onInputChange) {
      onInputChange(row.id, e.target.value);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (onDateChange) {
      onDateChange(row.id, date);
    }
  };

  switch (row.type) {
    case "input":
      return (
        <Input
          mode="sm"
          color="transparent"
          placeholder={row.title}
          value={row.contents as string}
          onChange={handleInputChange}
          customStyle={{
            padding: 0,
            margin: 0,
            border: "none",
            outline: "none",
            boxShadow: "none",
            width: "100%",
          }}
        />
      );
    case "select":
      return (
        <SelectBox
          mode="xs"
          color="transparent"
          options={row.options || []}
          placeholder={row.contents as string}
        />
      );
    case "chip":
      return (
        <div className="flex space-x-2">
          {Array.isArray(row.contents) &&
            row.contents.map((content, index) => (
              <Chip
                key={index}
                mode="xs"
                content={content}
                variant={checkedItems?.[content] ? "inline" : "outline"}
                onClick={() => onChipClick?.(content, row.title)}
              />
            ))}
        </div>
      );
    case "datepicker":
      return (
        <SingleDatePicker
          selectedDate={row.contents ? new Date(row.contents as string) : null}
          onDateChange={handleDateChange}
        />
      );
    case "upload":
      return (
        <div>
          <FileUploadButton
            onFileUpload={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                console.log("File uploaded:", file.name);
              }
            }}
            buttonText="파일 업로드"
          />
          {row.contents === null && <span>파일을 업로드 해주세요.</span>}
          {row.contents !== null && <span>파일명</span>}
        </div>
      );
    default:
      return row.component || null;
  }
};

export default VerticalRender;
