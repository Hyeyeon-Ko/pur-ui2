"use client";

import { useState } from "react";
import { CategoryItem } from "@/types/categoryTypes";

const useCategoryItems = () => {
  const [items, setItems] = useState<CategoryItem[]>([
    { id: Date.now(), content: "", name: "", description: "", isEditing: true },
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
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

  const handleRemove = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
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

  const handleSaveAll = () => {
    setItems(items.map((item) => ({ ...item, isEditing: false })));
  };

  return {
    items,
    handleAddItem,
    handleChange,
    handleRemove,
    handleSave,
    handleEdit,
    handleSaveAll,
  };
};

export default useCategoryItems;
