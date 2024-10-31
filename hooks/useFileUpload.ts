import Toast from "@/components/commons/Toast";
import { useCallback } from "react";

/** 파일업로드 */

const useFileUpload = () => {
  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, endpoint: string) => {
      const file = event.target.files?.[0];
      if (!file) {
        Toast.errorUploadNotify();
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("업로드 실패");

        Toast.successUploadNotify();
      } catch (error) {
        console.error("파일 업로드 오류:", error);
        Toast.errorUploadNotify();
      }
    },
    []
  );

  return { handleFileUpload };
};

export default useFileUpload;
