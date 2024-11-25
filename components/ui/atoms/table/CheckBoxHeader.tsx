import React from "react";
import Checkbox from "../../atoms/checkbox/Checkbox";

interface CheckBoxHeaderProps {
  showCheckbox: boolean;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

const CheckBoxHeader: React.FC<CheckBoxHeaderProps> = ({
  showCheckbox,
  isAllSelected,
  onSelectAll,
}) => {
  if (!showCheckbox) return null;

  return (
    <th rowSpan={3} className="px-4 py-3">
      <Checkbox
        mode="sm"
        checked={isAllSelected}
        onChange={e => onSelectAll(e.target.checked)}
      />
    </th>
  );
};

export default CheckBoxHeader;
