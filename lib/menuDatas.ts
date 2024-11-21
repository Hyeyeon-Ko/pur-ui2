import { MdDashboardCustomize, MdCalculate } from "react-icons/md";
import { FaFileContract } from "react-icons/fa";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import {
  TbSquareNumber1Filled,
  TbSquareNumber2Filled,
  TbSquareNumber3Filled,
} from "react-icons/tb";
import { AiOutlineTool } from "react-icons/ai";

const menuData = [
  {
    title: "MENU",
    items: [
      {
        icon: MdDashboardCustomize,
        label: "대시보드",
        href: "/main",
        tooltip: "대시보드",
      },
      {
        icon: MdCalculate,
        label: "입찰조회",
        href: "/tender",
        tooltip: "입찰조회",
      },
      {
        icon: FaFileContract,
        label: "계약조회",
        href: "/contract",
        tooltip: "계약조회",
      },
      {
        icon: AiOutlineTool,
        label: "장비관리",
        href: "/equipment",
        tooltip: "장비관리",
      },
      {
        icon: RiCheckboxMultipleLine,
        label: "코드조회",
        href: "/category/major",
        tooltip: "코드조회",
        part: [
          {
            icon: TbSquareNumber1Filled,
            label: "대분류",
            href: "/category/major",
          },
          {
            icon: TbSquareNumber2Filled,
            label: "중분류",
            href: "/category/middle",
          },
          {
            icon: TbSquareNumber3Filled,
            label: "소분류",
            href: "/category/small",
          },
        ],
      },
    ],
  },
];

export default menuData;
