"use client";

import Button from "@/components/ui/atoms/button/Button";
import Table from "@/components/ui/molecules/table/Table";
import Modal from "@/components/ui/organism/modal/Modal";
import useExcelFileHandler from "@/hooks/useExcelFileHandler";
import useFormatHandler from "@/hooks/useFormatHandler";
import useModal from "@/hooks/useModal";
import { columns, data } from "@/lib/data";
import React, { useRef, useState } from "react";

const LoginPage = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { isOpen, openModal, closeModal } = useModal();
  const { formatCenterData, formatDate, formatCurrency } = useFormatHandler();
  const { handleFileUpload, downloadCsv } = useExcelFileHandler();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formattedData = data.map((item) => ({
    ...item,
    센터: formatCenterData(item.센터) || "-",
    공고일: formatDate(item.공고일),
    마감일: formatDate(item.마감일),
    응찰일: formatDate(item.응찰일),
    낙찰기준가: formatCurrency(item.낙찰기준가),
    낙찰금액: formatCurrency(item.낙찰금액),
    열람: item.열람 || "-",
    누리장터: item.누리장터 || "-",
  }));

  const handleConfirm = () => {
    console.log("확인 버튼 클릭됨");
    closeModal();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownloadSelected = () => {
    if (selectedRows.length > 0) {
      const selectedData = selectedRows
        .map((rowId) => {
          const row = data.find((item) => item.id === rowId);
          return row
            ? {
                ...row,
                센터: formatCenterData(row.센터) || "-",
                공고일: formatDate(row.공고일) || "-",
                마감일: formatDate(row.마감일) || "-",
                응찰일: formatDate(row.응찰일) || "-",
                낙찰기준가: formatCurrency(row.낙찰기준가) || "-",
                낙찰금액: formatCurrency(row.낙찰금액) || "-",
                열람: row.열람 || "-",
                누리장터: row.누리장터 || "-",
              }
            : null;
        })
        .filter(Boolean);

      downloadCsv(selectedData, "download.csv");
    } else {
      alert("선택된 데이터가 없습니다.");
    }
  };

  return (
    <>
      <div>
        <Button mode="lg" content="modal" onClick={openModal} />
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title="진짜제목"
          onCancelClick={handleConfirm}
          onConfirmClick={handleConfirm}
        >
          <p>모달 내부에 추가적인 내용</p>
        </Modal>
      </div>
      <div className="flex justify-end mr-6 mt-10">
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <Button
          mode="xs"
          content="엑셀업로드"
          color="Button_Default"
          onClick={handleUploadClick}
        />
        <Button
          mode="xs"
          content="엑셀다운로드"
          variant="outline"
          color="Button_Default"
          onClick={handleDownloadSelected}
        />
      </div>
      <Table
        data={formattedData}
        columns={columns}
        onRowSelect={setSelectedRows}
        showCheckbox={true}
        pagination={true}
      />
    </>
  );
};

export default LoginPage;
