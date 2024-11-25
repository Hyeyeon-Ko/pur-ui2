import React from "react";
import Button from "../../atoms/button/Button";

interface SearchButtonProps {
  onSearch: () => void;
  onReset: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch, onReset }) => {
  return (
    <div className="mb-10 flex w-[92%] justify-end py-6">
      <div className="flex space-x-2">
        <Button mode="sm" color="signature" onClick={onSearch} content="조회" />
        <Button
          mode="sm"
          color="Button_Default"
          content="초기화"
          onClick={onReset}
        />
      </div>
    </div>
  );
};

export default SearchButton;
