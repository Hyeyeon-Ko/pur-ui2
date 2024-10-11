import React, { CSSProperties } from "react";
import styles from "./checkbox.module.css";
import colors from "@/styles/colors";

export type CheckboxMode = "sm" | "xs" | "lg" | "md" | undefined;

interface CheckboxProps {
  mode?: CheckboxMode;
  color?: keyof typeof colors;
  customStyle?: CSSProperties;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  mode = "md",
  color,
  customStyle,
  checked = false,
  onChange,
  label,
  disabled = false,
  className,
  name,
}) => {
  const modeClass = styles[mode];
  const borderColor = color ? colors[color] : "initial";

  return (
    <div className={styles.layout}>
      <label style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
        <input
          type="checkbox"
          className={`${styles.input} ${modeClass} ${className}`}
          style={{
            ...customStyle,
            borderColor,
          }}
          checked={checked}
          name={name}
          onChange={onChange}
          disabled={disabled}
        />
        {label && <span className={styles.label}>{label}</span>}
      </label>
    </div>
  );
};

export default Checkbox;
