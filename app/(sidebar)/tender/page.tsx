import dynamic from "next/dynamic";
const TenderBody = dynamic(() => import("./page.body"));

const TenderPage = () => {
  return <TenderBody />;
};

export default TenderPage;
