"use client";

import React from "react";
import { smallFields } from "@/lib/data";
import CategoryPage from "@/components/ui/pages/category/CategoryPage";

const SmallPage = () => {
  const endpoint = "/api/save-small";

  return <CategoryPage title="소분류"  headerTitle="소분류 코드관리"  fields={smallFields} endpoint={endpoint} />;
};

export default SmallPage;
