import { useCallback } from "react";

const useExcelFileHandler = () => {
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const fileContent = e.target?.result;
          console.log("Uploaded File Content:", fileContent);
        };
        reader.readAsBinaryString(file);
      }
    },
    []
  );

  const handleFileDownload = useCallback((data: Array<Array<string>>) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "다운로드.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return { handleFileUpload, handleFileDownload };
};

export default useExcelFileHandler;
