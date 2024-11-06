import React from "react";
import { IconType } from "react-icons";
import Toast, { ToastType } from "@/components/commons/Toast";
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
    if (label === "장비관리") {
      event.preventDefault();
      Toast.notify("해당 페이지는 준비중 입니다!", ToastType.INFO);
    } else {
      router.push(href);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex rounded-2xl shadow-lg p-10 ${bgColor} text-dark-Table_header cursor-pointer hover:bg-gray-100 transition hover:scale-105 hover:shadow-xl transform`}
    >
      <div className="flex items-center gap-6">
        <div className="text-4xl">
          <Icon />
        </div>
        <div className="text-lg text-gray-500">{label}</div>
      </div>
    </div>
  );
};

export default DashCard;
