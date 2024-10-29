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

  const [selectedFile, setSelectedFile] = useState<string>(""); // 첫 번째 셀렉트 상태
  const [selectedReason, setSelectedReason] = useState<string>(""); // 두 번째 셀렉트 상태
  const [otherReason, setOtherReason] = useState<string>(""); // 기타 사유 상태

  const handleFileSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFile(e.target.value);
  };

  const handleReasonSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedReason(e.target.value);
  };

  const modalContent = (
    <div className="flex flex-col px-8">
      <LabelSelect
        selectMode="sm"
        label="다운로드 파일"
        placeholder="파일다운로드"
        value={selectedFile}
        onChange={handleFileSelectChange} // 파일 선택 핸들러
        options={fileOptions}
        customStyle={{ width: "220px", borderColor: colors.Button_Default }}
      />
      <LabelSelect
        selectMode="sm"
        label="다운로드 사유"
        value={selectedReason} // 이유 선택 상태
        onChange={handleReasonSelectChange} // 이유 선택 핸들러
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
        closeModal={closeModal}
        title="파일 다운로드"
        onCancelClick={closeModal}
        onConfirmClick={closeModal}
        mode="sm"
        confirmText="다운로드"
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default DownButton;
