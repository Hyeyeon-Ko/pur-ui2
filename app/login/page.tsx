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

  const formattedData = data.map((item) => ({
    ...item,
    센터: formatCenterData(item.센터) || "-",
    공고일: formatDate(item.공고일),
    마감일: formatDate(item.마감일),
    응찰일: formatDate(item.응찰일),
    낙찰기준가: formatCurrency(item.낙찰기준가),
    낙찰금액: formatCurrency(item.낙찰금액),
    열람: `<button>${item.열람}</button>`,
    누리장터: item.누리장터 || "-",
  }));

  const handleConfirm = () => {
    // 확인 버튼 클릭 시 실행할 로직
    console.log("확인 버튼 클릭됨");
    closeModal(); // 모달 닫기
  };
  const { handleFileUpload, handleFileDownload } = useExcelFileHandler(
    data,
    selectedRows
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleRowSelect = (selectedRowIds: string[]) => {
    setSelectedRows(selectedRowIds);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDownloadSelected = () => {
    if (selectedRows.length > 0) {
      const selectedData = selectedRows
        .map((rowId) => {
          const rowData = data.find((row) => row.id === rowId);
          if (rowData) {
            return Object.values(rowData).map((value) => {
              return Array.isArray(value) ? value.join(", ") : value;
            });
          }
          return null;
        })
        .filter((row) => row !== null);

      if (selectedData.length > 0) {
        handleFileDownload(selectedData as string[][]);
      } else {
        alert("선택된 데이터가 없습니다.");
      }
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
        onRowSelect={handleRowSelect}
        showCheckbox={true}
        pagination={true}
      />
    </>
  );
};

export default LoginPage;
