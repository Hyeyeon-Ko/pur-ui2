import React from "react";
import ManagementHeader from "../header/ManagementHeader";

interface VerticalTableHeaderProps {
  showHeader: boolean;
  headerTitle?: string;
}

const VerticalTableHeader: React.FC<VerticalTableHeaderProps> = ({
  showHeader,
  headerTitle,
}) => {
  return (
    <>
      {showHeader && (
        <ManagementHeader
          headerTitle={headerTitle}
          showButton={false}
          isFullWidth
        />
      )}
    </>
  );
};

export default VerticalTableHeader;
