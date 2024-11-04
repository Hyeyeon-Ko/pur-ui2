"use client";

import React, { useEffect, useState } from "react";
import { MdCalculate } from "react-icons/md";
import { FaFileContract } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FiTool } from "react-icons/fi";
import { FaFileDownload } from "react-icons/fa";
import { SiNicehash } from "react-icons/si";
import DashCard from "@/components/ui/atoms/dashboard/DashCard";
import { getLocal } from "@/utils/localStorage";
import Label from "@/components/ui/atoms/label/Label";
import colors from "@/styles/colors";
import { useDarkMode } from "@/context/DarkModeContext";
import ListItem from "@/components/ui/molecules/dashboard/ListItem";

const cardData = [
  {
    href: "/contract",
    icon: FaFileContract,
    label: "계약관리",
    bgColor: "bg-signature",
  },
  {
    href: "/tender",
    icon: MdCalculate,
    label: "입찰관리",
    bgColor: "bg-sub",
  },
  {
    href: "/page-d",
    icon: FiTool,
    label: "장비관리",
    bgColor: "bg-signature",
  },
  {
    href: "/category/major",
    icon: RiAdminFill,
    label: "코드조회",
    bgColor: "bg-sub",
  },
  {
    href: "/page-d",
    icon: FaFileDownload,
    label: "매뉴얼 다운로드",
    bgColor: "bg-signature",
  },
];

const deadlineItems = [
  {
    id: 1,
    href: "/list/30-days",
    title: "30일 이내",
    count: 1,
    gradientClass: "bg-gradient_0 rounded-tl-lg rounded-bl-lg",
  },
  {
    id: 2,
    href: "/list/60-days",
    title: "60일 이내",
    count: 3,
    gradientClass: "bg-gradient_1",
  },
  {
    id: 3,
    href: "/list/90-days",
    title: "90일 이내",
    count: 10,
    gradientClass: "bg-gradient_2",
  },
  {
    id: 4,
    href: "/list/120-days",
    title: "120일 이내",
    count: 3,
    gradientClass: "bg-gradient_3",
  },
  {
    id: 5,
    href: "/list/180-days",
    title: "180일 이내",
    count: 20,
    gradientClass: "bg-gradient_4",
  },
  {
    id: 6,
    href: "/list/365-days",
    title: "365일 이내",
    count: 10,
    gradientClass: "bg-gradient_5",
  },
  {
    id: 7,
    href: "/list/expired",
    title: "계약만료",
    count: 300,
    gradientClass: "bg-Grey_Default rounded-tr-lg rounded-br-lg",
  },
];

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const storedUser = getLocal("user");
    const userData = storedUser ? JSON.parse(storedUser) : null;
    setUser(userData);
  }, []);

  return (
    <div className="flex flex-col">
      {user && (
        <div className="flex w-[80%] p-10 mx-auto items-center">
          <Label
            customStyle={{
              color: isDarkMode ? colors.white : colors["Grey_Darken-5"],
            }}
            content={`안녕하세요. ${user.employeeId} 님`}
            mode="xl"
          />
          <SiNicehash className="text-3xl p-1" />
        </div>
      )}
      <div className="grid grid-cols-5 gap-10 w-[80%] p-10 mx-auto">
        {cardData.map((card, index) => (
          <DashCard
            key={index}
            href={card.href}
            icon={card.icon}
            label={card.label}
            bgColor={card.bgColor}
          />
        ))}
      </div>
      <div className="grid grid-cols-7 w-[80%] p-10 mx-auto h-50 rounded-lg text-white">
        {deadlineItems.map((item) => (
          <ListItem
            key={item.id}
            href={item.href}
            title={item.title}
            count={item.count}
            gradientClass={item.gradientClass}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
