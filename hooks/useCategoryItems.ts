import { CategoryItem } from "@/types/categoryTypes";
import { useState } from "react";

const useCategoryItems = () => {
  const [items, setItems] = useState<CategoryItem[]>([]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        largeCategory: "",
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
      items.map(item => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleSave = (id: number) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, isEditing: false } : item,
      ),
    );
  };

  const handleEdit = (id: number) => {
    // console.log("Editing item ID:", id);
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isEditing: true } : item,
      ),
    );
  };

  const handleRemove = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return {
    items,
    setItems,
    handleAddItem,
    handleChange,
    handleSave,
    handleEdit,
    handleRemove,
  };
};

export default useCategoryItems;
