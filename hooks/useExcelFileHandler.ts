import { RowData } from "@/types/dummyTypes";
import { useCallback } from "react";

const useExcelFileHandler = (data: RowData[], selectedRows: string[]) => {
  // 파일 업로드 핸들러
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

  // 파일 다운로드 핸들러
  const handleFileDownload = useCallback((data: string[][]) => {
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

  // 옵션 변경 시 다운로드 핸들러
  const handleDownloadOptionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const downloadOption = e.target.value;

      if (downloadOption === "all") {
        // 전체 데이터 다운로드
        const allData = data.map((row) => [row.data1, row.data2, row.data3]);
        handleFileDownload(allData);
      } else if (downloadOption === "selected" && selectedRows.length > 0) {
        // 선택된 데이터 다운로드
        const selectedData = selectedRows
          .map((rowId) => {
            const rowData = data.find((row) => row.id === rowId);
            return rowData
              ? [rowData.data1, rowData.data2, rowData.data3]
              : null;
          })
          .filter((row): row is string[] => row !== null);

        if (selectedData.length > 0) {
          handleFileDownload(selectedData);
        } else {
          alert("선택된 데이터가 없습니다.");
        }
      } else {
        alert("선택된 데이터가 없습니다.");
      }
    },
    [data, selectedRows, handleFileDownload]
  );

  return { handleFileUpload, handleFileDownload, handleDownloadOptionChange };
};

export default useExcelFileHandler;
