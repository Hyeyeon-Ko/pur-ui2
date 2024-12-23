import React from "react";
import Button, { ButtonProps } from "@/components/ui/atoms/button/Button";
import colors from "@/styles/colors";

interface ActionButtonsProps {
  isEditing: boolean;
  onSave: () => void;
  onRemove: () => void;
  onEdit: () => void;
}

interface ButtonConfig {
  onClick: () => void;
  color?: ButtonProps["color"];
  content: string;
  variant?: ButtonProps["variant"];
}

const BUTTON_CONFIG: Record<string, ButtonConfig> = {
  edit: {
    color: "sub",
    content: "수정",
    variant: "inline",
    onClick: () => {},
  },
  save: {
    color: "signature",
    content: "저장",
    variant: "inline",
    onClick: () => {},
  },
  remove: {
    color: "Button_Default",
    content: "삭제",
    variant: "outline",
    onClick: () => {},
  },
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isEditing,
  onSave,
  onRemove,
  onEdit,
}) => {
  const buttons = isEditing
    ? [
        { ...BUTTON_CONFIG.save, onClick: onSave }, // 저장 동작 주입
        { ...BUTTON_CONFIG.remove, onClick: onRemove }, // 삭제 동작 주입
      ]
    : [
        { ...BUTTON_CONFIG.edit, onClick: onEdit }, // 수정 동작 주입
        { ...BUTTON_CONFIG.remove, onClick: onRemove }, // 삭제 동작 주입
      ];

  return (
    <div className="flex justify-center space-x-2">
      {buttons.map(({ color, content, variant, onClick }, index) => (
        <Button
          key={index}
          color={color}
          mode="xs"
          variant={variant}
          content={content}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default ActionButtons;
