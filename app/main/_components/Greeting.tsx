import React from "react";
import Label from "@/components/ui/atoms/label/Label";
import { SiNicehash } from "react-icons/si";
import { useDarkMode } from "@/context/DarkModeContext";
import colors from "@/styles/colors";

interface GreetingProps {
  user: { employeeId: string };
}

const Greeting: React.FC<GreetingProps> = ({ user }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="flex items-center">
      <Label
        content={`안녕하세요. ${user.employeeId} 님`}
        mode="xl"
        customStyle={{
          color: isDarkMode ? colors.white : colors["Grey_Darken-5"],
        }}
      />
      <SiNicehash className="text-3xl p-1" />
    </div>
  );
};

export default Greeting;
