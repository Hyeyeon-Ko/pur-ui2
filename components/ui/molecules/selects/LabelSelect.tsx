import React from "react";
import Label from "@/components/ui/atoms/label/Label";
import SelectBox from "@/components/ui/atoms/selectBox/Select";
import { useDarkMode } from "@/context/DarkModeContext";
import colors from "@/styles/colors";

interface LabelSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  placeholder: string;
  customStyle?: React.CSSProperties;
  selectMode?: "sm" | "xs" | "lg" | "md";
}

const LabelSelect: React.FC<LabelSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  customStyle,
  selectMode = "md",
}) => {
  const { isDarkMode } = useDarkMode();

  const labelColor = isDarkMode ? "white" : "black";
  const selectBackground = isDarkMode ? colors["Grey_Darken-4"] : "transparent";
  const selectBorder = isDarkMode ? "transparent" : colors.Button_Default;

  return (
    <div className="mt-2 flex items-center justify-between gap-2">
      <Label mode="md" content={label} customStyle={{ color: labelColor }} />{" "}
      <SelectBox
        mode={selectMode}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        options={options}
        customStyle={{
          ...customStyle,
          backgroundColor: selectBackground,
          borderColor: selectBorder,
        }}
      />
    </div>
  );
};

export default LabelSelect;
