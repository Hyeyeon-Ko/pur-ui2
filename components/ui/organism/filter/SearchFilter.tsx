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
    fieldsConfig.reduce(
      (acc, field) => {
        if (field.type === "date") {
          // acc[field.name] = new Date(); // 오늘 날짜
          acc[field.name] = undefined; // 오늘 날짜
        } else {
          acc[field.name] = "";
        }
        return acc;
      },
      {} as { [key: string]: string | Date | undefined },
    ),
  );

  const { isDarkMode } = useDarkMode();

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    setSearchData(prev => ({ ...prev, [name]: date }));
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchData);
    }
  };

  const handleReset = () => {
    setSearchData(
      fieldsConfig.reduce(
        (acc, field) => {
          acc[field.name] = field.type === "date" ? new Date() : "";
          return acc;
        },
        {} as { [key: string]: string | Date | undefined },
      ),
    );
  };

  return (
    <>
      <div
        style={{
          borderColor: isDarkMode ? colors.sub : colors["Grey_Lighten-4"],
        }}
        className={`${
          isDarkMode ? "bg-dark-Grey_Darken_5" : "bg-white"
        } mx-auto w-[90%] rounded-full border shadow-lg`}
      >
        <div>
          <div className="flex flex-wrap">
            {fieldsConfig.map((field, index) => (
              <div
                key={field.name}
                className={`bg-gray-50 flex flex-1 items-center p-2 ${
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
