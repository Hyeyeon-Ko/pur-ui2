"use client";

import TableButton from "@/components/ui/molecules/buttons/TableButton";
import ThemeToggle from "@/components/ui/molecules/buttons/ThemeToggle";
import Table from "@/components/ui/molecules/table/Table";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import VerticalTable from "@/components/ui/molecules/verticalTable/VerticalTable";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import useFormatHandler from "@/hooks/useFormatHandler";
import {
  contractListColumns,
  contractListData,
  contractVertical,
} from "@/lib/data";
import React, { useCallback, useState } from "react";

interface TenderDetailProps {
  params: {
    id: string; // 동적 파라미터 ID의 타입 정의
  };
}

const TenderDetail: React.FC<TenderDetailProps> = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

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

  const { downloadCsv } = useExcelFileHandler();
  const { formatCenterData, formatCurrency } = useFormatHandler();

  const [formattedData, setFormattedData] = useState(
    contractListData.map((item) => ({
      ...item,
      센터: formatCenterData(item.센터) || "-",
      낙찰기준가: formatCurrency(item.낙찰기준가),
      계약단가: formatCurrency(item.계약단가),
      계약금액: formatCurrency(item.계약금액),
    }))
  );

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
      <ThemeToggle/>
      <PageTitle pageTitle="계약상세조회" mode="xl" fontWeight="bold" />
      <PageTitle
        pageTitle="계약사항"
        mode="md"
        fontWeight="bold"
        customStyle={{ padding: "0", marginLeft: "20px" }}
      />
      <VerticalTable
        data={contractVertical}
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
          <TableButton
            onDeleteSelected={handleDeleteSelected}
            onDownloadAll={handleDownloadAll}
          />
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
