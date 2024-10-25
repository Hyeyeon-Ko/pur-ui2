import React, { useState } from "react";
import colors from "@/styles/colors";
import { useDarkMode } from "@/context/DarkModeContext";
import SearchRender from "../../molecules/render/SearchRender";
import SearchButton from "../../molecules/buttons/SearchButton";
import { FieldConfig } from "@/types/fieldTypes";

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

  const handleReset = () => {
    setSearchData(
      fieldsConfig.reduce((acc, field) => {
        acc[field.name] = field.type === "date" ? new Date() : "";
        return acc;
      }, {} as { [key: string]: string | Date | undefined })
    );
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
                <SearchRender
                  field={field}
                  value={searchData[field.name]}
                  onChange={handleChange}
                  onDateChange={handleDateChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <SearchButton onSearch={handleSearch} onReset={handleReset} />
    </>
  );
};

export default SearchFilter;
