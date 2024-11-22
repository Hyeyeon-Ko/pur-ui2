import React from "react";
import { IconType } from "react-icons";
import { useDarkMode } from "@/context/DarkModeContext";
import Label from "@/components/ui/atoms/label/Label";
import colors from "@/styles/colors";

interface DashboardSectionProps {
  icon?: IconType;
  title: string;
  children: React.ReactNode;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({
  icon: Icon,
  title,
  children,
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="dark:bg-Grey_Background bg-white flex flex-col gap-5 w-[88%] p-5 mx-auto my-12 rounded-2xl shadow-lg">
      <div className="flex gap-2 items-center">
        {Icon && <Icon className="text-2xl" />}
        <Label
          customStyle={{
            color: isDarkMode ? colors.white : colors["Green_Darken-5"],
          }}
          content={title}
          mode="lg"
        />
      </div>
      <div className="flex justify-center mb-5 rounded-lg text-white">
        {children}
      </div>
    </div>
  );
};

export default DashboardSection;
