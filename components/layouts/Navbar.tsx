"use client";
import React, { useEffect, useState } from "react"; // Import useEffect and useState
import Button from "../ui/atoms/button/Button";
import Link from "next/link";
import Label from "../ui/atoms/label/Label";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useDarkMode } from "@/context/DarkModeContext";

const Navbar: React.FC = () => {
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  const [user, setUser] = useState<any>(null); // Initialize user state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null); // Set user state from localStorage
  }, []); // Empty dependency array to run only on mount

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); // Update user state after logout
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
      <Button onClick={toggleDarkMode}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </Button>
    </nav>
  );
};

export default Navbar;
