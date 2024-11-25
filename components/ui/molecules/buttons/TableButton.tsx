import React from "react";
import Button from "@/components/ui/atoms/button/Button";

interface TableButtonProps {
  onOpenAddPage?: () => void;
  onDeleteSelected?: () => void;
  onDownloadAll?: () => void;
  onFormDownload?: () => void;
  onSave?: () => void;
  onModify?: () => void;
  showAddButton?: boolean;
  showDelButton?: boolean;
  showFormDownButton?: boolean;
  showAllDownButton?: boolean;
  showSaveButton?: boolean;
  showModifyButton?: boolean;
}

const TableButton: React.FC<TableButtonProps> = ({
  onOpenAddPage,
  onDeleteSelected,
  onDownloadAll,
  onFormDownload,
  onSave,
  onModify,
  showAddButton = true,
  showDelButton = true,
  showFormDownButton = false,
  showAllDownButton = true,
  showSaveButton = false,
  showModifyButton = false,
}) => {
  return (
    <div className="mr-4 flex justify-end">
      {showAddButton && (
        <Button
          mode="sm"
          content="추가"
          color="signature"
          onClick={onOpenAddPage}
        />
      )}
      {showDelButton && (
        <Button
          mode="sm"
          content="삭제"
          color="Button_Default"
          onClick={onDeleteSelected}
        />
      )}
      {showFormDownButton && (
        <Button
          mode="sm"
          content="양식다운로드"
          color="Button_Default"
          onClick={onFormDownload}
        />
      )}
      {showAllDownButton && (
        <Button
          mode="sm"
          content="전체다운로드"
          color="Button_Default"
          onClick={onDownloadAll}
        />
      )}
      {showSaveButton && (
        <Button
          mode="sm"
          content="저장"
          color="Button_Default"
          onClick={onSave}
        />
      )}
      {showModifyButton && (
        <Button
          mode="sm"
          content="수정"
          variant="outline"
          color="Button_Default"
          onClick={onModify}
        />
      )}
    </div>
  );
};

export default TableButton;
