"use client";

import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAccount, useWriteContract } from "wagmi";
import cryptoRandomString from "crypto-random-string";
import abi from "@/lib/abi.json";
import GiftCard from "@/components/GiftCard";
import { LoaderIcon, OctagonAlertIcon, PrinterIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  amount: z.coerce.number().min(0.01),
});

export default function Page() {
  const { address } = useAccount();
  const {
    data: writtenData,
    writeContractAsync,
    error: writeError,
  } = useWriteContract();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Gift Card",
      description: "Thank you for being awesome!",
      amount: 0,
    },
  });

  const [id, setId] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"ipfs" | "contract" | "success" | null>(
    null
  );
  const [giftCardInfo, setGiftCardInfo] = useState({
    title: "Gift Card",
    description: "Thank you for being awesome!",
    amount: 0,
    code: "SAMPLE_CODE",
  });

  const giftCardElem = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef: giftCardElem });

  useEffect(() => {
    if (address) {
      setUserAddress(address);
      setId(cryptoRandomString({ length: 10, type: "distinguishable" }));
    }
  }, [address]);

  useEffect(() => {
    if (id) {
      setGiftCardInfo((info) => ({ ...info, code: id }));
    }
  }, [id]);

  useEffect(() => {
    setGiftCardInfo((info) => ({
      ...info,
      title: form.getValues().title,
      description: form.getValues().description,
      amount: form.getValues().amount,
    }));
  }, [form.getValues()]);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    try {
      setSubmitting(true);
      setStatus("ipfs");
      // UPLOAD DATA TO IPFS
      const response = await fetch("/api/ipfs", {
        method: "POST",
        body: JSON.stringify({
          data: {
            title: values.title,
            description: values.description,
            amount: values.amount,
          },
        }),
      });
      const { hash } = await response.json();
      // CREATE GIFT CARD
      setStatus("contract");
      const card = await writeContractAsync({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS! as `0x${string}`,
        abi,
        functionName: "createGiftCard",
        args: [id, hash],
        value: BigInt(values.amount * 10 ** 18),
      });
      setStatus("success");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }
  return status === "success" ? (
    <div className="flex grow items-center justify-center">
      <div className="flex w-[600px] max-w-full flex-col gap-5">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold">Gift Card Created</h2>
          <p className="text-sm text-neutral-600">
            Your gift card has been created successfully. Share the gift code
            with your recipient, and they can redeem it securely.
          </p>
        </div>
        <Alert variant="destructive">
          <OctagonAlertIcon className="h-4 w-4" />
          <AlertTitle>Warning!</AlertTitle>
          <AlertDescription>
            Be sure to save the gift code. It cannot be recovered if this page
            is closed or refreshed.
          </AlertDescription>
        </Alert>
        <div ref={giftCardElem} className="print:p-10">
          <GiftCard {...giftCardInfo} />
        </div>
        <div className="flex justify-center">
          <Button onClick={() => handlePrint()}>
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print Gift Card
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="mb-7">
        <h2 className="mb-2 text-xl font-bold">Create a New Gift Card</h2>
        <p className="text-sm text-neutral-500">
          Once created, share the gift code with your recipient, and they can
          redeem it securely. Perfect for birthdays, special occasions, or
          simply saying thank you.
        </p>
      </div>
      <div className="flex flex-col-reverse gap-10 md:grid md:grid-cols-2">
        <section>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              {/* ----- TITLE ----- */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Title"
                        disabled={submitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* ----- DESCRIPTION ----- */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        disabled={submitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* ----- Amount ----- */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        disabled={submitting}
                        {...field}
                        onClick={(e) =>
                          e.currentTarget.value === "0" &&
                          e.currentTarget.select()
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      The amount of AIA you want to lock in the gift card.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit" disabled={submitting}>
                  {submitting && (
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Gift Card
                </Button>
              </div>
            </form>
          </Form>
        </section>
        <section>
          <GiftCard {...giftCardInfo} code="SAMPLE_CODE" />
        </section>
      </div>
    </>
  );
}
