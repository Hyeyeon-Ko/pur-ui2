"use client";

import Table from "@/components/ui/organism/table/Table";
import React, { useState, useCallback, useEffect } from "react";
import useFormatHandler from "@/hooks/useFormatHandler";
import SearchFilter from "@/components/ui/organism/filter/SearchFilter";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import useFileDownload from "@/hooks/useFileDownload";
import { fieldLabels } from "@/lib/bidDatas";
import { tenderSearchFields } from "@/lib/searchDatas";
import { BidMasterWithDetailsType } from "@/types/contractTypes";
import { mappings } from "@/lib/mappings";

const TenderPage = () => {
  const [data, setData] = useState<BidMasterWithDetailsType[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sorter, setSorter] = useState<{
    field: string;
    order: "ascend" | "descend" | undefined;
  } | null>(null);

  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();
  const { downloadFile } = useFileDownload();

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await fetch("/api/bid");
        if (!response.ok) {
          throw new Error("입찰 데이터를 불러오는데 실패했습니다.");
        }
        const result = await response.json();

        if (Array.isArray(result.data)) {
          setData(result.data);
        } else {
          console.error("데이터 형식이 잘못되었습니다:", result);
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };

    fetchBids();
  }, []);

  const formattedData =
    data.length > 0
      ? data.flatMap(bidItem => {
          const bid = bidItem.bid || {};
          const details = bidItem.details || [];

          return details.map(detail => ({
            bid_id: bid.bid_id || "-",
            센터: detail.inst_cd || "-",
            입찰번호: bid.bid_no || "-",
            누리장터: bid.nuri_no || "-",
            계약종류: mappings.PUR003[detail.cont_type || ""] || "-",
            낙찰방법: mappings.PUR005[detail.bid_method || ""] || "-",
            계정명: mappings.PUR006[detail.acc_cd || "-"] || "-",
            공고구분: mappings.PUR002[detail.ann_cat || ""] || "-",
            입찰명: bid.bid_nm || "-",
            공고일: bid.announce_dt ? formatDate(bid.announce_dt) : "-",
            마감일: bid.close_dt ? formatDate(bid.close_dt) : "-",
            낙찰기준가: detail.win_price
              ? formatCurrency(parseFloat(detail.win_price))
              : "-",
            낙찰금액: detail.win_price
              ? formatCurrency(parseFloat(detail.win_price))
              : "-",
            낙찰자: detail.win_bid || "-",
            입찰결과: mappings.PUR001[bid.bid_res || ""] || "-",
            입찰증권: detail.deposit_at || "-",
            입찰품의번호: detail.app_no || "-",
            담당자: bid.resp_id || "-",
            계약구분: mappings.PUR003[detail.cont_type || "-"] || "-",
            기타: detail.notes ? "Y" : "N",
            열람: detail.attach_id || "-",
          }));
        })
      : [{ 센터: "-", 입찰번호: "-", ...fieldLabels }];

  const bidColumns = Object.keys(fieldLabels)
    .filter(field => field !== "id")
    .map(field => ({
      title: fieldLabels[field as keyof typeof fieldLabels] || "기본 제목",
      dataIndex: field,
      key: field,
    }));

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));
    setSelectedRows(uniqueSelectedRows);
  }, []);

  const handleDownloadAll = () => {
    downloadFile("/api/bid/export", "입찰내역(전체).csv");
  };

  const handleOpenAddPage = () => {
    window.open("/tender/add", "_blank", "noopener,noreferrer,fullscreen");
  };

  const handleRowDoubleClick = (row: { bid_id?: string }) => {
    const id = row.bid_id;
    if (!id || id === "-") {
      console.error("Bid ID가 없습니다.");
      alert("유효한 입찰 번호가 없습니다.");
      return;
    }
    const url = `/tender/${id}`;
    window.open(url, "_blank", "noopener,noreferrer,width=1920,height=1080");
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
        data={formattedData}
        columns={bidColumns}
        onRowSelect={handleRowSelect}
        onRowDoubleClick={handleRowDoubleClick}
        showCheckbox={false}
        pagination={true}
        sorter={sorter}
        setSorter={setSorter}
      />
    </div>
  );
};

export default TenderPage;
