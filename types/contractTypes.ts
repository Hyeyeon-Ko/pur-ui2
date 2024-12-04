export type contractDataType = {
  id?: string;
  centerName?: string[];
  bidNumber?: string;
  contractNumber?: string;
  contractType?: string;
  accountName?: string;
  contractName?: string;
  contractDate?: string;
  contractStartDate?: string;
  contractEndDate?: string;
  supplier?: string;
  baseBidPrice?: string;
  contractAmount?: string;
  contractMethod?: string;
  sn?: string;
  contractBond?: string;
  defectBond?: string;
  contractProposalNumber?: string;
  contractCategory?: string;
  manager?: string;
  etc?: string;
  viewStatus?: string;
  erpCode?: string;
  erpItem?: string;
  accountCategory?: string;
  modelName?: string;
  specifications?: string;
  manufacturer?: string;
  quantity?: string;
  unitPrice?: string;
  standard?: string;
  contractUnitPrice?: string;
  [key: string]: string | string[] | undefined;
};

export type ContractMasterWithDetailsType = {
  contract: {
    cont_id?: string;
    cont_no?: string;
    bid_id?: string;
    cont_nm?: string;
    cont_dt?: string;
    start_dt?: string;
    end_dt?: string;
    cont_app_no?: string;
    use_at?: string;
    resp_id?: string;
    regist_id?: string;
    regist_dt?: string;
    updusr_id?: string;
    updt_dt?: string;
  };
  details: {
    cont_detail_id?: string;
    cont_id?: string;
    inst_cd?: string;
    cont_div?: string;
    cont_method?: string;
    cont_type?: string;
    cont_sn?: string;
    deposit_srn?: string;
    war_bond?: string;
    war_srn?: string;
    supplier?: string;
    cont_price?: string;
    cont_deposit?: string;
    notes?: string;
    attach_id?: string;
    use_at?: string;
    regist_id?: string;
    regist_dt?: string;
    updusr_id?: string;
    updt_dt?: string;
  }[];
};

export type BidMasterWithDetailsType = {
  bid: {
    bid_id?: string; // Bid의 고유 ID
    bid_no?: string; // Bid 번호
    bid_nm?: string; // Bid 이름
    announce_dt?: string; // 공고일
    close_dt?: string; // 마감일
    bid_res?: string; // Bid 결과
    use_at?: string; // 사용 여부
    resp_id?: string; // 담당자
    nuri_no?: string; // 누리 번호
    regist_id?: string; // 등록자 ID
    regist_dt?: string; // 등록 날짜
    updusr_id?: string; // 수정자 ID
    updt_dt?: string; // 수정 날짜
  };
  details?: {
    bid_detail_id?: string;
    bid_id?: string;
    inst_cd?: string; // 기관 코드
    ann_cat?: string; // 공고 카테고리
    bid_type?: string; // Bid 타입
    bid_method?: string; // Bid 방법
    cont_type?: string; // 계약 타입
    deposit_at?: string; // 보증금 시점
    deposit_rsn?: string; // 보증금 사유
    app_no?: string; // 승인 번호
    acc_cd?: string; // 계좌 코드
    win_price?: string; // 낙찰가
    win_bid?: string; // 낙찰 여부
    notes?: string; // 비고
    attach_id?: string; // 첨부 파일 ID
    regist_id?: string; // 등록자
    regist_dt?: string; // 등록 날짜
    updusr_id?: string; // 수정자
    updt_dt?: string; // 수정 날짜
  }[];
};
