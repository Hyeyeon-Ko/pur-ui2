import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";

interface DateRangePickerProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  startLabel?: string;
  endLabel?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  minDate = new Date("2000-01-01"),
  maxDate = new Date(),
  startLabel = "Start Date",
  endLabel = "End Date",
}) => {
  return (
    <div className="flex gap-4 p-4">
      <div>
        <label className="text-gray-700 block text-xs">{startLabel}</label>
        <DatePicker
          showIcon
          dateFormat="yyyy.MM.dd"
          selected={startDate}
          onChange={(date: Date | null) => onStartDateChange(date || undefined)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          locale={ko}
          className="border-gray-300 focus:ring-blue-500 mt-1 block w-full rounded-md border p-2 shadow-sm focus:outline-none focus:ring"
          calendarClassName="custom-calendar"
        />
      </div>

      <div>
        <label className="text-gray-700 block text-xs">{endLabel}</label>
        <DatePicker
          showIcon
          dateFormat="yyyy.MM.dd"
          selected={endDate}
          onChange={(date: Date | null) => onEndDateChange(date || undefined)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || minDate}
          maxDate={maxDate}
          locale={ko}
          className="border-gray-300 focus:ring-blue-500 mt-1 block w-full rounded-md border p-2 shadow-sm focus:outline-none focus:ring"
          calendarClassName="custom-calendar"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
