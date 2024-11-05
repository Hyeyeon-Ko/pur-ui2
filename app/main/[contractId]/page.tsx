"use client";

import React from "react";
import { useParams } from "next/navigation";

const ContractList = () => {
  const { contractId } = useParams();

  const [contractData, setContractData] = React.useState(null);

  React.useEffect(() => {
    const fetchContractData = async () => {
      const response = await fetch(`/api/contracts/${contractId}`);
      if (!response.ok) {
        console.error("Failed to fetch contract data");
        return;
      }
      const data = await response.json();
      setContractData(data);
    };

    fetchContractData();
  }, [contractId]);

  if (!contractData) {
    return <div>로딩(임시)</div>;
  }

  return (
    <div>
      <h1>계약 ID: {contractId}</h1>
    </div>
  );
};

export default ContractList;
