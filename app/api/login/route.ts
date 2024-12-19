import { NextResponse } from "next/server";
import axios from "axios";

interface LoginRequest {
  userId: string;
  userPw: string;
}

export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json();

    const { userId, userPw } = body;

    if (!userId || !userPw) {
      return NextResponse.json(
        { message: "userId와 userPw는 필수입니다." },
        { status: 400 },
      );
    }

    // const baseUrl = process.env.BASE_LOCAL_URL || "http://localhost:10024";
    const endpoint = "http://172.16.250.84/mis/pur/login";

    // Axios를 사용하여 POST 요청
    const response = await axios.post(endpoint, { userId, userPw });

    const result = response.data;

    if (response.status !== 200 || result.message !== "로그인 성공") {
      return NextResponse.json(
        { message: result.message || "로그인 실패" },
        { status: response.status },
      );
    }

    return NextResponse.json(
      { message: "로그인 성공!", token: result.token },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("로그인 요청 처리 중 오류 발생:", error);

    // 에러 처리: Axios 에러 메시지 및 상태를 반환
    return NextResponse.json(
      {
        message:
          error.response?.data?.message ||
          error.message ||
          "서버 오류가 발생했습니다.",
      },
      { status: error.response?.status || 500 },
    );
  }
}
