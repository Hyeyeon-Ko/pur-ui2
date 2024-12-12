import { bidResultLabel } from "@/lib/bidDatas";
import { BidItem } from "@/types/bidTypes";

export const formatBidResultData = (
  bidItem: BidItem,
  formatHandlers: {
    formatCurrency: (amount: string | number) => string;
    formatDate: (dateString: string) => string;
  },
) => {
  const { formatCurrency } = formatHandlers;

  const bid = bidItem.bid || {};
  const details = bidItem.details || [];

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
      contents: bid.bid_res,
      options: [
        { value: "001", label: "낙찰" },
        { value: "002", label: "유찰" },
        { value: "003", label: "보류" },
      ],
    },
    {
      id: 2,
      title: bidResultLabel["marketplaceNumber"], // 누리장터번호
      type: "input",
      contents: bid.nuri_no || "-",
    },
    {
      id: 3,
      title: bidResultLabel["awardedCompany"], // 낙찰업체
      type: "input",
      contents: details[0]?.win_bid || "-",
    },
    {
      id: 4,
      title: bidResultLabel["awardedAmount"], // 낙찰금액
      type: "input",
      contents: details[0]?.win_price
        ? formatCurrency(parseFloat(details[0]?.win_price))
        : "-",
    },
    {
      id: 5,
      title: bidResultLabel["tenderDocuments"], // 입찰참가서류
      type: "upload",
      contents: details[0]?.attach_id || null,
    },
    {
      id: 6,
      title: bidResultLabel["tenderGuarantee"], // 입찰보증금
      type: "upload-message",
      contents: details[0]?.deposit_rsn || null,
    },
    {
      id: 7,
      title: bidResultLabel["additionalInformation"], // 기타사항
      type: "textarea",
      contents: details[0]?.notes || "-",
    },
  ];
};
