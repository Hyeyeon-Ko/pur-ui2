import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.BASE_LOCAL_URL;

    const res = await axios.get(`${baseUrl}/pur/erp/item`);

    return NextResponse.json(res.data);
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
