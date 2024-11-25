import Button from "@/components/ui/atoms/button/Button";
import { CSSProperties } from "react";

interface ManagementHeaderProps {
  onSaveAll?: () => void;
  headerTitle?: string;
  buttonText?: string;
  customStyle?: CSSProperties;
  showButton?: boolean;
  isFullWidth?: boolean;
}

const ManagementHeader: React.FC<ManagementHeaderProps> = ({
  onSaveAll,
  headerTitle,
  buttonText = "전체 저장",
  customStyle,
  showButton = true,
  isFullWidth = false,
}) => {
  return (
    <>
      {showButton && (
        <div className="mx-auto flex w-[80%] justify-end py-2">
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
            isFullWidth ? "w-full" : "mx-auto w-[80%]"
          } rounded-tl-lg rounded-tr-lg border-signature bg-signature p-4 text-white`}
        >
          {headerTitle}
        </div>
      </div>
    </>
  );
};

export default ManagementHeader;
