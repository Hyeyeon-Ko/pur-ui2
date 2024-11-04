"use client";

import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdCalculate } from "react-icons/md";
import { RiSettings5Fill } from "react-icons/ri";
import { FaFileContract } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { MdDashboardCustomize } from "react-icons/md";
import { TbSquareNumber1Filled } from "react-icons/tb";
import { TbSquareNumber2Filled } from "react-icons/tb";
import { TbSquareNumber3Filled } from "react-icons/tb";
import Link from "next/link";
import colors from "@/styles/colors";
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
          icon: MdDashboardCustomize,
          label: "대시보드",
          href: "/main",
          visible: ["admin", "master"],
          tooltip: "대시보드",
        },
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
          icon: RiCheckboxMultipleLine,
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
          visible: ["admin", "master", "admin"],
          tooltip: "설정",
        },
      ],
    },
  ];

  return (
    <div
      style={{ backgroundColor: colors.signature }}
      className={`rounded-tr-lg rounded-br-lg min-h-screen ${
        isOpen ? "w-60" : "w-16"
      } duration-300 transition-all relative`}
    >
      <div className="p-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          style={{ fill: colors.white, cursor: "pointer" }}
          onClick={toggleSidebar}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {menuItems.map((section) => (
          <div className="flex flex-col gap-2" key={section.title}>
            <span
              style={{ color: colors.white }}
              className={`text-[#ffffff] m-4 ${isOpen ? "block" : "hidden"}`}
            >
              {section.title}
            </span>

            {section.items.map((item) => (
              <div
                key={item.label}
                className="relative"
                // css로 도전!
                onMouseEnter={() => setHoveredLabel(item.label)}
                onMouseLeave={() => setHoveredLabel(null)}
              >
                {/* 코드조회는 href 없이 클릭 시 토글 */}
                <div
                  className={`relative flex items-center justify-start text-gray-500 py-2 mx-2 rounded-md transition-colors duration-200 cursor-pointer`}
                  style={{ backgroundColor: "transparent" }}
                  onClick={() =>
                    item.onClick ? item.onClick() : router.push(item.href)
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.sub;
                    const svgElement = e.currentTarget.querySelector("svg");
                    const spanElement = e.currentTarget.querySelector("span");

                    if (svgElement) {
                      svgElement.style.fill = colors.white;
                    }

                    if (spanElement) {
                      spanElement.style.color = colors.white;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    const svgElement = e.currentTarget.querySelector("svg");
                    const spanElement = e.currentTarget.querySelector("span");

                    if (svgElement) {
                      svgElement.style.fill = colors.white;
                    }

                    if (spanElement) {
                      spanElement.style.color = colors.white;
                    }
                  }}
                >
                  <item.icon
                    size={20}
                    style={{ fill: colors.white }}
                    className={`transition-transform duration-300 cursor-pointer ${
                      isOpen ? "m-2" : "mx-auto"
                    }`}
                  />

                  <span
                    style={{ color: colors.white, fontWeight: "500" }}
                    className={`p-1 mt-1 text-[#ffffff] ${
                      isOpen ? "inline-block" : "hidden"
                    }`}
                  >
                    {item.label}
                  </span>

                  {!isOpen && hoveredLabel === item.label && (
                    <span
                      style={{
                        backgroundColor: colors.sub,
                        color: colors.white,
                        fontSize: "12px",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        position: "absolute",
                        left: "68px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "65px",
                        textAlign: "center",
                      }}
                      className="tooltip-bubble relative"
                    >
                      {item.tooltip}

                      <span
                        className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-sub"
                        style={{
                          borderColor: `transparent transparent transparent ${colors.sub}`,
                        }}
                      ></span>
                    </span>
                  )}
                </div>

                {/* 하위 메뉴 조건부 렌더링 */}
                {item.label === "코드조회" && codeMenuOpen && isOpen && (
                  <div className="flex flex-col gap-2">
                    {item.part.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className={`flex items-center text-gray-500 py-1 px-6 mx-2 gap-1 rounded-md transition-colors duration-200`}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = colors.sub;
                          const svgElement =
                            e.currentTarget.querySelector("svg");
                          const spanElement =
                            e.currentTarget.querySelector("span");

                          if (svgElement) {
                            svgElement.style.fill = colors.white;
                          }

                          if (spanElement) {
                            spanElement.style.color = colors.white;
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          const svgElement =
                            e.currentTarget.querySelector("svg");
                          const spanElement =
                            e.currentTarget.querySelector("span");

                          if (svgElement) {
                            svgElement.style.fill = colors.white;
                          }

                          if (spanElement) {
                            spanElement.style.color = colors.white;
                          }
                        }}
                      >
                        <subItem.icon
                          size={16}
                          style={{ fill: colors.white }}
                          className={`transition-transform duration-300 cursor-pointer m-2`}
                        />
                        <span style={{ color: colors.white }}>
                          {subItem.label}
                        </span>
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
