import { useState } from "react";

const useChipHandler = (
  initialCheckedItems: { [key: string]: boolean } = {},
) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    initialCheckedItems,
  );

  const handleChipClick = (label: string, title: string) => {
    setCheckedItems(prev => {
      const newCheckedItems = { ...prev };
      const isChecked = !prev[label];

      if (title === "센터명" && label === "전국") {
        if (isChecked) return { 전국: true };
        else return { 전국: false };
      } else if (title === "센터명" && label !== "전국") {
        newCheckedItems[label] = !prev[label];
        newCheckedItems["전국"] = false;
      }

      if (title === "계정명") {
        newCheckedItems[label] = !prev[label];
      }

      return newCheckedItems;
    });
  };

  return { checkedItems, handleChipClick };
};

export default useChipHandler;
