"use client";

import Button from "@/components/ui/atoms/button/Button";
import Filter from "@/components/ui/atoms/filter/Filter";
import Input from "@/components/ui/atoms/input/Input";
import Label from "@/components/ui/atoms/label/Label";
import Table from "@/components/ui/atoms/table/Table";
import LabelInput from "@/components/ui/molecules/inputs/LabelInput";
import SendInput from "@/components/ui/molecules/inputs/SendInput";
import { useState } from "react";

const data = [
  { data1: "The Sliding Mr. Bones", data2: "Malcolm Lockyer", data3: "1961" },
  { data1: "Witchy Woman", data2: "The Eagles", data3: "1972" },
  { data1: "Shining Star", data2: "Earth, Wind, and Fire", data3: "1975" },
  { data1: "The Sliding Mr. Bones", data2: "Malcolm Lockyer", data3: "1961" },
  { data1: "Witchy Woman", data2: "The Eagles", data3: "1972" },
  { data1: "Shining Star", data2: "Earth, Wind, and Fire", data3: "1975" },
  { data1: "The Sliding Mr. Bones", data2: "Malcolm Lockyer", data3: "1961" },
  { data1: "Witchy Woman", data2: "The Eagles", data3: "1972" },
  { data1: "Shining Star", data2: "Earth, Wind, and Fire", data3: "1975" },
  { data1: "The Sliding Mr. Bones", data2: "Malcolm Lockyer", data3: "1961" },
  { data1: "Witchy Woman", data2: "The Eagles", data3: "1972" },
  { data1: "Shining Star", data2: "Earth, Wind, and Fire", data3: "1975" },
  { data1: "The Sliding Mr. Bones", data2: "Malcolm Lockyer", data3: "1961" },
  { data1: "Witchy Woman", data2: "The Eagles", data3: "1972" },
  { data1: "Shining Star", data2: "Earth, Wind, and Fire", data3: "1975" },
  { data1: "The Sliding Mr. Bones", data2: "Malcolm Lockyer", data3: "1961" },
  { data1: "Witchy Woman", data2: "The Eagles", data3: "1972" },
  { data1: "Shining Star", data2: "Earth, Wind, and Fire", data3: "1975" },
  { data1: "The Sliding Mr. Bones", data2: "Malcolm Lockyer", data3: "1961" },
  { data1: "Witchy Woman", data2: "The Eagles", data3: "1972" },
  { data1: "Shining Star", data2: "Earth, Wind, and Fire", data3: "1975" },
  { data1: "The Sliding Mr. Bones", data2: "Malcolm Lockyer", data3: "1961" },
  { data1: "Witchy Woman", data2: "The Eagles", data3: "1972" },
  { data1: "Shining Star", data2: "Earth, Wind, and Fire", data3: "1975" },
];

const columns = ["data1", "data2", "data3"];

const MainPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <Button
        mode="xs"
        color="Button_Default"
        content="XSmall Button"
        onClick={() => alert("Clicked!")}
      />
      <Button
        mode="sm"
        color="Button_Default"
        content="Small Button"
        onClick={() => alert("Clicked!")}
      />
      <Button
        mode="md"
        color="Button_Default"
        content="Medium Button"
        onClick={() => alert("Clicked!")}
      />
      <Button
        mode="lg"
        color="Button_Default"
        content="Large Button"
        onClick={() => alert("Clicked!")}
      />
      <Button
        mode="xs"
        color="white"
        fontColor="Button_Default"
        borderColor="Button_Default"
        content="XSmall Button"
        onClick={() => alert("Clicked!")}
      />
      <Button
        mode="sm"
        color="white"
        fontColor="Button_Default"
        borderColor="Button_Default"
        content="Small Button"
        onClick={() => alert("Clicked!")}
      />
      <Button
        mode="md"
        color="white"
        fontColor="Button_Default"
        borderColor="Button_Default"
        content="Medium Button"
        onClick={() => alert("Clicked!")}
      />
      <Button
        mode="lg"
        color="white"
        fontColor="Button_Default"
        borderColor="Button_Default"
        content="Large Button"
        onClick={() => alert("Clicked!")}
      />
      <div>
        <Input
          mode="xs"
          value={inputValue}
          onChange={handleChange}
          color="black"
          placeholder="x-small Input"
        />
        <Input mode="xs" placeholder="x-small Input" />
        <Input mode="sm" placeholder="small size input" />
        <Input mode="md" placeholder="medium size input" />
        <Input mode="lg" placeholder="large size input" />
        <Input mode="lg" color="negative" placeholder="large size input" />
      </div>
      <div className="flex flex-col">
        <Label
          mode="xs"
          content="x-small bold 레이블입니다."
          color="primary"
          fontWeight="bold"
          customStyle={{ marginBottom: "8px" }}
        />
        <Label mode="sm" content="small normal 레이블입니다." />
        <Label mode="md" content="medium normal 레이블입니다" />
        <Label mode="lg" content="large normal 레이블입니다" />
      </div>
      <SendInput
        mode="xs"
        content="버튼"
        placeholder="placeholder"
        onClick={() => alert("짜잔")}
        customStyle={{
          padding: "10px",
        }}
      />
      <SendInput
        mode="xs"
        content="버튼"
        placeholder="placeholder"
        onClick={() => alert("짜잔")}
        customStyle={{
          padding: "10px",
        }}
      />
      <SendInput
        mode="sm"
        content="버튼"
        placeholder="placeholder"
        buttonColor="info"
        onClick={() => alert("짜잔")}
        customStyle={{
          padding: "10px",
        }}
      />
      <LabelInput
        labelMode="sm"
        labelContent="사번"
        labelColor="primary"
        labelFontWeight="bold"
        inputMode="sm"
        inputColor="Button_Default"
        inputType="text"
        placeholder="사번을 입력하세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        customStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      />
      <LabelInput
        labelMode="sm"
        labelContent="비밀번호"
        labelColor="primary"
        labelFontWeight="bold"
        inputMode="sm"
        inputColor="Button_Default"
        inputType="password"
        placeholder="비밀번호를 입력하세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        customStyle={{ marginBottom: "20px" }}
      />
      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedRange={selectedRange}
        setSelectedRange={setSelectedRange}
      />
      <Table data={data} columns={columns} />
    </div>
  );
};

export default MainPage;
