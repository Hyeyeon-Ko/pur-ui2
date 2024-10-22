import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Button from "../ui/atoms/button/Button";
import Link from "next/link";
import Label from "../ui/atoms/label/Label";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
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
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="p-1 mx-4 flex justify-end items-center">
      <Button mode="lg" onClick={toggleTheme} content="모드변경" />
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
                marginRight: "20px",
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
              marginRight: "20px",
              display: "flex",
              gap: "4px",
              alignItems: "center",
            }}
          />
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
