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
        className={`text-gray-500 relative mx-2 flex cursor-pointer items-center justify-start rounded-md py-2 transition-colors duration-200 ${
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
          className={`mt-1 p-1 font-medium text-white ${
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
