"use client";

import Button from "@/components/ui/atoms/button/Button";
import SelectBox from "@/components/ui/atoms/selectBox/Select";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
import Table from "@/components/ui/molecules/table/Table";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/molecules/verticalTable/VerticalTable";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import useFormatHandler from "@/hooks/useFormatHandler";
import { columns, data } from "@/lib/data";
import colors from "@/styles/colors";
import React, { useCallback, useState } from "react";
import { useDarkMode } from "@/context/DarkModeContext";
import { FaMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import ThemeToggle from "@/components/ui/molecules/buttons/ThemeToggle";
interface TenderDetailProps {
  params: {
    id: string; // 동적 파라미터 ID의 타입 정의
  };
}

// TODO: 매개변수로 params 추가할 것
const TenderDetail: React.FC<TenderDetailProps> = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [downloadOption, setDownloadOption] = useState("");

  // 체크박스 버튼
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const { handleFileUpload, downloadCsv } = useExcelFileHandler();
  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();
  const { toggleDarkMode, isDarkMode } = useDarkMode();

  // const { id } = params; // params에서 ID 가져오기
  // const [tenderData, setTenderData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (id) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(`/api/tender/${id}`); // API 엔드포인트 예시
  //         if (!response.ok) {
  //           throw new Error("Network response was not ok");
  //         }
  //         const data = await response.json();
  //         setTenderData(data);
  //       } catch (error) {
  //         console.error("Error fetching tender data:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }
  // }, [id]);

  // if (loading) {
  //   return <div>Loading...</div>; // 로딩 상태 표시
  // }

  // if (!tenderData) {
  //   return <div>No data found for ID: {id}</div>; // 데이터가 없을 경우 표시
  // }

  // 체크박스 버튼 핸들러
  const handleChipClick = (label: string, title: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev };
      const isChecked = !prev[label];

      newCheckedItems[label] = isChecked;

      if (title === "센터명" && label === "전국") {
        if (isChecked) {
          Object.keys(newCheckedItems).forEach((key) => {
            if (key !== "전국" && key.startsWith("센터명")) {
              newCheckedItems[key] = false;
            }
          });
        }
      } else if (title === "센터명") {
        newCheckedItems["전국"] = false;
      }

      if (isChecked) {
        Object.keys(newCheckedItems).forEach((key) => {
          if (
            (title === "계약종류" &&
              key.startsWith("계약종류") &&
              key !== label) ||
            (title === "입찰종류" &&
              key.startsWith("입찰종류") &&
              key !== label) ||
            (title === "낙찰방법" &&
              key.startsWith("낙찰방법") &&
              key !== label)
          ) {
            newCheckedItems[key] = false;
          }
        });
      }

      console.log("Updated checked items:", newCheckedItems);
      return newCheckedItems;
    });
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

  const verticalResult = [
    {
      id: 0,
      title: "입찰조회",
      type: "input",
      contents: "",
    },
    {
      id: 1,
      title: "입찰결과",
      type: "chip",
      contents: ["낙찰", "유찰"],
    },
    {
      id: 2,
      title: "누리장터번호",
      type: "input",
      contents: "",
    },
    {
      id: 3,
      title: "낙찰업체",
      type: "input",
      contents: "",
    },
    {
      id: 4,
      title: "낙찰금액",
      type: "input",
      contents: "",
    },
    {
      id: 5,
      title: "입찰참가서류",
      type: "upload",
      contents: null,
    },
    {
      id: 6,
      title: "입찰보증금",
      type: "upload",
      contents: null,
    },
    {
      id: 7,
      title: "사유",
      type: "input",
      contents: "",
    },
    {
      id: 8,
      title: "기타사항",
      type: "input",
      contents: "",
    },
  ];

  const formattedData = data.map((item) => ({
    ...item,
    센터: formatCenterData(item.센터) || "-",
    공고일: formatDate(item.공고일),
    마감일: formatDate(item.마감일),
    응찰일: formatDate(item.응찰일),
    낙찰기준가: formatCurrency(item.낙찰기준가),
    낙찰금액: formatCurrency(item.낙찰금액),
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

  return (
    <div
      className={`flex-1 ${
        isDarkMode ? "dark:bg-dark-Grey_Darken_5" : "bg-white"
      }`}
    >
      <ThemeToggle
        customStyle={{
          display: "flex",
          justifyContent: "end",
          marginTop: "24px",
          marginRight: "24px",
        }}
      />
      <PageTitle pageTitle="입찰상세조회" mode="xl" fontWeight="bold" />

      <PageTitle
        pageTitle="입찰사항"
        mode="md"
        fontWeight="bold"
        customStyle={{ padding: "0", marginLeft: "20px" }}
      />
      <VerticalTable
        data={vertical}
        onChipClick={handleChipClick} // Chip 클릭 이벤트 핸들러 전달
        checkedItems={checkedItems} // 체크된 아이템 상태 전달
      />
      <div className="py-20">
        <div className="flex justify-between mr-6">
          <div>
            <PageTitle
              pageTitle="입찰내역"
              mode="md"
              fontWeight="bold"
              customStyle={{ padding: "0", marginLeft: "20px" }}
            />
          </div>
          <div>
            <FileUploadButton
              onFileUpload={handleFileUpload}
              buttonText="엑셀업로드"
            />
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
        </div>
        <Table
          data={formattedData}
          columns={columns}
          onRowSelect={handleRowSelect}
          showCheckbox
        />
      </div>
      <div className="pb-20">
        <div>
          <PageTitle
            pageTitle="입찰결과"
            mode="md"
            fontWeight="bold"
            customStyle={{ padding: "0", marginLeft: "20px" }}
          />
        </div>
        <VerticalTable data={verticalResult} />
      </div>
    </div>
  );
};

export default TenderDetail;
