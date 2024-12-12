import { useCallback } from "react";

interface ColumnType {
  title: string;
  dataIndex: string;
  key?: string;
}

type KeyMappingType = Record<string, string>;

const useDownloadAll = <T extends Record<string, any>>(
  data: T[],
  keyMapping: KeyMappingType,
  columns: ColumnType[],
) => {
  const handleDownload = useCallback(
    (fileName: string = "다운로드.csv") => {
      if (!data || data.length === 0) {
        console.warn("다운로드할 데이터가 없습니다.");
        return;
      }

      const headers = columns.map(col => col.title);
      const dataKeys = columns.map(col => keyMapping[col.dataIndex]);

      const rows = data.map(item =>
        dataKeys.map(key => `"${item[key] || "-"}"`),
      );

      const csvContent = [headers.join(",")]
        .concat(rows.map(row => row.join(",")))
        .join("\n");

      const blob = new Blob([`\ufeff${csvContent}`], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      console.log("다운로드 파일명:", fileName);
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
    },
    [data, keyMapping, columns],
  );

  return handleDownload;
};

export default useDownloadAll;
