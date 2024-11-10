import React, { CSSProperties, useRef } from "react";
import colors from "@/styles/colors";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";
import { useDarkMode } from "@/context/DarkModeContext";

export type ModalMode = "sm" | "xs" | "lg" | "md" | undefined;

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  mode?: ModalMode;
  color?: keyof typeof colors;
  customStyle?: CSSProperties;
  title?: string;
  titleFontSize?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelText?: string;
  confirmText?: string;
  confirmButtonDisabled?: boolean;
  onCancelClick?: () => void;
  onConfirmClick?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  mode = "md",
  color,
  customStyle,
  title,
  titleFontSize = "1.25rem",
  showCancelButton = true,
  showConfirmButton = true,
  cancelText = "취소",
  confirmText = "확인",
  confirmButtonDisabled = false,
  onCancelClick,
  onConfirmClick,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isDarkMode } = useDarkMode();

  if (!isOpen) return null;

  const modeClasses = {
    sm: "text-sm px-4 py-2",
    xs: "text-xs px-2 py-1",
    md: "text-base px-5 py-2.5",
    lg: "text-lg px-6 py-3",
  };

  const colorClass = color ? colors[color] : "";

  return (
    <div
      style={{ ...customStyle }}
      className="fixed inset-0 flex items-center justify-center p-20"
    >
      <div
        style={{
          backgroundColor: isDarkMode ? colors.black : colors.black,
          opacity: 0.4,
        }}
        className="absolute inset-0"
        onClick={closeModal}
      />

      {/* 모달 본체 */}
      <div
        ref={modalRef}
        style={{
          backgroundColor: isDarkMode ? colors["Grey_Darken-5"] : colors.white,
        }}
        className={`relative rounded-2xl shadow-lg z-10 pt-6 ${modeClasses[mode]} ${colorClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader title={title} titleFontSize={titleFontSize} closeModal={closeModal} />
        {children}
        <ModalFooter 
          showCancelButton={showCancelButton} 
          showConfirmButton={showConfirmButton} 
          cancelText={cancelText} 
          confirmText={confirmText} 
          confirmButtonDisabled={confirmButtonDisabled} 
          onCancelClick={onCancelClick || closeModal} 
          onConfirmClick={onConfirmClick} 
        />
      </div>
    </div>
  );
};

export default Modal;
