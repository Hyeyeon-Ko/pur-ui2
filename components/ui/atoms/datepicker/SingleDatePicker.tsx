import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { useTheme } from "next-themes"; // useTheme 추가
import colors from "@/styles/colors"; // colors 추가

interface SingleDatePickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  label?: string;
}

const SingleDatePicker: React.FC<SingleDatePickerProps> = ({
  selectedDate,
  onDateChange,
  minDate = new Date("2000-01-01"),
  maxDate = new Date(),
  label = "",
}) => {
  const { theme } = useTheme(); // 현재 테마 가져오기

  return (
    <div className="ml-1 flex">
      <div>
        <label
          className={`block text-xs ${
            theme === "dark" ? "text-white" : "text-gray-700"
          }`}
        >
          {label}
        </label>
        <DatePicker
          showIcon
          dateFormat="yyyy.MM.dd"
          selected={selectedDate}
          onChange={(date: Date | null) => onDateChange(date || undefined)}
          minDate={minDate}
          maxDate={maxDate}
          locale={ko}
          className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-600" // 다크 모드 배경색 및 텍스트 색상
              : "border-gray-300" // 일반 모드 배경색 및 테두리 색상
          }`}
          style={{ color: theme === "dark" ? colors.white : colors.black }}
          calendarClassName="custom-calendar"
          label={label}
        />
      </div>
    </div>
  );
};

export default SingleDatePicker;
