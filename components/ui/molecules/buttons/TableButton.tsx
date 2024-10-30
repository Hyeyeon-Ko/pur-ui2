import React from "react";
import Button from "@/components/ui/atoms/button/Button";

interface TableButtonProps {
  onOpenAddPage?: () => void;
  onDeleteSelected?: () => void;
  onDownloadAll?: () => void;
  onFormDownload?: () => void;
  showAddButton?: boolean;
  showDelButton?: boolean;
  showFormDownButton?: boolean;
}

const TableButton: React.FC<TableButtonProps> = ({
  onOpenAddPage,
  onDeleteSelected,
  onDownloadAll,
  onFormDownload,
  showAddButton = true,
  showDelButton = true,
  showFormDownButton = false,
}) => {
  return (
    <div className="flex justify-end mr-6">
      {showAddButton && (
        <Button
          mode="xs"
          content="추가"
          color="signature"
          onClick={onOpenAddPage}
        />
      )}
      {showDelButton && (
        <Button
          mode="xs"
          content="삭제"
          color="Button_Default"
          onClick={onDeleteSelected}
        />
      )}
      {showFormDownButton && (
        <Button
          mode="xs"
          content="양식다운로드"
          color="Button_Default"
          onClick={onFormDownload}
        />
      )}
      <Button
        mode="xs"
        content="엑셀다운로드"
        variant="outline"
        color="Button_Default"
        onClick={onDownloadAll}
      />
    </div>
  );
};

export default TableButton;
