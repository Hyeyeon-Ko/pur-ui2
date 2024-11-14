import dynamic from "next/dynamic";

const LargeBody = dynamic(() => import("./page.body"));

const LargePage = () => {
  return <LargeBody />;
};

export default LargePage;
