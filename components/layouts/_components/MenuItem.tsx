import Tooltip from "@/components/ui/atoms/tooltip/Tootip";
import colors from "@/styles/colors";
import SubMenuItem from "./SubMenuItem";
import Link from "next/link";

const MenuItem = ({
  item,
  isOpen,
  hoveredLabel,
  setHoveredLabel,
}: {
  item: any;
  isOpen: boolean;
  hoveredLabel: string | null;
  setHoveredLabel: (label: string | null) => void;
}) => (
  <div
    className="relative"
    onMouseEnter={() => setHoveredLabel(item.label)}
    onMouseLeave={() => setHoveredLabel(null)}
  >
    <Link href={item.href || "#"} passHref>
      <div
        className={`relative flex items-center justify-start text-gray-500 py-2 mx-2 rounded-md transition-colors duration-200 cursor-pointer ${
          isOpen ? "hover:bg-sub" : ""
        }`}
      >
        <item.icon
          size={20}
          style={{ fill: colors.white }}
          className={`transition-transform duration-300 ${
            isOpen ? "m-2" : "mx-auto"
          }`}
        />
        <span
          className={`p-1 mt-1 text-white font-medium ${
            isOpen ? "inline-block" : "hidden"
          }`}
        >
          {item.label}
        </span>
      </div>
    </Link>
    {!isOpen && hoveredLabel === item.label && <Tooltip text={item.tooltip} />}
    {item.part && isOpen && (
      <SubMenuItem subItems={item.part} isOpen={isOpen} />
    )}
  </div>
);

export default MenuItem;
