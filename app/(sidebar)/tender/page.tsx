"use client";

import Button from "@/components/ui/atoms/button/Button";
import Table from "@/components/ui/molecules/table/Table";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import React, { useState, useCallback } from "react";
import {
  data,
  columns,
  centerOptions,
  bidOptions,
  accountOptions,
  bidResultOptions,
} from "@/lib/data";
import useFormatHandler from "@/hooks/useFormatHandler";
import SearchFilter, {
  FieldConfig,
} from "@/components/ui/organism/filter/SearchFilter";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import Input from "@/components/ui/atoms/input/Input";
import LabelSelect from "@/components/ui/molecules/selects/LabelSelect";
import colors from "@/styles/colors";
import useModal from "@/hooks/useModal";

const fieldsConfig: FieldConfig[] = [
  { name: "center", type: "select", options: centerOptions },
  { name: "bidType", type: "select", options: bidOptions },
  { name: "accountName", type: "select", options: accountOptions },
  { name: "bidResult", type: "select", options: bidResultOptions },
  { name: "winner", type: "input", label: "낙찰자" },
  { name: "bidName", type: "input", label: "입찰명" },
  { name: "announcementDate", type: "date", label: "공고일" },
  { name: "dueDate", type: "date", label: "마감일" },
];

const MenuPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sorter, setSorter] = useState<{
    field: string;
    order: "ascend" | "descend" | undefined;
  } | null>(null);

  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();

  const { selectedValue, setSelectedValue, otherReason, setOtherReason } =
    useModal();

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

  const { downloadCsv } = useExcelFileHandler();

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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    if (e.target.value !== "etc") {
      setOtherReason("");
    }
  };

  const modalContent = (
    <div className="flex flex-col px-8">
      <LabelSelect
        selectMode="sm"
        label="다운로드 파일"
        placeholder="파일다운로드"
        value={selectedValue}
        onChange={handleSelectChange}
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ]}
        customStyle={{ width: "220px", borderColor: colors.Button_Default }}
      />
      <LabelSelect
        selectMode="sm"
        label="다운로드 사유"
        value={selectedValue}
        onChange={handleSelectChange}
        options={[
          { value: "mine", label: "개인보관" },
          { value: "what", label: "궁금해서" },
          { value: "boring", label: "심심해서" },
          { value: "etc", label: "기타" },
        ]}
        placeholder="다운로드 사유"
        customStyle={{ width: "220px", borderColor: colors.Button_Default }}
      />
      {selectedValue === "etc" && (
        <div>
          <Input
            mode="sm"
            color="Button_Default"
            type="text"
            placeholder="사유를 입력하세요"
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            customStyle={{ width: "330px" }}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col mb-4">
      <PageTitle pageTitle="입찰조회" mode="xl" fontWeight="bold" />

      <div>
        <SearchFilter fieldsConfig={fieldsConfig} />
      </div>
      <div className="flex justify-end mr-6">
        <Button
          mode="xs"
          content="추가"
          color="signature"
          onClick={handleOpenAddPage}
        />
        <Button
          mode="xs"
          content="삭제"
          color="Button_Default"
          onClick={handleDeleteSelected}
        />

        <Button
          mode="xs"
          content="엑셀다운로드"
          variant="outline"
          color="Button_Default"
          onClick={handleDownloadAll}
        />
      </div>
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
        showCheckbox={true}
        pagination={true}
        sorter={sorter}
        setSorter={setSorter}
        modalContent={modalContent}
      />
    </div>
  );
};

export default MenuPage;
