import React, { useState } from "react";
import Button from "../../atoms/button/Button";
import useModal from "@/hooks/useModal";
import colors from "@/styles/colors";
import LabelSelect from "../selects/LabelSelect";
import Input from "../../atoms/input/Input";
import Modal from "../../organism/modal/Modal";

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
            closeModal();
            resetForm();
            // 다운로드 실행 로직 추가
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
