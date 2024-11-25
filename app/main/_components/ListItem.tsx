import Link from "next/link";
import colors from "@/styles/colors";
import Label from "@/components/ui/atoms/label/Label";

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
      className={`flex flex-col items-center justify-center p-5 dark:opacity-75 ${gradientClass} ${borderRadiusClass} hover:scale-101 h-full transform hover:shadow-xl`}
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
