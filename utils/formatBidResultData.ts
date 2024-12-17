import { bidResultLabel } from "@/lib/bidDatas";
import { BidMasterWithDetailsType } from "@/types/contractTypes";

export const formatBidResultData = (
  bidData: BidMasterWithDetailsType | null,
  bidResultLabel: { [key: string]: string },
  formatHandlers: {
    formatCurrency: (amount: string | number) => string;
    formatDate: (dateString: string) => string;
  },
) => {
  const { formatCurrency } = formatHandlers;
  if (!bidData) return [];

  return [
    {
      id: 0,
      title: bidResultLabel["tenderInquiry"], // 입찰조회
      type: "input",
      contents: "-",
    },
    {
      id: 1,
      title: bidResultLabel["tenderResult"], // 입찰결과
      type: "radio",
      contents: bidData.bidRes,
      options: [
        { value: "낙찰", label: "낙찰" },
        { value: "유찰", label: "유찰" },
        { value: "보류", label: "보류" },
      ],
    },
    {
      id: 2,
      title: bidResultLabel["marketplaceNumber"], // 누리장터번호
      type: "input",
      contents: bidData.nuri_no || "-",
    },
    {
      id: 3,
      title: bidResultLabel["awardedCompany"], // 낙찰업체
      type: "input",
      contents: bidData.win_bid || "-",
    },
    {
      id: 4,
      title: bidResultLabel["awardedAmount"], // 낙찰금액
      type: "input",
      contents: bidData.win_price
        ? formatCurrency(parseFloat(bidData.win_price))
        : "-",
    },
    {
      id: 5,
      title: bidResultLabel["tenderDocuments"], // 입찰참가서류
      type: "upload",
      contents: bidData.attach_id || null,
    },
    {
      id: 6,
      title: bidResultLabel["tenderGuarantee"], // 입찰보증금
      type: "upload-message",
      contents: bidData.deposit_rsn || null,
    },
    {
      id: 7,
      title: bidResultLabel["additionalInformation"], // 기타사항
      type: "textarea",
      contents: bidData.notes || "-",
    },
  ];
};
