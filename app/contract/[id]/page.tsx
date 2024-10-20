"use client";

import Button from "@/components/ui/atoms/button/Button";
import SelectBox from "@/components/ui/atoms/selectBox/Select";
import FileUploadButton from "@/components/ui/molecules/buttons/FileUploadButton";
import Table from "@/components/ui/molecules/table/Table";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/molecules/verticalTable/VerticalTable";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import useFormatHandler from "@/hooks/useFormatHandler";
import { contractListColumns, contractListData } from "@/lib/data";
import colors from "@/styles/colors";
import React, { useCallback, useState } from "react";

interface TenderDetailProps {
  params: {
    id: string; // 동적 파라미터 ID의 타입 정의
  };
}

const TenderDetail: React.FC<TenderDetailProps> = ({ params }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [downloadOption, setDownloadOption] = useState("");

  // 체크박스 버튼
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  // 체크박스 버튼 핸들러
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

  const { handleFileUpload, downloadCsv } = useExcelFileHandler();
  const { formatCenterData, formatCurrency } = useFormatHandler();

  const { id } = params; // params에서 ID 가져오기
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
      title: "계약번호",
      type: "input",
      contents: "",
    },
    {
      id: 2,
      title: "계약구분",
      type: "chip",
      contents: ["최초계약", "연장계약", "변경계약"],
    },
    {
      id: 3,
      title: "계약명",
      type: "input",
      contents: "",
    },
    {
      id: 4,
      title: "계약일자",
      type: "datepicker",
      contents: "2024-10-10",
    },
    {
      id: 5,
      title: "계약시작일",
      type: "datepicker",
      contents: "2024-10-10",
    },
    {
      id: 6,
      title: "계약완료일",
      type: "datepicker",
      contents: "2024-10-10",
    },
    {
      id: 7,
      title: "S/N",
      type: "datepicker",
      contents: "2024-10-10",
    },
    {
      id: 8,
      title: "공급사",
      type: "input",
      contents: "",
    },
    {
      id: 9,
      title: "계약가격",
      type: "input",
      contents: "",
    },
    {
      id: 10,
      title: "계약품의",
      type: "upload",
      contents: null,
    },
    {
      id: 11,
      title: "계약서",
      type: "upload",
      contents: null,
    },
    {
      id: 12,
      title: "계약보증금",
      type: "upload",
      contents: null,
    },
    {
      id: 13,
      title: "하자이행보증금",
      type: "upload",
      contents: null,
    },
    {
      id: 14,
      title: "계약기타사항",
      type: "upload",
      contents: null,
    },
  ];

  const formattedData = contractListData.map((item) => ({
    ...item,
    센터: formatCenterData(item.센터) || "-",
    낙찰기준가: formatCurrency(item.낙찰기준가),
    계약단가: formatCurrency(item.계약단가),
    계약금액: formatCurrency(item.계약금액),
  }));

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));

    setSelectedRows(uniqueSelectedRows);
  }, []);

  const handleDownloadSelected = () => {
    if (selectedRows.length > 0) {
      const selectedData = selectedRows
        .map((rowId) => {
          const row = contractListData.find((item) => item.id === rowId);
          return row
            ? {
                ...row,
                센터: formatCenterData(row.센터) || "-",
                낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
                계약단가: formatCurrency(row.계약단가) || "-",
                계약금액: formatCurrency(row.계약금액) || "-",
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
          const row = contractListData.find((item) => item.id === rowId);
          return row
            ? {
                ...row,
                센터: formatCenterData(row.센터) || "-",
                낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
                계약단가: formatCurrency(row.계약단가) || "-",
                계약금액: formatCurrency(row.계약금액) || "-",
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
      const allData = contractListData.map((row) => ({
        ...row,
        센터: formatCenterData(row.센터) || "-",
        낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
        계약단가: formatCurrency(row.계약단가) || "-",
        계약금액: formatCurrency(row.계약금액) || "-",
      }));

      downloadCsv(allData, "all_download.csv");
    }
  };

  return (
    <div>
      <PageTitle pageTitle="계약상세조회" mode="xl" fontWeight="bold" />

      <PageTitle
        pageTitle="계약사항"
        mode="md"
        fontWeight="bold"
        customStyle={{ padding: "0", marginLeft: "20px" }}
      />
      <VerticalTable
        data={vertical}
        onChipClick={handleChipClick}
        checkedItems={checkedItems}
      />
      <div className="py-20">
        <div className="flex justify-between mr-6">
          <div>
            <PageTitle
              pageTitle="계약내역"
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
          columns={contractListColumns}
          onRowSelect={handleRowSelect}
          showCheckbox
        />
      </div>
    </div>
  );
};

export default TenderDetail;
