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
    <nav className="p-4 mx-8 flex gap-4 justify-end items-center">
      {user ? (
        <div className="flex gap-4 items-center">
          <Label
            customStyle={{
              color: isDarkMode ? colors.white : colors["Grey_Darken-5"],
            }}
            content={user.employeeId}
            mode="lg"
          />
          <Link href="/login">
            <Button
              mode="sm"
              color="signature"
              onClick={handleLogout}
              customStyle={{
                borderRadius: "25px",
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                alignItems: "center",
                padding: "12px 20px",
                minWidth: "120px",
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
            mode="sm"
            color="signature"
            customStyle={{
              borderRadius: "25px",
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              alignItems: "center",
              padding: "12px 20px",
              minWidth: "120px",
            }}
          >
            <span>로그인</span>
            <RiLogoutCircleRLine className="my-1" />
          </Button>
        </Link>
      )}
      <div className="cursor-pointer" onClick={toggleDarkMode}>
        {isDarkMode ? (
          <MdOutlineWbSunny size={28} style={{ color: colors.warning }} />
        ) : (
          <FaMoon size={28} style={{ color: colors.Button_Default }} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
