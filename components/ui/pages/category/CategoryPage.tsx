"use client";

import React from "react";
import Button from "@/components/ui/atoms/button/Button";
import ManagementHeader from "@/components/ui/molecules/header/ManagementHeader";
import CategoryItemList from "@/components/ui/molecules/list/CategoryItemList";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import useCategoryItems from "@/hooks/useCategoryItems";

interface CategoryPageProps {
  title: string;
  fields: any;
  headerTitle: string;
  endpoint?: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  title,
  headerTitle,
  fields,
  endpoint,
}) => {
  const {
    items,
    handleAddItem,
    handleChange,
    handleRemove,
    handleSave,
    handleEdit,
  } = useCategoryItems();
  const { handleSaveAll } = useCategoryItems();

  const saveAll = () => {
    handleSaveAll(endpoint);
  };

  return (
    <div>
      <PageTitle pageTitle={title} mode="xl" fontWeight="bold" />
      <ManagementHeader onSaveAll={saveAll} headerTitle={headerTitle} />
      <CategoryItemList
        items={items}
        fields={fields}
        onChange={handleChange}
        onSave={handleSave}
        onRemove={handleRemove}
        onEdit={handleEdit}
      />
      <div className="flex justify-start mx-auto py-2 w-[80%]">
        <Button
          color="signature"
          mode="sm"
          content="+ 추가"
          onClick={handleAddItem}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
