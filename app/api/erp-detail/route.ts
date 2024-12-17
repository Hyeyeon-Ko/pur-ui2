import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

const erpDatabase: { [key: string]: any[] } = {};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const bid_id = searchParams.get("bid_id");
    const baseUrl = process.env.BASE_LOCAL_URL;

    const res = await fetch(`${baseUrl}/pur/erp/link`);
    if (!res.ok) {
      throw new Error(`데이터를 가져오는 데 실패했습니다: ${res.statusText}`);
    }

    const data = await res.json();

    if (!data || !data.data) {
      return NextResponse.json({
        code: 200,
        message: "데이터가 없습니다.",
        data: [],
      });
    }

    const filteredData = bid_id
      ? data.data.filter((item: any) => item.bid_id === bid_id)
      : data.data;

    return NextResponse.json({
      code: 200,
      message: "성공",
      data: filteredData,
    });
  } catch (error: any) {
    console.error("API 에러:", error.message);
    return NextResponse.json({
      code: 500,
      message: error.message || "예기치 못한 에러가 발생했습니다.",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const bidId = formData.get("bid_id") as string;
    const file = formData.get("file") as Blob;

    if (!bidId || !file) {
      return NextResponse.json(
        { error: "bid_id 또는 파일이 제공되지 않았습니다." },
        { status: 400 },
      );
    }

    // 파일 파싱
    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    // 서버 데이터 저장
    if (!erpDatabase[bidId]) {
      erpDatabase[bidId] = [];
    }
    erpDatabase[bidId] = [...erpDatabase[bidId], ...jsonData];

    return NextResponse.json({
      code: 200,
      message: "업로드 성공",
      data: erpDatabase[bidId],
    });
  } catch (error) {
    console.error("파일 처리 실패:", error);
    return NextResponse.json(
      { error: "파일 처리 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
