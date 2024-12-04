import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:10024/pur/contract");
    if (!res.ok) {
      throw new Error(`데이터를 불러오는데 실패했습니다. ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ status: 500 });
  }
}
