import { NextResponse } from "next/server";

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

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, userPw }),
    });

    const result = await response.json();

    if (!response.ok || result.message !== "로그인 성공") {
      return NextResponse.json(
        { message: result.message || "로그인 실패" },
        { status: response.status },
      );
    }

    return NextResponse.json(
      { message: "로그인 성공!", token: result.token },
      { status: 200 },
    );
  } catch (error) {
    console.error("로그인 요청 처리 중 오류 발생:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
