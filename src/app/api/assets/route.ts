import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") || 20;
  const offset = searchParams.get("offset") || 0;

  const res = await fetch(
    `https://rest.coincap.io/v3/assets?limit=${limit}&offset=${offset}&apiKey=${process.env.COINCAP_API_KEY}`
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch assets" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
