import React from "react";
import Button from "@/components/ui/atoms/button/Button";
import colors from "@/styles/colors";

interface ActionButtonsProps {
  isEditing: boolean;
  onSave: () => void;
  onRemove: () => void;
  onEdit: () => void;
}

interface ButtonConfig {
  onClick: () => void;
  color?: keyof typeof colors;
  content: string;
  variant?: "inline" | "outline";
}

const BUTTON_CONFIG: Record<string, ButtonConfig> = {
  edit: {
    color: "sub",
    content: "수정",
    onClick: () => {},
  },
  save: {
    color: "signature",
    content: "저장",
    onClick: () => {},
  },
  remove: {
    color: "Button_Default",
    variant: "outline",
    content: "삭제",
    onClick: () => {},
  },
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isEditing,
  onSave,
  onRemove,
  onEdit,
}) => {
  const buttons: ButtonConfig[] = isEditing
    ? [
        { ...BUTTON_CONFIG.save, onClick: onSave },
        { ...BUTTON_CONFIG.remove, onClick: onRemove },
      ]
    : [
        { ...BUTTON_CONFIG.edit, onClick: onEdit },
        { ...BUTTON_CONFIG.remove, onClick: onRemove },
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
