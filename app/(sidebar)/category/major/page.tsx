"use client";

import React, { useEffect, useState } from "react";
import { CategoryVisibilityProvider } from "@/context/CategoryVisibilityContext";
import { majorFields } from "@/lib/categoryDatas";
import CategoryPage from "../_components/CategoryPage";

const LargePage = () => {
  const endpoint = "/api/category-class";
  const [largeCategories, setLargeCategories] = useState<
    Array<{ classCd: string; classNm: string }>
  >([]);

  useEffect(() => {
    const fetchLargeCategories = async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("대분류 데이터를 불러올 수 없습니다.");
        const jsonResponse = await res.json();
        setLargeCategories(jsonResponse.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLargeCategories();
  }, []);

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
