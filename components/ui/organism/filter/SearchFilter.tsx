import React, { useState } from "react";
import SelectBox from "../../atoms/selectBox/Select";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";
import SingleDatePicker from "../../atoms/datepicker/DatePicker";
import colors from "@/styles/colors";

const SearchFilter = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [searchData, setSearchData] = useState({
    center: "",
    bidType: "",
    accountName: "",
    announcementDate: "",
    dueDate: "",
    winner: "",
    bidResult: "",
    bidName: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log(searchData);
  };

  return (
    <div className="mx-auto rounded-lg shadow-lg w-[70%] bg-white">
      <div>
        <div className="grid grid-cols-5">
          <div
            className="border-b border-r p-2 bg-gray-50"
            style={{ borderColor: colors["Grey_Lighten-3"] }}
          >
            <SelectBox
              mode="sm"
              name="center"
              value={searchData.center}
              onChange={handleChange}
              options={[
                { value: "", label: "센터" },
                { value: "전국", label: "전국" },
                { value: "재단", label: "재단" },
              ]}
              color="transparent"
              customStyle={{ width: "100%", margin: "0" }}
            />
          </div>
          <div
            className="border-b border-r p-2 bg-gray-50"
            style={{ borderColor: colors["Grey_Lighten-3"] }}
          >
            <SelectBox
              mode="sm"
              name="bidType"
              value={searchData.bidType}
              onChange={handleChange}
              options={[
                { value: "", label: "입찰종류" },
                { value: "일반경쟁", label: "일반경쟁" },
                { value: "제한경쟁", label: "제한경쟁" },
              ]}
              color="transparent"
              customStyle={{ width: "100%", margin: "0" }}
            />
          </div>
          <div
            className="border-b border-r p-2 bg-gray-50"
            style={{ borderColor: colors["Grey_Lighten-3"] }}
          >
            <SelectBox
              mode="sm"
              name="accountName"
              value={searchData.accountName}
              onChange={handleChange}
              options={[
                { value: "", label: "계정명" },
                { value: "의약품", label: "의약품" },
              ]}
              color="transparent"
              customStyle={{ width: "100%", margin: "0" }}
            />
          </div>
          <div
            className="border-b p-2 bg-gray-50"
            style={{ borderColor: colors["Grey_Lighten-3"] }}
          >
            <SelectBox
              name="bidResult"
              mode="sm"
              value={searchData.bidResult}
              onChange={handleChange}
              options={[
                { value: "", label: "입찰결과" },
                { value: "낙찰", label: "낙찰" },
                { value: "유찰", label: "유찰" },
              ]}
              color="transparent"
              customStyle={{ width: "100%", margin: "0" }}
            />
          </div>
          <div className="flex flex-col mt-1 mb-1 space-y-4">
            <Button
              mode="sm"
              variant="outline"
              color="Button_Default"
              content="초기화"
              onClick={() =>
                setSearchData({ ...searchData, winner: "", bidName: "" })
              }
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-5">
          <div
            className="border-r p-2 bg-gray-50"
            style={{ borderRightColor: colors["Grey_Lighten-3"] }}
          >
            <Input
              mode="sm"
              name="winner"
              value={searchData.winner}
              onChange={handleChange}
              placeholder="검색 낙찰자"
              color="transparent"
              customStyle={{ width: "100%", margin: "0", border: "none" }}
              onFocus={(e) => (e.currentTarget.style.border = "none")}
            />
          </div>

          <div
            className="border-r p-2 bg-gray-50"
            style={{ borderRightColor: colors["Grey_Lighten-3"] }}
          >
            <Input
              mode="sm"
              name="bidName"
              value={searchData.bidName}
              onChange={handleChange}
              placeholder="입찰명"
              color="transparent"
              customStyle={{ width: "100%", margin: "0", border: "none" }}
              onFocus={(e) => (e.currentTarget.style.border = "none")}
            />
          </div>
          <div
            className="flex border-r p-2 bg-gray-50 items-center justify-around"
            style={{ borderRightColor: colors["Grey_Lighten-3"] }}
          >
            <label className="block text-sm font-medium text-gray-700 mr-2">
              공고일
            </label>
            <SingleDatePicker
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
          <div
            className="flex p-2 bg-gray-50 items-center justify-around"
            style={{ borderRightColor: colors["Grey_Lighten-3"] }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              마감일
            </label>
            <SingleDatePicker
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>
          <div className="flex flex-col mt-1 space-y-2">
            <Button mode="sm" onClick={handleSearch} content="조회" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
