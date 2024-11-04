"use client";

import React, { useEffect, useState } from "react";
import { FaUserClock } from "react-icons/fa";
import DashCard from "@/components/ui/atoms/dashboard/DashCard";
import Greeting from "@/components/ui/atoms/dashboard/Greeting";
import ListItem from "@/components/ui/molecules/dashboard/ListItem";
import { getLocal } from "@/utils/localStorage";
import { cardData, deadlineItems } from "@/lib/dashboardData";
import DashboardSection from "@/components/ui/organism/dashboard/DashboardSection";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getLocal("user");
    const userData = storedUser ? JSON.parse(storedUser) : null;
    setUser(userData);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex w-[90%] p-10 mx-auto items-center">
        {user && <Greeting user={user} />}
      </div>

      <div className="grid grid-cols-5 gap-4 w-[90%] p-5 mx-auto">
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

      <DashboardSection icon={FaUserClock} title="유효 계약 건수">
        {deadlineItems.map((item, index) => (
          <ListItem
            key={item.id}
            href={item.href}
            title={item.title}
            count={item.count}
            gradientClass={item.gradientClass}
            isFirst={index === 0}
            isLast={index === deadlineItems.length - 1}
          />
        ))}
      </DashboardSection>
    </div>
  );
};

export default Dashboard;
