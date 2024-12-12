import useFormatHandler from "@/hooks/useFormatHandler";
import { bidDetailLabel } from "@/lib/bidDatas";
import { mappings } from "@/lib/mappings";
import { BidItem } from "@/types/bidTypes";

export const formatBidDetailData = (
  bidItem: BidItem,
  formatHandlers: ReturnType<typeof useFormatHandler>,
) => {
  const { formatCurrency, formatDate } = formatHandlers;

  const details = bidItem.details?.find(detail => detail.inst_cd) || {};
  const bid = bidItem.bid || {};

  return [
    {
      id: 0,
      title: bidDetailLabel["centerName"], // "센터명"
      type: "chip",
      contents: mappings.CMM001[details.inst_cd || ""] || "-",
    },
    {
      id: 1,
      title: bidDetailLabel["tenderNumber"], // "입찰번호"
      type: "input",
      contents: bid.bid_no || "",
    },
    {
      id: 2,
      title: bidDetailLabel["announcementType"], // "공고구분"
      type: "input",
      contents: mappings.PUR002[details.ann_cat || ""] || "",
    },
    {
      id: 3,
      title: bidDetailLabel["contractType"], // "계약종류"
      type: "radio",
      options: [
        { value: "001", label: "일반계약" },
        { value: "002", label: "단가계약" },
        { value: "003", label: "임대계약" },
        { value: "004", label: "공사계약" },
        { value: "005", label: "매각계약" },
        { value: "006", label: "기타계약" },
      ],
      contents: details.bid_method,
    },
    {
      id: 4,
      title: bidDetailLabel["tenderType"], // "입찰종류"
      type: "radio",
      options: [
        { value: "001", label: "일반경쟁" },
        { value: "002", label: "제한경쟁" },
        { value: "003", label: "지명경쟁" },
      ],
      contents: details.bid_type || "",
    },
    {
      id: 5,
      title: bidDetailLabel["awardMethod"], // "낙찰방법"
      type: "radio",
      options: [
        { value: "001", label: "최저가격" },
        { value: "002", label: "2단계경쟁" },
        { value: "003", label: "협상에의한계약" },
      ],
      contents: details.bid_method || "",
    },
    {
      id: 6,
      title: bidDetailLabel["accountName"], // "계정명"
      type: "chip",
      contents: mappings.PUR006[details.acc_cd || ""] || "-",
    },
    {
      id: 7,
      title: bidDetailLabel["tenderName"], // "입찰명"
      type: "input",
      contents: bid.bid_nm || "-",
    },
    {
      id: 8,
      title: "공고일", // 예시
      type: "datepicker",
      contents: bid.announce_dt ? formatDate(bid.announce_dt) : "-", // 유효성 검사 후 포맷팅
    },
    {
      id: 9,
      title: "마감일", // 예시
      type: "datepicker",
      contents: bid.close_dt ? formatDate(bid.close_dt) : "-", // 유효성 검사 후 포맷팅
    },
    //
    {
      id: 10,
      title: bidDetailLabel["biddingDate"], // "응찰일"
      type: "datepicker",
      contents: "",
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
      contents: details.app_no || "",
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
};
