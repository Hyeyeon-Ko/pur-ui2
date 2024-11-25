import Toast from "@/components/commons/Toast"; // Adjust the import based on your project structure
import { useCallback } from "react";

/** 양식다운로드 */
const useFormDownload = () => {
  const handleFormDown = useCallback(
    async (endpoint: string, fileName: string) => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("서버에서 파일을 가져오는데 실패했습니다.");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
        Toast.successDownNotify();
      } catch (error) {
        console.error("파일 다운로드 오류:", error);
        Toast.errorDownNotify();
      }
    },
    [],
  );

  return { handleFormDown };
};

export default useFormDownload;
