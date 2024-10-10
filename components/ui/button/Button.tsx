import React, { CSSProperties } from "react";
import styles from "./Button.module.css";
import colors from "@/app/styles/colors";

export type ButtonMode = "sm" | "xs" | "lg" | "md" | undefined;

interface ButtonProps {
  mode?: ButtonMode;
  color?: keyof typeof colors;
  customStyle?: CSSProperties;
  content?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  mode = "md",
  color,
  customStyle,
  content,
  onClick,
}) => {
  const modeClass = styles[mode];
  const backgroundColor = color ? colors[color] : "initial";

  return (
    <button
      className={`${styles.button} ${modeClass}`}
      style={{
        ...customStyle,
        backgroundColor,
      }}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
