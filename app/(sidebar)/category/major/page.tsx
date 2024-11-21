"use client";

import React from "react";
import { CategoryVisibilityProvider } from "@/context/CategoryVisibilityContext";
import { majorFields } from "@/lib/categoryDatas";
import CategoryPage from "../_components/CategoryPage";

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
