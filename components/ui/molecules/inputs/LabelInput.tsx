import React, { CSSProperties } from "react";
import colors from "@/styles/colors";
import Label from "../../atoms/label/Label";
import Input from "../../atoms/input/Input";

export type LabelInputMode = "sm" | "xs" | "lg" | "md" | undefined;

interface LabelInputProps {
  labelMode?: LabelInputMode;
  labelColor?: keyof typeof colors;
  labelContent: string;
  labelFontWeight?: "normal" | "medium" | "bold";
  inputMode?: LabelInputMode;
  inputColor?: keyof typeof colors;
  inputType?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customStyle?: CSSProperties;
}

const LabelInput: React.FC<LabelInputProps> = ({
  labelMode = "md",
  labelColor,
  labelContent,
  labelFontWeight = "normal",
  inputMode = "md",
  inputColor,
  inputType = "text",
  placeholder,
  value,
  onChange,
  customStyle,
}) => {
  return (
    <div
      className="m-1 w-[18%] justify-between flex items-center"
      style={customStyle}
    >
      <Label
        mode={labelMode}
        color={labelColor}
        content={labelContent}
        fontWeight={labelFontWeight}
        customStyle={{ margin: "4px" }}
      />
      <Input
        mode={inputMode}
        color={inputColor}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default LabelInput;
