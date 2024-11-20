import React, { useState } from "react";
import Input from "../../atoms/input/Input";
import SelectBox from "../../atoms/selectBox/Select";
import Chip from "../../atoms/chip/Chip";
import SingleDatePicker from "../../atoms/datepicker/SingleDatePicker";
import FileUploadButton from "../buttons/FileUploadButton";
import Label from "../../atoms/label/Label";
import Checkbox from "../../atoms/checkbox/Checkbox";
import Radio from "../../atoms/radio/Radio";
import TextArea from "../../atoms/textarea/TextArea";

interface VerticalRenderProps {
  row: {
    id: number;
    title: string;
    type?: string;
    contents?: string | string[] | null;
    options?: Array<{ value: string; label: string }>;
    component?: React.ReactNode;
  };
  onChipClick?: (label: string, title: string) => void;
  checkedItems?: { [key: string]: boolean };
  onInputChange?: (id: number, value: string) => void;
  onDateChange?: (date: Date | null) => void;
  announcementDate?: Date | null; // 공고일
  deadlineDate?: Date | null; // 마감일
  selectedCenters?: string[]; // 선택된 센터 배열
  setSelectedCenters?: React.Dispatch<React.SetStateAction<string[]>>; 
}

const VerticalRender: React.FC<VerticalRenderProps> = ({
  row,
  onChipClick,
  checkedItems,
  onInputChange,
  onDateChange,
  announcementDate,
  deadlineDate,
  selectedCenters,
  setSelectedCenters,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: number]: File | null;
  }>({});
  const [reasons, setReasons] = useState<{ [key: number]: string }>({});
  const [isNotSubmitted, setIsNotSubmitted] = useState<{
    [key: number]: boolean;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange?.(row.id, e.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    onDateChange?.(date);
  };

  const handleFileUpload = (id: number, file: File) => {
    setUploadedFiles((prev) => ({ ...prev, [id]: file }));
  };

  const handleReasonChange = (id: number, value: string) => {
    setReasons((prev) => ({ ...prev, [id]: value }));
  };

  const handleChipClick = (label: string) => {
    if (selectedCenters) {
      if (selectedCenters.includes(label)) {
        if (setSelectedCenters) {
          setSelectedCenters(selectedCenters.filter((item) => item !== label));
        }
      } else {
        if (setSelectedCenters) {
          setSelectedCenters([...selectedCenters, label]);
        }
      }
    }
  
    if (onChipClick) {
      onChipClick(label, row.title);
    }
  };

  const handleRadioChange = (value: string) => {
    onInputChange?.(row.id, value);
  };

  // 모든 항목에 대해 미제출 체크박스를 초기화
  if (!(row.id in isNotSubmitted)) {
    setIsNotSubmitted((prev) => ({ ...prev, [row.id]: false }));
  }

  // 각 타입별로 컴포넌트 렌더링하는 함수들
  const renderTextArea = () => <TextArea placeholder={row.title} rows={4} />;

  const renderInput = () => (
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

  const renderSelect = () => (
    <SelectBox
      mode="xs"
      color="transparent"
      options={row.options || []}
      placeholder={row.contents as string}
    />
  );

  const renderChip = () => (
    <div className="flex space-x-2">
      {Array.isArray(row.contents) &&
        row.contents.map((content, index) => (
          <Chip
            key={index}
            mode="xs"
            content={content}
            variant={checkedItems?.[content] ? "inline" : "outline"}
            onClick={() => handleChipClick(content)}
          />
        ))}
    </div>
  );

  const renderDatePicker = () => {
    const minDateForBid =
      announcementDate && deadlineDate
        ? new Date(Math.max(announcementDate.getTime(), deadlineDate.getTime()))
        : announcementDate || deadlineDate;

    return (
      <SingleDatePicker
        selectedDate={row.contents ? new Date(row.contents as string) : undefined} 
        onDateChange={handleDateChange}
        minDate={
          row.id === 9
            ? announcementDate
              ? new Date(announcementDate.getTime() + 24 * 60 * 60 * 1000) 
              : undefined 
            : undefined 
        }
        minDateForBid={
          minDateForBid
            ? new Date(minDateForBid.getTime() + 24 * 60 * 60 * 1000)
            : undefined 
        }
      />
    );
  };

  const renderRadio = () => (
    <Radio
      options={row.options || []}
      selectedValue={row.contents as string}
      onChange={handleRadioChange}
    />
  );

  const renderUpload = () => (
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
        </div>
      ) : (
        <Label
          color="sub"
          mode="xs"
          content="제출된 파일이 존재하지 않습니다."
        />
      )}
    </div>
  );

  const renderUploadMessage = () => (
    <div className="flex items-center gap-2">
      {!isNotSubmitted[row.id] ? (
        <>
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
            </div>
          ) : (
            <Label
              color="sub"
              mode="xs"
              content="제출된 파일이 존재하지 않습니다."
            />
          )}
        </>
      ) : (
        <></>
      )}

      <div className="flex items-center gap-2">
        <Checkbox
          mode="sm"
          color="primary"
          checked={isNotSubmitted[row.id] || false}
          onChange={() => {
            setIsNotSubmitted((prev) => ({
              ...prev,
              [row.id]: !prev[row.id],
            }));
            if (!isNotSubmitted[row.id]) {
              setUploadedFiles((prev) => ({ ...prev, [row.id]: null }));
              setReasons((prev) => ({ ...prev, [row.id]: "" }));
            }
          }}
          label="미제출"
        />

        {isNotSubmitted[row.id] && (
          <Input
            customStyle={{ minWidth: "200px" }}
            color="Button_Default"
            mode="xs"
            type="text"
            placeholder="미제출 사유를 입력하세요"
            value={reasons[row.id] || ""}
            onChange={(e) => handleReasonChange(row.id, e.target.value)}
          />
        )}
      </div>
    </div>
  );

  // 렌더링 함수 호출
  const renderComponent = () => {
    switch (row.type) {
      case "input":
        return renderInput();
      case "select":
        return renderSelect();
      case "chip":
        return renderChip();
      case "datepicker":
        return renderDatePicker();
      case "radio":
        return renderRadio();
      case "upload":
        return renderUpload();
      case "upload-message":
        return renderUploadMessage();
      case "textarea":
        return renderTextArea();
      default:
        return row.component || null;
    }
  };

  return <div>{renderComponent()}</div>;
};

export default VerticalRender;
