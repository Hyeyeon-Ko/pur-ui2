import React, { useState } from "react";
import SelectBox from "../../atoms/selectBox/Select";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import SingleDatePicker from "../../atoms/datepicker/SingleDatePicker";
import colors from "@/styles/colors";
import Label from "../../atoms/label/Label";
import { useDarkMode } from "@/context/DarkModeContext";

export type FieldConfig = {
  name: string;
  label?: string;
  type: "select" | "input" | "date";
  options?: { value: string; label: string }[];
};

type SearchFilterProps = {
  fieldsConfig: FieldConfig[];
  onSearch?: (searchData: { [key: string]: string | Date | undefined }) => void;
};

const SearchFilter: React.FC<SearchFilterProps> = ({
  fieldsConfig,
  onSearch,
}) => {
  const [searchData, setSearchData] = useState<{
    [key: string]: string | Date | undefined;
  }>(
    fieldsConfig.reduce((acc, field) => {
      if (field.type === "date") {
        acc[field.name] = new Date(); // 오늘 날짜
      } else {
        acc[field.name] = "";
      }
      return acc;
    }, {} as { [key: string]: string | Date | undefined })
  );

  const { isDarkMode } = useDarkMode();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    setSearchData((prev) => ({ ...prev, [name]: date }));
  };

  const handleSearch = () => {
    onSearch(searchData);
  };

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "select":
        return (
          <div className="flex items-center h-full">
            <SelectBox
              key={field.name}
              name={field.name}
              value={searchData[field.name] as string}
              onChange={handleChange}
              options={field.options || []}
              mode="sm"
              color="transparent"
              customStyle={{
                width: "100%",
                margin: "0",
                height: "40px",
              }}
            />
          </div>
        );
      case "input":
        return (
          <div className="flex items-center h-full">
            <Input
              key={field.name}
              mode="sm"
              name={field.name}
              value={searchData[field.name] as string}
              onChange={handleChange}
              placeholder={`${field.label}`}
              color="transparent"
              customStyle={{
                width: "100%",
                margin: "0",
                border: "none",
                height: "40px",
              }}
            />
          </div>
        );
      case "date":
        return (
          <div className="flex flex-col justify-around items-start">
            <Label
              customStyle={{ marginLeft: "4px" }}
              content={field.label}
              mode="xs"
            />
            <SingleDatePicker
              key={field.name}
              selectedDate={searchData[field.name] as Date | undefined}
              onDateChange={(date) => handleDateChange(field.name, date)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div
        style={{
          borderColor: isDarkMode ? colors.sub : colors["Grey_Lighten-4"],
        }}
        className="border mx-auto rounded-full shadow-lg w-[90%] bg-white"
      >
        <div>
          <div className="flex flex-wrap">
            {fieldsConfig.map((field, index) => (
              <div
                key={field.name}
                className={`flex-1 p-2 bg-gray-50 ${
                  index !== fieldsConfig.length - 1 ? "border-r" : ""
                }`}
                style={{
                  borderColor: isDarkMode
                    ? colors["transparent"]
                    : colors["Grey_Lighten-4"],
                }}
              >
                {renderField(field)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end py-6 w-[92%] mb-10">
        <div className="flex space-x-2">
          <Button
            mode="sm"
            color="signature"
            onClick={handleSearch}
            content="조회"
          />
          <Button
            mode="sm"
            variant="outline"
            color="Button_Default"
            content="초기화"
            onClick={() =>
              setSearchData(
                fieldsConfig.reduce((acc, field) => {
                  acc[field.name] = field.type === "date" ? new Date() : "";
                  return acc;
                }, {} as { [key: string]: string | Date | undefined })
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
