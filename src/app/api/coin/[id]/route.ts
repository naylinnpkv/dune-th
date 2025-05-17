import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(
    `https://rest.coincap.io/v3/assets/${id}?apiKey=${process.env.COINCAP_API_KEY}`
  );
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch asset" },
      { status: 500 }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
