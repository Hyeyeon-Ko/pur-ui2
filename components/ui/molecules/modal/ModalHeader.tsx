import React from "react";
import Label from "../../atoms/label/Label";
import colors from "@/styles/colors";
import { useDarkMode } from "@/context/DarkModeContext";

interface ModalHeaderProps {
  title?: string;
  titleFontSize?: string;
  closeModal: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  titleFontSize,
  closeModal,
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="flex w-[100%] items-center justify-between px-6 pb-6">
      {title && (
        <Label
          mode="lg"
          fontWeight="bold"
          content={title}
          customStyle={{
            fontSize: titleFontSize,
            color: isDarkMode ? colors.white : colors.black,
          }}
        />
      )}
      <button onClick={closeModal} className="text-gray-500 text-2xl">
        &times;
      </button>
    </div>
  );
};

export default ModalHeader;
