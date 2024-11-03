"use client";

import React from "react";
import { majorFields } from "@/lib/data";
import CategoryPage from "@/components/ui/pages/category/CategoryPage";
import { CategoryVisibilityProvider } from "@/context/CategoryVisibilityContext";

const LargePage = () => {
  const endpoint = "/api/save-major";

  return (
    <CategoryVisibilityProvider majorCategory={false} middleCategory={false}>
      <CategoryPage
        title="대분류"
        headerTitle="대분류 코드관리"
        fields={majorFields}
        endpoint={endpoint}
      />
    </CategoryVisibilityProvider>
  );
};

export default LargePage;
