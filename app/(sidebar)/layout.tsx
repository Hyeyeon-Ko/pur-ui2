"use client";

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
    <div className="h-screen flex">
      {/* 사이드바 */}
      <div
        style={{ backgroundColor: colors["Blue_C_Lighten-6"] }}
        className={`transition-all duration-300 pl-1 border-r ${
          isSidebarOpen ? "w-60" : "w-16"
        }`}
      >
        <SideMenu isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* 컨텐츠 영역 */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "w-[calc(100%-15rem)]" : "w-[calc(100%-4rem)]"
        } bg-white overflow-scroll`}
      >
        {children}
      </div>
    </div>
  );
}
