import { PinataSDK } from "pinata";

interface IPFSData {
  title: string;
  description: string;
  amount: number;
}

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
});

export async function POST(request: Request) {
  const { data } = (await request.json()) as { data: IPFSData };

  const uploaded = await pinata.upload.json(data);

  return Response.json({
    hash: uploaded.cid,
  });
}
