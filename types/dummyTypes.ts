export type RowData = {
  id: string;
  센터: string[];
  입찰번호: string;
  누리장터: string;
  계약종류: string;
  낙찰방법: string;
  계정명: string;
  공고구분: string;
  입찰명: string;
  공고일: string;
  마감일: string;
  응찰일: string;
  낙찰자: string;
  낙찰기준가: string;
  낙찰금액: string;
  입찰결과: string;
  입찰증권: string;
  입찰품의번호: string;
  담당자: string;
  기타: string;
  열람: string;
};

export type contractRowData = {
  id?: string;
  센터?: string[];
  입찰번호?: string;
  계약번호?: string;
  계약종류?: string;
  계정명?: string;
  계약명?: string;
  계약일자?: string;
  계약시작일?: string;
  계약완료일?: string;
  공급사?: string;
  낙찰기준가?: string;
  계약금액?: string;
  계약방법?: string;
  SN?: string;
  계약증권?: string;
  하자증권?: string;
  계약품의번호?: string;
  계약구분?: string;
  담당자?: string;
  기타?: string;
  열람?: string;
  ERP코드?: string;
  ERP품목?: string;
  계정구분?: string;
  모델명?: string;
  규격?: string;
  제조사?: string;
  수량?: string;
  계약단가?: string;
};

export type ChipContent = string[];
export type InputContent = string;
export type RadioContent = Array<{ value: string; label: string }>;
export type DatePickerContent = string; // 또는 Date 타입으로 할 수 있습니다.
export type UploadContent = File | null; // 업로드된 파일을 다룰 때 사용할 수 있습니다.

export interface TenderItem {
  id: number;
  title: string;
  type: "chip" | "input" | "radio" | "datepicker" | "upload";
  contents:
    | ChipContent
    | InputContent
    | RadioContent
    | DatePickerContent
    | UploadContent;
}
