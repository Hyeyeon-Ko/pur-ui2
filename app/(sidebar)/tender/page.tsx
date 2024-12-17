"use client";

import Table from "@/components/ui/organism/table/Table";
import React, { useState, useCallback, useEffect } from "react";
import useFormatHandler from "@/hooks/useFormatHandler";
import SearchFilter from "@/components/ui/organism/filter/SearchFilter";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import { fieldLabels } from "@/lib/bidDatas";
import { tenderSearchFields } from "@/lib/searchDatas";
import { BidMasterWithDetailsType } from "@/types/contractTypes";
import { mappings } from "@/lib/mappings";
import useDownloadAll from "@/hooks/useDownloadAll";
import { tenderMapping } from "@/lib/keyMapping";

const TenderPage = () => {
  const [data, setData] = useState<BidMasterWithDetailsType[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sorter, setSorter] = useState<{
    field: string;
    order: "ascend" | "descend" | undefined;
  } | null>(null);

  const { formatDate, formatCurrency } = useFormatHandler();

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
      ? data.map(bidItem => ({
          bid_id: bidItem.bid_id || "-",
          센터: bidItem.centerName || "-",
          입찰번호: bidItem.bid_no || "-",
          누리장터: bidItem.nuri_no || "-",
          계약종류: bidItem.contType || "",
          낙찰방법: bidItem.bidMethod || "",
          계정명: bidItem.accCd || "-",
          공고구분: bidItem.annCat || "",
          입찰명: bidItem.bid_nm || "-",
          공고일: bidItem.announce_dt ? formatDate(bidItem.announce_dt) : "-",
          마감일: bidItem.close_dt ? formatDate(bidItem.close_dt) : "-",
          낙찰기준가: bidItem.win_price
            ? formatCurrency(parseFloat(bidItem.win_price))
            : "-",
          낙찰금액: bidItem.win_price
            ? formatCurrency(parseFloat(bidItem.win_price))
            : "-",
          낙찰자: bidItem.win_bid || "-",
          입찰결과: bidItem.bid_res || "",
          입찰증권: bidItem.deposit_at || "-",
          입찰품의번호: bidItem.app_no || "-",
          담당자: bidItem.resp_id || "-",
          계약구분: bidItem.contDiv || "-",
          기타: bidItem.notes ? "Y" : "N",
          열람: bidItem.attach_id || "-",
        }))
      : [];

  const bidColumns = Object.keys(fieldLabels)
    .filter(field => field !== "id")
    .map(field => ({
      title: fieldLabels[field as keyof typeof fieldLabels] || "기본 제목",
      dataIndex: field,
      key: field,
    }));

  const handleDownloadAll = useDownloadAll(
    formattedData,
    tenderMapping,
    bidColumns,
  );

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    const uniqueSelectedRows = Array.from(new Set(selectedRowIds));
    setSelectedRows(uniqueSelectedRows);
  }, []);

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
        onDownloadAll={() => handleDownloadAll("입찰조회(전체).csv")}
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
