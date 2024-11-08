"use client";

import Button from "@/components/ui/atoms/button/Button";
import Checkbox from "@/components/ui/atoms/checkbox/Checkbox";
import Input from "@/components/ui/atoms/input/Input";
import Label from "@/components/ui/atoms/label/Label";
import SelectBox from "@/components/ui/atoms/selectBox/Select";
import LabelInput from "@/components/ui/molecules/inputs/LabelInput";
import SendInput from "@/components/ui/molecules/inputs/SendInput";
import Modal from "@/components/ui/molecules/modal/Modal";
import useModal from "@/hooks/useModal";
import useValidations from "@/hooks/useValidations";
import { useEffect, useState } from "react";

const MainPage = () => {
  // const [downloadOption, setDownloadOption] = useState("");
  const [inputValue, setInputValue] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectAll, setSelectAll] = useState(false); // 그룹체크박스
  const { IdValidate, passwordValidation } = useValidations();
  const { isOpen, openModal, closeModal } = useModal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  // 그룹 체크박스 로직
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    item1: false,
    item2: false,
    item3: false,
  });

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    // 전체 체크박스 상태에 따라 모든 개별 체크박스 업데이트
    const updatedCheckedItems = Object.keys(checkedItems).reduce(
      (acc, key) => ({ ...acc, [key]: isChecked }),
      {}
    );
    setCheckedItems(updatedCheckedItems);
  };

  const handleItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckedItems((prev) => ({ ...prev, [name]: checked }));
  };

  useEffect(() => {
    // 개별 체크박스 모두 체크되었는지 확인
    const allChecked = Object.values(checkedItems).every(Boolean);
    const someChecked = Object.values(checkedItems).some(Boolean);

    setSelectAll(allChecked);
    if (!allChecked && someChecked) {
      const selectAllCheckbox = document.getElementById(
        "select-all"
      ) as HTMLInputElement;
      selectAllCheckbox.indeterminate = true;
    } else {
      const selectAllCheckbox = document.getElementById(
        "select-all"
      ) as HTMLInputElement;
      selectAllCheckbox.indeterminate = false;
    }
  }, [checkedItems]);

  const handleConfirm = () => {
    closeModal();
  };

  // NOTE: 선택다운로드 버튼 로직

  // const handleDownloadSelected = () => {
  //   if (selectedRows.length > 0) {
  //     const selectedData = selectedRows
  //       .map((rowId) => {
  //         const row = data.find((item) => item.id === rowId);
  //         return row
  //           ? {
  //               ...row,
  //               센터: formatCenterData(row.센터) || "-",
  //               공고일: formatDate(row.공고일) || "-",
  //               마감일: formatDate(row.마감일) || "-",
  //               응찰일: formatDate(row.응찰일) || "-",
  //               낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
  //               낙찰금액: formatCurrency(row.낙찰금액) || "-",
  //               열람: row.열람 || "-",
  //               누리장터: row.누리장터 || "-",
  //             }
  //           : null;
  //       })
  //       .filter(Boolean);

  //     downloadCsv(selectedData, "download.csv");
  //   } else {
  //     alert("선택된 데이터가 없습니다.");
  //   }
  // };

  // NOTE: 엑셀다운로드 셀렉트박스 구현
  // const handleDownloadOptionChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const option = e.target.value;

  //   if (option === "selected") {
  //     const selectedData = selectedRows
  //       .map((rowId) => {
  //         const row = data.find((item) => item.id === rowId);
  //         return row
  //           ? {
  //               ...row,
  //               센터: formatCenterData(row.센터) || "-",
  //               공고일: formatDate(row.공고일) || "-",
  //               마감일: formatDate(row.마감일) || "-",
  //               응찰일: formatDate(row.응찰일) || "-",
  //               낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
  //               낙찰금액: formatCurrency(row.낙찰금액) || "-",
  //               열람: row.열람 || "-",
  //               누리장터: row.누리장터 || "-",
  //             }
  //           : null;
  //       })
  //       .filter(Boolean);

  //     if (selectedData.length > 0) {
  //       downloadCsv(selectedData, "selected_download.csv");
  //     } else {
  //       alert("선택된 데이터가 없습니다.");
  //     }
  //   } else if (option === "all") {
  //     const allData = data.map((row) => ({
  //       ...row,
  //       센터: formatCenterData(row.센터) || "-",
  //       공고일: formatDate(row.공고일) || "-",
  //       마감일: formatDate(row.마감일) || "-",
  //       응찰일: formatDate(row.응찰일) || "-",
  //       낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
  //       낙찰금액: formatCurrency(row.낙찰금액) || "-",
  //       열람: row.열람 || "-",
  //       누리장터: row.누리장터 || "-",
  //     }));

  //     downloadCsv(allData, "all_download.csv");
  //   }
  // };

  return (
    <div>
      <Input
        mode="sm"
        placeholder="계정을 입력하세요"
        value={inputValue}
        onChange={handleInputChange}
        validation={IdValidate}
      />
      <Input
        mode="sm"
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={inputValue}
        onChange={handleInputChange}
        validation={passwordValidation}
      />
      <div>
        <Checkbox
          mode="sm"
          color="Button_Default"
          checked={isChecked}
          onChange={handleCheckboxChange}
          label="Small Checkbox"
        />
        <Checkbox
          mode="sm"
          color="Button_Default"
          checked={true}
          onChange={handleCheckboxChange}
          label="Small Checkbox"
        />
        <Checkbox
          mode="sm"
          disabled={true}
          onChange={handleCheckboxChange}
          label="disabled Checkbox"
        />
        {/* 전체 선택 체크박스 */}
        <Checkbox
          mode="md"
          checked={selectAll}
          onChange={handleSelectAllChange}
          label="전체 선택"
          name="selectAll"
          id="select-all"
        />

        {/* 개별 체크박스 */}
        <Checkbox
          mode="sm"
          checked={checkedItems["item1"]}
          onChange={handleItemChange}
          label="항목 1"
          name="item1"
        />
        <Checkbox
          mode="sm"
          checked={checkedItems["item2"]}
          onChange={handleItemChange}
          label="항목 2"
          name="item2"
        />
        <Checkbox
          mode="sm"
          checked={checkedItems["item3"]}
          onChange={handleItemChange}
          label="항목 3"
          name="item3"
        />
      </div>
      <div className="p-4">
        <SelectBox
          mode="sm"
          color="Button_Default"
          placeholder="Select Box"
          value={selectedValue}
          onChange={handleSelectChange}
          options={options}
        />
      </div>

      <Button
        disabled={true}
        mode="xs"
        color="Button_Default"
        content="XSmall Button"
        onClick={() => alert("Clicked!")}
      />
      <Button
        color="Button_Default"
        mode="sm"
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
        variant="outline"
        color="Button_Default"
        content="XSmall Button"
        onClick={() => alert("Clicked!")}
      />
      <Button
        mode="sm"
        variant="outline"
        color="Button_Default"
        content="Small Button"
        onClick={() => alert("Clicked!")}
      />
      <Button
        mode="md"
        variant="outline"
        color="Button_Default"
        content="Medium Button"
        onClick={() => alert("Clicked!")}
      />
      <Button
        mode="lg"
        variant="outline"
        disabled
        color="Button_Default"
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
        <Input mode="xs" placeholder="x-small Input" readOnly={true} />
        <Input mode="sm" placeholder="small size input" disabled={true} />
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
      <div>
        <Button mode="lg" content="modal" onClick={openModal} />
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title="파일다운로드"
          onCancelClick={handleConfirm}
          onConfirmClick={handleConfirm}
          mode="lg"
        >
          <p>모달 내부에 추가적인 내용</p>
        </Modal>
      </div>

      {/* NOTE: 버튼형 엑셀 업로드, 다운로드 */}
      {/* <FileUploadButton
          onFileUpload={handleFileUpload}
          buttonText="엑셀업로드"
        />
        <Button
          mode="xs"
          content="엑셀선택다운로드"
          variant="outline"
          color="Button_Default"
          onClick={handleDownloadSelected}
        /> */}

      {/* NOTE: 셀렉트 박스 */}
      {/* <SelectBox
          mode="xs"
          placeholder="엑셀다운로드"
          value={downloadOption}
          onChange={(e) => {
            setDownloadOption(e.target.value);
            handleDownloadOptionChange(e);
          }}
          options={[
            { value: "all", label: "전체 다운로드" },
            { value: "selected", label: "선택 다운로드" },
          ]}
          customStyle={{ color: colors.Button_Default }}
        /> */}
    </div>
  );
};

export default MainPage;
