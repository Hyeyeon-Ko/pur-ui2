"use client";
import React, { useEffect, useState } from "react";
import Button from "../ui/atoms/button/Button";
import Link from "next/link";
import Label from "../ui/atoms/label/Label";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDarkMode } from "@/context/DarkModeContext";
import { FaMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import colors from "@/styles/colors";

const Navbar: React.FC = () => {
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) {
    return null;
  }

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

      {isDarkMode ? (
        <MdOutlineWbSunny
          size={24}
          style={{ color: colors.warning }}
          onClick={toggleDarkMode}
        />
      ) : (
        <FaMoon
          size={24}
          style={{ color: colors.Button_Default }}
          onClick={toggleDarkMode}
        />
      )}
    </nav>
  );
};

export default Navbar;
