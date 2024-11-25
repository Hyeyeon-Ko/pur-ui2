import React, { createContext, useContext } from "react";

interface CategoryVisibilityContextProps {
  majorCategory: boolean;
  middleCategory: boolean;
}

const CategoryVisibilityContext = createContext<
  CategoryVisibilityContextProps | undefined
>(undefined);

export const useCategoryVisibility = () => {
  const context = useContext(CategoryVisibilityContext);
  if (!context) {
    throw new Error(
      "useCategoryVisibility는 반드시 CategoryVisibilityProvider내에서 사용되어야 함",
    );
  }
  return context;
};

export const CategoryVisibilityProvider: React.FC<{
  children: React.ReactNode;
  majorCategory: boolean;
  middleCategory: boolean;
}> = ({ children, majorCategory, middleCategory }) => (
  <CategoryVisibilityContext.Provider value={{ majorCategory, middleCategory }}>
    {children}
  </CategoryVisibilityContext.Provider>
);
