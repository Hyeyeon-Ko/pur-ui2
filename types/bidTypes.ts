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
  baseBidPrice: string;
  [key: string]: any;
};

export type ErpItemsType = {
  bid_id?: string;
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
  std_price?: string | number;
  ref_price?: string | number;
  regist_id?: string;
  regist_dt?: string;
  updusr_id?: string;
  updt_dt?: string;
  bid_no?: string;
  cont_no?: string;
  cont_price?: string | number;
  supplier?: string;
  cont_type?: string;
  cont_unit_price?: string | number;
};

interface Detail {
  bid_detail_id?: string;
  bid_id?: string;
  inst_cd?: string;
  ann_cat?: string;
  bid_type?: string;
  bid_method?: string;
  cont_type?: string;
  deposit_at?: string;
  deposit_rsn?: string;
  app_no?: string;
  acc_cd?: string;
  win_price?: string;
  win_bid?: string;
  use_at?: string;
  notes?: string;
  attach_id?: string;
  regist_id?: string;
  regist_dt?: string;
  updusr_id?: string;
  updt_dt?: string;
  // bid_no?: string;
  // method?: string;
}

interface Bid {
  bid_id?: string;
  bid_no?: string;
  bid_nm?: string;
  announce_dt?: string;
  close_dt?: string;
  bid_res?: string;
  use_at?: string;
  resp_id?: string;
  nuri_no?: string;
  regist_id?: string;
  regist_dt?: string;
  updusr_id?: string;
  updt_dt?: string;
}

export interface BidItem {
  bid?: Bid;
  details?: Detail[];
}
