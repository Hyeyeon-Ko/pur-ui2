import dynamic from "next/dynamic";
const TenderDetailBody = dynamic(() => import("./page.body"));

interface TenderDetailProps {
  params: {
    id: string;
  };
}

const TenderDetail: React.FC<TenderDetailProps> = ({ params }) => {
  return <TenderDetailBody params={params} />;
};

export default TenderDetail;
