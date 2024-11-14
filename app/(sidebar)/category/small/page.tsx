import dynamic from "next/dynamic";
const SmallBody = dynamic(() => import("./page.body"));

const SmallPage = () => {
  return <SmallBody />;
};

export default SmallPage;
