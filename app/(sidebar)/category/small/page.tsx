"use client";

import React from "react";
import { CategoryVisibilityProvider } from "@/context/CategoryVisibilityContext";
import { smallFields } from "@/lib/categoryDatas";
import CategoryPage from "../_components/CategoryPage";

const SmallPage = () => {
  const endpoint = "/api/category-detail";

  return (
    <CategoryVisibilityProvider majorCategory={false} middleCategory={true}>
      <CategoryPage
        title="소분류"
        headerTitle="소분류 코드관리"
        fields={smallFields}
        endpoint={endpoint}
      />
    </CategoryVisibilityProvider>
  );
};

export default SmallPage;
