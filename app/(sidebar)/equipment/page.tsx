import dynamic from "next/dynamic";
const EquipmentBody = dynamic(() => import("./page.body"));

const EquipmentPage = () => {
  return <EquipmentBody />;
};

export default EquipmentPage;
