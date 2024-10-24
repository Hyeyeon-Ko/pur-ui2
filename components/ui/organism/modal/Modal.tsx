import React, { CSSProperties, useCallback, useEffect, useRef } from "react";
import colors from "@/styles/colors";
import Button from "../../atoms/button/Button";
import Label from "../../atoms/label/Label";

/**
 *isOpen: 모달 열림 상태
  closeModal: 모달 닫기 함수
  mode: 모달 크기
  color: 색상
  customStyle: CSSProperties;
  title: 제목
  titleFontSize: 제목 폰트사이즈
  showCancelButton: 취소 버튼을 표시할지 여부
  showConfirmButton: 확인 버튼을 표시할지 여부
  cancelText: 취소 버튼 텍스트
  confirmText: 확인 버튼 텍스트
  onCancelClick: 취소 버튼 클릭 핸들러
  onConfirmClick: 확인 버튼 클릭 핸들러
  children: React.ReactNode;
 */
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

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

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
        style={{ backgroundColor: colors.black, opacity: 0.1 }}
        className="absolute inset-0"
      />

      <div
        style={{ backgroundColor: colors.white }}
        ref={modalRef}
        className={`relative bg-white rounded shadow-lg z-10 pt-6 ${modeClasses[mode]} ${colorClass}`}
      >
        <div className="flex w-[100%] justify-between items-center pb-6">
          {title && (
            <Label
              mode="lg"
              fontWeight="bold"
              content={title}
              customStyle={{ fontSize: titleFontSize }}
            />
          )}
          <button onClick={closeModal} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>
        {/* 모달 컨텐츠가 들어가는 곳 */}
        {children}

        <div className="flex justify-end mt-4 pt-12 pb-2">
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
