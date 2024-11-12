import { contractDataType } from "@/types/contractTypes";

export const contractData: contractDataType[] = [
  {
    id: "0",
    centerName: ["본원", "제주"],
    bidNumber: "000011001",
    contractNumber: "000011001",
    contractType: "일반",
    accountName: "의료장비",
    contractName: "계약명",
    contractDate: "2023-01-01",
    contractStartDate: "2023-01-01",
    contractEndDate: "2023-01-01",
    supplier: "역산메디칼",
    baseBidPrice: "100000",
    contractAmount: "100000",
    contractMethod: "입찰",
    sn: "",
    contractBond: "O",
    defectBond: "X",
    contractProposalNumber: "한의112243",
    contractCategory: "최초계약",
    manager: "담당자",
    etc: "저장값",
    viewStatus: "저장",
  },
  {
    id: "1",
    centerName: ["본원", "제주"],
    bidNumber: "000011001",
    contractNumber: "000011001",
    contractType: "일반",
    accountName: "의료장비",
    contractName: "계약명",
    contractDate: "2023-01-01",
    contractStartDate: "2023-01-01",
    contractEndDate: "2023-01-01",
    supplier: "역산메디칼",
    baseBidPrice: "100000",
    contractAmount: "100000",
    contractMethod: "입찰",
    sn: "",
    contractBond: "O",
    defectBond: "X",
    contractProposalNumber: "한의112243",
    contractCategory: "최초계약",
    manager: "담당자",
    etc: "저장값",
    viewStatus: "저장",
  },
];

export const fields = [
  "id",
  "centerName",
  "bidNumber",
  "contractNumber",
  "contractType",
  "accountName",
  "contractName",
  "contractDate",
  "contractStartDate",
  "contractEndDate",
  "supplier",
  "baseBidPrice",
  "contractAmount",
  "contractMethod",
  "sn",
  "contractBond",
  "defectBond",
  "contractProposalNumber",
  "contractCategory",
  "manager",
  "etc",
  "viewStatus",
];

export const fieldLabels: { [key in keyof contractDataType]: string } = {
  id: "id",
  centerName: "센터",
  bidNumber: "입찰번호",
  contractNumber: "계약번호",
  contractType: "계약종류",
  accountName: "계정명",
  contractName: "계약명",
  contractDate: "계약일자",
  contractStartDate: "계약시작일",
  contractEndDate: "계약완료일",
  supplier: "공급사",
  baseBidPrice: "낙찰기준가",
  contractAmount: "계약금액",
  contractMethod: "계약방법",
  sn: "SN",
  contractBond: "계약증권",
  defectBond: "하자증권",
  contractProposalNumber: "계약품의번호",
  contractCategory: "계약구분",
  manager: "담당자",
  etc: "기타",
  viewStatus: "열람",
};

//

export const contractListData: contractDataType[] = [
  {
    id: "0",
    centerName: ["본원", "제주"],
    erpCode: "ERP코드",
    erpItem: "ERP품목",
    bidNumber: "입찰번호",
    contractNumber: "계약번호",
    contractType: "계약종류",
    accountCategory: "계정구분",
    modelName: "모델명",
    standard: "규격",
    manufacturer: "제조사",
    supplier: "공급사",
    quantity: "수량",
    baseBidPrice: "250000",
    contractUnitPrice: "658000",
    contractAmount: "23568000",
  },
  {
    id: "1",
    centerName: ["본원", "제주"],
    erpCode: "ERP코드",
    erpItem: "ERP품목",
    bidNumber: "입찰번호",
    contractNumber: "계약번호",
    contractType: "계약종류",
    accountCategory: "계정구분",
    modelName: "모델명",
    standard: "규격",
    manufacturer: "제조사",
    supplier: "공급사",
    quantity: "수량",
    baseBidPrice: "250000",
    contractUnitPrice: "658000",
    contractAmount: "23568000",
  },
];

export const contractListFields = [
  "centerName",
  "erpCode",
  "erpItem",
  "accountCategory",
  "modelName",
  "specifications",
  "manufacturer",
  "quantity",
  "unitPrice",
];

export const contractListLabels: { [key in keyof contractDataType]: string } = {
  centerName: "센터",
  erpCode: "ERP코드",
  erpItem: "ERP품목",
  bidNumber: "입찰번호",
  contractNumber: "계약번호",
  contractType: "계약종류",
  accountCategory: "계정구분",
  modelName: "모델명",
  standard: "규격",
  manufacturer: "제조사",
  supplier: "공급사",
  quantity: "수량",
  baseBidPrice: "낙찰기준가",
  contractUnitPrice: "계약단가",
  contractAmount: "계약금액",
};

//
export const contractDetailLabel = {
  centerName: "센터명",
  contractNumber: "계약번호",
  contractType: "계약구분",
  contractName: "계약명",
  contractDate: "계약일자",
  contractStartDate: "계약시작일",
  contractEndDate: "계약완료일",
  sn: "S/N",
  supplier: "공급사",
  contractPrice: "계약가격",
  contractProposal: "계약품의",
  contractDocument: "계약서",
  contractGuarantee: "계약보증금",
  defectsGuarantee: "하자이행보증금",
  contractOther: "계약기타사항",
};

export const contractDetailData = [
  {
    id: 0,
    title: contractDetailLabel["centerName"], // "센터명"
    type: "chip",
    contents: [
      "전국",
      "재단",
      "본원",
      "광화문",
      "여의도",
      "강남",
      "수원",
      "대구",
      "부산",
      "광주",
      "제주",
    ],
  },
  {
    id: 1,
    title: contractDetailLabel["contractNumber"], // "계약번호"
    type: "input",
    contents: "",
  },
  {
    id: 2,
    title: contractDetailLabel["contractType"], // "계약구분"
    type: "radio",
    options: [
      { value: "최초계약", label: "최초계약" },
      { value: "연장계약", label: "연장계약" },
      { value: "변경계약", label: "변경계약" },
    ],
    contents: "",
    selected: "",
  },
  {
    id: 3,
    title: contractDetailLabel["contractName"], // "계약명"
    type: "input",
    contents: "",
  },
  {
    id: 4,
    title: contractDetailLabel["contractDate"], // "계약일자"
    type: "datepicker",
    contents: "2024-10-10",
  },
  {
    id: 5,
    title: contractDetailLabel["contractStartDate"], // "계약시작일"
    type: "datepicker",
    contents: "2024-10-10",
  },
  {
    id: 6,
    title: contractDetailLabel["contractEndDate"], // "계약완료일"
    type: "datepicker",
    contents: "2024-10-10",
  },
  {
    id: 7,
    title: contractDetailLabel["sn"], // "S/N"
    type: "datepicker",
    contents: "2024-10-10",
  },
  {
    id: 8,
    title: contractDetailLabel["supplier"], // "공급사"
    type: "input",
    contents: "",
  },
  {
    id: 9,
    title: contractDetailLabel["contractPrice"], // "계약가격"
    type: "input",
    contents: "",
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
    contents: null,
  },
  {
    id: 13,
    title: contractDetailLabel["defectsGuarantee"], // "하자이행보증금"
    type: "upload-message",
    contents: null,
  },
  {
    id: 14,
    title: contractDetailLabel["contractOther"], // "계약기타사항"
    type: "textarea",
    contents: null,
  },
];
