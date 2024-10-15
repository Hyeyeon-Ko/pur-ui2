import React, { useRef } from "react";
import Input from "../input/Input";

import Button from "../button/Button";
import DateRangePicker from "../datepicker/DateRangePicker";

interface FilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  selectedRange: { startDate: Date; endDate: Date };
  setSelectedRange: (range: { startDate: Date; endDate: Date }) => void;
}

const Filter: React.FC<FilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedOption,
  setSelectedOption,
}) => {
  const endDateRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "", label: "All" },
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  return (
    <div>
      <DateRangePicker />
      <div className="flex gap-2">
        {/* 시작일 선택 */}

        {/* 종료일 선택 */}
        <div className="relative" ref={endDateRef}></div>
      </div>
      <div className="flex space-x-4 items-center">
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="px-2 py-2 border border-gray rounded-md bg-white shadow-sm hover:border-blue-400 focus:outline-none focus:ring focus:ring-blue-200"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Input
          mode="sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          customStyle={{
            flexFlow: "row wrap",
            border: "1px solid gray",
            width: "360px",
          }}
        />
        <Button mode="sm" content="조회" />
      </div>
    </div>
  );
};

export default Filter;
