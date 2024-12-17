import { bidDataType, bidListDataType } from "@/types/bidTypes";

export const bidData: bidDataType[] = [
  {
    id: "0",
    centerName: ["본원"],
    bidNumber: "구매(재)-2024-123-호",
    nuriMarket: "구매(재)-2024-123-호",
    contractType: "일반",
    bidMethod: "일반경쟁",
    accountName: "의료장비",
    announcementType: "본공고",
    bidName: "MRI",
    announcementDate: "2023-06-30T10:30:00.000",
    closingDate: "2023-06-30T10:30:00.000",
    bidDate: "2023-06-30T10:30:00.000",
    baseBidPrice: "100000",
    winningBidPrice: "100000",
    winner: "역산메디칼",
    bidResult: "유찰",
    bidBond: "O",
    bidProposalNumber: "한의112243",
    manager: "박정배",
    contractCategory: "ddd",
    etc: "",
    viewStatus: "저장",
  },
  {
    id: "1",
    centerName: ["본원", "제주"],
    bidNumber: "생성",
    nuriMarket: "",
    contractType: "일반",
    bidMethod: "일반경쟁",
    accountName: "의료장비",
    announcementType: "본공고",
    bidName: "MRI",
    announcementDate: "2023-01-01",
    closingDate: "2023-01-01",
    bidDate: "2023-01-01",
    baseBidPrice: "100000",
    winningBidPrice: "100000",
    winner: "역산메디칼",
    bidResult: "유찰",
    bidBond: "O",
    bidProposalNumber: "한의112243",
    manager: "박정배",
    etc: "",
    viewStatus: "저장",
  },
];

export const fields = [
  "id",
  "centerName",
  "bidNumber",
  "nuriMarket",
  "contractType",
  "bidMethod",
  "accountName",
  "announcementType",
  "bidName",
  "announcementDate",
  "closingDate",
  "bidDate",
  "baseBidPrice",
  "winningBidPrice",
  "winner",
  "bidResult",
  "bidBond",
  "bidProposalNumber",
  "manager",
  "contractCategory",
  "etc",
  "viewStatus",
];

export const fieldLabels: { [key in keyof bidDataType]: string } = {
  id: "ID",
  centerName: "센터",
  bidNumber: "입찰번호",
  nuriMarket: "누리장터",
  contractType: "계약종류",
  bidMethod: "낙찰방법",
  accountName: "계정명",
  announcementType: "공고구분",
  bidName: "입찰명",
  announcementDate: "공고일",
  closingDate: "마감일",
  bidDate: "응찰일",
  baseBidPrice: "낙찰기준가",
  winningBidPrice: "낙찰금액",
  winner: "낙찰자",
  bidResult: "입찰결과",
  bidBond: "입찰증권",
  bidProposalNumber: "입찰품의번호",
  manager: "담당자",
  contractCategory: "계약구분",
  etc: "기타",
  viewStatus: "열람",
};

export const bidListData: bidListDataType[] = [
  {
    id: "0",
    centerName: ["센터명", "부산"],
    erpCode: "ERP코드",
    erpItemName: "ERP품목명",
    accountType: "계정구분",
    modelName: "모델명",
    standard: "규격",
    manufacturer: "제조사",
    quantity: "수량",
    bidBaseUnitPrice: "2525000",
    baseBidPrice: "2323000",
  },
  {
    id: "2",
    centerName: ["센터명"],
    erpCode: "ERP코드",
    erpItemName: "ERP품목명",
    accountType: "계정구분",
    modelName: "모델명",
    standard: "규격",
    manufacturer: "제조사",
    quantity: "수량",
    bidBaseUnitPrice: "5588000",
    baseBidPrice: "5500000",
  },
];

export const bidListFields = [
  "id",
  "centerName",
  "erpCode",
  "erpItemName",
  "accountType",
  "modelName",
  "standard",
  "manufacturer",
  "quantity",
  "bidBaseUnitPrice",
  "bidBasePrice",
];

export const bidListFieldLabel: { [key in keyof bidListDataType]: string } = {
  id: "ID",
  centerName: "센터명",
  erpCode: "ERP코드",
  erpItemName: "ERP품목명",
  accountType: "계정구분",
  modelName: "모델명",
  standard: "규격",
  manufacturer: "제조사",
  quantity: "수량",
  bidBaseUnitPrice: "낙찰기준단가",
  baseBidPrice: "낙찰기준가",
};

//
export const bidDetailLabel = {
  centerName: "센터명",
  tenderNumber: "입찰번호",
  announcementType: "공고구분",
  contractType: "계약종류",
  tenderType: "입찰종류",
  awardMethod: "낙찰방법",
  accountName: "계정명",
  tenderName: "입찰명",
  announcementDate: "공고일",
  closingDate: "마감일",
  biddingDate: "응찰일",
  awardedPrice: "낙찰기준가",
  tenderProposalNumber: "입찰품의번호",
  tenderProposal: "입찰품의",
  tenderAnnouncement: "입찰공고문",
};

export const bidDetailData = [
  {
    id: 0,
    title: bidDetailLabel["centerName"], // "센터명"
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
    title: bidDetailLabel["tenderNumber"], // "입찰번호"
    type: "input",
    contents: "",
  },
  {
    id: 2,
    title: bidDetailLabel["announcementType"], // "공고구분"
    type: "input",
    contents: "",
  },
  {
    id: 3,
    title: bidDetailLabel["contractType"], // "계약종류"
    type: "radio",
    options: [
      { value: "일반계약", label: "일반계약" },
      { value: "단가계약", label: "단가계약" },
      { value: "임대계약", label: "임대계약" },
      { value: "공사계약", label: "공사계약" },
      { value: "기타계약", label: "기타계약" },
    ],
    contents: "",
    selected: "",
  },
  {
    id: 4,
    title: bidDetailLabel["tenderType"], // "입찰종류"
    type: "radio",
    options: [
      { value: "일반경쟁", label: "일반경쟁" },
      { value: "제한경쟁", label: "제한경쟁" },
      { value: "지명경쟁", label: "지명경쟁" },
    ],
    contents: "",
    selected: "",
  },
  {
    id: 5,
    title: bidDetailLabel["awardMethod"], // "낙찰방법"
    type: "radio",
    options: [
      { value: "최저가격", label: "최저가격" },
      { value: "2단계경쟁", label: "2단계경쟁" },
      { value: "협상에의한계약", label: "협상에의한계약" },
    ],
    contents: "",
    selected: "",
  },
  {
    id: 6,
    title: bidDetailLabel["accountName"], // "계정명"
    type: "chip",
    contents: [
      "의약품",
      "항정신성의약품",
      "장비소모품",
      "인쇄물",
      "시약",
      "백신",
      "의료비품",
      "의료장비",
      "위생용품",
      "피복",
      "사무용품",
      "일반비품",
      "전산용품",
      "기타",
    ],
  },
  {
    id: 7,
    title: bidDetailLabel["tenderName"], // "입찰명"
    type: "input",
    contents: "",
  },
  {
    id: 8,
    title: bidDetailLabel["announcementDate"], // "공고일"
    type: "datepicker",
    contents: "",
  },
  {
    id: 9,
    title: bidDetailLabel["closingDate"], // "마감일"
    type: "datepicker",
    contents: "",
  },
  {
    id: 10,
    title: bidDetailLabel["biddingDate"], // "응찰일"
    type: "datepicker",
    contents: "2024.12.01",
  },
  {
    id: 11,
    title: bidDetailLabel["awardedPrice"], // "낙찰기준가"
    type: "input",
    contents: "",
  },
  {
    id: 12,
    title: bidDetailLabel["tenderProposalNumber"], // "입찰품의번호"
    type: "input",
    contents: "",
  },
  {
    id: 13,
    title: bidDetailLabel["tenderProposal"], // "입찰품의"
    type: "upload",
    contents: null,
  },
  {
    id: 14,
    title: bidDetailLabel["tenderAnnouncement"], // "입찰공고문"
    type: "upload",
    contents: null,
  },
];

//
export const bidResultLabel = {
  tenderInquiry: "입찰조회",
  tenderResult: "입찰결과",
  marketplaceNumber: "누리장터번호",
  awardedCompany: "낙찰업체",
  awardedAmount: "낙찰금액",
  tenderDocuments: "입찰참가서류",
  tenderGuarantee: "입찰보증금",
  additionalInformation: "기타사항",
};

export const bidResultData = [
  {
    id: 0,
    title: bidResultLabel["tenderInquiry"], // "입찰조회"
    type: "input",
    contents: "",
  },
  {
    id: 1,
    title: bidResultLabel["tenderResult"], // "입찰결과"
    type: "chip",
    contents: ["낙찰", "유찰"],
  },
  {
    id: 2,
    title: bidResultLabel["marketplaceNumber"], // "누리장터번호"
    type: "input",
    contents: "",
  },
  {
    id: 3,
    title: bidResultLabel["awardedCompany"], // "낙찰업체"
    type: "input",
    contents: "",
  },
  {
    id: 4,
    title: bidResultLabel["awardedAmount"], // "낙찰금액"
    type: "input",
    contents: "",
  },
  {
    id: 5,
    title: bidResultLabel["tenderDocuments"], // "입찰참가서류"
    type: "upload",
    contents: null,
  },
  {
    id: 6,
    title: bidResultLabel["tenderGuarantee"], // "입찰보증금"
    type: "upload-message",
    contents: null,
  },
  {
    id: 7,
    title: bidResultLabel["additionalInformation"], // "기타사항"
    type: "textarea",
    contents: "",
  },
];
