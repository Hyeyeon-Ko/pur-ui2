"use client";

import React from "react";
import { majorFields } from "@/lib/data";
import CategoryPage from "@/components/ui/pages/category/CategoryPage";

const LargePage = () => {
  return <CategoryPage title="대분류" headerTitle="대분류 코드관리" fields={majorFields} />;
};

export default LargePage;
