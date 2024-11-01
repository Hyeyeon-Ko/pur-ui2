export interface CategoryItem {
  id: number;
  content: string;
  name: string;
  description: string;
  isEditing: boolean;
  largeCategory?: string; // Add this line
  middleCategory?: string; // Add this line
}

export interface CategoryField {
  type: string;
  field: string;
  placeholder: string;
  options?: { value: string; label: string }[];
}

export interface CategoryItemInputProps {
  item: CategoryItem;
  fields: Array<{ field: string; type: string; placeholder: string }>;
  onChange: (id: number, field: string, value: any) => void;
  onSave: (id: number) => void;
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
}

export interface CategoryItemListProps {
  items: CategoryItem[];
  fields: { type: string; field: string; placeholder: string }[];
  onChange: (id: number, field: string, value: string) => void;
  onSave: (id: number) => void;
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
}

export interface SmallCategory {
  value: string;
  label: string;
}

export interface MiddleCategory {
  value: string;
  label: string;
  smallCategories: SmallCategory[];
}

export interface MajorCategory {
  value: string;
  label: string;
  middleCategories: MiddleCategory[];
}

export type CategoryData = MajorCategory[];
