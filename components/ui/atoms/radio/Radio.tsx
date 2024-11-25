import { useDarkMode } from "@/context/DarkModeContext";
import colors from "@/styles/colors";
import React, { CSSProperties } from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioProps {
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  color?: keyof typeof colors;
  customStyle?: CSSProperties;
  mode?: "sm" | "md" | "lg";
}

const Radio: React.FC<RadioProps> = ({
  options,
  selectedValue,
  onChange,
  color = "signature",
  customStyle,
  mode = "sm",
}) => {
  const { isDarkMode } = useDarkMode();

  const fontColor = isDarkMode ? colors.Grey_Default : colors["Grey_Darken-5"];

  const sizeClasses: Record<string, string> = {
    sm: "text-sm px-1 py-1",
    md: "text-base px-3 py-2",
    lg: "text-lg px-4 py-3",
  };

  return (
    <div className="flex gap-1" style={customStyle}>
      {options.map(option => (
        <label
          key={option.value}
          className={`flex cursor-pointer items-center ${sizeClasses[mode]}`}
          style={{ color: fontColor }}
        >
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className={`mr-1 ${color ? color : ""}`}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Radio;
