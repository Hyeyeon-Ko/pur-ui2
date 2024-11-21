import colors from "@/styles/colors";
import Link from "next/link";

const SubMenuItem = ({
  subItems,
  isOpen,
}: {
  subItems: any[];
  isOpen: boolean;
}) => (
  <>
    {subItems.map((subItem) => (
      <Link
        key={subItem.label}
        href={subItem.href}
        className="flex items-center text-gray-500 py-2 px-6 mx-2 gap-1 rounded-md transition-colors duration-200 hover:bg-sub"
      >
        <subItem.icon
          size={16}
          style={{ fill: colors.white }}
          className="m-2"
        />
        {isOpen && <span style={{ color: colors.white }}>{subItem.label}</span>}
      </Link>
    ))}
  </>
);

export default SubMenuItem;
