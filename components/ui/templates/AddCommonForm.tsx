import React, { useState } from "react";
import Button from "@/components/ui/atoms/button/Button";
import ThemeToggle from "@/components/ui/molecules/buttons/ThemeToggle";
import CheckOption from "@/components/ui/organism/option/CheckOption";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/molecules/verticalTable/VerticalTable";

interface AddCommonFormProps {
  title: string;
  options: { value: string; label: string }[];
  initialSelected: string;
  searchOptionValue: string;
  verticalData: any[];
  onSearch: (bidNumber: string) => void;
  onChipClick: (label: string, title: string) => void;
}

const AddCommonForm: React.FC<AddCommonFormProps> = ({
  title,
  options,
  initialSelected,
  searchOptionValue,
  verticalData,
  onSearch,
  onChipClick,
}) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleChipClick = (label: string, title: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));

    onChipClick(label, title);
  };

  return (
    <div className="my-4 mb-20">
      <ThemeToggle />
      <PageTitle pageTitle={title} mode="xl" fontWeight="bold" />
      <div className="p-4 flex justify-end">
        <Button mode="sm" content="추가" color="Button_Default" />
      </div>
      <CheckOption
        options={options}
        initialSelected={initialSelected}
        searchOptionValue={searchOptionValue}
        onSearch={onSearch}
      />
      <VerticalTable
        data={verticalData}
        onChipClick={handleChipClick}
        checkedItems={checkedItems}
        showHeader={true}
        tableTitle={`${title} 입력`}
      />
    </div>
  );
};

export default AddCommonForm;
