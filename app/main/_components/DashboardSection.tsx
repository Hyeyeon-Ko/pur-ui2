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
    <div className="mx-auto my-12 flex w-[88%] flex-col gap-5 rounded-2xl bg-white p-5 shadow-lg dark:bg-Grey_Background">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="text-2xl" />}
        <Label
          customStyle={{
            color: isDarkMode ? colors.white : colors["Green_Darken-5"],
          }}
          content={title}
          mode="lg"
        />
      </div>
      <div className="mb-5 flex justify-center rounded-lg text-white">
        {children}
      </div>
    </div>
  );
};

export default DashboardSection;
