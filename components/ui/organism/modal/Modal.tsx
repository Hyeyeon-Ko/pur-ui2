import React, { CSSProperties, useRef } from "react";
import colors from "@/styles/colors";
import Button from "../../atoms/button/Button";
import Label from "../../atoms/label/Label";
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
        <div className="flex w-[100%] justify-between items-center px-6 pb-6">
          {title && (
            <Label
              mode="lg"
              fontWeight="bold"
              content={title}
              customStyle={{
                fontSize: titleFontSize,
                color: isDarkMode ? colors.white : colors.black,
              }}
            />
          )}
          <button onClick={closeModal} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>

        {/* 모달 컨텐츠 */}
        {children}

        <div className="flex justify-end mt-4 pt-4 pb-2">
          {showCancelButton && (
            <Button
              mode="sm"
              onClick={onCancelClick || closeModal}
              variant="outline"
              color="Button_Default"
              content={cancelText}
            />
          )}
          {showConfirmButton && (
            <Button
              mode="sm"
              color="signature"
              onClick={onConfirmClick}
              content={confirmText}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
