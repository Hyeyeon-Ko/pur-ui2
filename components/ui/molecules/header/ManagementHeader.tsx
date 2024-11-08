import Button from "@/components/ui/atoms/button/Button";
import { CSSProperties } from "react";

interface ManagementHeaderProps {
  onSaveAll?: () => void;
  headerTitle?: string;
  buttonText?: string;
  customStyle?: CSSProperties;
  showButton?: boolean;
}

const ManagementHeader: React.FC<ManagementHeaderProps> = ({
  onSaveAll,
  headerTitle,
  buttonText = "전체 저장",
  customStyle,
  showButton = true,
}) => {
  return (
    <>
      <div className="flex justify-end mx-auto py-2 w-[80%]">
        {showButton && (
          <Button
            color="Button_Default"
            mode="sm"
            content={buttonText}
            onClick={onSaveAll}
            aria-label={buttonText}
          />
        )}
      </div>

      <div className="flex justify-end mb-2">
        <div
          style={{ ...customStyle }}
          className="mx-auto border-signature bg-signature rounded-tl-lg rounded-tr-lg w-[80%] p-4 text-white"
        >
          {headerTitle}
        </div>
      </div>
    </>
  );
};

export default ManagementHeader;
