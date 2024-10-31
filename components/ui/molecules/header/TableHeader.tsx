import { CSSProperties } from "react";
import Label from "../../atoms/label/Label";

interface ManagementHeaderProps {
  tableTitle?: string;
  customStyle?: CSSProperties;
}

const TableHeader: React.FC<ManagementHeaderProps> = ({
  tableTitle,
  customStyle,
}) => {
  return (
    <>
      <div className="flex justify-start ">
        <div
          style={{ ...customStyle }}
          className="w-full border-signature bg-signature rounded-tl-lg rounded-tr-lg p-4 text-white"
        >
          <Label content={tableTitle} customStyle={{ color: "white" }} />
        </div>
      </div>
    </>
  );
};

export default TableHeader;
