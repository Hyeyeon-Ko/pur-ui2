import React, { CSSProperties } from "react";
import styles from "./Input.module.css";
import colors from "@/app/styles/colors";

export type InputMode = "sm" | "xs" | "lg" | "md" | undefined;

interface InputProps {
  mode?: InputMode;
  color?: keyof typeof colors;
  customStyle?: CSSProperties;
  placeholder?: string;
  onClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  mode = "md",
  color,
  customStyle,
  placeholder,
}) => {
  const modeClass = styles[mode];
  const borderColor = color ? colors[color] : "initial";

  return (
    <input
      className={`${styles.input} ${modeClass}`}
      style={{
        ...customStyle,
        borderColor,
      }}
      placeholder={placeholder}
    />
  );
};

export default Input;
