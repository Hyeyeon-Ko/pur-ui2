"use client";

import Navbar from "@/components/layouts/Navbar";
import SideMenu from "@/components/layouts/SideMenu";
import colors from "@/styles/colors";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen flex dark:bg-black">
      {/* 사이드바 */}
      <div
        style={{ backgroundColor: colors.signature }}
        className={`transition-all duration-300 pl-1 border-r ${
          isSidebarOpen ? "w-60" : "w-16"
        }`}
      >
        <SideMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-col flex-1">
        {/* 네비게이션 바 */}
        <Navbar />

        {/* 컨텐츠 영역 */}
        <div className="flex-1 bg-white overflow-auto">{children}</div>
      </div>
    </div>
  );
}
