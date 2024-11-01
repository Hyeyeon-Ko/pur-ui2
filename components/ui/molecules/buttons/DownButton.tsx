import React, { useState } from "react";
import Button from "../../atoms/button/Button";
import useModal from "@/hooks/useModal";
import colors from "@/styles/colors";
import LabelSelect from "../selects/LabelSelect";
import Input from "../../atoms/input/Input";
import Modal from "../../organism/modal/Modal";
import Toast from "@/components/commons/Toast";

interface Option {
  value: string;
  label: string;
}

interface DownProps {
  fileOptions?: Option[];
  reasonOptions?: Option[];
}

const DownButton: React.FC<DownProps> = ({
  fileOptions = [],
  reasonOptions = [],
}) => {
  const { isOpen, openModal, closeModal } = useModal();

  const [selectedFile, setSelectedFile] = useState<string>("");
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");

  const handleFileSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFile(e.target.value);
  };

  const handleReasonSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedReason(e.target.value);
  };

  const resetForm = () => {
    setSelectedFile("");
    setSelectedReason("");
    setOtherReason("");
  };

  const isDownloadDisabled =
    !selectedFile ||
    !selectedReason ||
    (selectedReason === "etc" && !otherReason);

  /** 모달 파일 다운로드 버튼 로직
   * TODO: 엔드포인트 - 만약에 엔드포인트가 다른 여러경로가 있다면 훅으로 빼자
   */
  const handleDownload = async () => {
    const endpoint = `/api/download-file`; // API 엔드포인트

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: selectedFile,
          reason: selectedReason,
          otherReason: otherReason,
        }),
      });

      if (!response.ok) {
        throw new Error("파일 다운로드에 실패했습니다.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", selectedFile);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      Toast.successDownNotify();
    } catch (error) {
      console.error("다운로드 중 오류 발생:", error);
      Toast.errorDownNotify();
    }
  };
  const modalContent = (
    <div className="flex flex-col px-8">
      <LabelSelect
        selectMode="sm"
        label="다운로드 파일"
        placeholder="파일다운로드"
        value={selectedFile}
        onChange={handleFileSelectChange}
        options={fileOptions}
        customStyle={{ width: "220px", borderColor: colors.Button_Default }}
      />
      <LabelSelect
        selectMode="sm"
        label="다운로드 사유"
        value={selectedReason}
        onChange={handleReasonSelectChange}
        options={reasonOptions}
        placeholder="다운로드 사유"
        customStyle={{ width: "220px", borderColor: colors.Button_Default }}
      />
      {selectedReason === "etc" && (
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
    <div>
      <Button
        mode="xs"
        color="signature"
        content="다운로드"
        onClick={openModal}
      />
      <Modal
        isOpen={isOpen}
        closeModal={() => {
          closeModal();
          resetForm();
        }}
        title="파일 다운로드"
        onCancelClick={() => {
          closeModal();
          resetForm();
        }}
        onConfirmClick={() => {
          if (!isDownloadDisabled) {
            handleDownload(); // 다운로드 처리 함수 호출
            closeModal();
            resetForm();
          }
        }}
        mode="sm"
        confirmText="다운로드"
        showConfirmButton={true}
        confirmButtonDisabled={isDownloadDisabled}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default DownButton;
