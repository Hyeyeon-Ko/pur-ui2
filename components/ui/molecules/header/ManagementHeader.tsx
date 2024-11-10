import Button from "@/components/ui/atoms/button/Button";
import { CSSProperties } from "react";

interface ManagementHeaderProps {
  onSaveAll?: () => void;
  headerTitle?: string;
  tableTitle?: string;
  buttonText?: string;
  customStyle?: CSSProperties;
  showButton?: boolean;
  isFullWidth?: boolean;
}

const ManagementHeader: React.FC<ManagementHeaderProps> = ({
  onSaveAll,
  headerTitle,
  tableTitle,
  buttonText = "전체 저장",
  customStyle,
  showButton = true,
  isFullWidth = false,
}) => {
  return (
    <>
      {showButton && (
        <div className="flex justify-end mx-auto py-2 w-[80%]">
          <Button
            color="Button_Default"
            mode="sm"
            content={buttonText}
            onClick={onSaveAll}
            aria-label={buttonText}
          />
        </div>
      )}

      <div className="flex justify-end">
        <div
          style={{ ...customStyle }}
          className={`${
            isFullWidth ? "w-full" : "w-[80%] mx-auto"
          } border-signature bg-signature rounded-tl-lg rounded-tr-lg p-4 text-white`}
        >
          {headerTitle || tableTitle}
        </div>
      </div>
    </>
  );
};

export default ManagementHeader;
