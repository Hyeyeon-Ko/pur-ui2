import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseUrl = process.env.BASE_LOCAL_URL;

    const res = await fetch(`${baseUrl}/pur/class`);
    if (!res.ok) {
      throw new Error(`데이터를 불러오는데 실패했습니다. ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const baseUrl = process.env.BASE_LOCAL_URL;

    const body = await request.json();

    const res = await fetch(`${baseUrl}/pur/class`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`데이터를 저장하는데 실패했습니다. ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}