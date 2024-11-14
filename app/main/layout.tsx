"use client";

import dynamic from "next/dynamic";
// import Navbar from "@/components/layouts/Navbar";
import { useDarkMode } from "@/context/DarkModeContext";

const Navbar = dynamic(() => import("@/components/layouts/Navbar"), {
  ssr: false, // 서버 사이드 렌더링을 비활성화합니다
});

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`h-screen flex ${
        isDarkMode ? "dark:bg-dark-Grey_Darken_5" : "bg-Table_header"
      }`}
    >
      <div className="flex flex-col flex-1">
        <div className="mx-28 my-6 border border-none rounded-xl shadow-md bg-white dark:bg-Grey_Background">
          {/* 네비게이션 바 */}
          <Navbar /> {/* isDarkMode는 Navbar에서 사용할 수 있음 */}
          {/* 컨텐츠 영역 */}
        </div>
        <div className="flex-1 overflow-auto flex flex-col my-4">
          {children}
        </div>
      </div>
    </div>
  );
}
