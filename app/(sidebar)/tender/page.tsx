"use client";

import Table from "@/components/ui/molecules/table/Table";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import React, { useState, useCallback } from "react";
import { data, columns, tenderSearchFields } from "@/lib/data";
import useFormatHandler from "@/hooks/useFormatHandler";
import SearchFilter from "@/components/ui/organism/filter/SearchFilter";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import TableButton from "@/components/ui/molecules/buttons/TableButton";

const MenuPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sorter, setSorter] = useState<{
    field: string;
    order: "ascend" | "descend" | undefined;
  } | null>(null);

  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();
  const { downloadCsv } = useExcelFileHandler();

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

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));
    setSelectedRows(uniqueSelectedRows);
  }, []);

  const handleDownloadAll = () => {
    const allData = formattedData;
    downloadCsv(allData, "all_download.csv");
  };

  const handleOpenAddPage = () => {
    window.open("/tender/add", "_blank", "noopener,noreferrer,fullscreen");
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
      <PageTitle pageTitle="입찰조회" mode="xl" fontWeight="bold" />

      <div>
        <SearchFilter fieldsConfig={tenderSearchFields} />
      </div>
      <TableButton
        showDelButton={false}
        onOpenAddPage={handleOpenAddPage}
        onDeleteSelected={handleDeleteSelected}
        onDownloadAll={handleDownloadAll}
      />
      <Table
        data={formattedData}
        columns={columns}
        onRowSelect={handleRowSelect}
        onRowDoubleClick={(row) => {
          const id = row.id;
          const url = `/tender/${id}`;
          window.open(
            url,
            "_blank",
            "noopener,noreferrer,width=1920,height=1080"
          );
        }}
        showCheckbox={false}
        pagination={true}
        sorter={sorter}
        setSorter={setSorter}
      />
    </div>
  );
};

export default MenuPage;
