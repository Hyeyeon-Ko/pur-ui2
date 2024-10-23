import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

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
  return (
    <div className="ml-1 flex">
      <div>
        <label className="block text-xs text-gray-700">{label}</label>
        <DatePicker
          showIcon
          dateFormat="yyyy.MM.dd"
          selected={selectedDate}
          onChange={(date: Date | null) => onDateChange(date || undefined)}
          minDate={minDate}
          maxDate={maxDate}
          locale={ko}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          calendarClassName="custom-calendar"
          label={label}
        />
      </div>
    </div>
  );
};

export default SingleDatePicker;
