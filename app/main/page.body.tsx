import React, { useEffect, useState, useMemo } from "react";
import { FaUserClock, FaFileContract, FaFileDownload } from "react-icons/fa";
import { MdCalculate } from "react-icons/md";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { FiTool } from "react-icons/fi";
import { Pie } from "react-chartjs-2";
import DashboardSection from "@/app/main/_components/DashboardSection";
import DashCard from "../main/_components/DashCard";
import { getLocal } from "@/utils/localStorage";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartEvent,
  ActiveElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useDarkMode } from "@/context/DarkModeContext";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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
    href: "/equipment",
    icon: FiTool,
    label: "장비관리",
    bgColor: "bg-signature",
  },
  {
    href: "/category/major",
    icon: RiCheckboxMultipleLine,
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

const pieChartData = {
  labels: [
    "30일 이내",
    "60일 이내",
    "90일 이내",
    "120일 이내",
    "180일 이내",
    "365일 이내",
    "계약만료",
  ],
  datasets: [
    {
      label: "계약현황",
      data: [3, 5, 2, 4, 1, 1, 20],
      backgroundColor: [
        "#AD0000",
        "#2e2e7a",
        "#3949AB",
        "#5454be",
        "#7986CB",
        "#7E57C2",
        "#888888",
      ],
      hoverOffset: 4,
    },
  ],
};

const TestBody: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const storedUser = getLocal("user");
    const userData = storedUser ? JSON.parse(storedUser) : null;
    setUser(userData);
  }, []);

  const pieChartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
        },
      },
      plugins: {
        tooltip: { enabled: true },
        legend: {
          position: "right" as const,
          align: "center" as const,
          labels: {
            boxWidth: 50,
            padding: 20,
            color: isDarkMode ? "#ffffff" : "#000000",
          },
        },
        datalabels: {
          display: true,
          color: "white",
          font: { size: 14, weight: "bold" as const },
          formatter: (value: number) => `${value}건`,
        },
      },
      cutout: "40%",
      elements: {
        arc: { borderWidth: 0 },
      },
      onClick: (event: ChartEvent, elements: ActiveElement[]) => {
        if (elements.length > 0) {
          window.location.href = "/contract";
        }
      },
    }),
    [isDarkMode]
  );

  return (
    <div className="flex flex-col">
      {/* Dash Cards */}
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

      {/* Dashboard Section - 파이 Chart */}
      <DashboardSection icon={FaUserClock} title="계약 건수 현황">
        <div className="w-[550px] h-[550px]">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </DashboardSection>
    </div>
  );
};

export default TestBody;
