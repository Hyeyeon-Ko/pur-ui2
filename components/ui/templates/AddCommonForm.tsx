import React, { useState } from "react";
import ThemeToggle from "@/components/ui/molecules/buttons/ThemeToggle";
import CheckOption from "@/components/ui/organism/option/CheckOption";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/molecules/verticalTable/VerticalTable";
import TableButton from "../molecules/buttons/TableButton";
import useChipHandler from "@/hooks/useChipHandler";

interface AddCommonFormProps {
  title: string;
  options: { value: string; label: string }[];
  initialSelected: string;
  searchOptionValue: string;
  verticalData: any[];
  onSearch: (bidNumber: string) => void;
  onSave: (
    checkedItems: { [key: string]: boolean },
    verticalData: any[]
  ) => void;
}

const AddCommonForm: React.FC<AddCommonFormProps> = ({
  title,
  options,
  initialSelected,
  searchOptionValue,
  verticalData,
  onSearch,
  onSave,
}) => {
  const { checkedItems, handleChipClick } = useChipHandler();


  return (
    <div className="my-4 mb-20">
      <ThemeToggle />
      <PageTitle pageTitle={title} mode="xl" fontWeight="bold" />
      <TableButton
        showAddButton={false}
        showDelButton={false}
        showAllDownButton={false}
        showSaveButton
        onSave={() => onSave(checkedItems, verticalData)}
      />
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
