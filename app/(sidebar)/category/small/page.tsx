"use client";

import React from "react";
import { smallFields } from "@/lib/data";
import CategoryPage from "@/components/ui/pages/category/CategoryPage";

const SmallPage = () => {
  return <CategoryPage title="소분류"  headerTitle="소분류 코드관리"  fields={smallFields} />;
};

export default SmallPage;
