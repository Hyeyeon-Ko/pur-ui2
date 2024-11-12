import { RepairRow } from "@/types/equipTypes";

/** row 데이터 */
export const equipData: RepairRow[] = [
  {
    centerName: "서울센터",
    type: "정기점검",
    repairDate: new Date("2023-08-15"),
    documentNumber: "DOC001",
    faultSymptom: "전원 불량",
    repairContent: "배터리 교체",
    partner: "파트너A",
    partNumber: "PART001",
    cost: "50000",
    warranty: "1년",
    maintenanceCost: "10000",
    inspectionCheck: "완료",
    notes: "추가 점검 필요 없음",
    isNew: false,
    isSelected: false,
  },
  {
    centerName: "부산센터",
    type: "긴급점검",
    repairDate: new Date("2023-09-01"),
    documentNumber: "DOC002",
    faultSymptom: "네트워크 연결 불량",
    repairContent: "LAN 케이블 교체",
    partner: "파트너B",
    partNumber: "PART002",
    cost: "20000",
    warranty: "6개월",
    maintenanceCost: "5000",
    inspectionCheck: "확인 중",
    notes: "재점검 예정",
    isNew: false,
    isSelected: false,
  },
];

/** column 명 */
export const fields = [
  "centerName",
  "type",
  "repairDate",
  "documentNumber",
  "faultSymptom",
  "repairContent",
  "partner",
  "partNumber",
  "cost",
  "warranty",
  "maintenanceCost",
  "inspectionCheck",
  "notes",
];

/** column 타입(데이터 형태) */
export const fieldType: {
  [key in keyof RepairRow]: "input" | "select" | "datepicker";
} = {
  centerName: "input",
  type: "select",
  repairDate: "datepicker",
  documentNumber: "input",
  faultSymptom: "input",
  repairContent: "input",
  partner: "input",
  partNumber: "input",
  cost: "input",
  warranty: "input",
  maintenanceCost: "input",
  inspectionCheck: "input",
  notes: "input",
};

/** column 한글라벨명 맵핑 */
export const fieldLabel: { [key in keyof RepairRow]: string } = {
  centerName: "센터명",
  type: "유형",
  repairDate: "수리일자",
  documentNumber: "문서번호",
  faultSymptom: "고장증상",
  repairContent: "수리내용",
  partner: "거래처",
  partNumber: "부품번호",
  cost: "비용",
  warranty: "보증",
  maintenanceCost: "유지보수비용",
  inspectionCheck: "점검확인",
  notes: "비고",
};

/** 셀렉트 박스 옵션 */
export const equipTypeOption = [
  { value: "정기점검", label: "정기점검" },
  { value: "긴급점검", label: "긴급점검" },
  { value: "수리", label: "수리" },
];
