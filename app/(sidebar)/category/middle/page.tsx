"use client";

import Button from "@/components/ui/atoms/button/Button";
import ManagementHeader from "@/components/ui/molecules/header/ManagementHeader";
import CategoryItemList from "@/components/ui/molecules/list/CategoryItemList";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import useCategoryItems from "@/hooks/useCategoryItems";
import { middleFields } from "@/lib/data";
import React from "react";

const MiddlePage = () => {
  const {
    items,
    handleAddItem,
    handleChange,
    handleRemove,
    handleSave,
    handleEdit,
    handleSaveAll,
  } = useCategoryItems();

  return (
    <div>
      <PageTitle pageTitle="중분류" mode="xl" fontWeight="bold" />
      <ManagementHeader onSaveAll={handleSaveAll} />
      <CategoryItemList
        items={items}
        fields={middleFields}
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

export default MiddlePage;
