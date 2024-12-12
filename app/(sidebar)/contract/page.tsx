"use client";

import Table from "@/components/ui/organism/table/Table";
import React, { useState, useCallback, useEffect } from "react";
import useFormatHandler from "@/hooks/useFormatHandler";
import SearchFilter from "@/components/ui/organism/filter/SearchFilter";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import TableButton from "@/components/ui/molecules/buttons/TableButton";
import { fieldLabels } from "@/lib/contractDatas";
import { ContractMasterWithDetailsType } from "@/types/contractTypes";
import { contractSearchFields } from "@/lib/searchDatas";
import { mappings } from "@/lib/mappings";
import useDownloadAll from "@/hooks/useDownloadAll";
import { contractMapping } from "@/lib/keyMapping";

const ContractPage: React.FC = () => {
  const [data, setData] = useState<ContractMasterWithDetailsType[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const { formatDate, formatCurrency } = useFormatHandler();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch("/api/contract");
        if (!response.ok) {
          throw new Error("계약조회 데이터를 불러오는데 실패했습니다.");
        }

        const result = await response.json();

        if (Array.isArray(result.data)) {
          setData(result.data);
        } else {
          console.error("데이터 존재하지 않음:", result);
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };

    fetchContracts();
  }, []);

  const formattedData =
    data.length > 0
      ? data.flatMap(contractItem => {
          const contract = contractItem.contract || {};
          const details = contractItem.details || [];

          return details.map(detail => ({
            bid_id: contract.bid_id || "-",
            cont_id: contract.cont_id || "-",
            센터: mappings.CMM001[detail.inst_cd || "-"] || "-",
            입찰번호: contract.bid_id || "-",
            계약번호: contract.cont_no || "-",
            계약종류: mappings.PUR003[detail.cont_type || ""] || "-",
            계약명: contract.cont_nm || "-",
            계약일자: contract.cont_dt ? formatDate(contract.cont_dt) : "-",
            계약시작일: contract.start_dt ? formatDate(contract.start_dt) : "-",
            계약완료일: contract.end_dt ? formatDate(contract.end_dt) : "-",
            공급사: detail.supplier || "-",
            계약금액: detail.cont_price
              ? formatCurrency(parseFloat(detail.cont_price))
              : "-",
            계약방법: mappings.PUR007[detail.cont_method || ""] || "-",
            SN: detail.cont_sn || "-",
            계약증권: detail.cont_deposit
              ? formatCurrency(parseFloat(detail.cont_deposit))
              : "-",
            하자증권: detail.war_bond
              ? formatCurrency(parseFloat(detail.war_bond))
              : "-",
            계약품의번호: contract.cont_app_no || "-",
            계약구분: mappings.PUR008[detail.cont_div || ""] || "-",
            담당자: contract.resp_id || "-",
            기타: detail.notes ? "Y" : "N",
            열람: detail.attach_id || "-",
          }));
        })
      : [];

  const contractColumns = Object.keys(fieldLabels)
    .filter(field => field !== "id")
    .map(field => ({
      title: fieldLabels[field as keyof typeof fieldLabels],
      dataIndex: field,
      key: field,
    }));

  const handleDownloadAll = useDownloadAll(
    formattedData,
    contractMapping,
    contractColumns,
  );

  const handleOpenAddPage = () => {
    window.open("/contract/add", "_blank", "noopener,noreferrer,fullscreen");
  };

  const handleDeleteSelected = () => {
    if (confirm("선택한 항목을 삭제하시겠습니까?")) {
      const updatedData = data.filter(
        item =>
          item.contract?.cont_id &&
          !selectedRows.includes(item.contract.cont_id),
      );
      setData(updatedData);
      setSelectedRows([]);
    }
  };

  const handleRowSelect = useCallback((selectedRowIds: string[]) => {
    setSelectedRows(Array.from(new Set(selectedRowIds)));
  }, []);

  return (
    <div className="mb-4 flex flex-col">
      {/* 페이지 타이틀 */}
      <PageTitle pageTitle="계약조회" mode="xl" fontWeight="bold" />

      {/* 검색 필터 */}
      <div>
        <SearchFilter fieldsConfig={contractSearchFields} />
      </div>

      {/* 버튼 그룹 */}
      <div className="mr-6 flex justify-end">
        <TableButton
          showDelButton={false}
          onOpenAddPage={handleOpenAddPage}
          onDeleteSelected={handleDeleteSelected}
          onDownloadAll={() => handleDownloadAll("계약조회(전체).csv")}
          // onDownloadAll={handleDownloadAll}
        />
      </div>

      {/* 데이터 테이블 */}
      <Table
        data={formattedData}
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
