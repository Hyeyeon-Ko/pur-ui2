// components/TextArea.tsx
import React, { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  errorMessage,
  className,
  ...props
}) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <textarea
        {...props}
        className={`w-full p-3 border border-none rounded-md bg-dark-transparent focus:outline-none ${
          errorMessage ? "border-red-500" : ""
        }`}
      />
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default TextArea;
