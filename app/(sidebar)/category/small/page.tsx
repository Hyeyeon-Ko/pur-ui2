"use client";

import React from "react";
import { smallFields } from "@/lib/data";
import { CategoryVisibilityProvider } from "@/context/CategoryVisibilityContext";
import CategoryPage from "@/components/ui/templates/CategoryPage";

const SmallPage = () => {
  const endpoint = "/api/save-middle";

  return (
    <CategoryVisibilityProvider majorCategory={true} middleCategory={true}>
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
