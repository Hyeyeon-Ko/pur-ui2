import { BidMasterWithDetailsType } from "@/types/contractTypes";

export const formatBidDetailData = (
  bidData: BidMasterWithDetailsType | null,
  bidDetailLabel: { [key: string]: string },
  formatHandlers: {
    formatCurrency: (amount: string | number) => string;
    formatDate: (dateString: string) => string;
  },
) => {
  const { formatCurrency, formatDate } = formatHandlers;
  if (!bidData) return [];

  return [
    {
      id: 0,
      title: bidDetailLabel["centerName"],
      type: "chip",
      contents: [bidData.centerName || "전국"],
    },
    {
      id: 1,
      title: bidDetailLabel["tenderNumber"],
      type: "input",
      contents: bidData.bid_no || "-",
    },
    {
      id: 2,
      title: bidDetailLabel["announcementType"],
      type: "input",
      contents: bidData.annCat || "-",
    },
    {
      id: 3,
      title: bidDetailLabel["contractType"],
      type: "radio",
      options: [
        { value: "일반계약", label: "일반계약" },
        { value: "단가계약", label: "단가계약" },
        { value: "임대계약", label: "임대계약" },
        { value: "공사계약", label: "공사계약" },
        { value: "기타계약", label: "기타계약" },
      ],
      contents: bidData.contType || "",
    },
    {
      id: 4,
      title: bidDetailLabel["tenderType"],
      type: "radio",
      options: [
        { value: "일반경쟁", label: "일반경쟁" },
        { value: "제한경쟁", label: "제한경쟁" },
        { value: "지명경쟁", label: "지명경쟁" },
      ],
      contents: bidData.bidType || "",
    },
    {
      id: 5,
      title: bidDetailLabel["awardMethod"],
      type: "radio",
      options: [
        { value: "최저가격", label: "최저가격" },
        { value: "2단계경쟁", label: "2단계경쟁" },
        { value: "협상에의한계약", label: "협상에의한계약" },
      ],
      contents: bidData.bidMethod || "",
    },
    {
      id: 6,
      title: bidDetailLabel["accountName"],
      type: "chip",
      contents: bidData.accCd || "-",
    },
    {
      id: 7,
      title: bidDetailLabel["tenderName"],
      type: "input",
      contents: bidData.bid_nm || "-",
    },
    {
      id: 8,
      title: bidDetailLabel["announcementDate"],
      type: "datepicker",
      contents: bidData.announce_dt ? formatDate(bidData.announce_dt) : "-",
    },
    {
      id: 9,
      title: bidDetailLabel["closingDate"],
      type: "datepicker",
      contents: bidData.close_dt ? formatDate(bidData.close_dt) : "-",
    },
    {
      id: 10,
      title: bidDetailLabel["biddingDate"],
      type: "datepicker",
      contents: "-",
    },
    {
      id: 11,
      title: bidDetailLabel["awardedPrice"],
      type: "input",
      contents: bidData.win_price ? formatCurrency(bidData.win_price) : "-",
    },
    {
      id: 12,
      title: bidDetailLabel["tenderProposalNumber"],
      type: "input",
      contents: bidData.app_no || "-",
    },
    {
      id: 13,
      title: bidDetailLabel["tenderProposal"],
      type: "upload",
      contents: bidData.attach_id || null,
    },
    {
      id: 14,
      title: bidDetailLabel["tenderAnnouncement"],
      type: "upload",
      contents: bidData.attach_id || null,
    },
  ];
};
