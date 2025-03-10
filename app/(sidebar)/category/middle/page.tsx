"use client";

import React from "react";
import { CategoryVisibilityProvider } from "@/context/CategoryVisibilityContext";
import { middleFields } from "@/lib/categoryDatas";
import CategoryPage from "../_components/CategoryPage";

const MiddlePage = () => {
  const endpoint = "/api/category-group";

  return (
    <CategoryVisibilityProvider majorCategory={true} middleCategory={false}>
      <CategoryPage
        title="중분류"
        headerTitle="중분류 코드관리"
        fields={middleFields}
        endpoint={endpoint}
      />
    </CategoryVisibilityProvider>
  );
};

export default MiddlePage;
