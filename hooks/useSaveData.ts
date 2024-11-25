import Toast from "@/components/commons/Toast";
import { useCallback } from "react";

const useSaveData = () => {
  const saveData = useCallback(
    async (
      checkedItems: { [key: string]: boolean },
      verticalData: any[],
      endpoint: string,
    ) => {
      const selectedItems = Object.keys(checkedItems).filter(
        key => checkedItems[key],
      );
      const dataToSave = verticalData.filter(item =>
        selectedItems.includes(item.id),
      ); // 임시: 'id'는 데이터의 고유 식별자

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSave), // JSON 형태
        });

        if (!response.ok) {
          throw new Error("데이터 저장 실패");
        }

        const result = await response.json();
        Toast.successSaveNotify();
      } catch (error) {
        Toast.errorSaveNotify();
      }
    },
    [],
  );

  return { saveData };
};

export default useSaveData;
