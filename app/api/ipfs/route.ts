import { PinataSDK } from "pinata";
import { NextRequest, NextResponse } from "next/server";

interface IPFSData {
  title: string;
  description: string;
  amount: number;
}

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
});

export async function POST(request: NextRequest) {
  const { data } = (await request.json()) as { data: IPFSData };

  const uploaded = await pinata.upload.json(data);

  return NextResponse.json({
    hash: uploaded.cid,
  });
}
