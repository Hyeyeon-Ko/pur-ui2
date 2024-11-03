// src/components/ui/inputs/ActionButtons.tsx
import React from "react";
import Button from "@/components/ui/atoms/button/Button";

interface ActionButtonsProps {
  isEditing: boolean;
  onSave: () => void;
  onRemove: () => void;
  onEdit: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ isEditing, onSave, onRemove, onEdit }) => (
  <div className="flex space-x-2">
    {isEditing ? (
      <>
        <Button color="signature" mode="xs" content="저장" onClick={onSave} />
        <Button color="Button_Default" mode="xs" variant="outline" content="삭제" onClick={onRemove} />
      </>
    ) : (
      <>
        <Button color="sub" mode="xs" content="수정" onClick={onEdit} />
        <Button color="Button_Default" mode="xs" variant="outline" content="삭제" onClick={onRemove} />
      </>
    )}
  </div>
);

export default ActionButtons;
