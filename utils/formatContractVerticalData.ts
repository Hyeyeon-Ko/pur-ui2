import { ContractMasterWithDetailsType } from "@/types/contractTypes";

export const formatContractVerticalData = (
  contractData: ContractMasterWithDetailsType | null,
  contractDetailLabel: { [key: string]: string },
) => {
  if (!contractData) return [];

  return [
    {
      id: 0,
      title: contractDetailLabel["centerName"],
      type: "chip",
      contents: [contractData.centerName || "전국"],
    },
    {
      id: 1,
      title: contractDetailLabel["contractNumber"],
      type: "input",
      contents: contractData.cont_no || "",
    },
    {
      id: 2,
      title: contractDetailLabel["contractType"],
      type: "radio",
      options: [
        { value: "001", label: "최초계약" },
        { value: "002", label: "연장계약" },
        { value: "003", label: "변경계약" },
      ],
      contents: contractData.cont_type || "",
    },
    {
      id: 3,
      title: contractDetailLabel["contractName"],
      type: "input",
      contents: contractData.cont_nm || "",
    },
    {
      id: 4,
      title: contractDetailLabel["contractDate"],
      type: "datepicker",
      contents: contractData.cont_dt || "",
    },
    {
      id: 5,
      title: contractDetailLabel["contractStartDate"],
      type: "datepicker",
      contents: contractData.start_dt || "",
    },
    {
      id: 6,
      title: contractDetailLabel["contractEndDate"],
      type: "datepicker",
      contents: contractData.end_dt || "",
    },
    {
      id: 7,
      title: contractDetailLabel["sn"],
      type: "input",
      contents: contractData.cont_sn || "",
    },
    {
      id: 8,
      title: contractDetailLabel["supplier"],
      type: "input",
      contents: contractData.supplier || "",
    },
    {
      id: 9,
      title: contractDetailLabel["contractPrice"],
      type: "input",
      contents: contractData.cont_price || "",
    },
    {
      id: 10,
      title: contractDetailLabel["contractProposal"], // "계약품의"
      type: "upload",
      contents: null,
    },
    {
      id: 11,
      title: contractDetailLabel["contractDocument"], // "계약서"
      type: "upload",
      contents: null,
    },
    {
      id: 12,
      title: contractDetailLabel["contractGuarantee"], // "계약보증금"
      type: "upload-message",
      contents: contractData.deposit_rsn || "",
    },
    {
      id: 13,
      title: contractDetailLabel["defectsGuarantee"], // "하자이행보증금"
      type: "upload-message",
      contents: contractData.war_bond || "",
    },
    {
      id: 14,
      title: contractDetailLabel["contractOther"], // "계약기타사항"
      type: "textarea",
      contents: contractData.notes || "",
    },
  ];
};
