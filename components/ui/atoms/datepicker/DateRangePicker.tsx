import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = () => {
  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);

  const [startDate, setStartDate] = useState<Date | undefined>(lastMonth);
  const [endDate, setEndDate] = useState<Date | undefined>(today);

  return (
    <div className="flex p-4 gap-2">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <DatePicker
          dateFormat="yyyy.MM.dd"
          selected={startDate}
          onChange={(date: Date | null) => {
            if (date) {
              setStartDate(date);
              if (endDate && date > endDate) {
                setEndDate(undefined);
              }
            } else {
              setStartDate(undefined);
            }
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date("2000-01-01")}
          maxDate={today}
          locale="ko"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <DatePicker
          dateFormat="yyyy.MM.dd"
          selected={endDate}
          onChange={(date: Date | null) => {
            if (date) {
              setEndDate(date);
            } else {
              setEndDate(undefined);
            }
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={today}
          locale="ko"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
