"use client";

import React from "react";
import { middleFields } from "@/lib/data";
import CategoryPage from "@/components/ui/pages/category/CategoryPage";

const MiddlePage = () => {
  const endpoint = "/api/save-middle";

  return <CategoryPage title="중분류" headerTitle="중분류 코드관리" fields={middleFields}  endpoint={endpoint}/>;
};

export default MiddlePage;
