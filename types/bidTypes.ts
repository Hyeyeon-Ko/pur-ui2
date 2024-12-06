export type bidDataType = {
  id: string;
  centerName: string[];
  bidNumber: string;
  nuriMarket: string;
  contractType: string;
  bidMethod: string;
  accountName: string;
  announcementType: string;
  bidName: string;
  announcementDate: string;
  closingDate: string;
  bidDate: string;
  baseBidPrice: string;
  winningBidPrice: string;
  winner: string;
  bidResult: string;
  bidBond: string;
  bidProposalNumber: string;
  manager: string;
  contractCategory?: string;
  etc: string;
  viewStatus: string;
};

export type bidListDataType = {
  id: string;
  centerName: string[];
  erpCode: string;
  erpItemName: string;
  accountType: string;
  modelName: string;
  standard: string;
  manufacturer: string;
  quantity: string;
  bidBaseUnitPrice: string;
  bidBasePrice: string;
  [key: string]: any;
};

export type ErpItemsType = {
  erp_item_id?: string;
  inst_cd?: string;
  erp_cd?: string;
  erp_item_nm?: string;
  acc_cat?: string;
  model_nm?: string;
  use_at?: string;
  spec?: string;
  mfr?: string;
  qty?: string;
  std_price?: string;
  ref_price?: string;
  regist_id?: string;
  regist_dt?: string;
  updusr_id?: string;
  updt_dt?: string;
};
