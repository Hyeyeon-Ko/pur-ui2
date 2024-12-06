import { bidDetailLabel } from "@/lib/bidDatas";

export const formatBidDetailData = (
  bidItem: any,
  formatHandlers: {
    formatCurrency: (amount: string | number) => string;
    formatDate: (dateString: string) => string;
  },
) => {
  const { formatCurrency, formatDate } = formatHandlers;

  const bid = bidItem.bid || {};
  const details = bidItem.details || [];

  return [
    {
      id: 0,
      title: bidDetailLabel["centerName"],
      type: "chip",
      contents: details.map((detail: any) => detail.inst_cd || "-"),
    },
    {
      id: 1,
      title: bidDetailLabel["tenderNumber"],
      type: "input",
      contents: bid.bid_no || "-",
    },
    {
      id: 2,
      title: bidDetailLabel["announcementType"],
      type: "input",
      contents: details.map((detail: any) => detail.ann_cat || "-").join(", "),
    },
    {
      id: 3,
      title: bidDetailLabel["contractType"],
      type: "radio",
      options: [
        { value: "001", label: "일반계약" },
        { value: "002", label: "단가계약" },
        { value: "003", label: "임대계약" },
        { value: "004", label: "공사계약" },
        { value: "005", label: "기타계약" },
      ],
      selected: details[0]?.cont_type || "",
    },
    {
      id: 4,
      title: bidDetailLabel["tenderType"],
      type: "radio",
      options: [
        { value: "001", label: "일반경쟁" },
        { value: "002", label: "제한경쟁" },
        { value: "003", label: "지명경쟁" },
      ],
      selected: details[0]?.bid_type || "",
    },
    {
      id: 5,
      title: bidDetailLabel["awardMethod"],
      type: "radio",
      options: [
        { value: "001", label: "최저가격" },
        { value: "002", label: "2단계경쟁" },
        { value: "003", label: "협상에의한계약" },
      ],
      selected: details[0]?.bid_method || "",
    },
    {
      id: 6,
      title: bidDetailLabel["accountName"],
      type: "chip",
      contents: details.map((detail: any) => detail.acc_cd || "-"),
    },
    {
      id: 7,
      title: bidDetailLabel["tenderName"],
      type: "input",
      contents: bid.bid_nm || "-",
    },
    {
      id: 8,
      title: bidDetailLabel["announcementDate"],
      type: "datepicker",
      contents: bid.announce_dt ? formatDate(bid.announce_dt) : "-",
    },
    {
      id: 9,
      title: bidDetailLabel["closingDate"],
      type: "datepicker",
      contents: bid.close_dt ? formatDate(bid.close_dt) : "-",
    },
    {
      id: 10,
      title: bidDetailLabel["biddingDate"],
      type: "datepicker",
      contents: details[0]?.bidding_date || "-",
    },
    {
      id: 11,
      title: bidDetailLabel["awardedPrice"],
      type: "input",
      contents: details[0]?.win_price
        ? formatCurrency(parseFloat(details[0]?.win_price))
        : "-",
    },
    {
      id: 12,
      title: bidDetailLabel["tenderProposalNumber"],
      type: "input",
      contents: details[0]?.app_no || "-",
    },
    {
      id: 13,
      title: bidDetailLabel["tenderProposal"],
      type: "upload",
      contents: details[0]?.attach_id || null,
    },
    {
      id: 14,
      title: bidDetailLabel["tenderAnnouncement"],
      type: "upload",
      contents: details[0]?.attach_id || null,
    },
  ];
};
