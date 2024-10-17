import React, { CSSProperties } from "react";
import colors from "@/styles/colors";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";

export type SendInputMode = "sm" | "xs" | "lg" | "md" | undefined;

interface SendInputProps {
  mode?: SendInputMode;
  color?: keyof typeof colors;
  buttonColor?: keyof typeof colors;
  fontColor?: keyof typeof colors;
  borderColor?: keyof typeof colors;
  customStyle?: CSSProperties;
  content?: string;
  onClick?: () => void;
  placeholder?: string;
}

const SendInput: React.FC<SendInputProps> = ({
  mode = "md",
  buttonColor = "Button_Default",
  customStyle,
  content = "버튼내용",
  onClick,
  placeholder = "placeholder내용",
}) => {
  return (
    <div
      className={`flex ${mode === "xs" ? "space-x-1" : "space-x-1"}`}
      style={{
        ...customStyle,
      }}
    >
      <Input mode={mode} placeholder={placeholder} />
      <Button
        mode={mode}
        content={content}
        color={buttonColor}
        onClick={onClick}
      />
    </div>
  );
};

export default SendInput;
