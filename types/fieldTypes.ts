export type FieldConfig = {
  name: string;
  label?: string;
  type: "select" | "input" | "date";
  options?: { value: string; label: string }[];
};
