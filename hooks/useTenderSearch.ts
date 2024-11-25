import Toast from "@/components/commons/Toast";
import { useCallback } from "react";

const useTenderSearch = () => {
  const tenderSearch = useCallback(
    async (bidNumber: string, endpoint: string) => {
      // 입력된 입찰번호가 없으면 경고 로그 출력
      if (!bidNumber) {
        Toast.warningTenderNotify();
        return;
      }

      try {
        const response = await fetch(`${endpoint}/${bidNumber}`);
        if (!response.ok) {
          throw new Error("조회 실패");
        }
        const data = await response.json();
        console.log("조회한 데이터:", data);
        Toast.successTenderNotify();
        return data;
      } catch (error) {
        console.error("조회 중 오류 발생:", error);
        Toast.errorTenderNotify();
      }
    },
    [],
  );

  return { tenderSearch };
};

export default useTenderSearch;
