import React from "react";
import Checkbox from "../../atoms/checkbox/Checkbox";

interface CheckBoxCellProps {
  isChecked: boolean;
  onChange: () => void;
}

const CheckBoxCell: React.FC<CheckBoxCellProps> = ({ isChecked, onChange }) => {
  return (
    <td className="px-4 py-2">
      <Checkbox mode="sm" checked={isChecked} onChange={onChange} />
    </td>
  );
};

export default CheckBoxCell;
