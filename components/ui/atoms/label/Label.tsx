import React, { CSSProperties } from "react";
import styles from "./label.module.css";
import colors from "@/styles/colors";

export type LabelMode = "sm" | "xs" | "lg" | "md" | undefined;

interface LabelProps {
  mode?: LabelMode;
  color?: keyof typeof colors;
  content: string;
  customStyle?: CSSProperties;
  placeholder?: string;
}

const Label: React.FC<LabelProps> = ({ mode = "md", content, customStyle }) => {
  const modeClass = styles[mode];

  return (
    <label
      className={`${styles.input} ${modeClass}`}
      style={{
        ...customStyle,
      }}
    >
      {content}
    </label>
  );
};

export default Label;
