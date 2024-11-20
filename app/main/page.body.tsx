import React, { useEffect, useState } from "react";
import { FaUserClock } from "react-icons/fa";
import DashCard from "@/components/ui/atoms/dashboard/DashCard";
import ListItem from "@/components/ui/molecules/dashboard/ListItem";
import { getLocal, setLocal } from "@/utils/localStorage";
import DashboardSection from "@/components/ui/organism/dashboard/DashboardSection";
import { MdCalculate } from "react-icons/md";
import { FaFileContract, FaFileDownload } from "react-icons/fa";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { FiTool } from "react-icons/fi";

const DashboardBody = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getLocal("user");
    let userData = null;

    if (storedUser) {
      try {
        userData = storedUser; 
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }

    setUser(userData);
  }, []);

  const cardData = [
    {
      "href": "/contract",
      "icon": FaFileContract,
      "label": "계약관리",
      "bgColor": "bg-signature",
    },
    {
      "href": "/tender",
      "icon": MdCalculate,
      "label": "입찰관리",
      "bgColor": "bg-sub",
    },
    {
      "href": "/equipment",
      "icon": FiTool,
      "label": "장비관리",
      "bgColor": "bg-signature",
    },
    {
      "href": "/category/major",
      "icon": RiCheckboxMultipleLine,
      "label": "코드조회",
      "bgColor": "bg-sub",
    },
    {
      "href": "/page-d",
      "icon": FaFileDownload,
      "label": "매뉴얼 다운로드",
      "bgColor": "bg-signature",
    }
  ];

  const deadlineItems = [
    {
      "id": 1,
      "href": "/contract",
      "title": "30일 이내",
      "count": 1,
      "gradientClass": "bg-Red_Darken_1",
    },
    {
      "id": 2,
      "href": "/contract",
      "title": "60일 이내",
      "count": 3,
      "gradientClass": "bg-gradient_1",
    },
    {
      "id": 3,
      "href": "/contract",
      "title": "90일 이내",
      "count": 10,
      "gradientClass": "bg-gradient_2",
    },
    {
      "id": 4,
      "href": "/contract",
      "title": "120일 이내",
      "count": 3,
      "gradientClass": "bg-gradient_3",
    },
    {
      "id": 5,
      "href": "/contract",
      "title": "180일 이내",
      "count": 20,
      "gradientClass": "bg-gradient_4",
    },
    {
      "id": 6,
      "href": "/contract",
      "title": "365일 이내",
      "count": 10,
      "gradientClass": "bg-gradient_5",
    },
    {
      "id": 7,
      "href": "/contract",
      "title": "계약만료",
      "count": 300,
      "gradientClass": "bg-Grey_Default",
    }
  ];

  // 컴포넌트가 마운트될 때 로컬 스토리지에 cardData와 deadlineItems 저장
  useEffect(() => {
    setLocal({ key: "cardData", value: cardData });
    setLocal({ key: "deadlineItems", value: deadlineItems });
  }, []);

  return (
    <div className="flex flex-col ">
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

export default DashboardBody;
