import React, { useState, useRef, useEffect } from "react";
import Input from "../input/Input";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Button from "../button/Button";

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
  selectedRange,
  setSelectedRange,
}) => {
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

  const startDateRef = useRef<HTMLDivElement>(null);
  const endDateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        startDateRef.current &&
        !startDateRef.current.contains(event.target as Node) &&
        endDateRef.current &&
        !endDateRef.current.contains(event.target as Node)
      ) {
        setIsStartDatePickerOpen(false);
        setIsEndDatePickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 시작일 변경 핸들러
  const handleStartDateChange = (ranges: any) => {
    setSelectedRange({
      startDate: ranges.selection.startDate,
      endDate: selectedRange.endDate,
    });
    setIsStartDatePickerOpen(false);
  };

  // 종료일 변경 핸들러
  const handleEndDateChange = (ranges: any) => {
    setSelectedRange({
      startDate: selectedRange.startDate,
      endDate: ranges.selection.endDate,
    });
    setIsEndDatePickerOpen(false);
  };

  const options = [
    { value: "", label: "All" },
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  const toggleStartDatePicker = () => {
    setIsStartDatePickerOpen((prev) => {
      if (isEndDatePickerOpen) {
        setIsEndDatePickerOpen(false);
      }
      return !prev;
    });
  };

  const toggleEndDatePicker = () => {
    setIsEndDatePickerOpen((prev) => {
      if (isStartDatePickerOpen) {
        setIsStartDatePickerOpen(false);
      }
      return !prev;
    });
  };

  return (
    <div className="m-20 w-[90%] p-6 bg-red-100 rounded-lg shadow-lg space-y-4 border-gray-300">
      <div className="flex gap-2">
        {/* 시작일 선택 */}
        <div className="relative" ref={startDateRef}>
          <button
            onClick={toggleStartDatePicker}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg w-full text-left shadow-sm hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200"
          >
            {`${selectedRange.startDate.toLocaleDateString()}`}
          </button>
          {isStartDatePickerOpen && (
            <div className="absolute z-10 mt-2">
              <DateRange
                ranges={[
                  {
                    startDate: selectedRange.startDate,
                    endDate: selectedRange.startDate,
                    key: "selection",
                  },
                ]}
                onChange={handleStartDateChange}
                rangeColors={["#3b82f6"]}
              />
            </div>
          )}
        </div>

        {/* 종료일 선택 */}
        <div className="relative" ref={endDateRef}>
          <button
            onClick={toggleEndDatePicker}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg w-full text-left shadow-sm hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-200"
          >
            {`${selectedRange.endDate.toLocaleDateString()}`}
          </button>
          {isEndDatePickerOpen && (
            <div className="absolute z-10 mt-2">
              <DateRange
                ranges={[
                  {
                    startDate: selectedRange.endDate,
                    endDate: selectedRange.endDate,
                    key: "selection",
                  },
                ]}
                onChange={handleEndDateChange}
                rangeColors={["#3b82f6"]}
              />
            </div>
          )}
        </div>
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
