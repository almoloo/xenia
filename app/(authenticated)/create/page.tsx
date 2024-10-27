"use client";

import React, { useEffect, useState } from "react";
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

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  amount: z.coerce.number(),
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
      title: "",
      description: "",
      amount: 0,
    },
  });

  const [id, setId] = useState<string | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"ipfs" | "contract" | "success" | null>(
    null
  );

  useEffect(() => {
    if (address) {
      setUserAddress(address);
      setId(cryptoRandomString({ length: 10, type: "distinguishable" }));
    }
  }, [address]);

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
      console.log(card, id);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }
  return status === "success" ? (
    <>
      <div>Success</div>
      <div>
        <div>Gift Card ID: {id}</div>
        <div>Sender: {userAddress}</div>
      </div>
    </>
  ) : (
    <>
      <div>Create Gift Card</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* ----- TITLE ----- */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" disabled={submitting} {...field} />
                </FormControl>
                <FormDescription>The title of the gift card.</FormDescription>
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
                <FormDescription>
                  The description of the gift card.
                </FormDescription>
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
                  <Input disabled={submitting} {...field} />
                </FormControl>
                <FormDescription>
                  The amount of the gift card in AIA.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" disabled={submitting}>
              Create Gift Card
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
