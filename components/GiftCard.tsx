import React from "react";
import { QRCodeSVG } from "qrcode.react";
import Logo from "@/components/layout/Logo";
import { toast } from "sonner";

interface GiftCardProps {
  title: string;
  description: string;
  amount: number;
  code: string;
  hideCode?: boolean;
}

export default function GiftCard(props: GiftCardProps) {
  function handleCopy() {
    navigator.clipboard.writeText(props.code);
    toast("Copied to clipboard");
  }

  return (
    <div className="flex w-full flex-col rounded-xl bg-gradient-to-bl from-emerald-400 to-emerald-600 text-emerald-100 shadow-xl">
      <section className="p-7">
        <div className="flex items-center justify-between">
          <Logo className="h-5 w-auto text-emerald-900" />
          <span className="text-xl font-black text-white">
            {props.amount} AIA
          </span>
        </div>
        <div className="my-7 flex flex-col text-center">
          <h2 className="text-2xl font-bold">{props.title}</h2>
          <p className="mt-2 text-lg">{props.description}</p>
        </div>
      </section>
      <section className="flex gap-7 rounded-b-xl bg-white/25 p-7">
        {props.hideCode !== true ? (
          <>
            <QRCodeSVG
              className="shrink-0 text-emerald-900"
              value={`https://xenia.placeholder.rest/redeem?code=props.code`}
              bgColor="transparent"
              fgColor="currentColor"
            />
            <div className="flex grow flex-col text-emerald-900">
              <h3 className="mb-1 text-sm font-bold">How to redeem</h3>
              <p className="text-sm">
                To redeem this gift card, visit xenia.placeholder.rest/redeem
                and enter the code below. Or scan the QR code with your phone.
              </p>
              <pre
                className="mt-4 flex grow cursor-pointer items-center justify-center rounded-sm bg-white/35 text-2xl font-bold tracking-widest"
                onClick={handleCopy}
              >
                {props.code}
              </pre>
            </div>
          </>
        ) : (
          <div className="mx-auto text-xs">
            You can redeem this gift card right now.
          </div>
        )}
      </section>
    </div>
  );
}
