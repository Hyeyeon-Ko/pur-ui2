import dynamic from "next/dynamic";

export const ListItem = dynamic(
  () => import("@/components/ui/molecules/dashboard/ListItem")
);
export const Label = dynamic(() => import("@/components/ui/atoms/label/Label"));
export const DashCard = dynamic(
  () => import("@/components/ui/atoms/dashboard/DashCard")
);
export const DashboardSection = dynamic(
  () => import("@/components/ui/organism/dashboard/DashboardSection")
);
