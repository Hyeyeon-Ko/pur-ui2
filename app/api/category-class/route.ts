import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.BASE_LOCAL_URL;

    const res = await axios.get(`${baseUrl}/pur/class`);

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

interface ClassRequest {
  classCd: string;
  classNm: string;
  classDc: string;
}

export async function POST(request: Request) {
  try {
    const baseUrl = process.env.BASE_LOCAL_URL;

    const body: ClassRequest = await request.json();

    const { classCd, classNm, classDc } = body;
    if (!classCd || !classNm || !classDc) {
      return NextResponse.json(
        { message: "classCd, classNm, classDc는 필수입니다." },
        { status: 400 },
      );
    }

    const response = await axios.post(`${baseUrl}/pur/class`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("데이터 저장 중 오류 발생:", error);

    return NextResponse.json(
      {
        status: error.response?.status || 500,
        message:
          error.response?.data?.message ||
          error.message ||
          "서버 오류가 발생했습니다.",
      },
      { status: error.response?.status || 500 },
    );
  }
}
