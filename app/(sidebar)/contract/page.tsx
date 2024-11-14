import dynamic from "next/dynamic";
const ContractBody = dynamic(() => import("./page.body"));

const ContractPage = () => {
  return <ContractBody />;
};

export default ContractPage;
