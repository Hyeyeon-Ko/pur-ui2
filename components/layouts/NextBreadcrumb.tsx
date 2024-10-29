import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  menuItems: { label: string; href: string }[]; // menuItems prop 추가
};

const NextBreadcrumb = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
  menuItems,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div>
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link href={"/"}>{homeElement}</Link>
        </li>
        {pathNames.length > 0 && separator}

        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join("/")}`;
          const itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;

          // menuItems에서 label을 찾기
          const menuItem = menuItems.find((item) => item.href === href);
          let displayLabel = menuItem ? menuItem.label : link; // 기본적으로 경로 링크 이름

          // 대분류, 중분류, 소분류를 위한 추가 처리
          if (index >= 2 && pathNames[index - 1] === "category") {
            const subCategoryLabel = menuItems.find(
              (item) => item.href === href
            );
            if (subCategoryLabel) {
              displayLabel = subCategoryLabel.label; // 하위 메뉴 항목의 레이블로 변경
            }
          }

          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href}>
                  {capitalizeLinks
                    ? displayLabel.charAt(0).toUpperCase() +
                      displayLabel.slice(1)
                    : displayLabel}
                </Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default NextBreadcrumb;
