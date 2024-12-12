import Toast from "@/components/commons/Toast"; // Adjust the import based on your project structure
import { useCallback } from "react";

/** 양식다운로드 */
const useFormDownload = () => {
  const handleFormDown = useCallback((endpoint: string, fileName: string) => {
    try {
      const link = document.createElement("a");
      link.href = endpoint;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      Toast.successDownNotify();
    } catch (error) {
      console.error("파일 다운로드 오류:", error);
      Toast.errorDownNotify();
    }
  }, []);

  return { handleFormDown };
};

export default useFormDownload;
