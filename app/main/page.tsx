import React from "react";
import { MdCalculate } from "react-icons/md";
import { FaFileContract } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FiTool } from "react-icons/fi";
import DashCard from "@/components/ui/atoms/card/DashCard";

const cardData = [
  {
    href: "/tender",
    icon: MdCalculate,
    number: 100,
    label: "입찰조회",
    bgColor: "bg-sub",
  },
  {
    href: "/contract",
    icon: FaFileContract,
    number: 250,
    label: "계약조회",
    bgColor: "bg-signature",
  },
  {
    href: "/category/major",
    icon: RiAdminFill,
    number: 20,
    label: "코드조회",
    bgColor: "bg-sub",
  },
  {
    href: "/page-d",
    icon: FiTool,
    number: 320,
    label: "장비카드등록",
    bgColor: "bg-signature",
  },
];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 gap-10 w-[80%] p-10 mx-auto">
      {cardData.map((card, index) => (
        <DashCard
          key={index} 
          href={card.href}
          icon={card.icon}
          number={card.number}
          label={card.label}
          bgColor={card.bgColor}
        />
      ))}
    </div>
  );
};

export default Dashboard;
