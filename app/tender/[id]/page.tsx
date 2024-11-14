import dynamic from "next/dynamic";

const TenderDetailBody = dynamic(() => import("./page.body"));

const TenderDetail: React.FC = () => {
  return <TenderDetailBody />;
};

export default TenderDetail;
