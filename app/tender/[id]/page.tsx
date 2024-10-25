"use client";

import Table from "@/components/ui/molecules/table/Table";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/molecules/verticalTable/VerticalTable";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import useFormatHandler from "@/hooks/useFormatHandler";
import {
  columns,
  tenderVertical,
  tenderVerticalResult,
  data,
} from "@/lib/data";
import React, { useCallback, useState } from "react";
import ThemeToggle from "@/components/ui/molecules/buttons/ThemeToggle";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
interface TenderDetailProps {
  params: {
    id: string; // 동적 파라미터 ID의 타입 정의
  };
}

// TODO: 매개변수로 params 추가할 것
const TenderDetail: React.FC<TenderDetailProps> = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();
  const [formattedData, setFormattedData] = useState(
    data.map((item) => ({
      ...item,
      센터: formatCenterData(item.센터) || "-",
      공고일: formatDate(item.공고일),
      마감일: formatDate(item.마감일),
      응찰일: formatDate(item.응찰일),
      낙찰기준가: formatCurrency(item.낙찰기준가),
      낙찰금액: formatCurrency(item.낙찰금액),
      누리장터: item.누리장터 || "-",
    }))
  );

  // 체크박스 버튼
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const { downloadCsv } = useExcelFileHandler();

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

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));

    setSelectedRows(uniqueSelectedRows);
  }, []);

  const handleDownloadAll = () => {
    const allData = formattedData;
    downloadCsv(allData, "all_download.csv");
  };

  const handleDeleteSelected = () => {
    const newFormattedData = formattedData.filter(
      (item) => !selectedRows.includes(item.id)
    );
    confirm("선택한 항목을 정말 삭제하시겠습니까?");
    setFormattedData(newFormattedData);
    setSelectedRows([]);
  };

  return (
    <div>
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
        data={tenderVertical}
        onChipClick={handleChipClick}
        checkedItems={checkedItems}
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

          <TableButton
            onDeleteSelected={handleDeleteSelected}
            onDownloadAll={handleDownloadAll}
          />
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
        <VerticalTable data={tenderVerticalResult} />
      </div>
    </div>
  );
};

export default TenderDetail;
