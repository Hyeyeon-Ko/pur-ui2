"use client";

import Table from "@/components/ui/organism/table/Table";
import React, { useState, useCallback } from "react";
import useFormatHandler from "@/hooks/useFormatHandler";
import SearchFilter from "@/components/ui/organism/filter/SearchFilter";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import useFileDownload from "@/hooks/useFileDownload";
import { contractData, fieldLabels } from "@/lib/contractDatas";
import { contractDataType } from "@/types/contractTypes";
import { contractSearchFields } from "@/lib/searchDatas";

const ContractPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { downloadFile } = useFileDownload();

  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();

  const [formattedData, setFormattedData] = useState<contractDataType[]>(() =>
    contractData.map((item) => ({
      센터: formatCenterData(item.centerName) || "-",
      계약일자: formatDate(item.contractDate) || "-",
      계약시작일: formatDate(item.contractStartDate) || "-",
      계약완료일: formatDate(item.contractEndDate) || "-",
      낙찰기준가: formatCurrency(item.baseBidPrice) || "-",
      계약금액: formatCurrency(item.contractAmount) || "-",
      입찰번호: item.bidNumber || "-",
      계약번호: item.contractNumber || "-",
      계약종류: item.contractType || "-",
      계정명: item.accountName || "-",
      계약명: item.contractName || "-",
      공급사: item.supplier || "-",
      계약방법: item.contractNumber || "-",
      SN: item.sn || "-",
      계약증권: item.contractBond || "-",
      하자증권: item.defectBond || "-",
      계약품의번호: item.contractProposalNumber || "-",
      계약구분: item.contractCategory || "-",
      담당자: item.manager || "-",
      기타: item.etc || "-",
      열람: item.viewStatus || "-",
    }))
  );

  const contractColumns = Object.keys(fieldLabels)
    .filter((field) => field !== "id") // "id"를 제외
    .map((field) => ({
      title: fieldLabels[field as keyof typeof fieldLabels],
      dataIndex: field,
      key: field,
    }));

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
        data={formattedData as { [key: string]: string }[]}
        columns={contractColumns}
        onRowSelect={handleRowSelect}
        onRowDoubleClick={() => {}}
        showCheckbox={false}
        pagination={true}
        sorter={null}
        setSorter={undefined}
      />
    </div>
  );
};

export default ContractPage;
