const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/images/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "master", "admin"],
      },
      {
        icon: "/images/home.png",
        label: "Menu1",
        href: "/main",
        visible: ["admin", "master"],
      },
      {
        icon: "/images/home.png",
        label: "Menu2",
        href: "/menu1",
        visible: ["admin", "master"],
      },
      {
        icon: "/images/home.png",
        label: "Menu3",
        href: "/",
        visible: ["admin", "master"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/images/home.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "master", "admin"],
      },
      {
        icon: "/images/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "master", "admin"],
      },
      {
        icon: "/images/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "master", "admin"],
      },
    ],
  },
];

import Image from "next/image";
import Link from "next/link";
import React from "react";

const SideMenu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((index) => (
        <div className="flex flex-col gap-2" key={index.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {index.title}
          </span>
          {index.items.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2"
            >
              <Image src={item.icon} alt="" width={20} height={20} />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
