"use client";

import Navbar from "@/components/layouts/Navbar";
import SideMenu from "@/components/layouts/SideMenu";
import colors from "@/styles/colors";
import { useState, useEffect } from "react";
import { useDarkMode } from "@/context/DarkModeContext"; // 다크모드 컨텍스트
import { getLocal, setLocal } from "@/utils/localStorage";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { isDarkMode } = useDarkMode(); // 다크모드 상태 가져오기

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
    // 로컬 스토리지에서 초기 사이드바 상태 가져오기
    // const storedSidebarState = getLocal("sidebar");
    // setIsSidebarOpen(storedSidebarState === "true" ? true : false); // "true" 문자열을 boolean으로 변환

    // // 초기 사이드바 상태를 콘솔에 출력
    // console.log("sidebar: ", storedSidebarState);

    // 윈도우 리사이즈 이벤트 핸들러 등록
    handleResize();
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 리사이즈 이벤트 핸들러 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const storedSidebarState = getLocal("sidebar");
    setIsSidebarOpen(storedSidebarState === "true" ? true : false); // "true" 문자열을
    console.log("sidebar: ", storedSidebarState);
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
        <Navbar /> {/* isDarkMode는 Navbar에서 사용할 수 있음 */}
        {/* 컨텐츠 영역 */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
