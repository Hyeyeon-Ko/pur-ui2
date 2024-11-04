import { MdCalculate } from "react-icons/md";
import { FaFileContract, FaFileDownload } from "react-icons/fa";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { FiTool } from "react-icons/fi";

export const cardData = [
  {
    href: "/contract",
    icon: FaFileContract,
    label: "계약관리",
    bgColor: "bg-signature",
  },
  { href: "/tender", icon: MdCalculate, label: "입찰관리", bgColor: "bg-sub" },
  { href: "/page-d", icon: FiTool, label: "장비관리", bgColor: "bg-signature" },
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

export const deadlineItems = [
  {
    id: 1,
    href: "/list/30-days",
    title: "30일 이내",
    count: 1,
    gradientClass: "bg-gradient_0",
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
    gradientClass: "bg-Grey_Default",
  },
];
