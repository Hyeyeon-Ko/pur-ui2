import Link from "next/link";
import Label from "../../atoms/label/Label";
import colors from "@/styles/colors";

interface ListItemProps {
  href: string;
  title: string;
  count: number;
  gradientClass: string;
  isFirst: boolean;
  isLast: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
  href,
  title,
  count,
  gradientClass,
  isFirst,
  isLast,
}) => {
  const borderRadiusClass = isFirst
    ? "rounded-l-xl"
    : isLast
    ? "rounded-r-xl"
    : "";

  return (
    <Link
      href={href}
      className={`flex flex-col p-5 justify-center items-center ${gradientClass} ${borderRadiusClass} h-full hover:scale-101 hover:shadow-xl transform`}
    >
      <Label mode="lg" content={title} customStyle={{ color: colors.white }} />
      <Label
        mode="sm"
        content={`${count} 건`}
        customStyle={{ color: colors.warning }}
      />
    </Link>
  );
};

export default ListItem;
