import React, { TextareaHTMLAttributes } from "react";

const TextArea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <textarea
        {...props}
        className="w-full p-3 rounded-md bg-dark-transparent focus:outline-none"
      />
    </div>
  );
};

export default TextArea;
