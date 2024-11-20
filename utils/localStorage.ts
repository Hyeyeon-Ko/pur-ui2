type SetLocalProps = { key: string; value: string | number | boolean };

export const getLocal = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null; // 서버 사이드에서는 null 반환
};

export const setLocal = ({ key, value }: SetLocalProps) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value.toString());
  }
};
