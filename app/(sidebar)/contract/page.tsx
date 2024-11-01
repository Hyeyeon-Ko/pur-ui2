"use client";

import Table from "@/components/ui/molecules/table/Table";
import React, { useState, useCallback } from "react";
import {
  contractData,
  contractColumns,
  contractSearchFields,
} from "@/lib/data";
import useFormatHandler from "@/hooks/useFormatHandler";
import SearchFilter from "@/components/ui/organism/filter/SearchFilter";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import useFileDownload from "@/hooks/useFileDownload";

const MenuPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { downloadFile } = useFileDownload();

  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();

  const [formattedData, setFormattedData] = useState(
    contractData.map((item) => ({
      ...item,
      센터: formatCenterData(item.센터) || "-",
      계약일자: formatDate(item.계약일자),
      계약시작일: formatDate(item.계약시작일),
      계약완료일: formatDate(item.계약완료일),
      낙찰기준가: formatCurrency(item.낙찰기준가),
      계약금액: formatCurrency(item.계약금액),
      입찰번호: item.입찰번호,
      계약번호: item.계약번호,
      열람: item.열람,
    }))
  );

  /** 전체내역 다운로드
   * TODO: endpoint
   */
  const handleDownloadAll = () => {
    downloadFile("/api/endpoint", "입찰내역(전체).csv");
  };

  const handleOpenAddPage = () => {
    window.open("/contract/add", "_blank", "noopener,noreferrer,fullscreen");
  };

  const handleDeleteSelected = () => {
    const newFormattedData = formattedData.filter(
      (item) => !selectedRows.includes(item.id)
    );
    confirm("선택한 항목을 정말 삭제하시겠습니까?");
    setFormattedData(newFormattedData);
    setSelectedRows([]);
  };

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));

    setSelectedRows(uniqueSelectedRows);
  }, []);

  return (
    <div className="prose flex flex-col mb-4">
      <PageTitle pageTitle="계약조회" mode="xl" fontWeight="bold" />

      <div>
        <SearchFilter fieldsConfig={contractSearchFields} />
      </div>
      <div className="flex justify-end mr-6">
        <TableButton
          showDelButton={false}
          onOpenAddPage={handleOpenAddPage}
          onDeleteSelected={handleDeleteSelected}
          onDownloadAll={handleDownloadAll}
        />
      </div>
      <Table
        data={formattedData}
        columns={contractColumns}
        onRowSelect={handleRowSelect}
        onRowDoubleClick={() => {}}
        showCheckbox={false}
        pagination={true}
      />
    </div>
  );
};

export default MenuPage;
