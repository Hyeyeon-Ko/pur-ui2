import React, { useEffect, useState } from "react";
import Button from "@/components/ui/atoms/button/Button";
import ManagementHeader from "@/components/ui/molecules/header/ManagementHeader";
import PageTitle from "@/components/ui/molecules/titles/PageTitle";
import useCategoryItems from "@/hooks/useCategoryItems";
import CategoryItemList from "./CategoryItemList";

interface CategoryPageProps {
  title: string;
  headerTitle: string;
  fields: any;
  endpoint?: string;
}

interface ApiResponseItem {
  classCd: string;
  classNm: string;
  classDc: string;
  groupCd?: string;
  groupNm?: string;
  groupDc?: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  title,
  headerTitle,
  fields,
  endpoint,
}) => {
  const {
    items,
    setItems,
    handleAddItem,
    handleChange,
    handleRemove,
    handleSave,
    handleEdit,
  } = useCategoryItems();

  const [largeCategories, setLargeCategories] = useState<
    Array<{ classCd: string; classNm: string }>
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!endpoint) return;
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error(
            `데이터를 불러오는데 실패했습니다: ${res.statusText}`,
          );
        }
        const jsonResponse: { data: ApiResponseItem[] } = await res.json(); // 타입 명시

        // 대분류 데이터만 추출
        const uniqueLargeCategories = Array.from(
          new Map(
            jsonResponse.data.map((item: ApiResponseItem) => [
              item.classCd,
              { classCd: item.classCd, classNm: item.classNm },
            ]),
          ).values(),
        );

        setLargeCategories(uniqueLargeCategories);

        const transformedData = Array.isArray(jsonResponse.data)
          ? jsonResponse.data.map((item: ApiResponseItem) => ({
              id: parseInt(item.groupCd || item.classCd),
              content: item.classCd,
              name: item.classNm,
              description: item.classDc,
              groupContent: item.groupCd,
              groupName: item.groupNm,
              groupDesc: item.groupDc,
              largeCategory: item.classCd,
              middleCategory: item.groupCd,
              isEditing: false,
            }))
          : [];

        setItems(transformedData);
      } catch (error: any) {
        setError(error.message || "알 수 없는 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, setItems]);

  return (
    <div>
      <PageTitle pageTitle={title} mode="xl" fontWeight="bold" />
      <ManagementHeader onSaveAll={() => {}} headerTitle={headerTitle} />
      {loading && <p>로딩 중...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <CategoryItemList
        items={items}
        fields={fields}
        onChange={handleChange}
        onSave={handleSave}
        onRemove={handleRemove}
        onEdit={handleEdit}
        largeCategories={largeCategories} // 대분류 데이터 전달
      />
      <div className="mx-auto flex w-[80%] justify-start py-2">
        <Button
          color="signature"
          mode="sm"
          content="+ 추가"
          onClick={handleAddItem}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
