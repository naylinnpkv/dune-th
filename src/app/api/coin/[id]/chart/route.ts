import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const now = Date.now();
  const ONE_HOUR = 60 * 60 * 1000;

  const end = now;
  const start = end - ONE_HOUR;

  const res = await fetch(
    `https://rest.coincap.io/v3/assets/${id}/history?interval=m5&start=${start}&end=${end}&apiKey=${process.env.COINCAP_API_KEY}`
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch asset chart" },
      { status: 500 }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
