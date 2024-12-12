import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const headers = [
      "센터명",
      "ERP코드",
      "ERP품목명",
      "입찰번호",
      "계약번호",
      "계정구분",
      "모델명",
      "규격",
      "제조사",
      "공급사",
      "수량",
      "낙찰기준가",
      "계약단가",
      "계약금액",
    ];
    const sampleRow = [
      "센터",
      "ERP001",
      "샘플품목",
      "운영비",
      "계약번호",
      "계정구분",
      "모델명",
      "규격",
      "제조사Y",
      "공급사Z",
      "10",
      "10000",
      "20000",
      "30000",
    ];

    const csvData = [headers, sampleRow].map(row => row.join(",")).join("\n");

    const bom = "\uFEFF";
    const csvWithBom = bom + csvData;

    return new NextResponse(csvWithBom, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=erp_template.csv",
      },
    });
  } catch (error) {
    console.error("CSV 생성 실패:", error);
    return new NextResponse(JSON.stringify({ error: "CSV 생성 실패" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
