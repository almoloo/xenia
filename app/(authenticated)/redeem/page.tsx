"use client";

import GiftCard from "@/components/GiftCard";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClipboardPasteIcon,
  LoaderIcon,
  QrCodeIcon,
  WalletIcon,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useReadContract, useWriteContract } from "wagmi";
import { z } from "zod";
import abi from "@/lib/abi.json";
import { ReadContractErrorType } from "viem";

type GiftCardResponse = [bigint, string, string, boolean];

const formSchema = z.object({
  code: z.string(),
});

export default function page() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: code ?? "",
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"validated" | null>(null);
  const [giftCode, setGiftCode] = useState<string | null>(null);
  const [isRedeemed, setIsRedeemed] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const [giftCardInfo, setGiftCardInfo] = useState({
    title: "",
    description: "",
    amount: 0,
    code: "",
  });

  const {
    data: giftCardData,
    refetch: refetchGiftCardData,
    error: giftCardError,
    isError: giftCardHasError,
  } = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as `0x${string}`,
    functionName: "validateGiftCard",
    args: [giftCode],
  }) as {
    data: GiftCardResponse | null;
    refetch: () => void;
    error: ReadContractErrorType;
    isError: boolean;
  };

  const {
    data: writtenData,
    writeContractAsync,
    error: writeError,
  } = useWriteContract();

  useEffect(() => {
    if (code) {
      setSubmitting(true);
      setGiftCode(code);
      refetchGiftCardData();
    }
  }, []);

  useEffect(() => {
    if (giftCode) {
      setSubmitting(true);
      refetchGiftCardData();
    }
  }, [giftCode]);

  useEffect(() => {
    const fetchIPFS = async (hash: string) => {
      const ipfsData = await fetch(`/api/getipfs?hash=${hash}`);
      const { data } = await ipfsData.json();
      return data;
    };

    const handleGiftCardData = async () => {
      const [amount, creator, ipfs, redeemed] = giftCardData!;
      const ipfsData = await fetchIPFS(ipfs);
      setIsRedeemed(redeemed);

      setGiftCardInfo({
        title: ipfsData.title,
        description: ipfsData.description,
        amount: Number(amount) / 10 ** 18,
        code: giftCode!,
      });
      setStatus("validated");
      setSubmitting(false);
    };

    if (giftCardData) {
      console.log(giftCardData);
      handleGiftCardData();
    }
    if (giftCardHasError) {
      toast.error(giftCardError.shortMessage);
      console.log(giftCardError);
      setSubmitting(false);
      form.setError("code", {
        message: "Invalid gift card code.",
        type: "value",
      });
    }
  }, [giftCardData, giftCardHasError]);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setGiftCode(values.code);
  }

  async function handlePaste() {
    const text = await navigator.clipboard.readText();
    form.setValue("code", text);
  }

  async function handleRedeem() {
    try {
      setRedeeming(true);
      const redeem = await writeContractAsync({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as `0x${string}`,
        abi,
        functionName: "redeemGiftCard",
        args: [giftCode],
      });
      setRedeemed(true);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setRedeeming(false);
    }
  }

  if (status === "validated") {
    return (
      <>
        <div className="flex grow justify-center">
          <div className="flex w-[600px] max-w-full flex-col items-center gap-7">
            <div className="text-center">
              <h2 className="mb-2 text-xl font-bold">Here's your Gift Card</h2>
              <p className="text-sm text-neutral-500">
                Press the button below to redeem your gift card.
              </p>
            </div>
            <GiftCard {...giftCardInfo} hideCode />
            <div>
              {redeemed ? (
                <div className="text-center">
                  <h3 className="text-lg font-bold">Gift Card Redeemed</h3>
                  <p className="text-sm text-neutral-500">
                    This gift card has been redeemed successfully, wait for the
                    transaction to confirm and refresh this page in a few
                    minutes.
                  </p>
                </div>
              ) : (
                <Button
                  className="w-full"
                  size="lg"
                  disabled={isRedeemed || redeeming}
                  onClick={handleRedeem}
                >
                  {isRedeemed ? (
                    <>This gift card has already been redeemed</>
                  ) : (
                    <>
                      {redeeming ? (
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <WalletIcon className="mr-2 h-4 w-4" />
                      )}
                      Redeem Gift Card to my Wallet
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex grow justify-center">
        <div className="flex w-[600px] max-w-full flex-col items-center gap-7 text-center">
          <span className="rounded-full bg-slate-200 p-5 dark:bg-slate-700">
            <QrCodeIcon className="h-16 w-16 text-emerald-500" />
          </span>
          <div>
            <h2 className="mb-2 text-xl font-bold">Redeem a Gift Card</h2>
            <p className="text-sm text-neutral-500">
              Enter the gift code you received to redeem your gift card
              securely.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="w-full space-y-3"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Redeem Code</FormLabel> */}
                    <FormControl>
                      <div className="flex w-full items-center space-x-2">
                        <Input
                          placeholder="Redeem Code"
                          className="grow"
                          disabled={submitting}
                          onInput={() => form.clearErrors("code")}
                          {...field}
                        />
                        <Button
                          type="button"
                          disabled={submitting}
                          variant="outline"
                          onClick={handlePaste}
                          size="icon"
                          className="shrink-0"
                        >
                          <ClipboardPasteIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting && (
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Validate Gift Card
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
