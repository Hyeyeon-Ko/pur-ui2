"use client";

import Navbar from "@/components/layouts/Navbar";
import SideMenu from "@/components/layouts/SideMenu";
import colors from "@/styles/colors";
import { useState, useEffect } from "react";
import { useDarkMode } from "@/context/DarkModeContext";
import { getLocal, setLocal } from "@/utils/localStorage";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isDarkMode } = useDarkMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    // 로컬 스토리지에서 사이드바 상태 가져오기
    const storedSidebarState = getLocal("sidebar");
    if (storedSidebarState !== null) {
      setIsSidebarOpen(storedSidebarState === "true");
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newState = !prev;
      setLocal({ key: "sidebar", value: newState }); // 로컬 스토리지에 상태 저장
      return newState;
    });
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  useEffect(() => {
    // 윈도우 리사이즈 이벤트 핸들러 등록
    handleResize();
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 리사이즈 이벤트 핸들러 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`h-screen flex ${
        isDarkMode ? "dark:bg-dark-Grey_Darken_5" : "bg-white"
      }`}
    >
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
        <div className="flex-1 overflow-auto flex flex-col mb-4">
          {children}
        </div>
      </div>
    </div>
  );
}
