"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("isDarkMode");
    const initialMode = storedMode === "true";

    setIsDarkMode(initialMode);
    document.documentElement.classList.toggle("dark", initialMode);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "isDarkMode") {
        const newMode = event.newValue === "true";
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle("dark", newMode);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem("isDarkMode", String(newMode));
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
