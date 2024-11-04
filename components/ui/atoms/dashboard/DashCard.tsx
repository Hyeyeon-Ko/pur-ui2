import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";

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
  return (
    <Link href={href}>
      <div
        className={`flex rounded-2xl shadow-lg p-10 ${bgColor} text-dark-Table_header cursor-pointer hover:bg-gray-100 transition hover:scale-105 hover:shadow-xl transform`}
      >
        <div className="flex items-center gap-6">
          <div className="text-4xl">
            <Icon />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-lg text-gray-500">{label}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashCard;
