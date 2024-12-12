// import { useCallback } from "react";

import { useCallback } from "react";
interface Column {
  title: string;
  dataIndex: string;
}

type KeyMapping = Record<string, string>;

type Data = Record<string, any>;

const useFileDownload = () => {
  /**
   * 다운로드 기능
   * @param {Data[]} data - 다운로드할 데이터 배열
   * @param {Column[]} columns - 컬럼 정의 배열 (타이틀과 데이터 인덱스 포함)
   * @param {KeyMapping} keyMapping - 데이터 키 매핑 객체
   * @param {string} filename - 다운로드할 파일명
   */
  const downloadFile = useCallback(
    (
      data: Data[],
      columns: Column[],
      keyMapping: KeyMapping,
      filename: string,
    ) => {
      if (!data || data.length === 0) {
        console.error("No data available to download.");
        return;
      }

      // 헤더 생성
      const headers = columns.map(col => col.title);

      // 데이터 매핑 및 CSV 행 생성
      const rows = data.map(item =>
        columns.map(col => {
          const mappedKey = keyMapping[col.dataIndex];
          return mappedKey && item[mappedKey] ? item[mappedKey] : "";
        }),
      );

      // CSV 문자열 생성
      const csvContent = [headers.join(",")]
        .concat(rows.map(row => row.join(",")))
        .join("\n");

      // Blob 생성 및 다운로드
      const blob = new Blob([`\ufeff${csvContent}`], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    },
    [],
  );

  return { downloadFile };
};

export default useFileDownload;
