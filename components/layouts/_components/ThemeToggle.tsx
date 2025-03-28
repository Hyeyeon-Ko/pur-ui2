import { useDarkMode } from "@/context/DarkModeContext";
import colors from "@/styles/colors";
import { CSSProperties } from "react";
import { FaMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";

interface ThemeProps {
  customStyle?: CSSProperties;
}

const ThemeToggle: React.FC<ThemeProps> = () => {
  const { toggleDarkMode, isDarkMode } = useDarkMode();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        marginRight: "24px",
      }}
    >
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
    </div>
  );
};

export default ThemeToggle;
