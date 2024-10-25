import React from "react";
import Button from "@/components/ui/atoms/button/Button";

interface TableButtonProps {
  onOpenAddPage?: () => void;
  onDeleteSelected?: () => void;
  onDownloadAll?: () => void;
}

const TableButton: React.FC<TableButtonProps> = ({
  onOpenAddPage,
  onDeleteSelected,
  onDownloadAll,
}) => {
  return (
    <div className="flex justify-end mr-6">
      <Button
        mode="xs"
        content="추가"
        color="signature"
        onClick={onOpenAddPage}
      />
      <Button
        mode="xs"
        content="삭제"
        color="Button_Default"
        onClick={onDeleteSelected}
      />
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
