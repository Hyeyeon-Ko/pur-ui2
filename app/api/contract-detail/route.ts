import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const bid_id = searchParams.get("bid_id");
    const baseUrl = process.env.BASE_LOCAL_URL;

    const res = await axios.get(`${baseUrl}/pur/contract`);

    const data = res.data;

    const filteredData = bid_id
      ? data.data.filter((item: any) => item.bid_id === bid_id)
      : data.data;

    return NextResponse.json({
      code: 200,
      message: "Success",
      data: filteredData,
    });
  } catch (error: any) {
    console.error("API 요청 실패:", error);

    // 에러 처리
    return NextResponse.json(
      {
        status: 500,
        message:
          error.response?.data?.message ||
          error.message ||
          "알 수 없는 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
