export interface CategoryItem {
  id: number;
  majorSelect: string;
  middleSelect: string;
  smallSelect: string;
  content: string;
  name: string;
  description: string;
  isEditing: boolean;
}

export interface CategoryField {
  type: string;
  field: string;
  placeholder: string;
  options?: { value: string; label: string }[];
}

export interface CategoryItemInputProps {
  item: {
    id: number;
    content: string;
    name: string;
    description: string;
    isEditing: boolean;
  };
  fields: CategoryField[];
  onChange: (id: number, field: string, value: string) => void;
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
