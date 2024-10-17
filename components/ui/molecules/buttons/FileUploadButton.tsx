// FileUploadButton.tsx
import React, { useRef } from "react";
import Button from "@/components/ui/atoms/button/Button";

interface FileUploadButtonProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  accept?: string;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  onFileUpload,
  buttonText,
  accept = ".xls,.xlsx",
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        accept={accept}
        onChange={onFileUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Button
        mode="xs"
        content={buttonText}
        color="Button_Default"
        onClick={handleUploadClick}
      />
    </>
  );
};

export default FileUploadButton;
