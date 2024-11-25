import React from "react";
import Button from "../../atoms/button/Button";

interface ModalFooterProps {
  showCancelButton: boolean;
  showConfirmButton: boolean;
  cancelText: string;
  confirmText: string;
  confirmButtonDisabled: boolean;
  onCancelClick?: () => void;
  onConfirmClick?: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  showCancelButton,
  showConfirmButton,
  cancelText,
  confirmText,
  confirmButtonDisabled,
  onCancelClick,
  onConfirmClick,
}) => {
  return (
    <div className="mt-4 flex justify-end pb-2 pt-4">
      {showCancelButton && (
        <Button
          mode="sm"
          onClick={onCancelClick}
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
          disabled={confirmButtonDisabled}
        />
      )}
    </div>
  );
};

export default ModalFooter;
