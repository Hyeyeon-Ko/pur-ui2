type SetLocalProps = { key: string; value: string | number | boolean | object };

export const getLocal = (key: string) => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return null;
    }
  }
  return null;
};
export const setLocal = ({ key, value }: SetLocalProps) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
