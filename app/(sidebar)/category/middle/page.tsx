import dynamic from "next/dynamic";
const MiddleBody = dynamic(() => import("./page.body"));

const MiddlePage = () => {
  return <MiddleBody />;
};

export default MiddlePage;
