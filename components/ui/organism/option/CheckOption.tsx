import React, { useState } from "react";
import SearchInput from "../../molecules/inputs/SearchInput";
import RadioOption from "../../molecules/radio/RadioOption";
import Toast, { ToastType } from "@/components/commons/Toast";

interface CheckOptionProps {
  options: { value: string; label: string }[];
  initialSelected?: string;
  searchOptionValue?: string;
  onSearch: (bidNumber: string) => void;
}

const CheckOption: React.FC<CheckOptionProps> = ({
  options,
  initialSelected = "",
  searchOptionValue = "",
  onSearch,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(initialSelected);
  const [bidNumber, setBidNumber] = useState<string>("");

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    setBidNumber("");
  };

  return (
    <div className="flex p-4">
      <div className="flex items-center gap-2 mr-4">
        {options.map((option) => (
          <RadioOption
            key={option.value}
            id={option.value}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
            label={option.label}
          />
        ))}
      </div>

      {selectedOption === searchOptionValue && (
        <SearchInput
          bidNumber={bidNumber}
          onChange={(e) => {
            setBidNumber(e.target.value);
          }}
          onSearch={() => {
            if (bidNumber) {
              onSearch(bidNumber);
            } else {
              Toast.notify("입찰번호를 입력해주세요.", ToastType.WARNING);
            }
          }}
        />
      )}
    </div>
  );
};

export default CheckOption;
