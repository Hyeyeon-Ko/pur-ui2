import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { useDarkMode } from "@/context/DarkModeContext";

interface SingleDatePickerProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  minDateForBid?: Date;
  label?: string;
}

const SingleDatePicker: React.FC<SingleDatePickerProps> = ({
  selectedDate,
  onDateChange,
  minDate = new Date("2000-01-01"),
  maxDate = new Date(),
  minDateForBid,
  label = "",
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="ml-1 flex">
      <div>
        <label
          className={`block text-xs ${
            isDarkMode ? "text-white" : "text-gray-700"
          }`}
        >
          {label}
        </label>
        <DatePicker
          showIcon
          dateFormat="yyyy.MM.dd"
          selected={selectedDate}
          onChange={(date: Date | null) => onDateChange(date || undefined)}
          minDate={minDateForBid || minDate} // minDateForBid를 먼저 사용하고 없으면 minDate를 사용
          // maxDate={maxDate}
          locale={ko}
          className={`m-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 ${
            isDarkMode
              ? "bg-dark-transparent border-gray-600 text-dark-white"
              : "bg-white border-gray-300 text-gray-700"
          }`}
          calendarClassName="custom-calendar"
          // label={label}
        />
      </div>
    </div>
  );
};

export default SingleDatePicker;
