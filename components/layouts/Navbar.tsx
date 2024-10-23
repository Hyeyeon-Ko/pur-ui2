import { useState } from "react";
import { useTheme } from "next-themes";
import Button from "../ui/atoms/button/Button";
import Link from "next/link";
import Label from "../ui/atoms/label/Label";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import colors from "@/styles/colors";

const Navbar = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [user, setUser] = useState(() => {
    // 초기 상태에서 로컬 스토리지에서 사용자 정보를 가져옴
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="p-1 mx-4 flex justify-end items-center">
      {user ? (
        <div className="flex gap-4 items-center">
          <Label content={user.employeeId} mode="lg" />
          <Link href="/login">
            <Button
              mode="sm"
              color="signature"
              onClick={handleLogout}
              customStyle={{
                borderRadius: "25px",
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <span>로그아웃</span>
              <RiLogoutCircleRLine className="my-1" />
            </Button>
          </Link>
        </div>
      ) : (
        <Link href="/login">
          <Button
            mode="xs"
            content="로그인"
            color="signature"
            customStyle={{
              borderRadius: "25px",
              display: "flex",
              gap: "4px",
              alignItems: "center",
            }}
          />
        </Link>
      )}
      <Button
        mode="xs"
        onClick={toggleTheme}
        color="transparent"
        hoverEffect={false}
      >
        {currentTheme === "dark" ? (
          <FaSun size={20} />
        ) : (
          <FaMoon size={20} style={{ color: colors.Button_Default }} />
        )}
      </Button>
    </nav>
  );
};

export default Navbar;
