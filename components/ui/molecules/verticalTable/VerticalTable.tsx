import React from "react";
import Input from "../../atoms/input/Input";
import SelectBox from "../../atoms/selectBox/Select";
import Chip from "../../atoms/chip/Chip";
import SingleDatePicker from "../../atoms/datepicker/SingleDatePicker";
import FileUploadButton from "../buttons/FileUploadButton";
import colors from "@/styles/colors";

interface VerticalTableProps {
  data: Array<{
    id: number;
    title: string;
    type?: string; // 'input', 'select', 'chip', 'datepicker', 'upload' 등, 없는 경우도 있으므로 optional로 설정
    contents?: string | string[] | null; // 필드 값 (input, select, chip 등) 역시 선택적 필드로 설정
    options?: Array<{ value: string; label: string }>; // selectBox 용 옵션
    component?: React.ReactNode; // 커스텀 컴포넌트를 직접 넣을 수 있도록 선택적으로 설정
  }>;
  onChipClick?: (label: string, title: string) => void; // Chip 클릭 핸들러
  checkedItems?: { [key: string]: boolean };
}

const VerticalTable: React.FC<VerticalTableProps> = ({
  data,
  onChipClick,
  checkedItems,
}) => {
  const renderContent = (row: {
    title: string;
    type?: string;
    contents?: string | string[] | null;
    options?: Array<{ value: string; label: string }>;
    component?: React.ReactNode;
  }) => {
    switch (row.type) {
      case "input":
        return (
          <Input
            mode="sm"
            color="transparent"
            placeholder={row.title}
            value={row.contents as string}
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
                  variant={checkedItems?.[content] ? "inline" : "outline"} // checkedItems가 undefined일 수 있으므로 optional chaining 사용
                  onClick={() => onChipClick?.(content, row.title)} // 클릭 시 핸들러 호출
                />
              ))}
          </div>
        );
      case "datepicker":
        return (
          <SingleDatePicker
            selectedDate={
              row.contents ? new Date(row.contents as string) : null
            } // contents가 null인 경우 처리
            onDateChange={(date) => console.log("Date selected:", date)}
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
            {row.contents === null && <span>파일명여기에 쓸껀지</span>}{" "}
          </div>
        );
      default:
        return row.component || null;
    }
  };

  return (
    <div className="mx-5 rounded-lg shadow-lg">
      <table className="table-auto w-full">
        <tbody className="divide-x">
          {data.map((row) => (
            <tr
              key={row.id}
              style={{ borderBottom: `1px solid ${colors["Grey_Lighten-4"]}` }}
            >
              <th
                style={{
                  backgroundColor: colors.Table_header,
                  color: colors["Grey_Darken-3"],
                  borderBottom: `1px solid ${colors["Grey_Lighten-4"]}`,
                  borderLeft: "1px solid transparent",
                }}
                className="text-xs uppercase text-center"
              >
                {row.title}
              </th>
              <td className="px-4 py-2 text-xs">{renderContent(row)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerticalTable;
