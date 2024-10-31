"use client";

import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdCalculate } from "react-icons/md";
import { RiSettings5Fill } from "react-icons/ri";
import { FaFileContract } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import {
  TbSquareNumber1Filled,
  TbSquareNumber2Filled,
  TbSquareNumber3Filled,
} from "react-icons/tb";
import Link from "next/link";
import colors from "@/styles/colors"; // colors를 Tailwind 색상으로 변환할 수 있다면 수정 필요
import { useRouter } from "next/navigation";

const SideMenu = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [codeMenuOpen, setCodeMenuOpen] = useState<boolean>(true);
  const router = useRouter();

  const toggleCodeMenuAndNavigate = (href: string) => {
    setCodeMenuOpen((prev) => !prev);
    router.push(href);
  };

  const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: MdCalculate,
          label: "입찰조회",
          href: "/tender",
          visible: ["admin", "master"],
          tooltip: "입찰조회",
        },
        {
          icon: FaFileContract,
          label: "계약조회",
          href: "/contract",
          visible: ["admin", "master"],
          tooltip: "계약조회",
        },
        {
          icon: RiAdminFill,
          label: "코드조회",
          href: "/category/major",
          visible: ["admin", "master"],
          tooltip: "코드조회",
          onClick: () => toggleCodeMenuAndNavigate("/category/major"),
          part: [
            {
              icon: TbSquareNumber1Filled,
              label: "대분류",
              href: "/category/major",
              visible: ["admin", "master"],
            },
            {
              icon: TbSquareNumber2Filled,
              label: "중분류",
              href: "/category/middle",
              visible: ["admin", "master"],
            },
            {
              icon: TbSquareNumber3Filled,
              label: "소분류",
              href: "/category/small",
              visible: ["admin", "master"],
            },
          ],
        },
      ],
    },
    {
      title: "OTHER",
      items: [
        {
          icon: RiSettings5Fill,
          label: "SETTINGS",
          href: "/settings",
          visible: ["admin", "master"],
          tooltip: "설정",
        },
      ],
    },
  ];

  return (
    <div
      className={`bg-[${
        colors.signature
      }] rounded-tr-lg rounded-br-lg min-h-screen ${
        isOpen ? "w-60" : "w-16"
      } duration-300 transition-all relative`}
    >
      <div className="p-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="fill-white cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {menuItems.map((section) => (
          <div className="flex flex-col gap-2" key={section.title}>
            <span className={`text-white m-4 ${isOpen ? "block" : "hidden"}`}>
              {section.title}
            </span>

            {section.items.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setHoveredLabel(item.label)}
                onMouseLeave={() => setHoveredLabel(null)}
              >
                <div
                  className={`relative flex items-center justify-start text-gray-500 py-2 mx-2 rounded-md transition-colors duration-200 cursor-pointer hover:bg-sub hover:text-white`}
                  onClick={() =>
                    item.onClick ? item.onClick() : router.push(item.href)
                  }
                >
                  <item.icon
                    size={20}
                    className={`text-white transition-transform duration-300 cursor-pointer ${
                      isOpen ? "m-2" : "mx-auto"
                    }`}
                  />

                  <span
                    className={`text-white font-medium p-1 mt-1 ${
                      isOpen ? "inline-block" : "hidden"
                    }`}
                  >
                    {item.label}
                  </span>

                  {!isOpen && hoveredLabel === item.label && (
                    <span className="bg-sub text-white text-xs p-1 rounded-md absolute left-16 top-1/2 transform -translate-y-1/2 w-40 text-center">
                      {item.tooltip}
                      <span className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-sub"></span>
                    </span>
                  )}
                </div>

                {/* 하위 메뉴 조건부 렌더링 */}
                {item.label === "코드조회" && codeMenuOpen && isOpen && (
                  <div className="flex flex-col px-6 mx-2 gap-2">
                    {item.part.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className={`flex items-center text-gray-500 py-1 mx-2 rounded-md transition-colors duration-200 hover:bg-sub hover:text-white`}
                      >
                        <subItem.icon
                          size={16}
                          className={`text-white transition-transform duration-300 cursor-pointer m-2`}
                        />
                        <span className="text-white">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
