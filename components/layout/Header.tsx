"use client";

import React from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/layout/Logo";

export default function Header() {
  const { isConnected } = useAccount();
  return (
    <header className="flex items-center justify-between border-b px-10 py-3 dark:border-slate-600">
      <Link href="/">
        <Logo className="h-6 w-auto" />
      </Link>
      <div className="flex items-center gap-1">
        {isConnected && (
          <nav>
            <Link passHref href="/create">
              <Button variant="ghost">Create</Button>
            </Link>
            <Link passHref href="/redeem">
              <Button variant="ghost">Redeem</Button>
            </Link>
          </nav>
        )}
        <w3m-button balance="hide" />
      </div>
    </header>
  );
}
