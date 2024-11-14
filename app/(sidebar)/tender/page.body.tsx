"use client";

import Table from "@/components/ui/organism/table/Table";
import React, { useState, useCallback } from "react";
import useFormatHandler from "@/hooks/useFormatHandler";
import SearchFilter from "@/components/ui/organism/filter/SearchFilter";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import useFileDownload from "@/hooks/useFileDownload";
import { bidData, fieldLabels } from "@/lib/bidDatas";
import { tenderSearchFields } from "@/lib/searchDatas";

const TenderBody = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sorter, setSorter] = useState<{
    field: string;
    order: "ascend" | "descend" | undefined;
  } | null>(null);

  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();
  const { downloadFile } = useFileDownload();

  const formattedData: { [key: string]: string }[] = bidData.map((item) => ({
    센터: formatCenterData(item.centerName) || "-",
    공고일: formatDate(item.announcementDate),
    마감일: formatDate(item.closingDate),
    응찰일: formatDate(item.bidDate),
    낙찰기준가: formatCurrency(item.baseBidPrice),
    낙찰금액: formatCurrency(item.winningBidPrice),
    누리장터: item.nuriMarket || "-",
    계약구분: item.contractCategory || "-",
    입찰번호: item.bidNumber,
    계약종류: item.contractType,
    낙찰방법: item.bidMethod,
    계정명: item.accountName,
    공고구분: item.announcementType,
    입찰명: item.bidName,
    낙찰자: item.winner,
    입찰결과: item.bidResult,
    입찰증권: item.bidBond,
    입찰품의번호: item.bidProposalNumber,
    담당자: item.manager,
    기타: item.etc || "-",
    열람: item.viewStatus,
  }));

  const bidColumns = Object.keys(fieldLabels)
    .filter((field) => field !== "id") // "id"를 제외
    .map((field) => ({
      title: fieldLabels[field as keyof typeof fieldLabels],
      dataIndex: field,
      key: field,
    }));

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));
    setSelectedRows(uniqueSelectedRows);
  }, []);

  /** 전체내역 다운로드
   * TODO: endpoint
   */
  const handleDownloadAll = () => {
    downloadFile("/api/endpoint", "입찰내역(전체).csv");
  };

  /** 추가 버튼 로직(새창열기) */
  const handleOpenAddPage = () => {
    window.open("/tender/add", "_blank", "noopener,noreferrer,fullscreen");
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
        onDownloadAll={handleDownloadAll}
      />
      <Table
        data={formattedData as { [key: string]: string }[]}
        columns={bidColumns}
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

export default TenderBody;
