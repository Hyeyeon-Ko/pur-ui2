import { FieldConfig } from "@/types/fieldTypes";

export const centerOptions = [
  { value: "", label: "센터" },
  { value: "전국", label: "전국" },
  { value: "본원", label: "본원" },
  { value: "광화문", label: "광화문" },
  { value: "여의도", label: "여의도" },
  { value: "강남", label: "강남" },
  { value: "수원", label: "수원" },
  { value: "대구", label: "대구" },
  { value: "부산", label: "부산" },
  { value: "광주", label: "광주" },
  { value: "제주", label: "제주" },
];

export const bidOptions = [
  { value: "", label: "입찰종류" },
  { value: "일반경쟁", label: "일반경쟁" },
  { value: "제한경쟁", label: "제한경쟁" },
  { value: "지명경쟁", label: "지명경쟁" },
];

export const accountOptions = [
  { value: "", label: "계정명" },
  { value: "의료장비", label: "의료장비" },
  { value: "의료소모품", label: "의료소모품" },
  { value: "의료비품", label: "의료비품" },
  { value: "일반소모품", label: "일반소모품" },
  { value: "일반비품", label: "일반비품" },
  { value: "의약품", label: "의약품" },
  { value: "시약", label: "시약" },
  { value: "공사", label: "공사" },
  { value: "사무용품", label: "사무용품" },
  { value: "기타", label: "기타" },
];

export const bidResultOptions = [
  { value: "", label: "입찰결과" },
  { value: "낙찰", label: "낙찰" },
  { value: "유찰", label: "유찰" },
];

export const contractOptions = [
  { value: "", label: "계약방법" },
  { value: "입찰", label: "입찰" },
  { value: "수의", label: "수의" },
];

export const downloadOptions = [
  { value: "", label: "내려받기" },
  { value: "계약서", label: "계약서 내려받기" },
  { value: "품의서", label: "품의서 내려받기" },
];

export const contractType = [
  { value: "", label: "계약종류" },
  { value: "일반계약", label: "일반계약" },
  { value: "단가계약", label: "단가계약" },
  { value: "임대계약", label: "임대계약" },
  { value: "공사계약", label: "공사계약" },
  { value: "매각계약", label: "매각계약" },
  { value: "기타계약", label: "기타계약" },
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

export const majorFields = [
  { type: "input", field: "content", placeholder: "공통 코드를 입력하세요." },
  { type: "input", field: "name", placeholder: "코드 이름을 입력하세요." },
  {
    type: "input",
    field: "description",
    placeholder: "코드 내용을 입력하세요.",
  },
];

export const middleFields = [
  { type: "input", field: "content", placeholder: "공통 코드를 입력하세요." },
  { type: "input", field: "name", placeholder: "코드 이름을 입력하세요." },
  {
    type: "input",
    field: "description",
    placeholder: "코드 내용을 입력하세요.",
  },
];

export const smallFields = [
  { type: "input", field: "content", placeholder: "공통 코드를 입력하세요." },
  { type: "input", field: "name", placeholder: "코드 이름을 입력하세요." },
  {
    type: "input",
    field: "description",
    placeholder: "코드 내용을 입력하세요.",
  },
];
