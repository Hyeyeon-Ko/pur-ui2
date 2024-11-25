import React, { TextareaHTMLAttributes } from "react";

const TextArea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <textarea
        {...props}
        className="w-full rounded-md bg-dark-transparent p-3 focus:outline-none"
      />
    </div>
  );
};

export default TextArea;
