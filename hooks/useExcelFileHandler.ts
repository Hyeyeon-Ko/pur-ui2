import { useCallback } from "react";

const useExcelFileHandler = () => {
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
  const downloadCsv = useCallback((data: any[], filename: string) => {
    if (data.length === 0) {
      alert("선택된 데이터가 없습니다.");
      return;
    }

    const csvData: string[][] = data.map((item) =>
      Object.values(item).map((value) =>
        typeof value === "string" ? `"${value}"` : `${value}`
      )
    );

    // CSV 문자열 생성 (UTF-8 BOM 포함)
    const csvContent = `\uFEFF${csvData
      .map((row) => row.join(","))
      .join("\n")}`;
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // const handleDownloadOptionChange = useCallback(
  //   (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     const downloadOption = e.target.value;

  //     if (downloadOption === "all") {
  //       const allData = data.map(
  //         (row) =>
  //           [
  //             row.센터,
  //             row.입찰번호,
  //             row.누리장터,
  //             row.계약종류,
  //             row.낙찰방법,
  //             row.계정명,
  //             row.공고구분,
  //             row.입찰명,
  //             row.공고일,
  //             row.마감일,
  //             row.응찰일,
  //             row.낙찰기준가,
  //             row.낙찰자,
  //             row.낙찰금액,
  //             row.입찰결과,
  //             row.입찰증권,
  //             row.입찰품의번호,
  //             row.담당자,
  //             row.기타,
  //             row.열람,
  //           ].map((value) => (Array.isArray(value) ? value.join(",") : value)) // 배열인 경우 문자열로 변환
  //       );

  //       console.log("All Data:", allData);
  //       handleFileDownload(allData);
  //     } else if (downloadOption === "selected" && selectedRows.length > 0) {
  //       const selectedData = selectedRows
  //         .map((rowId) => {
  //           const rowData = data.find((row) => row.id === rowId);
  //           if (rowData) {
  //             return [
  //               rowData.센터,
  //               rowData.입찰번호,
  //               rowData.누리장터,
  //               rowData.계약종류,
  //               rowData.낙찰방법,
  //               rowData.계정명,
  //               rowData.공고구분,
  //               rowData.입찰명,
  //               rowData.공고일,
  //               rowData.마감일,
  //               rowData.응찰일,
  //               rowData.낙찰기준가,
  //               rowData.낙찰자,
  //               rowData.낙찰금액,
  //               rowData.입찰결과,
  //               rowData.입찰증권,
  //               rowData.입찰품의번호,
  //               rowData.담당자,
  //               rowData.기타,
  //               rowData.열람,
  //             ].map((value) =>
  //               Array.isArray(value) ? value.join(",") : value
  //             );
  //           }
  //           return null;
  //         })
  //         .filter((row): row is string[] => row !== null);

  //       console.log("Selected Data:", selectedData);

  //       if (selectedData.length > 0) {
  //         handleFileDownload(selectedData);
  //       } else {
  //         alert("선택된 데이터가 없습니다.");
  //       }
  //     } else {
  //       alert("선택된 데이터가 없습니다.");
  //     }
  //   },
  //   [data, selectedRows, handleFileDownload]
  // );

  return { handleFileUpload, downloadCsv };
};

export default useExcelFileHandler;
