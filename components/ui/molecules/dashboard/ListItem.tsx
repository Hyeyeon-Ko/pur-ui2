import Link from "next/link";
import Label from "../../atoms/label/Label";
import colors from "@/styles/colors";

interface ListItemProps {
  href: string;
  title: string;
  count: number;
  gradientClass: string;
}

const ListItem: React.FC<ListItemProps> = ({
  href,
  title,
  count,
  gradientClass,
}) => {
  return (
    <Link
      href={href}
      className={`flex flex-col p-5 justify-center items-center ${gradientClass} h-full`}
    >
      <Label mode="lg" content={title} customStyle={{ color: colors.white }} />
      <Label
        mode="sm"
        content={`${count} 건`}
        customStyle={{ color: colors["Yellow_Darken-1"] }}
      />
    </Link>
  );
};

export default ListItem;
