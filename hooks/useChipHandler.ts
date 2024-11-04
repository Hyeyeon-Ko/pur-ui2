import { useState } from "react";

const useChipHandler = (
  initialCheckedItems: { [key: string]: boolean } = {}
) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    initialCheckedItems
  );

  const handleChipClick = (label: string, title: string) => {
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev };
      const isChecked = !prev[label];

      if (title === "센터명") {
        if (label === "전국") {
          newCheckedItems[label] = isChecked;
        } else {
          newCheckedItems[label] = isChecked;
          newCheckedItems["전국"] = false;
        }
      } else {
        if (label !== "전국") {
          newCheckedItems[label] = isChecked;
        }
      }

      return newCheckedItems;
    });
  };

  return { checkedItems, handleChipClick };
};

export default useChipHandler;
