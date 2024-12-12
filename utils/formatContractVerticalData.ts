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
      contents: [contractData.details[0]?.inst_cd || "전국"],
    },
    {
      id: 1,
      title: contractDetailLabel["contractNumber"],
      type: "input",
      contents: contractData.contract.cont_no || "",
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
      contents: contractData.details[0]?.cont_div || "",
    },
    {
      id: 3,
      title: contractDetailLabel["contractName"],
      type: "input",
      contents: contractData.contract.cont_nm || "",
    },
    {
      id: 4,
      title: contractDetailLabel["contractDate"],
      type: "datepicker",
      contents: contractData.contract.cont_dt || "",
    },
    {
      id: 5,
      title: contractDetailLabel["contractStartDate"],
      type: "datepicker",
      contents: contractData.contract.start_dt || "",
    },
    {
      id: 6,
      title: contractDetailLabel["contractEndDate"],
      type: "datepicker",
      contents: contractData.contract.end_dt || "",
    },
    {
      id: 7,
      title: contractDetailLabel["sn"],
      type: "input",
      contents: contractData.details[0]?.cont_sn || "",
    },
    {
      id: 8,
      title: contractDetailLabel["supplier"],
      type: "input",
      contents: contractData.details[0]?.supplier || "",
    },
    {
      id: 9,
      title: contractDetailLabel["contractPrice"],
      type: "input",
      contents: contractData.details[0]?.cont_price || "",
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
      contents: contractData.details[0]?.cont_deposit || "",
    },
    {
      id: 13,
      title: contractDetailLabel["defectsGuarantee"], // "하자이행보증금"
      type: "upload-message",
      contents: contractData.details[0]?.war_bond || "",
    },
    {
      id: 14,
      title: contractDetailLabel["contractOther"], // "계약기타사항"
      type: "textarea",
      contents: contractData.details[0]?.notes || "",
    },
  ];
};
