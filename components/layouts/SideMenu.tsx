"use client";

import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import colors from "@/styles/colors";
import classNames from "classnames";
import MenuItem from "./_components/MenuItem";
import menuData from "@/lib/menuDatas";

const SideMenu = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  return (
    <div
      style={{ backgroundColor: colors.signature }}
      className={classNames(
        "relative min-h-screen rounded-br-lg rounded-tr-lg transition-all",
        {
          "w-60": isOpen,
          "w-16": !isOpen,
        },
      )}
    >
      <div className="flex justify-end p-3">
        <HiMenuAlt3
          size={26}
          style={{ fill: colors.white, cursor: "pointer" }}
          onClick={toggleSidebar}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {menuData.map(section => (
          <div key={section.title} className="flex flex-col gap-2">
            <span className={classNames("m-4 text-white", { hidden: !isOpen })}>
              {section.title}
            </span>
            {/* 메뉴 : 메뉴 이하에 하위메뉴 컴포넌트가 포함되어 있음*/}
            {section.items.map(item => (
              <MenuItem
                key={item.label}
                item={item}
                isOpen={isOpen}
                hoveredLabel={hoveredLabel}
                setHoveredLabel={setHoveredLabel}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
