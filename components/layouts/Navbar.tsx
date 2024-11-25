"use client";
import React, { useEffect, useState } from "react";
import UserInfo from "./_components/UserInfo";
import ThemeToggle from "./_components/ThemeToggle";
import { useDarkMode } from "@/context/DarkModeContext";

const Navbar: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [user, setUser] = useState<{ employeeId: string } | null>(null);
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
    <nav className="mx-8 flex items-center justify-end gap-4 p-4">
      <div>
        {user ? (
          <UserInfo
            user={user}
            onLogout={handleLogout}
            isDarkMode={isDarkMode}
          />
        ) : (
          <UserInfo
            user={{ employeeId: "Guest" }}
            onLogout={() => {}}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
