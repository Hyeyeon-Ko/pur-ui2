import dynamic from "next/dynamic";
import React from "react";

const ContractAddBody = dynamic(() => import("./page.body"), {
  ssr: false,
});

interface TenderDetailProps {
  params: {
    id: string;
  };
}

const ContractAddPage: React.FC<TenderDetailProps> = ({ params }) => {
  return <ContractAddBody params={params} />;
};

export default ContractAddPage;
