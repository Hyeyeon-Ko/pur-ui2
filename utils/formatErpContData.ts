import { ErpItemsType } from "@/types/bidTypes";
import { mappings } from "@/lib/mappings";

export const formatErpContData = (
  erpData: ErpItemsType[],
  formatDate: (dateString: string) => string,
  formatCurrency: (amount: string | number) => string,
) => {
  return erpData.map(item => ({
    bid_id: item.bid_id,
    센터: mappings.CMM001[item.inst_cd || "-"] || "-",
    ERP코드: item.erp_cd || "-",
    ERP품목: item.erp_item_nm || "-",
    입찰번호: item.bid_no || "-",
    계약번호: item.cont_no || "-",
    계약종류: mappings.PUR003[item.cont_type || "-"] || "-",
    계정구분: mappings.PUR002[item.acc_cat || "-"] || "-",
    모델명: item.model_nm || "-",
    규격: item.spec || "-",
    제조사: item.mfr || "-",
    공급사: item.supplier || "-",
    수량: item.qty || "-",
    낙찰기준단가: item.std_price
      ? formatCurrency(parseFloat(item.std_price))
      : "-",
    낙찰기준가격: item.ref_price
      ? formatCurrency(parseFloat(item.ref_price))
      : "-",
    계약단가: item.cont_unit_price || "-",
    계약가격: item.cont_price || "-",
  }));
};
