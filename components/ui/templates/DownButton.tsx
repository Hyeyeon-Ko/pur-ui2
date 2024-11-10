import React, { useReducer } from "react";
import Button from "../atoms/button/Button";
import useModal from "@/hooks/useModal";
import Modal from "../molecules/modal/Modal";
import Toast from "@/components/commons/Toast";
import { DownProps, initialState, reducer } from "@/types/downModalTypes";
import DownModalContent from "../organism/modal/DownModalContent";

const DownButton: React.FC<DownProps> = ({
  fileOptions = [],
  reasonOptions = [],
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [state, dispatch] = useReducer(reducer, initialState);

  const isDownloadDisabled =
    !state.selectedFile ||
    !state.selectedReason ||
    (state.selectedReason === "etc" && !state.otherReason);

  const handleCloseModal = () => {
    closeModal();
    dispatch({ type: "RESET" });
  };

  const handleDownload = async () => {
    const endpoint = `/api/download-file`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        throw new Error("파일 다운로드에 실패했습니다.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", state.selectedFile);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      Toast.successDownNotify();
    } catch (error) {
      console.error("다운로드 중 오류 발생:", error);
      Toast.errorDownNotify();
    }
  };

  const handleConfirm = () => {
    if (!isDownloadDisabled) {
      handleDownload();
      handleCloseModal();
    }
  };

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
        closeModal={handleCloseModal}
        title="파일 다운로드"
        onCancelClick={handleCloseModal}
        onConfirmClick={handleConfirm}
        mode="sm"
        confirmText="다운로드"
        showConfirmButton={true}
        confirmButtonDisabled={isDownloadDisabled}
      >
        <DownModalContent
          state={state}
          dispatch={dispatch}
          fileOptions={fileOptions}
          reasonOptions={reasonOptions}
        />
      </Modal>
    </div>
  );
};

export default DownButton;
