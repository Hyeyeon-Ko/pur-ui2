import { FieldConfig } from "@/types/fieldTypes";

const centerOptions = [
  { value: "", label: "센터" },
  { value: "all", label: "전국" },
  { value: "headquarters", label: "본원" },
  { value: "gwanghwamun", label: "광화문" },
  { value: "yeouido", label: "여의도" },
  { value: "gangnam", label: "강남" },
  { value: "suwon", label: "수원" },
  { value: "daegu", label: "대구" },
  { value: "busan", label: "부산" },
  { value: "gwangju", label: "광주" },
  { value: "jeju", label: "제주" },
];

const bidOptions = [
  { value: "", label: "입찰종류" },
  { value: "openBid", label: "일반경쟁" },
  { value: "restrictedBid", label: "제한경쟁" },
  { value: "nominationBid", label: "지명경쟁" },
];

const accountOptions = [
  { value: "", label: "계정명" },
  { value: "medicalEquipment", label: "의료장비" },
  { value: "medicalConsumables", label: "의료소모품" },
  { value: "medicalSupplies", label: "의료비품" },
  { value: "generalConsumables", label: "일반소모품" },
  { value: "generalSupplies", label: "일반비품" },
  { value: "pharmaceuticals", label: "의약품" },
  { value: "reagents", label: "시약" },
  { value: "construction", label: "공사" },
  { value: "officeSupplies", label: "사무용품" },
  { value: "other", label: "기타" },
];

const bidResultOptions = [
  { value: "", label: "입찰결과" },
  { value: "awarded", label: "낙찰" },
  { value: "failed", label: "유찰" },
];

const contractOptions = [
  { value: "", label: "계약방법" },
  { value: "bid", label: "입찰" },
  { value: "negotiation", label: "수의" },
];

const contractType = [
  { value: "", label: "계약종류" },
  { value: "generalContract", label: "일반계약" },
  { value: "unitPriceContract", label: "단가계약" },
  { value: "leaseContract", label: "임대계약" },
  { value: "constructionContract", label: "공사계약" },
  { value: "saleContract", label: "매각계약" },
  { value: "otherContract", label: "기타계약" },
];

export const contractSearchFields: FieldConfig[] = [
  { name: "center", type: "select", options: centerOptions, label: "센터" },
  {
    name: "contractType",
    type: "select",
    options: contractType,
    label: "계약종류",
  },
  {
    name: "accountName",
    type: "select",
    options: accountOptions,
    label: "계정명",
  },
  {
    name: "contractMethod",
    type: "select",
    options: contractOptions,
    label: "계약방법",
  },
  { name: "contractDate", type: "date", label: "계약일자" },
  { name: "startDate", type: "date", label: "계약시작일" },
  { name: "endDate", type: "date", label: "계약완료일" },
  { name: "sn", type: "input", label: "S/N" },
  { name: "contractName", type: "input", label: "계약명" },
];

export const tenderSearchFields: FieldConfig[] = [
  { name: "center", type: "select", options: centerOptions },
  { name: "bidType", type: "select", options: bidOptions },
  { name: "accountName", type: "select", options: accountOptions },
  { name: "bidResult", type: "select", options: bidResultOptions },
  { name: "winner", type: "input", label: "낙찰자" },
  { name: "bidName", type: "input", label: "입찰명" },
  { name: "announcementDate", type: "date", label: "공고일" },
  { name: "dueDate", type: "date", label: "마감일" },
];
