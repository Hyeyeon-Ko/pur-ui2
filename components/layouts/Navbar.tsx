import { useEffect, useState } from "react";
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 사용자 정보를 가져옴
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="p-4 mx-4 flex justify-end items-center">
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
                marginRight: "12px",
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

      {currentTheme === "dark" ? (
        <FaSun size={20} onClick={toggleTheme} />
      ) : (
        <FaMoon
          size={20}
          onClick={toggleTheme}
          style={{ color: colors.Button_Default }}
        />
      )}
    </nav>
  );
};

export default Navbar;
