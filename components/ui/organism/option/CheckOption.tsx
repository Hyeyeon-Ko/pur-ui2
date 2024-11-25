import React, { useState } from "react";
import SearchInput from "../../molecules/inputs/SearchInput";
import Toast, { ToastType } from "@/components/commons/Toast";
import Radio from "../../atoms/radio/Radio";

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

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    setBidNumber("");
  };

  const notifySearch = (
    bidNumber: string,
    onSearch: (bidNumber: string) => void,
  ) => {
    if (bidNumber) {
      onSearch(bidNumber);
    } else {
      Toast.notify("입찰번호를 입력해주세요.", ToastType.WARNING);
    }
  };

  return (
    <div className="flex p-4">
      <div className="mr-1 flex items-center gap-2">
        <Radio
          options={options}
          selectedValue={selectedOption}
          onChange={handleOptionChange}
        />
      </div>

      {selectedOption === searchOptionValue && (
        <SearchInput
          bidNumber={bidNumber}
          onChange={e => {
            setBidNumber(e.target.value);
          }}
          onSearch={() => notifySearch(bidNumber, onSearch)}
          inputPlaceholder="검색어를 입력하세요"
          buttonContent="검색"
        />
      )}
    </div>
  );
};

export default CheckOption;
