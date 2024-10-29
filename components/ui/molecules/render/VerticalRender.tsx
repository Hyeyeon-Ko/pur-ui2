import React, { useState } from "react";
import Input from "../../atoms/input/Input";
import SelectBox from "../../atoms/selectBox/Select";
import Chip from "../../atoms/chip/Chip";
import SingleDatePicker from "../../atoms/datepicker/SingleDatePicker";
import FileUploadButton from "../buttons/FileUploadButton";
import Label from "../../atoms/label/Label";

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
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: number]: File | null;
  }>({});
  const [reasons, setReasons] = useState<{ [key: number]: string }>({}); // 사유를 저장할 상태

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

  const handleFileUpload = (id: number, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [id]: file }));
    console.log("File uploaded:", file.name);
  };

  const handleReasonChange = (id: number, value: string) => {
    setReasons((prev) => ({ ...prev, [id]: value }));
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
        <div className="flex items-center gap-2">
          <FileUploadButton
            onFileUpload={(event) => {
              const file = event.target.files?.[0];
              if (file) handleFileUpload(row.id, file);
            }}
            buttonText="업로드"
          />
          {uploadedFiles[row.id] ? (
            <div className="flex items-center gap-2">
              <Label mode="xs" content={uploadedFiles[row.id]?.name} />
              <Label color="sub" mode="xs" content="제출완료" />
            </div>
          ) : (
            // 파일명이 존재할 경우
            <Label color="sub" mode="xs" content="미제출" />
          )}
        </div>
      );
    case "upload-message":
      return (
        <div className="flex items-center gap-2">
          <FileUploadButton
            onFileUpload={(event) => {
              const file = event.target.files?.[0];
              if (file) handleFileUpload(row.id, file);
            }}
            buttonText="업로드"
          />
          {uploadedFiles[row.id] ? (
            <div className="flex items-center gap-2">
              <Label mode="xs" content={uploadedFiles[row.id]?.name} />
              <Label color="sub" mode="xs" content="제출완료" />
            </div> // 파일명이 존재할 경우
          ) : (
            <div className="flex flex-col gap-2">
              <Label color="sub" mode="xs" content="미제출" />
              <Input
                customStyle={{ minWidth: "200px" }}
                color="Button_Default"
                mode="xs"
                type="text"
                placeholder="미제출 사유를 입력하세요"
                value={reasons[row.id] || ""}
                onChange={(e) => handleReasonChange(row.id, e.target.value)}
              />
            </div>
          )}
        </div>
      );
    default:
      return row.component || null;
  }
};

export default VerticalRender;
