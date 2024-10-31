import Toast from "@/components/commons/Toast";
import { useCallback } from "react";

/** 전체 다운로드 */
const useFileDownload = () => {
  const downloadFile = useCallback(async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error("서버에서 데이터를 가져오는데 실패했습니다.");

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);
      Toast.successDownNotify();
    } catch (error) {
      console.error("다운로드 실패:", error);
      Toast.errorDownNotify();
    }
  }, []);

  return { downloadFile };
};

export default useFileDownload;
