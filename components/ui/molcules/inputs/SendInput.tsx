import React, { CSSProperties } from "react";
import styles from "./sendInput.module.css";
import colors from "@/styles/colors";
import Input from "../../atoms/input/Input";
import Button from "../../atoms/button/Button";

export type SendInputMode = "sm" | "xs" | "lg" | "md" | undefined;

interface SendInputProps {
  mode?: SendInputMode;
  color?: keyof typeof colors;
  customStyle?: CSSProperties;
  content?: string;
  onClick?: () => void;
  placeholder?: string;
}

const SendInput: React.FC<SendInputProps> = ({
  mode = "md",
  customStyle,
  content = "버튼내용",
  onClick,
  placeholder = "placeholder내용",
}) => {
  const modeClass = styles[mode];

  return (
    <div
      className={`${styles.sendInput} ${modeClass}`}
      style={{
        ...customStyle,
      }}
    >
      <Input mode={mode} placeholder={placeholder} />
      <Button
        mode={mode}
        content={content}
        onClick={onClick}
        customStyle={{ backgroundColor: "black" }}
      />
    </div>
  );
};

export default SendInput;
