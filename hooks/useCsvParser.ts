import { useState, useCallback } from "react";

const useCsvParser = () => {
  const [parsedData, setParsedData] = useState<any[]>([]);

  const parseCsvFile = useCallback(
    (file: File, onError?: (error: Error) => void) => {
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const content = reader.result as string;
          const rows = content.split("\n").filter(row => row.trim() !== "");
          const headers = rows[0].split(",");
          const data = rows.slice(1).map(row => {
            const values = row.split(",");
            const record: { [key: string]: string } = {};
            headers.forEach((header, index) => {
              record[header.trim()] = values[index]?.trim() || "";
            });
            return record;
          });
          setParsedData(data);
        } catch (error) {
          if (onError) onError(error as Error);
        }
      };

      reader.onerror = () => {
        if (onError) onError(new Error("파일 읽기 실패"));
      };

      reader.readAsText(file);
    },
    [],
  );

  return { parsedData, parseCsvFile };
};

export default useCsvParser;
