import React from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";

interface DashCardProps {
  href: string;
  icon: IconType;
  label: string;
  bgColor: string;
}

const DashCard: React.FC<DashCardProps> = ({
  href,
  icon: Icon,
  label,
  bgColor,
}) => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent) => {
    router.push(href);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex justify-center rounded-2xl shadow-lg ${bgColor} hover:bg-gray-100 h-[220px] transform cursor-pointer text-dark-Table_header transition hover:scale-105 hover:shadow-xl`}
    >
      <div className="flex items-center gap-6">
        <div className="text-4xl">
          <Icon />
        </div>
        <div className="text-gray-500 text-center text-2xl">{label}</div>
      </div>
    </div>
  );
};

export default DashCard;
