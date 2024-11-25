"use client";

import Navbar from "@/components/layouts/Navbar";
import { useDarkMode } from "@/context/DarkModeContext";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "dark:bg-dark-Grey_Darken_5" : "bg-Table_header"
      }`}
    >
      <div className="flex flex-1 flex-col">
        <div className="mx-28 my-6 rounded-xl border border-none bg-white shadow-md dark:bg-Grey_Background">
          {/* 네비게이션 바 */}
          <Navbar /> {/* isDarkMode는 Navbar에서 사용할 수 있음 */}
          {/* 컨텐츠 영역 */}
        </div>
        <div className="my-4 flex flex-1 flex-col overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
