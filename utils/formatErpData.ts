import { ErpItemsType } from "@/types/bidTypes";
import { mappings } from "@/lib/mappings";

export const formatErpData = (
  erpData: ErpItemsType[],
  formatDate: (dateString: string) => string,
  formatCurrency: (amount: string | number) => string,
) => {
  return erpData.map(item => ({
    bid_id: item.bid_id || "",
    센터명: mappings.CMM001[item.inst_cd || "-"] || "-",
    ERP코드: item.erp_cd || "-",
    ERP품목명: item.erp_item_nm || "-",
    계정구분: mappings.PUR002[item.acc_cat || "-"] || "-",
    모델명: item.model_nm || "-",
    규격: item.spec || "-",
    제조사: item.mfr || "-",
    수량: item.qty || "-",
    낙찰기준단가: item.std_price
      ? formatCurrency(parseFloat(item.std_price))
      : "-",
    낙찰기준가격: item.ref_price
      ? formatCurrency(parseFloat(item.ref_price))
      : "-",
    ERP품목ID: item.erp_item_id || "-",
    사용여부: item.use_at || "-",
    등록자ID: item.regist_id || "-",
    등록일자: item.regist_dt ? formatDate(item.regist_dt) : "-",
    수정자ID: item.updusr_id || "-",
    수정일자: item.updt_dt ? formatDate(item.updt_dt) : "-",
  }));
};
