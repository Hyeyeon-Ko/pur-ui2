import React from "react";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";

interface SearchInputProps {
  bidNumber: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  inputPlaceholder?: string;
  buttonContent?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  bidNumber,
  onChange,
  onSearch,
  inputPlaceholder,
  buttonContent,
}) => (
  <div className="flex items-center">
    <Input
      mode="sm"
      color="Button_Default"
      value={bidNumber}
      onChange={onChange}
      placeholder={inputPlaceholder}
    />
    <Button
      mode="sm"
      color="signature"
      onClick={onSearch}
      content={buttonContent}
    />
  </div>
);

export default SearchInput;
