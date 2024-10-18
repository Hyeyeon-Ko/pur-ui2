"use client";

import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdCalculate } from "react-icons/md";
import { RiLogoutBoxRFill, RiSettings5Fill } from "react-icons/ri";
import { FaFileContract } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import Link from "next/link";
import colors from "@/styles/colors";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: ImHome,
        label: "HOME",
        href: "/",
        visible: ["admin", "master", "admin"],
      },
      {
        icon: MdCalculate,
        label: "ELEMENTS",
        href: "/main",
        visible: ["admin", "master"],
      },
      {
        icon: FaFileContract,
        label: "TABLE",
        href: "/menu1",
        visible: ["admin", "master"],
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
      },
      {
        icon: RiLogoutBoxRFill,
        label: "LOGOUT",
        href: "/logout",
        visible: ["admin", "master", "admin"],
      },
    ],
  },
];

const SideMenu = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
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
              <Link
                href={item.href}
                key={item.label}
                className={`relative flex items-center justify-start text-gray-500 py-2 mx-2 rounded-md transition-colors duration-200`}
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.sub;
                  const svgElement = e.currentTarget.querySelector("svg");
                  const spanElement = e.currentTarget.querySelector("span");

                  if (svgElement) {
                    svgElement.style.fill = colors.signature;
                  }

                  if (spanElement) {
                    spanElement.style.color = colors.signature;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  const svgElement = e.currentTarget.querySelector("svg");
                  const spanElement = e.currentTarget.querySelector("span");

                  if (svgElement) {
                    svgElement.style.fill = colors.sub;
                  }

                  if (spanElement) {
                    spanElement.style.color = colors.sub;
                  }
                }}
              >
                <item.icon
                  size={20}
                  style={{ fill: colors.sub }}
                  className={`transition-transform duration-300 cursor-pointer ${
                    isOpen ? "m-2" : "mx-auto"
                  }`}
                />

                <span
                  style={{ color: colors.sub, fontWeight: "500" }}
                  className={`p-1 mt-1 text-[#ffffff] ${
                    isOpen ? "inline-block" : "hidden"
                  }`}
                >
                  {item.label}
                </span>

                {!isOpen && (
                  <span className="absolute left-20 bg-white text-black shadow-lg rounded-md p-1 opacity-0 whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
