import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const bid_id = searchParams.get("bid_id");
    const baseUrl = process.env.BASE_LOCAL_URL;

    const res = await fetch(`${baseUrl}/pur/bid`);
    if (!res.ok) {
      throw new Error(`데이터를 불러오는데 실패했습니다. ${res.statusText}`);
    }

    const data = await res.json();

    const filteredData = bid_id
      ? data.data.filter((item: any) => item.bid_id === bid_id)
      : data.data;

    return NextResponse.json({
      code: 200,
      message: "Success",
      data: filteredData,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
