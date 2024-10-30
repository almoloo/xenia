import { PinataSDK } from "pinata";
import { NextRequest, NextResponse } from "next/server";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
  pinataGatewayKey: process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY,
});

export async function GET(request: NextRequest) {
  const hash = request.nextUrl.searchParams.get("hash");

  if (!hash) {
    return NextResponse.json({ message: "No hash provided" }, { status: 400 });
  }

  const data = await pinata.gateways.get(hash!);

  return NextResponse.json({
    data: data.data,
  });
}
