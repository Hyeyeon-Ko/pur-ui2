"use client";

import Button from "@/components/ui/atoms/button/Button";
import DateRangePicker from "@/components/ui/atoms/datepicker/DateRangePicker";
import SelectBox from "@/components/ui/atoms/selectBox/Select";
import Table from "@/components/ui/organism/table/Table";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import React, { useState, useCallback } from "react";
import colors from "@/styles/colors";
import { data, columns, tenderSearchFields } from "@/lib/data";
import VerticalTable from "@/components/ui/organism/verticalTable/VerticalTable";
import SingleDatePicker from "@/components/ui/atoms/datepicker/SingleDatePicker";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
import useFormatHandler from "@/hooks/useFormatHandler";
import SearchFilter from "@/components/ui/organism/filter/SearchFilter";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import useFileUpload from "@/hooks/useFileUpload";

const MenuPage = () => {
  const [downloadOption, setDownloadOption] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { downloadCsv } = useExcelFileHandler();
  const { handleFileUpload } = useFileUpload();

  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();

  const handleChipClick = (label: string, title: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev };
      newCheckedItems[label] = !prev[label];

      if (title === "센터명" && label === "전국") {
        if (newCheckedItems[label]) {
          Object.keys(newCheckedItems).forEach((key) => {
            if (key !== "전국" && key.startsWith("센터명")) {
              newCheckedItems[key] = false;
            }
          });
        }
      } else if (title === "센터명") {
        newCheckedItems["전국"] = false;
      }

      return newCheckedItems;
    });
  };

  const formattedData = data.map((item) => ({
    ...item,
    센터: formatCenterData(item.센터) || "-",
    공고일: formatDate(item.공고일),
    마감일: formatDate(item.마감일),
    응찰일: formatDate(item.응찰일),
    낙찰기준가: formatCurrency(item.낙찰기준가),
    낙찰금액: formatCurrency(item.낙찰금액),
    열람: `<button>${item.열람}</button>`,
    누리장터: item.누리장터 || "-",
  }));

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));

    setSelectedRows(uniqueSelectedRows);
  }, []);

  const handleDownloadSelected = () => {
    if (selectedRows.length > 0) {
      const selectedData = selectedRows
        .map((rowId) => {
          const row = data.find((item) => item.id === rowId);
          return row
            ? {
                ...row,
                센터: formatCenterData(row.센터) || "-",
                공고일: formatDate(row.공고일) || "-",
                마감일: formatDate(row.마감일) || "-",
                응찰일: formatDate(row.응찰일) || "-",
                낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
                낙찰금액: formatCurrency(row.낙찰금액) || "-",
                열람: row.열람 || "-",
                누리장터: row.누리장터 || "-",
              }
            : null;
        })
        .filter(Boolean);

      downloadCsv(selectedData, "download.csv");
    } else {
      alert("선택된 데이터가 없습니다.");
    }
  };

  const handleDownloadOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const option = e.target.value;

    if (option === "selected") {
      const selectedData = selectedRows
        .map((rowId) => {
          const row = data.find((item) => item.id === rowId);
          return row
            ? {
                ...row,
                센터: formatCenterData(row.센터) || "-",
                공고일: formatDate(row.공고일) || "-",
                마감일: formatDate(row.마감일) || "-",
                응찰일: formatDate(row.응찰일) || "-",
                낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
                낙찰금액: formatCurrency(row.낙찰금액) || "-",
                열람: row.열람 || "-",
                누리장터: row.누리장터 || "-",
              }
            : null;
        })
        .filter(Boolean);

      if (selectedData.length > 0) {
        downloadCsv(selectedData, "selected_download.csv");
      } else {
        alert("선택된 데이터가 없습니다.");
      }
    } else if (option === "all") {
      const allData = data.map((row) => ({
        ...row,
        센터: formatCenterData(row.센터) || "-",
        공고일: formatDate(row.공고일) || "-",
        마감일: formatDate(row.마감일) || "-",
        응찰일: formatDate(row.응찰일) || "-",
        낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
        낙찰금액: formatCurrency(row.낙찰금액) || "-",
        열람: row.열람 || "-",
        누리장터: row.누리장터 || "-",
      }));

      downloadCsv(allData, "all_download.csv");
    }
  };

  const vertical = [
    {
      id: 0,
      title: "센터명",
      type: "chip",
      contents: [
        "전국",
        "재단",
        "본원",
        "광화문",
        "여의도",
        "강남",
        "수원",
        "대구",
        "부산",
        "광주",
        "제주",
      ],
    },
    {
      id: 1,
      title: "입찰번호",
      type: "input",
      contents: "",
    },
    {
      id: 2,
      title: "공고구분",
      type: "input",
      contents: "",
    },
    {
      id: 3,
      title: "계약종류",
      type: "chip",
      contents: ["일반계약", "단가계약", "임대계약", "공사계약", "기타계약"],
    },
    {
      id: 4,
      title: "입찰종류",
      type: "chip",
      contents: ["일반경쟁", "제한경쟁", "지명경쟁"],
    },
    {
      id: 5,
      title: "낙찰방법",
      type: "chip",
      contents: ["최저가격", "2단계경쟁", "협상에의한계약"],
    },
    {
      id: 6,
      title: "계정명",
      type: "chip",
      contents: [
        "의약품",
        "항정신성의약품",
        "장비소모품",
        "인쇄물",
        "시약",
        "백신",
        "의료비품",
        "의료장비",
        "위생용품",
        "피복",
        "사무용품",
        "일반비품",
        "전산용품",
        "기타",
      ],
    },
    {
      id: 7,
      title: "입찰명",
      type: "input",
      contents: "",
    },
    {
      id: 8,
      title: "공고일",
      type: "datepicker",
      contents: "2024-10-10",
    },
    {
      id: 9,
      title: "마감일",
      type: "datepicker",
      contents: "2024-10-10",
    },
    {
      id: 10,
      title: "응찰일",
      type: "datepicker",
      contents: "2024-10-10",
    },
    {
      id: 11,
      title: "낙찰기준가",
      type: "input",
      contents: "",
    },
    {
      id: 12,
      title: "입찰품의번호",
      type: "input",
      contents: "",
    },
    {
      id: 13,
      title: "입찰품의",
      type: "upload",
      contents: null,
    },
    {
      id: 14,
      title: "입찰공고문",
      type: "upload",
      contents: null,
    },
  ];

  /** TODO: 엔드포인트 수정
   *    * 파일업로드 버튼 로직
   */
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const endpoint = "/api/upload";
    handleFileUpload(event, endpoint);
  };

  return (
    <div className="flex flex-col mb-4">
      <PageTitle pageTitle="테스트페이지" mode="xl" fontWeight="bold" />

      <div>
        <SearchFilter fieldsConfig={tenderSearchFields} />
      </div>
      <div className="flex justify-end mr-6">
        <FileUploadButton onFileUpload={handleUpload} buttonText="엑셀업로드" />
        <Button
          mode="xs"
          content="엑셀다운로드"
          variant="outline"
          color="Button_Default"
          onClick={handleDownloadSelected}
        />
        <SelectBox
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
        />
      </div>
      <Table
        data={formattedData}
        columns={columns}
        onRowSelect={handleRowSelect}
        showCheckbox={true}
        pagination={true}
      />
      <div>
        <Table
          data={formattedData}
          columns={columns}
          onRowSelect={handleRowSelect}
          pagination={true}
        />
      </div>
      <div>
        <Table
          data={formattedData}
          columns={columns}
          onRowSelect={handleRowSelect}
        />
      </div>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        startLabel="시작 날짜"
        endLabel="종료 날짜"
      />
      <SingleDatePicker
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        label="날짜선택"
      />
      <VerticalTable
        data={vertical}
        onChipClick={handleChipClick}
        checkedItems={checkedItems}
      />
    </div>
  );
};

export default MenuPage;
