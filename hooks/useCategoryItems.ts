import { CategoryItem } from "@/types/categoryTypes";
import { useState } from "react";

const useCategoryItems = () => {
  const [items, setItems] = useState<CategoryItem[]>([
    // 초기 데이터 예시
    {
      id: 1,
      largeCategory: "대분류1",
      middleCategory: "중분류1",
      content: "내용1",
      name: "이름1",
      description: "설명1",
      isEditing: false,
    },
    {
      id: 2,
      largeCategory: "대분류2",
      middleCategory: "중분류2",
      content: "내용2",
      name: "이름2",
      description: "설명2",
      isEditing: false,
    },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        largeCategory: "", // Adjusted to match the new structure
        middleCategory: "",
        content: "",
        name: "",
        description: "",
        isEditing: true,
      },
    ]);
  };

  const handleChange = (id: number, field: string, value: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item
      )
    );
  };

  const handleEdit = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return {
    items,
    handleAddItem,
    handleChange,
    handleSave,
    handleEdit,
    handleRemove,
  };
};

export default useCategoryItems;
