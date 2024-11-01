"use client";

import { useState } from "react";
import { CategoryItem } from "@/types/categoryTypes";
import Toast from "@/components/commons/Toast";

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

  const handleSaveAll = async (endpoint: string) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error("전체 저장에 실패했습니다.");
      }

      console.log("전체 저장이 완료되었습니다.");
      Toast.successSaveNotify();
    } catch (error) {
      Toast.errorSaveNotify();
      console.error("저장 중 오류 발생:", error);
    }
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
