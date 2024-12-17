import { useState, useCallback } from "react";
import Papa from "papaparse";

const useCsvParser = () => {
  const [parsedData, setParsedData] = useState<any[]>([]);

  const parseCsvFile = useCallback(
    (file: File, onError?: (error: Error) => void) => {
      Papa.parse(file, {
        header: true, // 첫 줄을 헤더로 사용
        skipEmptyLines: true, // 빈 줄 건너뛰기
        complete: result => {
          setParsedData(result.data as any[]);
        },
        error: err => {
          if (onError) onError(new Error(`CSV 파싱 실패: ${err.message}`));
        },
      });
    },
    [],
  );

  return { parsedData, parseCsvFile };
};

export default useCsvParser;
