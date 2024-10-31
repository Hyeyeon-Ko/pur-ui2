import React from "react";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";

interface SearchInputProps {
  bidNumber: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  bidNumber,
  onChange,
  onSearch,
}) => (
  <div className="flex items-center">
    <Input
      mode="sm"
      color="Button_Default"
      value={bidNumber}
      onChange={onChange}
      placeholder="입찰번호를 입력하세요"
    />
    <Button mode="sm" color="signature" onClick={onSearch} content="검색" />
  </div>
);

export default SearchInput;
